import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/site/page-hero';
import { Reveal } from '@/components/primitives/reveal';
import { CtaBand } from '@/components/site/cta-band';
import { BreadcrumbJsonLd } from '@/components/seo/json-ld';
import { PocVideo } from '@/components/accelerators/poc-video';
import { accelerators, getAccelerator } from '@/content/accelerators';

export function generateStaticParams() {
  return accelerators.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getAccelerator(slug);
  if (!a) return {};
  return { title: a.name, description: a.solution, alternates: { canonical: `/accelerators/${a.slug}` } };
}

export default async function AcceleratorDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getAccelerator(slug);
  if (!a) notFound();
  const Icon = a.icon;

  const blocks = [
    { label: 'The problem', text: a.problem },
    { label: 'The solution', text: a.solution },
    { label: 'How it works', text: a.howItWorks },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Accelerators', href: '/accelerators' },
          { name: a.name, href: `/accelerators/${a.slug}` },
        ]}
      />
      <PageHero
        overline={`Accelerator · ${a.stage}`}
        title={a.name}
        lead={a.solution}
        breadcrumb={[
          { name: 'Accelerators', href: '/accelerators' },
          { name: a.name, href: `/accelerators/${a.slug}` },
        ]}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-line bg-fill-2">
          <Icon className="h-7 w-7 text-brand-400" />
        </div>
      </PageHero>

      <section className="section">
        <div className="container-avz grid gap-12 lg:grid-cols-[1.4fr_0.9fr] lg:gap-16">
          <div className="space-y-8">
            {a.video && (
              <Reveal>
                <PocVideo src={a.video} poster={a.poster} label={`${a.name} — POC demo`} />
              </Reveal>
            )}
            {blocks.map((b, i) => (
              <Reveal key={b.label} delay={i * 60}>
                <div className="overline mb-2">{b.label}</div>
                <p className="text-lg leading-relaxed text-fg-secondary">{b.text}</p>
              </Reveal>
            ))}
          </div>
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-2xl border border-line bg-ink-850/60 p-6">
              <div className="overline mb-4">Benefits</div>
              <ul className="space-y-3">
                {a.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-fg-secondary">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-line pt-4">
                <div className="overline mb-2">Lifecycle stage</div>
                <div className="font-mono text-sm text-fg">{a.stage}</div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand title="Deploy this on your programme." secondaryLabel="See all accelerators" secondaryHref="/accelerators" />
    </>
  );
}
