@AGENTS.md

# MyComune — project notes for Claude

## What this project is

MyComune is a civic intelligence tool for Italian citizens. It lets people search PNRR-funded public projects in their Comune, understand them in plain Italian, and receive weekly Telegram updates. See the PRD ("Comune Watchdog PRD.pdf") for full product spec.

## Tech stack

- **Next.js 16** (App Router, TypeScript, Tailwind CSS 4)
- **Supabase** (Postgres) — DB + auth
- **pnpm** for package management (use `pnpm`, not npm or yarn)
- **Node 20** via nvm (`nvm use 20` before any commands in this project)

## Data sources

- **Primary (ingestion):** OpenPNRR — `https://openpnrr.it` — bulk CSV export
- **Cross-check:** ItaliaDomani Open Data — `https://italiadomani.gov.it`

## Project structure

```
app/
  api/
    ingest/route.ts   # POST — full ingest run (protected by CRON_SECRET)
    check/route.ts    # POST — daily source availability check
lib/
  supabase.ts         # Admin client (server-only, service role key)
  ingest/
    openpnrr.ts       # Fetch + CSV parse OpenPNRR dataset
    normalize.ts      # Map raw fields → common project schema
  db/
    projects.ts       # upsertProjects(), rebuildComuniAggregates()
supabase/
  migrations/
    001_initial.sql   # Full schema: projects, comuni, ingestion_logs, source_metadata
```

## Database tables

| Table | Purpose |
|---|---|
| `projects` | One normalized PNRR project row per (source, project_id) |
| `comuni` | Pre-aggregated stats per Comune, rebuilt after each ingest |
| `ingestion_logs` | One row per ingest run (status, counts, errors) |
| `source_metadata` | Source availability + declared update dates |

## Environment variables

See `.env.example`. Required:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_KEY`
- `CRON_SECRET` — header `x-cron-secret` must match to call /api/ingest and /api/check

## MVP phases

| Phase | Status | Description |
|---|---|---|
| 1 | Done | Project scaffold, schema, ingestion pipeline, homepage shell |
| 2 | Next | Comune search, dashboard, project list + detail pages |
| 3 | Pending | AI assistant (Claude, RAG over projects) |
| 4 | Pending | Telegram bot |
| 5 | Pending | Public launch |

## Running locally

```bash
nvm use 20
pnpm dev
```

## Triggering an ingest manually

```bash
curl -X POST http://localhost:3000/api/ingest \
  -H "x-cron-secret: YOUR_CRON_SECRET"
```

## Watch signals (neutral labels per PRD §21)

Computed in `lib/ingest/normalize.ts`:
- `high-value project` — amount >= 1M euros
- `missing expected completion date`
- `missing implementing entity`
- `unclear description`
- `generic title`

Never use: corrupt, fraud, suspicious, illegal, scandal.
