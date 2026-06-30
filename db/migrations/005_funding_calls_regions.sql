-- Add regions column to funding_calls: empty array = national/EU-wide, populated = region-specific
ALTER TABLE funding_calls ADD COLUMN IF NOT EXISTS regions text[] DEFAULT '{}';
CREATE INVERTED INDEX IF NOT EXISTS funding_calls_regions_idx ON funding_calls (regions);
