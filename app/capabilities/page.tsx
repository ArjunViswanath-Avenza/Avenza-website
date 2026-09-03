import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/site/page-hero';
import { Reveal } from '@/components/primitives/reveal';
import { CtaBand } from '@/components/site/cta-band';
import { capabilities } from '@/content/capabilities';

export const metadata: Metadata = {
  title: 'Capabilities',
  description:
    'Specialised banking-technology capabilities: Temenos core banking, payments, financial crime, migration, testing, run & change, upgrades and AI-enabled engineering.',
  alternates: { canonical: '/capabilities' },
};

export default function CapabilitiesPage() {
  return (
    <>
      <PageHero
        overline="Capabilities"
        title="Specialised across the banking-platform lifecycle."
        lead="Eight capabilities that span the whole transformation — deep enough to trust with a critical programme, joined up enough to run as one."
        breadcrumb={[{ name: 'Capabilities', href: '/capabilities' }]}
      />

      <section className="section">
        <div className="container-avz grid gap-5 md:grid-cols-2">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <Reveal key={cap.slug} delay={(i % 2) * 80}>
                <Link
                  href={`/capabilities/${cap.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-ink-850/60 p-7 transition-all hover:-translate-y-1 hover:border-brand-400/50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-fill-2">
                      <Icon className="h-6 w-6 text-brand-400" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-fg-faint transition-colors group-hover:text-brand-400" />
                  </div>
                  <div className="mt-6 font-mono text-[0.7rem] uppercase tracking-wider text-fg-faint">
                    {cap.overline}
                  </div>
                  <h2 className="mt-1 text-xl font-semibold text-fg">{cap.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-muted">{cap.summary}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {cap.services.slice(0, 4).map((s) => (
                      <span key={s} className="rounded-md border border-line px-2.5 py-1 text-xs text-fg-muted">
                        {s}
                      </span>
                    ))}
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <CtaBand
        title="Not sure which capability you need?"
        body="Most transformations touch several. Tell us the problem and we will map it to the right combination."
        secondaryLabel="See solutions"
        secondaryHref="/solutions"
      />
    </>
  );
}
