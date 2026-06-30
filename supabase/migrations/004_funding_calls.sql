-- MyComune — funding calls (bandi aperti)
-- Run in CockroachDB SQL shell: \i supabase/migrations/004_funding_calls.sql

CREATE TABLE IF NOT EXISTS funding_calls (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  external_id       text NOT NULL,
  source            text NOT NULL DEFAULT 'seed',
  title             text NOT NULL,
  description       text,
  program           text,
  categories        text[] DEFAULT '{}',
  open_date         date,
  deadline          date,
  budget_total      numeric(18,2),
  status            text NOT NULL DEFAULT 'open',
  url               text,
  ai_explanation    text,
  ai_tips           text[],
  ai_generated_at   timestamptz,
  last_checked_at   timestamptz NOT NULL DEFAULT now(),
  UNIQUE (source, external_id)
);

CREATE INDEX IF NOT EXISTS funding_calls_status_deadline_idx ON funding_calls (status, deadline);
CREATE INVERTED INDEX IF NOT EXISTS funding_calls_categories_idx ON funding_calls (categories);
