import { Reveal } from '@/components/primitives/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { whyPillars } from '@/content/site-content';

export function WhyAvenza() {
  return (
    <section className="section relative border-t border-line">
      <div className="container-avz">
        <SectionHeading
          overline="Why Avenza"
          title="Built to be trusted with a critical banking transformation."
          lead="Not a body shop. A specialist partner that combines banking depth, engineering discipline and proprietary IP."
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
          {whyPillars.map((p, i) => (
            <Reveal key={p.title} delay={(i % 4) * 60}>
              <div className="flex h-full flex-col bg-ink-900 p-6">
                <span className="font-mono text-xs text-brand-400">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-4 text-base font-semibold text-fg">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
