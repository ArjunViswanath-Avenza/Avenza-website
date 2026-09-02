import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/site/page-hero';
import { Reveal } from '@/components/primitives/reveal';
import { CtaBand } from '@/components/site/cta-band';
import { industries } from '@/content/site-content';

export const metadata: Metadata = {
  title: 'Industries',
  description:
    'Banking-technology transformation across retail, corporate and commercial banking, payments, financial services and fintech.',
  alternates: { canonical: '/industries' },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        overline="Industries"
        title="Where we work."
        lead="Banking depth applied across the sectors that run on modern core, payments and financial-crime platforms."
        breadcrumb={[{ name: 'Industries', href: '/industries' }]}
      />
      <section className="section">
        <div className="container-avz grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <Reveal key={ind.slug} delay={(i % 3) * 60}>
              <Link
                href={`/industries/${ind.slug}`}
                className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-ink-850/60 p-7 transition-all hover:-translate-y-1 hover:border-brand-400/50"
              >
                <div>
                  <h2 className="text-xl font-semibold text-fg">{ind.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">{ind.summary}</p>
                </div>
                <ArrowUpRight className="mt-6 h-5 w-5 text-fg-faint transition-colors group-hover:text-brand-400" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
