import { coupleNames, wedding } from '@/config/wedding';

const toCalendarStamp = (iso: string): string =>
  new Date(iso)
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '');

const title = `Wedding of ${coupleNames}`;
const location = `${wedding.venue.name}, ${wedding.venue.city}`;
const details = `${wedding.hosts} ${wedding.invitationLine}.`;

export function googleCalendarUrl(): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${toCalendarStamp(wedding.startsAt)}/${toCalendarStamp(wedding.endsAt)}`,
    location,
    details,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

const escapeIcs = (value: string): string => value.replace(/([,;\\])/g, '\\$1');

export function icsFile(): string {
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//dilshan-pabasara//wedding//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    'UID:wedding-dilshan-pabasara-20261211',
    `DTSTAMP:${toCalendarStamp(new Date().toISOString())}`,
    `DTSTART:${toCalendarStamp(wedding.startsAt)}`,
    `DTEND:${toCalendarStamp(wedding.endsAt)}`,
    `SUMMARY:${escapeIcs(title)}`,
    `LOCATION:${escapeIcs(location)}`,
    `DESCRIPTION:${escapeIcs(details)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}
