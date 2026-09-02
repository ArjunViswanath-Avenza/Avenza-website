/**
 * Seed thought-leadership content. In Phase 5 this moves to the Insight table
 * (admin-managed). Content is generic point-of-view — no client names, no
 * invented metrics.
 */
export type InsightType = 'Article' | 'Whitepaper' | 'Point of View' | 'Report';

export type Insight = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  type: InsightType;
  readMinutes: number;
  date: string;
  featured?: boolean;
  body: string[];
};

export const insightCategories = [
  'Core Banking',
  'Temenos',
  'Payments',
  'AI',
  'Migration',
  'Testing',
  'Engineering',
  'Cloud',
  'Regulatory Technology',
];

export const insights: Insight[] = [
  {
    slug: 'modernising-the-core-without-a-big-bang',
    title: 'Modernising the core without a big-bang gamble',
    excerpt:
      'Why continuity-first, incremental core modernisation beats rip-and-replace — and how to sequence it so the business never stops.',
    category: 'Core Banking',
    type: 'Point of View',
    readMinutes: 6,
    date: '2026-07-14',
    featured: true,
    body: [
      'Every bank carrying a legacy core faces the same tension: the platform that runs the business is also the thing holding it back. The instinct to replace it wholesale is understandable — and usually wrong.',
      'A continuity-first approach treats modernisation as a sequenced programme rather than a single event. Each increment is assessed, designed, transformed and validated before the next begins, so risk is retired steadily rather than concentrated at one catastrophic go-live.',
      'The discipline that makes this work is evidence: automated testing, reconciliation and rehearsal at every step. Modernisation stops being a leap of faith and becomes a measured, reversible sequence of controlled changes.',
    ],
  },
  {
    slug: 'de-risking-temenos-upgrades',
    title: 'De-risking Temenos upgrades: the customisation-impact problem',
    excerpt:
      'Upgrades stall because the impact on years of customisation is unknown. A structured assessment turns the unknown into a plan.',
    category: 'Temenos',
    type: 'Whitepaper',
    readMinutes: 9,
    date: '2026-06-02',
    featured: true,
    body: [
      'The single biggest reason banks defer platform upgrades is not cost — it is uncertainty. Years of customisation create an impact surface that nobody fully understands, so the safe-looking choice is to wait.',
      'Waiting compounds the problem. Each deferred upgrade widens the gap to current platform capability and increases the eventual effort.',
      'A structured customisation-impact assessment inventories what has changed, maps it against the target release, and produces a concrete, sized plan — converting an open-ended risk into a scheduled piece of work.',
    ],
  },
  {
    slug: 'ai-in-banking-engineering-human-in-the-loop',
    title: 'AI in banking engineering: why the human stays in the loop',
    excerpt:
      'AI can accelerate conversion, documentation and testing dramatically. In banking, the value only holds if an expert validates every output.',
    category: 'AI',
    type: 'Point of View',
    readMinutes: 5,
    date: '2026-05-19',
    featured: false,
    body: [
      'AI is genuinely transformative for the repetitive parts of banking engineering — code conversion, documentation, test generation, migration analysis. The productivity gains are real.',
      'But banking has a property most software does not: an undetected defect is a regulatory, financial or reputational event. That raises the bar on quality assurance beyond what an unsupervised model should carry.',
      'The answer is not to avoid AI, nor to trust it blindly. It is a human-in-the-loop pipeline where AI proposes and a certified engineer disposes — every output reviewed before it lands.',
    ],
  },
  {
    slug: 'what-separates-a-clean-migration',
    title: 'What separates a clean migration from a painful one',
    excerpt:
      'Migrations fail on the details — data quality, reconciliation and an under-rehearsed cutover. Here is where to invest first.',
    category: 'Migration',
    type: 'Article',
    readMinutes: 7,
    date: '2026-04-08',
    featured: false,
    body: [
      'Ask anyone who has run a core migration what went wrong, and the answer is rarely the headline technology. It is the data — quality, mapping, reconciliation — and a cutover that was not rehearsed enough.',
      'The banks that migrate cleanly invest early in data profiling and remediation, before mapping begins. They treat reconciliation as a first-class deliverable with full traceability, not a final check.',
      'And they rehearse the cutover until go-live is boring. A migration that reconciles and a cutover that has been run before are the two things that turn a high-anxiety event into a controlled one.',
    ],
  },
];

export const getInsight = (slug: string) => insights.find((i) => i.slug === slug);
