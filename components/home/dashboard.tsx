'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion, motion } from 'framer-motion';
import { TrendingUp, Activity, Users, Layers } from 'lucide-react';
import { dashboard } from '@/content/dashboard';

/* ---------------- count-up hook ---------------- */
function useCountUp(target: number, active: boolean, reduced: boolean, duration = 1.7) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setValue(target);
      return;
    }
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [active, target, reduced, duration]);
  return value;
}

/* ---------------- smooth SVG path (Catmull-Rom → bezier) ---------------- */
function smoothPath(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return '';
  const d = [`M ${pts[0].x} ${pts[0].y}`];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d.push(`C ${c1x} ${c1y} ${c2x} ${c2y} ${p2.x} ${p2.y}`);
  }
  return d.join(' ');
}

const kpiIcons = [Activity, Layers, Users, TrendingUp];

export function Dashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });
  const prefersReduced = useReducedMotion();

  // `?nosmooth` renders the settled state immediately (used for tests/screenshots).
  const [isStatic] = useState(
    () => typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('nosmooth'),
  );
  const active = inView || isStatic;
  const reduced = !!prefersReduced || isStatic;

  return (
    <section ref={ref} className="section relative overflow-hidden border-t border-line">
      <div
        className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full blur-[130px]"
        style={{ background: 'radial-gradient(circle, rgba(242,133,0,0.16), transparent 70%)' }}
      />
      <div className="container-avz relative">
        <div className="max-w-2xl">
          <div className="overline mb-4 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              {!reduced && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-75" />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-600" />
            </span>
            {dashboard.overline}
          </div>
          <h2 className="text-h2 text-balance">{dashboard.title}</h2>
          <p className="text-lead mt-4">{dashboard.lead}</p>
        </div>

        {/* Dashboard surface */}
        <div className="mt-12 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <GaugeCard active={active} reduced={reduced} />
          <TrendCard active={active} reduced={reduced} />
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {dashboard.kpis.map((k, i) => (
            <KpiTile key={k.label} kpi={k} icon={kpiIcons[i]} active={active} reduced={reduced} delay={i * 0.12} />
          ))}
        </div>

        <p className="mt-6 text-xs text-fg-faint">Figures indicative and updated as the business grows.</p>
      </div>
    </section>
  );
}

/* ---------------- radial gauge ---------------- */
function GaugeCard({ active, reduced }: { active: boolean; reduced: boolean }) {
  const { value, max, label, caption, suffix } = dashboard.gauge;
  const display = useCountUp(value, active, reduced);

  const R = 78;
  const C = 2 * Math.PI * R;
  const frac = Math.min(1, value / max);
  const offset = active ? C * (1 - frac) : C;

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-line bg-elevated p-8">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-[0.12]" />
      <div className="relative">
        <svg width="200" height="200" viewBox="0 0 200 200" className="-rotate-90">
          <defs>
            <linearGradient id="gauge-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--brand-400)" />
              <stop offset="100%" stopColor="var(--brand-600)" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r={R} fill="none" stroke="var(--border-strong)" strokeWidth="12" />
          <circle
            cx="100"
            cy="100"
            r={R}
            fill="none"
            stroke="url(#gauge-grad)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={offset}
            style={{ transition: reduced ? undefined : 'stroke-dashoffset 1.8s cubic-bezier(0.22,1,0.36,1)' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="font-display text-5xl font-semibold text-fg">
            {Math.round(display)}
            <span className="text-brand-600">{suffix}</span>
          </div>
          <div className="mt-1 text-xs text-fg-muted">{caption}</div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <div className="text-base font-semibold text-fg">{label}</div>
      </div>
    </div>
  );
}

/* ---------------- growth trajectory chart ---------------- */
function TrendCard({ active, reduced }: { active: boolean; reduced: boolean }) {
  const { title, unit, points, periods } = dashboard.trend;

  const W = 520;
  const H = 220;
  const padX = 8;
  const padTop = 16;
  const padBottom = 28;
  const max = Math.max(...points);

  const coords = useMemo(
    () =>
      points.map((p, i) => ({
        x: padX + (i / (points.length - 1)) * (W - padX * 2),
        y: padTop + (1 - p / max) * (H - padTop - padBottom),
      })),
    [points, max],
  );

  const line = smoothPath(coords);
  const area = `${line} L ${coords[coords.length - 1].x} ${H - padBottom} L ${coords[0].x} ${H - padBottom} Z`;
  const last = coords[coords.length - 1];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-elevated p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-fg">{title}</div>
          <div className="font-mono text-xs text-fg-muted">{unit}</div>
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-600/30 bg-brand-600/10 px-2.5 py-1 text-xs font-medium text-brand-600">
          <TrendingUp className="h-3.5 w-3.5" /> Trending up
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="none" role="img" aria-label={title}>
        <defs>
          <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--brand-500)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--brand-500)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0.25, 0.5, 0.75].map((g) => (
          <line
            key={g}
            x1={padX}
            x2={W - padX}
            y1={padTop + g * (H - padTop - padBottom)}
            y2={padTop + g * (H - padTop - padBottom)}
            stroke="var(--border-hairline)"
            strokeWidth="1"
          />
        ))}

        <path
          d={area}
          fill="url(#area-grad)"
          style={{ opacity: active ? 1 : 0, transition: reduced ? undefined : 'opacity 1.2s ease 0.5s' }}
        />

        <path
          d={line}
          fill="none"
          stroke="var(--brand-600)"
          strokeWidth="2.5"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={active ? 0 : 1}
          style={{ transition: reduced ? undefined : 'stroke-dashoffset 1.8s cubic-bezier(0.22,1,0.36,1)' }}
        />

        <circle
          cx={last.x}
          cy={last.y}
          r="4.5"
          fill="var(--brand-600)"
          stroke="var(--bg-elevated)"
          strokeWidth="2"
          style={{ opacity: active ? 1 : 0, transition: reduced ? undefined : 'opacity 0.4s ease 1.6s' }}
        />
      </svg>

      <div className="mt-1 flex justify-between font-mono text-[0.6rem] text-fg-faint">
        {periods.map((p) => (
          <span key={p}>{p}</span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- KPI tile ---------------- */
function KpiTile({
  kpi,
  icon: Icon,
  active,
  reduced,
  delay,
}: {
  kpi: { label: string; value: number; suffix: string; barMax: number };
  icon: typeof Activity;
  active: boolean;
  reduced: boolean;
  delay: number;
}) {
  const display = useCountUp(kpi.value, active, reduced);
  const pct = Math.min(100, (kpi.value / kpi.barMax) * 100);

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: reduced ? 0 : delay }}
      className="flex flex-col rounded-2xl border border-line bg-elevated p-5"
    >
      <Icon className="h-5 w-5 text-brand-600" />
      <div className="mt-4 font-display text-4xl font-semibold text-fg">
        {Math.round(display)}
        <span className="text-brand-600">{kpi.suffix}</span>
      </div>
      <div className="mt-1 text-sm text-fg-muted">{kpi.label}</div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-line-strong">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-600"
          style={{
            width: active ? `${pct}%` : '0%',
            transition: reduced ? undefined : `width 1.5s cubic-bezier(0.22,1,0.36,1) ${delay + 0.2}s`,
          }}
        />
      </div>
    </motion.div>
  );
}
