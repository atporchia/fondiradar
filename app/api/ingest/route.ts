import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { fetchOpenPNRR } from '@/lib/ingest/openpnrr'
import { upsertProjects, rebuildComuniAggregates } from '@/lib/db/projects'

// Protect with a shared secret so only cron jobs / manual triggers can run this
function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET
  if (!secret) return false
  return req.headers.get('x-cron-secret') === secret
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Create ingestion log entry
  const { data: logRow, error: logError } = await supabaseAdmin
    .from('ingestion_logs')
    .insert({ source: 'openpnrr', status: 'running' })
    .select('id')
    .single()

  if (logError || !logRow) {
    return NextResponse.json({ error: 'Failed to create ingestion log' }, { status: 500 })
  }

  const logId: string = logRow.id
  const startedAt = Date.now()

  try {
    // 1. Fetch + parse OpenPNRR CSV
    const { records, rawRowCount, skipped, sourceUrl, declaredUpdateDate } =
      await fetchOpenPNRR()

    // 2. Upsert projects
    const { updated } = await upsertProjects(records)

    // 3. Rebuild comuni aggregates
    await rebuildComuniAggregates()

    // 4. Update source_metadata
    await supabaseAdmin
      .from('source_metadata')
      .update({
        last_checked_at:      new Date().toISOString(),
        last_available_at:    new Date().toISOString(),
        declared_update_date: declaredUpdateDate,
        is_available:         true,
        notes:                `Last ingest: ${rawRowCount} rows fetched`,
      })
      .eq('source_name', 'openpnrr')

    // 5. Mark log success
    await supabaseAdmin
      .from('ingestion_logs')
      .update({
        completed_at:    new Date().toISOString(),
        status:          'success',
        records_fetched: rawRowCount,
        records_new:     0,           // full diff tracking comes in Phase 2
        records_updated: updated,
        records_removed: 0,
      })
      .eq('id', logId)

    const duration = ((Date.now() - startedAt) / 1000).toFixed(1)

    return NextResponse.json({
      ok:            true,
      source:        'openpnrr',
      source_url:    sourceUrl,
      raw_rows:      rawRowCount,
      normalized:    records.length,
      skipped,
      upserted:      updated,
      duration_s:    parseFloat(duration),
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)

    await supabaseAdmin
      .from('ingestion_logs')
      .update({
        completed_at:  new Date().toISOString(),
        status:        'failure',
        error_message: message,
      })
      .eq('id', logId)

    await supabaseAdmin
      .from('source_metadata')
      .update({
        last_checked_at: new Date().toISOString(),
        is_available:    false,
        notes:           `Ingest error: ${message}`,
      })
      .eq('source_name', 'openpnrr')

    console.error('[ingest] error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
