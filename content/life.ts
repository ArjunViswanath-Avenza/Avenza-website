/** Latest trip — featured at the very top of /life. */
export const yercaud = {
  tag: 'Just back from',
  title: 'Yercaud',
  subtitle: 'Above the clouds, off the clock — the team’s latest escape to the hills.',
  video: '/life/yercaud-video.mp4',
  photos: [
    '/life/yercaud-1.jpeg',
    '/life/yercaud-2.jpeg',
    '/life/yercaud-3.jpeg',
    '/life/yercaud-4.jpeg',
    '/life/yercaud-5.jpeg',
    '/life/yercaud-6.jpeg',
    '/life/yercaud-7.jpeg',
    '/life/yercaud-8.jpeg',
    '/life/yercaud-9.jpeg',
    '/life/yercaud-10.jpeg',
  ],
  stayHeading: 'From hilltop views to DJ nights.',
  stayBody:
    'Our Yercaud resort stay had the full spread — team games on the lawn, views that stopped every conversation mid-sentence, food we’re honestly still talking about, and DJ nights that ran well past bedtime. Two days of proper team time, and not a single meeting in sight.',
  highlights: ['🎲 Team games', '🏔️ Hilltop views', '🍽️ Amazing food', '🎧 DJ nights'],
};

export const lifeIntro = {
  overline: 'Life @ Avenza',
  title: 'Serious about banking. Not so serious about ourselves.',
  lead: 'We build critical banking technology — and we have a good time doing it. Here’s a look at the people, the moments and the mischief behind Avenza.',
};

/** Filter categories (themes are grouped under these). */
export const lifeCategories = ['Celebrations', 'Milestones', 'Offsites', 'Learning', 'Sports & fun'] as const;
export type LifeCategory = (typeof lifeCategories)[number];

/** How each group of photos relates — shown above each collage. */
export const categoryEmoji: Record<LifeCategory, string> = {
  Celebrations: '🎉',
  Milestones: '🏆',
  Offsites: '🏝️',
  Learning: '💡',
  'Sports & fun': '⚽',
};

export const categoryBlurbs: Record<LifeCategory, string> = {
  Celebrations: 'Any excuse for cake — birthdays, festivals and the days that matter.',
  Milestones: 'The moments that mark how far we’ve come.',
  Offsites: 'When the whole crew gets out of the office.',
  Learning: 'Sharing what we know, learning what we don’t.',
  'Sports & fun': 'Game on — and nobody holds back.',
};

/** A single photo with its own handwritten-style caption. */
export type Snapshot = { src: string; caption: string };

/** A themed event with its own set of photos, shown as a collage. */
export type LifeTheme = {
  id: string;
  title: string;
  subtitle: string;
  category: LifeCategory;
  emoji: string;
  photos: Snapshot[];
};

export const themes: LifeTheme[] = [
  {
    id: 'founders-day',
    title: 'Founders’ Day',
    subtitle: 'Where it all began — and how far we’ve come.',
    category: 'Milestones',
    emoji: '🎉',
    photos: [
      { src: '/life/FoundersDay_1.jpg', caption: 'where it all began' },
      { src: '/life/FoundersDay_2.jpg', caption: 'the OG crew' },
      { src: '/life/FoundersDay_3.jpg', caption: 'cheers to us 🥂' },
      { src: '/life/FoundersDay_4.jpg', caption: 'big dreams, day one' },
    ],
  },
  {
    id: 'company-registration',
    title: 'Company Registration',
    subtitle: 'The day Avenza became official.',
    category: 'Milestones',
    emoji: '📜',
    photos: [
      { src: '/life/Company_Registration_1.jpg', caption: 'made it official' },
      { src: '/life/Company_Registration_2.png', caption: 'signed & sealed ✍️' },
    ],
  },
  {
    id: 'hyderabad-outing',
    title: 'Hyderabad Team Outing',
    subtitle: 'Out of the office, into the fun.',
    category: 'Offsites',
    emoji: '🏝️',
    photos: [
      { src: '/life/Hyderabad_Team_Outing.jpg', caption: 'out of office 🏝️' },
      { src: '/life/Hyderabad_Team_Outing_2.jpg', caption: 'zero standups today' },
      { src: '/life/Hyderabad_Team_Outing_3.jpg', caption: 'found the whole squad' },
      { src: '/life/Hyderabad_Team_Outing_4.jpg', caption: 'golden hour gang' },
    ],
  },
  {
    id: 'chennai-outing',
    title: 'Chennai Outing',
    subtitle: 'Team time, Chennai edition.',
    category: 'Offsites',
    emoji: '🌴',
    photos: [
      { src: '/life/Chennai_Outing_1.jpg', caption: 'Chennai vibes 🌴' },
      { src: '/life/Chennai_Outing_2.jpg', caption: 'squad on tour' },
    ],
  },
  {
    id: 'turf',
    title: 'Turf Nights',
    subtitle: 'Game on — bragging rights included.',
    category: 'Sports & fun',
    emoji: '⚽',
    photos: [
      { src: '/life/Turf_1.jpg', caption: 'game on ⚽' },
      { src: '/life/Turf_2.jpg', caption: 'no mercy' },
      { src: '/life/Turf_3.jpg', caption: 'winners’ circle 🏆' },
    ],
  },
  {
    id: 'tech-days',
    title: 'Tech Days',
    subtitle: 'Sharing what we know, learning what we don’t.',
    category: 'Learning',
    emoji: '💡',
    photos: [
      { src: '/life/TechDays_1.jpg', caption: 'nerding out 💡' },
      { src: '/life/TechDays_2.png', caption: 'demo day!' },
    ],
  },
  {
    id: 'birthdays',
    title: 'Birthdays',
    subtitle: 'Cake, candles and the occasional surprise.',
    category: 'Celebrations',
    emoji: '🎂',
    photos: [
      { src: '/life/Birthdays_1.jpg', caption: 'make a wish 🎂' },
      { src: '/life/Birthdays_2.jpg', caption: 'cake > meetings' },
      { src: '/life/Birthdays_3.jpg', caption: 'surprise!' },
      { src: '/life/Birthdays_4.jpg', caption: 'one more candle' },
      { src: '/life/Birthdays_5.jpg', caption: 'team = family' },
    ],
  },
  {
    id: 'womens-day',
    title: 'Women’s Day',
    subtitle: 'Celebrating the women who power Avenza.',
    category: 'Celebrations',
    emoji: '💐',
    photos: [
      { src: '/life/WomensDay_1.jpg', caption: 'she runs it 💐' },
      { src: '/life/WomensDay_2.jpg', caption: 'powerhouse' },
      { src: '/life/WomensDay_3.jpg', caption: 'cheers to her' },
    ],
  },
  {
    id: 'christmas',
    title: 'Festive Season',
    subtitle: 'Deck the halls, Avenza style.',
    category: 'Celebrations',
    emoji: '🎄',
    photos: [
      { src: '/life/Christmas_1.jpg', caption: 'ho ho ho 🎄' },
      { src: '/life/Christmas_2.jpg', caption: 'secret santa loot' },
    ],
  },
  {
    id: 'pooja',
    title: 'Pooja',
    subtitle: 'Blessings before the big days.',
    category: 'Celebrations',
    emoji: '🪔',
    photos: [
      { src: '/life/Pooja_1.jpg', caption: 'blessings first 🪔' },
      { src: '/life/Pooja_2.jpg', caption: 'good vibes only' },
    ],
  },
];

/** Featured slides for the top carousel — real photos with a title + subtitle. */
export type Slide = { id: string; title: string; subtitle: string; image: string; emoji: string };

export const carousel: Slide[] = [
  { id: 'founders-day', title: 'Where it all began', subtitle: 'Same dream, better snacks — the day Avenza was born.', image: '/life/FoundersDay_1.jpg', emoji: '🎉' },
  { id: 'hyderabad', title: 'Out of office, fully offline', subtitle: 'Sun, snacks and exactly zero standups — the whole team, unplugged.', image: '/life/Hyderabad_Team_Outing.jpg', emoji: '🏝️' },
  { id: 'turf', title: 'Cleats on, laptops off', subtitle: 'Friendly matches, unfriendly tackles — bragging rights firmly on the line.', image: '/life/Turf_1.jpg', emoji: '⚽' },
  { id: 'womens-day', title: 'The women who run the show', subtitle: 'Powering Avenza, one brilliant idea (and zero excuses) at a time.', image: '/life/WomensDay_1.jpg', emoji: '💐' },
  { id: 'tech-days', title: 'Nerding out, proudly', subtitle: 'Where “did you try turning it off and on again?” counts as a love language.', image: '/life/TechDays_1.jpg', emoji: '💡' },
  { id: 'christmas', title: 'Deck the halls, ship the code', subtitle: 'Fairy lights, secret santa and just the right amount of chaos.', image: '/life/Christmas_1.jpg', emoji: '🎄' },
];
