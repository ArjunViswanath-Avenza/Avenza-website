import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/primitives/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { accelerators } from '@/content/accelerators';

export function AcceleratorsTeaser() {
  const featured = accelerators.slice(0, 3);
  return (
    <section className="section relative border-t border-line">
      <div className="container-avz">
        <SectionHeading
          overline="Accelerators · Our IP"
          title="Proprietary accelerators that cut effort and de-risk delivery."
          lead="The most error-prone, repetitive work in a transformation — migration plumbing, configuration, testing, documentation — is where our accelerators do the heavy lifting."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {featured.map((a, i) => {
            const Icon = a.icon;
            return (
              <Reveal key={a.slug} delay={i * 80}>
                <Link
                  href={`/accelerators/${a.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-line bg-ink-850/60 p-6 transition-all hover:-translate-y-1 hover:border-brand-400/50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-fill-2">
                      <Icon className="h-5 w-5 text-brand-400" />
                    </div>
                    <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-fg-muted">
                      {a.stage}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-fg">{a.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">{a.solution}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-400">
                    Explore <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-10">
          <Button href="/accelerators" variant="secondary" withArrow>
            Enter the Accelerator Lab
          </Button>
        </div>
      </div>
    </section>
  );
}
