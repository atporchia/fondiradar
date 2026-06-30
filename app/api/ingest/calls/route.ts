import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'
import { fetchCalls } from '@/lib/ingest/calls'

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

    return NextResponse.json({ ok: true, upserted: result.count, expired: expired.count })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[ingest/calls] error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
