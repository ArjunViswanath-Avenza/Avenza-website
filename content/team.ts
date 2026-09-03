export type Leader = {
  slug: string;
  name: string;
  role: string;
  badge?: string; // e.g. "Co-Founder"
  initials: string;
  photo: string; // /team/<slug>.jpg — drop the file to replace the monogram
  focus: string; // one-line remit, shown on the card
};

/**
 * Avenza leadership. Photos live in /public/team as <slug>.jpg — until a file is
 * present, the card renders a branded monogram. See /public/team/README.md.
 * Order preserves the photos supplied (Mahesh, Ratnadeep, Gopinath).
 */
export const leadership: Leader[] = [
  {
    slug: 'mahesh-dutt-kolar',
    name: 'Mahesh Dutt Kolar',
    role: 'Chief Executive Officer',
    initials: 'MK',
    photo: '/team/mahesh-dutt-kolar.png',
    focus: 'Sets the vision and holds the bar for how Avenza delivers.',
  },
  {
    slug: 'ratnadeep-mukherjee',
    name: 'Ratnadeep Mukherjee',
    role: 'Co-Founder & Chief Revenue Officer',
    initials: 'RM',
    photo: '/team/ratnadeep-mukherjee.png',
    focus: 'Builds the relationships and growth engine behind the business.',
  },
  {
    slug: 'gopinath-chandra',
    name: 'Gopinath Chandra',
    role: 'Chief Operating Officer',
    initials: 'GC',
    photo: '/team/gopinath-chandran.png',
    focus: 'Turns strategy into dependable, day-to-day delivery.',
  },
];
