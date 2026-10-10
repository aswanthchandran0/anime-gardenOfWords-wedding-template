export const invitation = {
  partnerOne: 'TAKAO',
  partnerTwo: 'YUKI',
  tagline: 'Two Souls · One Journey',
  coverQuote: 'Even in the rain, I found you.',
  families: 'Together with their families',
  invitationLine: 'You are cordially invited to celebrate the wedding of',
  quote: 'Some gardens only bloom when two people stand in the same rain.',
  weddingDate: '2027-01-01T11:00:00+05:30',
  displayDate: 'Date to be announced',
  venue: 'Venue to be announced',
  rsvpBy: '2026-12-01T23:59:59+05:30',
  musicSrc: null, // set to '/music/theme.mp3' to enable

  reception: {
  eyebrow: 'Save the Date',
  title: 'Wedding Reception',
  year: '2026',
  description:
    'An evening of quiet celebration — good food, soft music, and the people we love gathered in one room.',
  verse:
    'Two lives, one garden. Two hearts, one rain. Walk with us into the next chapter.',
  weekday: 'Saturday',
  day: '14',
  month: 'February',
  year2: '2026',
  time: '6:00 PM onwards',
  venue: 'The Garden Pavilion',
  address: 'Address to be announced',
},

countdown: {
  eyebrow: 'The Celebration Begins In',
  title: 'Counting Down',
  // Fallback if you want to test with a near date — swap when real date is set.
  // Leave as null to use `weddingDate` above.
  overrideTarget: null,
  labels: {
    days: 'Days',
    hours: 'Hours',
    minutes: 'Mins ',
    seconds: ' Secs',
  },
  footer: 'Until we say "I do"',
},

celebration: {
  eyebrow: 'Join Us',
  title: 'The Celebration',
  verse:
    'Where the garden meets the rain, and the people we love gather under one soft roof.',
  description:
    'Dinner, music, and quiet celebration — a small gathering of the people who shaped us into the pair we are today.',
  venueName: 'The Garden Pavilion',
  venueLine: 'By the still pond, at the edge of the maple grove',
  addressLine1: 'Address to be announced',
  addressLine2: 'City · State · PIN',
  mapLabel: 'View on map',
  mapHref: '#', // swap with a real maps link later
},


schedule: {
  eyebrow: 'Mark Your Calendar',
  weekday: 'Saturday',
  day: '14',
  month: 'February',
  year: '2026',
  eventName: 'Wedding Reception',
  timeLabel: 'Celebration Begins',
  time: '6:00 PM onwards',
  venueLabel: 'Venue',
  venueName: 'The Garden Pavilion',
  venueLine: 'By the still pond, at the edge of the maple grove',
  addressLine1: 'Address to be announced',
  addressLine2: 'City · State · PIN',
  // Location link — swap with a real maps link later, or null to hide
  mapHref: 'https://www.google.com/maps/search/',
  // Calendar data (used by the "Add to Calendar" button)
  calendar: {
    title: 'Wedding Reception — Partner One & Partner Two',
    description: 'Join us for the celebration.',
    location: 'The Garden Pavilion',
    // ISO with explicit offset — start / end in IST
    start: '2027-01-01T18:00:00+05:30',
    end:   '2027-01-01T23:00:00+05:30',
  },
},

gallery: {
  eyebrow: 'Moments',
  title: 'Our Story So Far',
  verse: 'Small frames from the life we\'ve been quietly building.',
  // Add as many as you like. `src` is the imported image module.
  // `alt` describes the photo for screen readers (empty string = decorative).
  // `caption` is optional — shown under the photo in the lightbox.
  photos: [
    { key: 'g1', src: null, alt: 'Photo 1', caption: '' },
    { key: 'g2', src: null, alt: 'Photo 2', caption: '' },
    { key: 'g3', src: null, alt: 'Photo 3', caption: '' },
    { key: 'g4', src: null, alt: 'Photo 4', caption: '' },
    { key: 'g5', src: null, alt: 'Photo 5', caption: '' },
    { key: 'g6', src: null, alt: 'Photo 6', caption: '' },
  ],
},

closing: {
  eyebrow: 'Thank You',
  title: 'With Love',
  message:
    'Thank you for being part of our story. Your presence — near or far — means more to us than words can hold.',
  signature: 'TAKAO & YUKI',
  // The credit block. Set `href` to your Everloom URL when ready.
  credit: {
    prefix: 'Designed & developed by',
    name: 'Everloom',
    href: 'https://everloom-ruby.vercel.app/', // swap with your real URL
  },
},

video: {
  eyebrow: 'A Glimpse',
  title: 'A Moment in Motion',
  caption: 'A short film from the day we said yes.',
  hasAudio: true,
},
};