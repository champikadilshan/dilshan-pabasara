import { NextResponse } from 'next/server';
import { ensureSchema, getSql } from '@/lib/db';
import type { Wish } from '@/lib/types';

type WishRow = {
  id: number;
  name: string;
  message: string;
  created_at: string;
};

const toWish = (row: WishRow): Wish => ({
  id: row.id,
  name: row.name,
  message: row.message,
  createdAt: new Date(row.created_at).toISOString(),
});

const text = (value: unknown, max: number): string => (typeof value === 'string' ? value.trim().slice(0, max) : '');

export async function GET() {
  const sql = getSql();
  if (!sql) {
    return NextResponse.json({ wishes: [] });
  }

  await ensureSchema(sql);
  const rows = (await sql`
    SELECT id, name, message, created_at FROM wishes ORDER BY created_at DESC LIMIT 50
  `) as WishRow[];

  return NextResponse.json({ wishes: rows.map(toWish) });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  if (text(body.website, 200)) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const name = text(body.name, 60);
  const message = text(body.message, 400);
  if (!name || !message) {
    return NextResponse.json({ error: 'Please add your name and a few words.' }, { status: 400 });
  }

  const sql = getSql();
  if (!sql) {
    return NextResponse.json({ error: 'Wishes are not open yet. Please try again soon.' }, { status: 503 });
  }

  await ensureSchema(sql);
  const rows = (await sql`
    INSERT INTO wishes (name, message) VALUES (${name}, ${message})
    RETURNING id, name, message, created_at
  `) as WishRow[];

  return NextResponse.json({ wish: toWish(rows[0]) }, { status: 201 });
}
