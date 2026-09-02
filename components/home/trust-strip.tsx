import { ShieldCheck, Landmark, BadgeCheck, Workflow, Boxes, BrainCircuit } from 'lucide-react';
import { Reveal } from '@/components/primitives/reveal';
import { metrics } from '@/config/site';

const icons = [Landmark, ShieldCheck, BadgeCheck, Workflow, Boxes, BrainCircuit];

const points = [
  'Deep core-banking domain expertise',
  'Specialised Temenos capability',
  'Certified banking-technology professionals',
  'Proven, repeatable delivery methodology',
  'Proprietary accelerators & IP',
  'AI-enabled transformation',
];

export function TrustStrip() {
  return (
    <section className="relative border-y border-line bg-ink-950/40">
      <div className="container-avz py-14">
        {/* One real, verified proof point highlighted; the rest are qualitative. */}
        <Reveal className="mb-10 flex flex-col items-start gap-2 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-xl text-lg text-fg-secondary">
            The kind of team you would trust with a critical banking transformation.
          </p>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-4xl font-semibold text-fg">{metrics.avgExperienceYears.value}</span>
            <span className="text-sm text-fg-muted">{metrics.avgExperienceYears.label}</span>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
          {points.map((p, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={p} delay={i * 60}>
                <div className="flex h-full items-center gap-3 bg-ink-900 px-5 py-6">
                  <Icon className="h-5 w-5 shrink-0 text-brand-400" />
                  <span className="text-sm font-medium text-fg-secondary">{p}</span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
