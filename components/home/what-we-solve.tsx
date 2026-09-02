import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/primitives/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { challenges, connectPipeline } from '@/content/site-content';

export function WhatWeSolve() {
  return (
    <section className="section relative">
      <div className="container-avz">
        <SectionHeading
          overline="What we solve"
          title="Banking transformation is rarely one problem."
          lead="It arrives as a tangle of legacy constraints, data risk, integration debt and regulatory pressure — all at once. Our work is to see the whole system, then connect the pieces."
        />

        {/* Challenge cloud */}
        <div className="mt-12 flex flex-wrap gap-2.5">
          {challenges.map((c, i) => (
            <Reveal as="span" key={c} delay={i * 40}>
              <span className="inline-block rounded-full border border-line bg-white/[0.02] px-4 py-2 text-sm text-fg-secondary transition-colors hover:border-brand-400/50 hover:text-fg">
                {c}
              </span>
            </Reveal>
          ))}
        </div>

        {/* Connect the pieces pipeline */}
        <Reveal className="mt-16 rounded-2xl border border-line bg-ink-850/60 p-6 lg:p-10">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-8 bg-brand-400" />
            <span className="text-h3 text-fg">We connect the pieces.</span>
          </div>
          <ol className="flex flex-wrap items-center gap-x-3 gap-y-4">
            {connectPipeline.map((step, i) => (
              <li key={step} className="flex items-center gap-3">
                <div className="flex items-center gap-2.5 rounded-lg border border-line bg-ink-900 px-4 py-2.5">
                  <span className="font-mono text-xs text-brand-400">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-sm font-medium text-fg">{step}</span>
                </div>
                {i < connectPipeline.length - 1 && (
                  <ArrowRight className="h-4 w-4 shrink-0 text-line-strong" />
                )}
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-fg-muted">
            This is the intellectual property of a transformation partner, not a service catalogue — a way of
            turning interconnected problems into a single, sequenced programme with measurable outcomes.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
