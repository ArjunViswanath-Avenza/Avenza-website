import type { Metadata } from 'next';
import { PageHero } from '@/components/site/page-hero';
import { Reveal } from '@/components/primitives/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { CareerJourney } from '@/components/careers/career-journey';
import { jobs } from '@/content/jobs';
import { Heart, MessageSquare, TrendingUp, Globe, GraduationCap, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Build the technology that powers modern banking. Explore careers at Avenza — banking domain exposure, sponsored certifications, mentorship and global programmes.',
  alternates: { canonical: '/careers' },
};

const culture = [
  { icon: Heart, title: 'People-first', body: 'Transparent, ethical and genuinely people-first — where your ideas matter.' },
  { icon: MessageSquare, title: 'Flat & open', body: 'Flat hierarchies, clear communication and a culture of ownership.' },
  { icon: TrendingUp, title: 'Growth prioritised', body: 'Your development is a first-class priority, not an afterthought.' },
  { icon: GraduationCap, title: 'Certification-backed', body: 'Sponsored Temenos and technology certifications that compound your value.' },
  { icon: Globe, title: 'Global exposure', body: 'Work on serious banking programmes with international reach.' },
  { icon: ShieldCheck, title: 'Integrity, always', body: 'Integrity is not a slogan here — it is how we do business.' },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        overline="Careers"
        title="Build the technology that powers modern banking."
        lead="We don’t just build banking solutions — we build careers that matter. Join a team that pairs deep banking expertise with modern, AI-enabled engineering."
        breadcrumb={[{ name: 'Careers', href: '/careers' }]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/careers/jobs" size="lg" withArrow>
            View open roles
          </Button>
          <Button href="#culture" size="lg" variant="secondary">
            Why Avenza
          </Button>
        </div>
      </PageHero>

      {/* Open roles snapshot */}
      <section className="border-b border-line bg-ink-950/40">
        <div className="container-avz flex flex-col items-start gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-fg-secondary">
            <span className="font-semibold text-fg">{jobs.length} open roles</span> across delivery, product,
            quality and AI.
          </p>
          <Button href="/careers/jobs" variant="secondary" size="sm" withArrow>
            Browse the job board
          </Button>
        </div>
      </section>

      {/* Culture */}
      <section id="culture" className="section scroll-mt-24">
        <div className="container-avz">
          <SectionHeading
            overline="Culture"
            title="A place built for people who take pride in their craft."
            lead="The kind of environment where banking specialists and modern engineers do their best work — together."
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {culture.map((c, i) => (
              <Reveal key={c.title} delay={(i % 3) * 60}>
                <div className="flex h-full flex-col bg-ink-900 p-7">
                  <c.icon className="h-6 w-6 text-brand-400" />
                  <h3 className="mt-5 text-lg font-semibold text-fg">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="section border-t border-line bg-ink-950/40">
        <div className="container-avz">
          <SectionHeading
            overline="Your journey"
            title="Learn. Certify. Build. Lead. Transform."
            lead="A career path with real progression — from your first certification to shaping how banks transform."
          />
          <div className="mt-12">
            <CareerJourney />
          </div>
        </div>
      </section>

      <section className="section border-t border-line">
        <div className="container-avz text-center">
          <h2 className="text-h2 mx-auto max-w-2xl text-balance">Ready to build banking technology that matters?</h2>
          <div className="mt-8 flex justify-center">
            <Button href="/careers/jobs" size="lg" withArrow>
              Explore open roles
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
