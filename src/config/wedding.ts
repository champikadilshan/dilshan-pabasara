export type ProgrammeItem = {
  time: string;
  title: string;
  note?: string;
};

export type StoryArt = 'camera' | 'lanterns' | 'lotus' | 'rings' | 'register';

export type StoryChapter = {
  /** Small label above the title, e.g. a year or a time. */
  when: string;
  title: string;
  text: string;
  /** Which drawing appears inside the arch frame. */
  art: StoryArt;
};

export const wedding = {
  couple: {
    first: 'Dilshan',
    second: 'Pabasara',
  },
  hosts: 'Mr. & Mrs. Wijepala and Mr. & Mrs. Kurera',
  invitationLine: 'cordially invite you to the marriage of their son and daughter',

  // Sri Lanka time (+05:30). Used by the countdown and calendar links.
  startsAt: '2026-12-11T09:00:00+05:30',
  endsAt: '2026-12-11T16:00:00+05:30',
  dateLabel: 'Friday, 11 December 2026',
  shortDateLabel: '11 · 12 · 2026',
  timeLabel: '09.00 AM onwards',

  venue: {
    name: 'Green Valley Garden Cottage',
    city: 'Waradala',
    mapsUrl: 'https://maps.app.goo.gl/rsAtcScxCtrKjp4i8',
  },

  // Shown under the RSVP heading when set, e.g. 'Kindly respond by 1 December 2026'.
  rsvpDeadlineLabel: '',
  maxGuestsPerRsvp: 10,

  programme: [
    { time: '09.00 AM onwards', title: 'Welcome', note: 'Guests arrive at Green Valley Garden Cottage' },
    { time: '10.10 AM', title: 'Ring Exchange', note: 'Exchanging rings beneath the flower arch' },
    { time: '10.20 AM', title: 'Registration', note: 'Signing the marriage register' },
    { time: 'Afternoon', title: 'Lunch & Celebrations', note: 'Food, music and good company' },
  ] satisfies ProgrammeItem[],

  // Line under the "Our Story in Frames" heading.
  storyLead: 'From behind the camera to forever, one frame at a time.',

  // "Our Story in Frames": drawn arch frames instead of photos.
  // Each chapter picks a drawing with `art`: camera, lanterns, lotus, rings or register.
  story: [
    {
      when: 'Himidiraya · on university',
      title: 'Behind the camera',
      text: 'We met at university during "Himidiraya" event, both volunteering to film the event.',
      art: 'camera',
    },
    {
      when: 'After the event',
      title: 'Getting to know each other',
      text: 'When the event was over, the conversations kept going, and we slowly got to know each other.',
      art: 'lanterns',
    },
    {
      when: 'Today',
      title: 'Life goes on, together',
      text: 'Now we are both graduated and working, and life goes on, with each other by our side.',
      art: 'lotus',
    },
    {
      when: '11 December · 10.10 AM',
      title: 'The rings',
      text: 'We exchange rings in the garden, surrounded by the people we love most.',
      art: 'rings',
    },
    {
      when: '11 December · 10.20 AM',
      title: 'Our signatures',
      text: 'We sign our names together, and the next chapter is ours to write.',
      art: 'register',
    },
  ] satisfies StoryChapter[],

  // Shared Google Photos album ("Collaborate" turned on so guests can add photos).
  // Before opensAt the section shows "opens on the wedding day"; from opensAt the button goes live.
  // To test the button early, open the site with ?album=open. The table-card QR uses /photos, which always
  // forwards to this album.
  photoAlbum: {
    text: 'Every smile, every laugh, every little moment. Add the photos you take on the day to our shared album and help us relive it through your eyes.',
    url: 'https://photos.app.goo.gl/wDXgQX2x9ZHmXUAJ9',
    opensAt: '2026-12-11T00:00:00+05:30',
  },

  // After the wedding: put photos in /public/gallery and list them here,
  // e.g. { src: '/gallery/01.jpg', alt: 'Ring exchange under the arch' }. They appear under the story.
  gallery: [] as { src: string; alt: string }[],

  closingLine: 'Your presence is our greatest gift!',
};

export const coupleNames = `${wedding.couple.first} & ${wedding.couple.second}`;
