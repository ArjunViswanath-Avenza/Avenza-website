import type { Metadata } from 'next';
import { PageHero } from '@/components/site/page-hero';
import { CtaBand } from '@/components/site/cta-band';
import { ShieldCheck, LineChart, Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Outcome-led banking transformation case studies — anonymised to protect confidential client information.',
  alternates: { canonical: '/case-studies' },
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        overline="Case studies"
        title="Outcomes, not name-drops."
        lead="Banking work is confidential by nature. We tell the story of the transformation and the outcome — anonymised as “Confidential Global Bank” unless a client has approved attribution."
        breadcrumb={[{ name: 'Case studies', href: '/case-studies' }]}
      />
      <section className="section">
        <div className="container-avz">
          {/* Confidentiality-first empty state (case studies are CMS-managed in Phase 5) */}
          <div className="rounded-3xl border border-dashed border-line bg-ink-850/40 p-10 text-center lg:p-16">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600/15">
              <ShieldCheck className="h-7 w-7 text-brand-400" />
            </div>
            <h2 className="mt-6 text-h3 text-fg">Published case studies are on their way.</h2>
            <p className="mx-auto mt-3 max-w-xl text-fg-muted">
              Our case-study framework captures the challenge, the transformation and the measurable outcome — with
              client identity protected unless attribution is explicitly approved. Administrators publish these from
              the CMS.
            </p>
            <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
              {[
                { icon: Layers, t: 'The challenge', d: 'The banking problem and its constraints.' },
                { icon: LineChart, t: 'The outcome', d: 'Measurable results and metrics.' },
                { icon: ShieldCheck, t: 'Confidential-safe', d: 'Anonymised unless approved.' },
              ].map((c) => (
                <div key={c.t} className="rounded-xl border border-line bg-ink-900 p-5 text-left">
                  <c.icon className="h-5 w-5 text-brand-400" />
                  <div className="mt-3 text-sm font-semibold text-fg">{c.t}</div>
                  <div className="mt-1 text-xs text-fg-muted">{c.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CtaBand title="Want to discuss a comparable transformation?" secondaryLabel="See solutions" secondaryHref="/solutions" />
    </>
  );
}
