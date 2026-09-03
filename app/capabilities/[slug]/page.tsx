import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/site/page-hero';
import { Reveal } from '@/components/primitives/reveal';
import { CtaBand } from '@/components/site/cta-band';
import { BreadcrumbJsonLd } from '@/components/seo/json-ld';
import { capabilities, getCapability } from '@/content/capabilities';
import { solutions } from '@/content/solutions';

export function generateStaticParams() {
  return capabilities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cap = getCapability(slug);
  if (!cap) return {};
  return {
    title: cap.title,
    description: cap.summary,
    alternates: { canonical: `/capabilities/${cap.slug}` },
  };
}

export default async function CapabilityDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cap = getCapability(slug);
  if (!cap) notFound();

  const Icon = cap.icon;
  const related = solutions.filter((s) => s.capabilities.includes(cap.slug)).slice(0, 3);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Capabilities', href: '/capabilities' },
          { name: cap.title, href: `/capabilities/${cap.slug}` },
        ]}
      />
      <PageHero
        overline={cap.overline}
        title={cap.title}
        lead={cap.summary}
        breadcrumb={[
          { name: 'Capabilities', href: '/capabilities' },
          { name: cap.title, href: `/capabilities/${cap.slug}` },
        ]}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-line bg-fill-2">
          <Icon className="h-7 w-7 text-brand-400" />
        </div>
      </PageHero>

      <section className="section">
        <div className="container-avz grid gap-12 lg:grid-cols-[1.4fr_0.9fr] lg:gap-16">
          <div>
            {/* Outcome callout */}
            <Reveal className="rounded-2xl border border-brand-400/30 bg-brand-600/10 p-6">
              <div className="overline mb-2">The outcome</div>
              <p className="text-lg font-medium text-fg">{cap.outcome}</p>
            </Reveal>

            <div className="mt-10 space-y-5">
              <h2 className="text-h3 text-fg">What this involves</h2>
              {cap.detail.map((d, i) => (
                <Reveal key={i} delay={i * 40} className="flex gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-teal" />
                  <p className="text-fg-secondary">{d}</p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-2xl border border-line bg-ink-850/60 p-6">
              <div className="overline mb-4">Services</div>
              <ul className="flex flex-wrap gap-2">
                {cap.services.map((s) => (
                  <li key={s} className="rounded-md border border-line bg-fill-1 px-3 py-1.5 text-sm text-fg-secondary">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            {cap.platforms && (
              <div className="rounded-2xl border border-line bg-ink-850/60 p-6">
                <div className="overline mb-4">Platforms</div>
                <ul className="space-y-2">
                  {cap.platforms.map((p) => (
                    <li key={p} className="font-mono text-sm text-fg">{p}</li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section border-t border-line">
          <div className="container-avz">
            <h2 className="text-h3 mb-8 text-fg">Related solutions</h2>
            <div className="grid gap-5 md:grid-cols-3">
              {related.map((s) => (
                <Link
                  key={s.slug}
                  href={`/solutions/${s.slug}`}
                  className="group rounded-xl border border-line bg-ink-850/60 p-6 transition-colors hover:border-brand-400/50"
                >
                  <h3 className="font-semibold text-fg">{s.title}</h3>
                  <p className="mt-2 text-sm text-fg-muted">{s.promise}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm text-brand-400">
                    Explore <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand title={`Talk to us about ${cap.title.toLowerCase()}.`} />
    </>
  );
}
