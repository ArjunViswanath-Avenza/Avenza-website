import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Target, Sparkles } from 'lucide-react';
import { PageHero } from '@/components/site/page-hero';
import { Reveal } from '@/components/primitives/reveal';
import { CtaBand } from '@/components/site/cta-band';
import { BreadcrumbJsonLd } from '@/components/seo/json-ld';
import { solutions, getSolution } from '@/content/solutions';
import { getCapability } from '@/content/capabilities';
import { getAccelerator } from '@/content/accelerators';

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) return {};
  return { title: s.title, description: s.promise, alternates: { canonical: `/solutions/${s.slug}` } };
}

export default async function SolutionDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) notFound();

  const caps = s.capabilities.map(getCapability).filter(Boolean);
  const accs = s.relatedAccelerators.map(getAccelerator).filter(Boolean);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Solutions', href: '/solutions' },
          { name: s.title, href: `/solutions/${s.slug}` },
        ]}
      />
      <PageHero
        overline="Solution"
        title={s.promise}
        lead={s.problem}
        breadcrumb={[
          { name: 'Solutions', href: '/solutions' },
          { name: s.title, href: `/solutions/${s.slug}` },
        ]}
      />

      <section className="section">
        <div className="container-avz grid gap-12 lg:grid-cols-[1.4fr_0.9fr] lg:gap-16">
          <div className="space-y-12">
            <Reveal>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-brand-400" />
                <h2 className="text-h3 text-fg">Why it matters</h2>
              </div>
              <p className="mt-3 text-lg text-fg-secondary">{s.whyItMatters}</p>
            </Reveal>

            <div>
              <h2 className="text-h3 mb-6 text-fg">The Avenza approach</h2>
              <ol className="space-y-4">
                {s.approach.map((a, i) => (
                  <Reveal key={i} delay={i * 60} className="flex gap-4 rounded-xl border border-line bg-ink-850/60 p-5">
                    <span className="font-mono text-sm text-brand-400">{String(i + 1).padStart(2, '0')}</span>
                    <p className="text-fg-secondary">{a}</p>
                  </Reveal>
                ))}
              </ol>
            </div>

            <div>
              <h2 className="text-h3 mb-6 text-fg">Expected outcomes</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {s.outcomes.map((o, i) => (
                  <Reveal key={i} delay={i * 50} className="flex items-start gap-3 rounded-xl border border-line bg-white/[0.02] p-4">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                    <p className="text-sm text-fg-secondary">{o}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-2xl border border-line bg-ink-850/60 p-6">
              <div className="overline mb-4">Capabilities used</div>
              <ul className="space-y-2">
                {caps.map((c) => (
                  <li key={c!.slug}>
                    <Link href={`/capabilities/${c!.slug}`} className="group flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-fg-secondary transition-colors hover:bg-white/[0.03] hover:text-fg">
                      {c!.title}
                      <ArrowRight className="h-3.5 w-3.5 text-fg-faint transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {accs.length > 0 && (
              <div className="rounded-2xl border border-line bg-ink-850/60 p-6">
                <div className="overline mb-4">Related accelerators</div>
                <ul className="space-y-2">
                  {accs.map((a) => (
                    <li key={a!.slug}>
                      <Link href={`/accelerators/${a!.slug}`} className="group flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-fg-secondary transition-colors hover:bg-white/[0.03] hover:text-fg">
                        {a!.name}
                        <ArrowRight className="h-3.5 w-3.5 text-fg-faint transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>

      <CtaBand title={`Let's talk about ${s.title.toLowerCase()}.`} />
    </>
  );
}
