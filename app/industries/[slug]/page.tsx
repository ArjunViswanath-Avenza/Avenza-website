import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/site/page-hero';
import { CtaBand } from '@/components/site/cta-band';
import { BreadcrumbJsonLd } from '@/components/seo/json-ld';
import { industries } from '@/content/site-content';
import { capabilities } from '@/content/capabilities';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const ind = industries.find((i) => i.slug === slug);
  if (!ind) return {};
  return { title: ind.title, description: ind.summary, alternates: { canonical: `/industries/${ind.slug}` } };
}

export default async function IndustryDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ind = industries.find((i) => i.slug === slug);
  if (!ind) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Industries', href: '/industries' },
          { name: ind.title, href: `/industries/${ind.slug}` },
        ]}
      />
      <PageHero
        overline="Industry"
        title={ind.title}
        lead={ind.summary}
        breadcrumb={[
          { name: 'Industries', href: '/industries' },
          { name: ind.title, href: `/industries/${ind.slug}` },
        ]}
      />
      <section className="section">
        <div className="container-avz">
          <p className="max-w-2xl text-lg leading-relaxed text-fg-secondary">
            Avenza brings the same specialised Temenos capability and continuity-first delivery methodology to{' '}
            {ind.title.toLowerCase()} — shaped to the products, regulation and scale of the sector.
          </p>
          <h2 className="text-h3 mt-12 mb-6 text-fg">Capabilities we bring</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.slice(0, 8).map((c) => (
              <Link
                key={c.slug}
                href={`/capabilities/${c.slug}`}
                className="group flex items-center justify-between gap-2 rounded-xl border border-line bg-ink-850/60 p-4 text-sm text-fg-secondary transition-colors hover:border-brand-400/50 hover:text-fg"
              >
                {c.title}
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-fg-faint transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title={`Talk to us about ${ind.title.toLowerCase()}.`} />
    </>
  );
}
