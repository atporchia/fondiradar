import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'
import { fetchCalls } from '@/lib/ingest/calls'
import { generateCallExplanation } from '@/lib/ingest/ai'

function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET
  if (!secret) return false
  return req.headers.get('x-cron-secret') === secret
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const calls = await fetchCalls()

    const rows = calls.map((c) => ({
      external_id:  c.external_id,
      source:       c.source,
      title:        c.title,
      description:  c.description,
      program:      c.program,
      categories:   c.categories,
      regions:      c.regions,
      open_date:    c.open_date,
      deadline:     c.deadline,
      budget_total: c.budget_total,
      status:       c.status,
      url:          c.url,
      last_checked_at: new Date().toISOString(),
    }))

    const result = await sql`
      INSERT INTO funding_calls ${sql(rows)}
      ON CONFLICT (source, external_id) DO UPDATE SET
        title           = EXCLUDED.title,
        description     = EXCLUDED.description,
        program         = EXCLUDED.program,
        categories      = EXCLUDED.categories,
        regions         = EXCLUDED.regions,
        open_date       = EXCLUDED.open_date,
        deadline        = EXCLUDED.deadline,
        budget_total    = EXCLUDED.budget_total,
        status          = EXCLUDED.status,
        url             = EXCLUDED.url,
        last_checked_at = EXCLUDED.last_checked_at
    `

    // Auto-close any calls whose deadline has passed
    const expired = await sql`
      UPDATE funding_calls
      SET status = 'closed', last_checked_at = NOW()
      WHERE status = 'open' AND deadline IS NOT NULL AND deadline < CURRENT_DATE
    `

    // Generate AI explanations for any open calls that don't have one yet
    let aiGenerated = 0
    let aiFailed = 0
    if (process.env.GROQ_API_KEY) {
      const pending = await sql`
        SELECT id, title, description, program, budget_total, deadline, categories
        FROM funding_calls
        WHERE status = 'open' AND ai_explanation IS NULL
      `
      for (const call of pending) {
        try {
          const ai = await generateCallExplanation({
            title: call.title,
            description: call.description,
            program: call.program,
            budget_total: call.budget_total ? Number(call.budget_total) : null,
            deadline: call.deadline,
            categories: call.categories,
          })
          await sql`
            UPDATE funding_calls SET
              ai_explanation  = ${ai.explanation},
              ai_tips         = ${ai.tips},
              ai_generated_at = NOW()
            WHERE id = ${call.id}
          `
          aiGenerated++
        } catch (err) {
          console.error('[AI] call explanation failed', call.id, err)
          aiFailed++
        }
      }
    }

    return NextResponse.json({ ok: true, upserted: result.count, expired: expired.count, aiGenerated, aiFailed })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[ingest/calls] error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
