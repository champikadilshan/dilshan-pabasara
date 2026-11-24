import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { ensureSchema, getSql } from '@/lib/db';

/*
 * Admin access for /admin. The password lives in the ADMIN_PASSWORD environment variable (set it in Vercel),
 * never in the code. After logging in, the browser keeps a signed cookie for 14 days.
 */

export const adminCookieName = 'gv_admin';
export const adminCookieMaxAge = 60 * 60 * 24 * 14;

const sign = (password: string) => createHmac('sha256', password).update('dilshan-pabasara-admin-v1').digest('hex');

const same = (a: string, b: string) => {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
};

export const adminConfigured = () => Boolean(process.env.ADMIN_PASSWORD);

export function passwordMatches(input: string): boolean {
  const password = process.env.ADMIN_PASSWORD;
  return Boolean(password) && same(sign(input), sign(password!));
}

export function sessionValue(): string {
  return sign(process.env.ADMIN_PASSWORD ?? '');
}

export async function isAdmin(): Promise<boolean> {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  const value = (await cookies()).get(adminCookieName)?.value;
  return Boolean(value) && same(value!, sign(password));
}

export type RsvpRow = {
  id: number;
  name: string;
  attending: boolean;
  guests: number;
  message: string | null;
  invite_name: string | null;
  created_at: string | Date;
};

export type WishRow = {
  id: number;
  name: string;
  message: string;
  created_at: string | Date;
};

export type LatestRsvp = RsvpRow & { replies: number };

/** Everything the admin page needs, or null when the database is not connected. */
export async function loadAdminData() {
  const sql = getSql();
  if (!sql) return null;

  await ensureSchema(sql);
  const [rsvpRows, wishRows] = await Promise.all([
    sql`SELECT id, name, attending, guests, message, invite_name, created_at FROM rsvps ORDER BY created_at DESC, id DESC`,
    sql`SELECT id, name, message, created_at FROM wishes ORDER BY created_at DESC, id DESC`,
  ]);
  const rsvps = rsvpRows as RsvpRow[];
  const wishes = wishRows as WishRow[];

  const latest = latestPerGuest(rsvps);
  const coming = latest.filter((row) => row.attending);

  return {
    rsvps,
    wishes,
    latest,
    totals: {
      replies: latest.length,
      accepted: coming.length,
      declined: latest.length - coming.length,
      people: coming.reduce((sum, row) => sum + Number(row.guests), 0),
    },
  };
}

/**
 * One row per guest: the newest reply wins. Guests are matched by the name in their personal link
 * (?guest=…), or by the name they typed when they came without one.
 */
export function latestPerGuest(rows: RsvpRow[]): LatestRsvp[] {
  const byGuest = new Map<string, LatestRsvp>();
  for (const row of rows) {
    const key = guestKey(row);
    const seen = byGuest.get(key);
    if (seen) seen.replies += 1;
    else byGuest.set(key, { ...row, replies: 1 });
  }
  return [...byGuest.values()];
}

export const guestKey = (row: Pick<RsvpRow, 'invite_name' | 'name'>) =>
  (row.invite_name || row.name).trim().toLowerCase().replace(/\s+/g, ' ');

const timeFormat = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Colombo',
  day: 'numeric',
  month: 'short',
  hour: 'numeric',
  minute: '2-digit',
});

export const formatTime = (value: string | Date) => timeFormat.format(new Date(value));
