import { NextResponse } from 'next/server';
import { wedding } from '@/config/wedding';
import { ensureSchema, getSql } from '@/lib/db';

type RsvpBody = {
  name?: unknown;
  attending?: unknown;
  guests?: unknown;
  message?: unknown;
  inviteName?: unknown;
  website?: unknown;
};

const text = (value: unknown, max: number): string => (typeof value === 'string' ? value.trim().slice(0, max) : '');

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as RsvpBody | null;
  if (!body) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot field: real guests never see or fill it.
  if (text(body.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = text(body.name, 80);
  const attending = body.attending === true;
  const guests = attending ? Math.round(Number(body.guests)) : 0;
  const message = text(body.message, 500) || null;
  const inviteName = text(body.inviteName, 60) || null;

  if (!name) {
    return NextResponse.json({ error: 'Please tell us your name.' }, { status: 400 });
  }
  if (typeof body.attending !== 'boolean') {
    return NextResponse.json({ error: 'Please let us know if you can join us.' }, { status: 400 });
  }
  if (attending && (!Number.isFinite(guests) || guests < 1 || guests > wedding.maxGuestsPerRsvp)) {
    return NextResponse.json({ error: 'Please choose the number of guests.' }, { status: 400 });
  }

  const sql = getSql();
  if (!sql) {
    return NextResponse.json({ error: 'RSVPs are not open yet. Please try again soon.' }, { status: 503 });
  }

  await ensureSchema(sql);
  await sql`
    INSERT INTO rsvps (name, attending, guests, message, invite_name)
    VALUES (${name}, ${attending}, ${guests}, ${message}, ${inviteName})
  `;

  return NextResponse.json({ ok: true });
}
