-- Reference schema. The API creates these tables automatically on first use (src/lib/db.ts).

CREATE TABLE IF NOT EXISTS rsvps (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  attending BOOLEAN NOT NULL,
  guests INTEGER NOT NULL DEFAULT 0,
  message TEXT,
  invite_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS wishes (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Handy queries for the Neon SQL editor:
-- SELECT * FROM rsvps ORDER BY created_at DESC;
-- SELECT SUM(guests) AS total_guests FROM rsvps WHERE attending;
-- DELETE FROM wishes WHERE id = <id>;  -- remove an unwanted wish
