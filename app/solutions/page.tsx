import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/site/page-hero';
import { Reveal } from '@/components/primitives/reveal';
import { CtaBand } from '@/components/site/cta-band';
import { solutions } from '@/content/solutions';

export const metadata: Metadata = {
  title: 'Solutions',
  description:
    'Solution journeys for banking transformation: core modernisation, payments transformation, platform migration, upgrades, intelligent testing and AI-enabled engineering.',
  alternates: { canonical: '/solutions' },
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        overline="Solutions"
        title="Journeys, not service cards."
        lead="Each solution starts from a real banking problem and ends in a measurable outcome — with the capabilities and accelerators that get you there."
        breadcrumb={[{ name: 'Solutions', href: '/solutions' }]}
      />
      <section className="section">
        <div className="container-avz space-y-5">
          {solutions.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 60}>
              <Link
                href={`/solutions/${s.slug}`}
                className="group grid gap-6 rounded-2xl border border-line bg-ink-850/60 p-7 transition-all hover:border-brand-400/50 lg:grid-cols-[0.9fr_1.1fr] lg:p-9"
              >
                <div>
                  <span className="font-mono text-sm text-brand-400">{String(i + 1).padStart(2, '0')}</span>
                  <h2 className="mt-3 text-2xl font-semibold text-fg">{s.title}</h2>
                  <p className="mt-3 text-lg text-fg-secondary">{s.promise}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-400">
                    Explore the journey
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
                <div className="border-t border-line pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                  <div className="overline mb-2">The problem</div>
                  <p className="text-sm leading-relaxed text-fg-muted">{s.problem}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {s.outcomes.slice(0, 2).map((o) => (
                      <span key={o} className="rounded-md border border-line px-2.5 py-1 text-xs text-fg-muted">
                        {o}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
