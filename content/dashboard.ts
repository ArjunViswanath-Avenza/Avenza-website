/**
 * Data for the home-page animated dashboard.
 * VERIFIED (client-confirmed): company founded January 2025; current team = 105
 * (Sep 2026); target = 200; years avg. experience = 15+.
 * The interim MONTHLY values between the Jan-2025 start and today are an
 * illustrative growth ramp to the verified 105; the projection ramps to the
 * verified 200. Replace interim months with real headcounts when available.
 * Moves to SiteConfiguration in Phase 5.
 */

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const mlabel = (y: number, m: number) => `${MONTHS[m]} ’${String(y).slice(2)}`;

export type TrendPoint = {
  label: string;
  value: number;
  kind: 'history' | 'projection';
  isNow?: boolean;
  isTarget?: boolean;
  tick?: boolean;
};

const START = { y: 2025, m: 0 }; // January 2025 — company founded
const NOW = { y: 2026, m: 8 }; // September 2026 — 105 team members
const START_VALUE = 7;
const NOW_VALUE = 105;
const TARGET_VALUE = 200;
const PROJECTION_MONTHS = 15; // months of forward projection to reach the target

const histCount = (NOW.y - START.y) * 12 + (NOW.m - START.m) + 1;

const history: TrendPoint[] = Array.from({ length: histCount }, (_, i) => {
  const y = START.y + Math.floor((START.m + i) / 12);
  const m = (START.m + i) % 12;
  const t = histCount === 1 ? 1 : i / (histCount - 1);
  const eased = Math.pow(t, 1.12); // gentle hiring acceleration
  return {
    label: mlabel(y, m),
    value: i === histCount - 1 ? NOW_VALUE : Math.round(START_VALUE + (NOW_VALUE - START_VALUE) * eased),
    kind: 'history',
    isNow: i === histCount - 1,
  };
});

const projection: TrendPoint[] = Array.from({ length: PROJECTION_MONTHS }, (_, j) => {
  const idx = j + 1;
  const y = NOW.y + Math.floor((NOW.m + idx) / 12);
  const m = (NOW.m + idx) % 12;
  const t = idx / PROJECTION_MONTHS;
  const isTarget = j === PROJECTION_MONTHS - 1;
  return {
    label: isTarget ? 'Target' : mlabel(y, m),
    value: isTarget ? TARGET_VALUE : Math.round(NOW_VALUE + (TARGET_VALUE - NOW_VALUE) * t),
    kind: 'projection',
    isTarget,
  };
});

const series: TrendPoint[] = [...history, ...projection];
const nowIndex = history.length - 1;
const targetIndex = series.length - 1;

// Choose a readable subset of axis labels (every ~5 months + Now + Target).
const ticks = new Set<number>([0, nowIndex, targetIndex]);
for (let k = 5; k < series.length; k += 5) ticks.add(k);
[nowIndex - 1, nowIndex + 1, targetIndex - 1].forEach((x) => ticks.delete(x)); // de-clutter
series.forEach((p, i) => (p.tick = ticks.has(i)));

export const dashboard = {
  overline: 'Growth & momentum',
  title: 'A team of 105, growing toward 200.',
  lead: 'Founded in January 2025, Avenza is scaling deliberately — deepening banking and engineering capability month over month as we grow toward a 200-strong team.',

  gauge: {
    label: 'Team members',
    caption: 'of 200 target',
    value: NOW_VALUE,
    max: TARGET_VALUE,
    suffix: '',
  },

  trend: {
    title: 'Headcount growth',
    unit: 'Team members · monthly since Jan ’25',
    max: 210,
    target: TARGET_VALUE,
    series,
    nowIndex,
    targetIndex,
  },

  kpis: [
    { label: 'Headcount target', value: 200, suffix: '', barMax: 200, verified: true },
    { label: 'Years avg. experience', value: 15, suffix: '+', barMax: 20, verified: true },
    { label: 'Growth to goal', value: 53, suffix: '%', barMax: 100, verified: true }, // 105/200
  ],
};
