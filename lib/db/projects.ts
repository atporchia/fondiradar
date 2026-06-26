import { supabaseAdmin } from '../supabase'
import type { NormalizedProject } from '../ingest/normalize'

/**
 * Upsert a batch of normalized projects.
 * Returns counts of inserted vs updated rows.
 */
export async function upsertProjects(
  records: NormalizedProject[],
  batchSize = 500
): Promise<{ inserted: number; updated: number }> {
  let inserted = 0
  let updated = 0
  const now = new Date().toISOString()

  for (let i = 0; i < records.length; i += batchSize) {
    const batch = records.slice(i, i + batchSize)

    const rows = batch.map((r) => ({
      project_id:               r.project_id,
      source:                   r.source,
      source_url:               r.source_url,
      cup_code:                 r.cup_code,
      title:                    r.title,
      description:              r.description,
      amount_total:             r.amount_total,
      amount_public:            r.amount_public,
      mission:                  r.mission,
      component:                r.component,
      measure:                  r.measure,
      category:                 r.category,
      status:                   r.status,
      progress_percentage:      r.progress_percentage,
      implementing_entity:      r.implementing_entity,
      beneficiary_entity:       r.beneficiary_entity,
      comune:                   r.comune,
      province:                 r.province,
      region:                   r.region,
      latitude:                 r.latitude,
      longitude:                r.longitude,
      start_date:               r.start_date,
      expected_end_date:        r.expected_end_date,
      last_source_update:       r.last_source_update,
      last_seen_at:             now,
      last_checked_by_watchdog: now,
      last_normalized_refresh:  now,
      raw_source_payload:       r.raw_source_payload,
      watch_signals:            r.watch_signals,
    }))

    const { error, count } = await supabaseAdmin
      .from('projects')
      .upsert(rows, {
        onConflict: 'source,project_id',
        count: 'exact',
      })

    if (error) throw new Error(`Upsert error: ${error.message}`)
    // count reflects all affected rows; we can't distinguish insert vs update
    // without a more complex approach, so we treat everything as updated here
    // and caller can compare with pre-existing count if needed.
    updated += count ?? 0
  }

  return { inserted, updated }
}

/**
 * Rebuild the comuni aggregates table from the projects table.
 * Called after each successful ingest run.
 */
export async function rebuildComuniAggregates(): Promise<void> {
  const now = new Date().toISOString()

  // Pull distinct comuni with their aggregates
  const { data, error } = await supabaseAdmin
    .from('projects')
    .select('comune, province, region, amount_total')
    .not('comune', 'is', null)

  if (error) throw new Error(`Failed to read projects for aggregation: ${error.message}`)
  if (!data) return

  // Group in memory
  const map = new Map<
    string,
    { province: string | null; region: string | null; total: number; count: number }
  >()

  for (const row of data) {
    const key = (row.comune as string).toUpperCase().trim()
    const existing = map.get(key)
    const amt = (row.amount_total as number | null) ?? 0
    if (existing) {
      existing.total += amt
      existing.count++
    } else {
      map.set(key, {
        province: row.province as string | null,
        region: row.region as string | null,
        total: amt,
        count: 1,
      })
    }
  }

  const rows = Array.from(map.entries()).map(([nome, stats]) => ({
    nome,
    province:                stats.province,
    region:                  stats.region,
    total_projects:          stats.count,
    total_funding:           stats.total,
    avg_project_value:       stats.count > 0 ? stats.total / stats.count : 0,
    last_normalized_refresh: now,
    last_watchdog_check:     now,
  }))

  // Upsert in batches
  const batchSize = 500
  for (let i = 0; i < rows.length; i += batchSize) {
    const { error: upsertError } = await supabaseAdmin
      .from('comuni')
      .upsert(rows.slice(i, i + batchSize), { onConflict: 'nome' })
    if (upsertError) throw new Error(`comuni upsert error: ${upsertError.message}`)
  }
}
