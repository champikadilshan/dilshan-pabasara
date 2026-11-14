import { neon, type NeonQueryFunction } from '@neondatabase/serverless';

type Sql = NeonQueryFunction<false, false>;

let schemaReady: Promise<void> | null = null;

/** Returns a Neon client, or null when DATABASE_URL is not configured (e.g. local dev without a database). */
export function getSql(): Sql | null {
  const url = process.env.DATABASE_URL;
  return url ? neon(url) : null;
}

/** Creates the tables on first use so a fresh Neon database works without a migration step. */
export function ensureSchema(sql: Sql): Promise<void> {
  schemaReady ??= (async () => {
    await sql`
      CREATE TABLE IF NOT EXISTS rsvps (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        attending BOOLEAN NOT NULL,
        guests INTEGER NOT NULL DEFAULT 0,
        message TEXT,
        invite_name TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS wishes (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
  })().catch((error: unknown) => {
    schemaReady = null;
    throw error;
  });

  return schemaReady;
}
