-- Replace JS-side aggregation (limited to 1k rows) with a SQL function.
-- Called via supabaseAdmin.rpc('rebuild_comuni_aggregates') after each ingest.

CREATE OR REPLACE FUNCTION rebuild_comuni_aggregates()
RETURNS void
LANGUAGE plpgsql AS $$
BEGIN
  INSERT INTO comuni (nome, province, region, total_projects, total_funding, avg_project_value, last_normalized_refresh, last_watchdog_check)
  SELECT
    UPPER(TRIM(comune))                                            AS nome,
    MAX(province)                                                  AS province,
    MAX(region)                                                    AS region,
    COUNT(*)::integer                                              AS total_projects,
    COALESCE(SUM(amount_total), 0)                                 AS total_funding,
    CASE WHEN COUNT(*) > 0
         THEN COALESCE(SUM(amount_total), 0) / COUNT(*)
         ELSE 0 END                                                AS avg_project_value,
    NOW()                                                          AS last_normalized_refresh,
    NOW()                                                          AS last_watchdog_check
  FROM projects
  WHERE comune IS NOT NULL AND TRIM(comune) != ''
  GROUP BY UPPER(TRIM(comune))
  ON CONFLICT (nome) DO UPDATE SET
    province               = EXCLUDED.province,
    region                 = EXCLUDED.region,
    total_projects         = EXCLUDED.total_projects,
    total_funding          = EXCLUDED.total_funding,
    avg_project_value      = EXCLUDED.avg_project_value,
    last_normalized_refresh = EXCLUDED.last_normalized_refresh,
    last_watchdog_check    = EXCLUDED.last_watchdog_check;
END;
$$;
