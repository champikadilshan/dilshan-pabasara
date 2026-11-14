export type ProgrammeItem = {
  time: string;
  title: string;
  note?: string;
};

export const wedding = {
  couple: {
    first: 'Dilshan',
    second: 'Pabasara',
  },
  hosts: 'Mr. & Mrs. Wijepala and Mr. & Mrs. Kurera',
  invitationLine: 'request the pleasure of your company at the marriage of their son and daughter',

  // Sri Lanka time (+05:30). Used by the countdown and calendar links.
  startsAt: '2026-12-11T09:00:00+05:30',
  endsAt: '2026-12-11T16:00:00+05:30',
  dateLabel: 'Friday, 11 December 2026',
  shortDateLabel: '11 · 12 · 2026',
  timeLabel: '09.00 AM onwards',

  venue: {
    name: 'The Dusk',
    city: 'Negombo',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=The+Dusk+Negombo',
  },

  // Shown under the RSVP heading when set, e.g. 'Kindly respond by 1 December 2026'.
  rsvpDeadlineLabel: '',
  maxGuestsPerRsvp: 10,

  // Placeholder programme: replace with the real timings.
  programme: [
    { time: '09.00 AM', title: 'Welcome', note: 'Guests arrive at The Dusk' },
    { time: 'Auspicious time', title: 'Poruwa Ceremony', note: 'Blessings and traditional rituals' },
    { time: 'Afternoon', title: 'Lunch & Celebrations', note: 'Food, music and dancing' },
  ] satisfies ProgrammeItem[],

  // Put photos in /public/gallery and list them here, e.g. { src: '/gallery/01.jpg', alt: 'Pre-shoot by the sea' }.
  gallery: [] as { src: string; alt: string }[],

  closingLine: 'Your presence is our greatest gift!',
};

export const coupleNames = `${wedding.couple.first} & ${wedding.couple.second}`;
