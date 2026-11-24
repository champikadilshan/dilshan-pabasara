import { guestKey, isAdmin, loadAdminData } from '@/lib/admin';

// Spreadsheet-safe cell: quoted, and formulas neutralised.
const cell = (value: unknown) => {
  let text = value === null || value === undefined ? '' : String(value);
  if (/^[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
};

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await isAdmin())) {
    return new Response('Please log in at /admin first.', { status: 401 });
  }

  const data = await loadAdminData();
  if (!data) {
    return new Response('The database is not connected.', { status: 503 });
  }

  const latestIds = new Set(data.latest.map((row) => row.id));
  const lines = [
    ['Invitation', 'Name given', 'Coming', 'Guests', 'Note', 'Replied at', 'Newest answer for this guest', 'Guest key'],
    ...data.rsvps.map((row) => [
      row.invite_name,
      row.name,
      row.attending ? 'Yes' : 'No',
      row.attending ? row.guests : 0,
      row.message,
      new Date(row.created_at).toISOString(),
      latestIds.has(row.id) ? 'Yes' : 'No',
      guestKey(row),
    ]),
  ].map((fields) => fields.map(cell).join(','));

  return new Response('﻿' + lines.join('\r\n'), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="rsvps.csv"',
      'Cache-Control': 'no-store',
    },
  });
}
