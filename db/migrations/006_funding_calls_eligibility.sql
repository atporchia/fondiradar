-- Add per-applicant amount range and eligibility criteria to funding_calls.
-- budget_total is the whole program's pot; amount_min/amount_max is what a
-- single applicant can realistically receive.
ALTER TABLE funding_calls ADD COLUMN IF NOT EXISTS amount_min numeric(18,2);
ALTER TABLE funding_calls ADD COLUMN IF NOT EXISTS amount_max numeric(18,2);
ALTER TABLE funding_calls ADD COLUMN IF NOT EXISTS eligibility text[] DEFAULT '{}';
