import type { Metadata } from 'next';
import { PageHero } from '@/components/site/page-hero';
import { Reveal } from '@/components/primitives/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { CtaBand } from '@/components/site/cta-band';
import { Leadership } from '@/components/team/leadership';
import { ClientLogos } from '@/components/clients/client-logos';
import { whyPillars } from '@/content/site-content';
import { Handshake, Users, Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Avenza is a banking-technology transformation specialist — deep Temenos expertise, modern engineering and proven delivery, with flexible engagement models.',
  alternates: { canonical: '/about' },
};

const engagementModels = [
  { icon: Layers, title: 'End-to-end delivery', body: 'We own the outcome — from assessment through go-live and beyond.' },
  { icon: Users, title: 'Staff augmentation', body: 'Certified specialists embedded into your teams where you need depth.' },
  { icon: Handshake, title: 'Hybrid', body: 'A blend shaped to your programme, your governance and your pace.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        overline="About Avenza"
        title="A banking-technology partner, built for transformation."
        lead="Avenza blends specialised Temenos expertise with modern engineering, AI and a continuity-first delivery methodology — to modernise banking platforms without putting the business at risk."
        breadcrumb={[{ name: 'About', href: '/about' }]}
      />

      <section className="section">
        <div className="container-avz grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="overline mb-4">Who we are</div>
            <p className="text-lg leading-relaxed text-fg-secondary">
              Banks do not need another generalist consultancy learning core banking on their transformation. They
              need specialists who have delivered banking programmes — and who bring the engineering discipline,
              proprietary accelerators and platform depth to do it safely.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-fg-secondary">
              That is what Avenza is built to be: a partner you would trust with a critical banking transformation,
              combining deep domain knowledge with modern, AI-enabled engineering.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="rounded-2xl border border-line bg-ink-850/60 p-8">
              <div className="overline mb-4">Our conviction</div>
              <p className="text-xl font-medium leading-relaxed text-fg">
                &ldquo;Modernise the core without compromising business continuity. Turn complex migrations into
                controlled, measurable programmes. Use AI to amplify expert engineers, never to replace their
                judgement.&rdquo;
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section border-t border-line">
        <div className="container-avz">
          <SectionHeading overline="Engagement models" title="Flexible by design." lead="Shaped to your programme — not forced into ours." />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {engagementModels.map((m, i) => (
              <Reveal key={m.title} delay={i * 70}>
                <div className="flex h-full flex-col rounded-2xl border border-line bg-ink-850/60 p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-fill-2">
                    <m.icon className="h-6 w-6 text-brand-400" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-fg">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{m.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-line">
        <div className="container-avz">
          <SectionHeading overline="What defines us" title="Eight things that make Avenza different." />
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

      <Leadership />

      <ClientLogos title="In good company." lead="A selection of the banks and financial institutions our people have delivered for." />

      <CtaBand />
    </>
  );
}
