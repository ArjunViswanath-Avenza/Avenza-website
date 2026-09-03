/**
 * Data for the home-page animated dashboard.
 * VERIFIED-DATA POLICY: all figures except "Years avg. experience" (15+, the
 * one real claim from the live site) are PLACEHOLDERS. Replace with client-
 * confirmed numbers before launch — they are isolated here for easy editing and
 * move to the SiteConfiguration table in Phase 5.
 */

export const dashboard = {
  overline: 'Growth & momentum',
  title: 'Building capability, programme by programme.',
  lead: 'A snapshot of how Avenza is scaling its people, delivery and reach — updated as the business grows.',

  // Headline gauge: a 0–100 growth index that animates on scroll.
  gauge: {
    label: 'Team growth',
    caption: 'Indexed to plan',
    value: 100, // [PLACEHOLDER] target of the 0→100 animation
    max: 100,
    suffix: '',
  },

  // Growth trajectory line/area chart. Values are an indexed 0–100 trend.
  trend: {
    title: 'Team growth trajectory',
    unit: 'Growth index',
    points: [8, 16, 24, 33, 44, 57, 71, 85, 100], // [PLACEHOLDER]
    periods: ['’23 H1', '’23 H2', '’24 H1', '’24 H2', '’25 H1', '’25 H2', '’26 H1', '’26 H2', 'Now'],
  },

  // KPI counters that count up on scroll. `barMax` sizes the mini progress bar.
  kpis: [
    { label: 'Ongoing engagements', value: 24, suffix: '+', barMax: 40, verified: false },
    { label: 'Programmes delivered', value: 40, suffix: '+', barMax: 60, verified: false },
    { label: 'Certified specialists', value: 75, suffix: '+', barMax: 100, verified: false },
    { label: 'Years avg. experience', value: 15, suffix: '+', barMax: 20, verified: true },
  ],
} as const;
