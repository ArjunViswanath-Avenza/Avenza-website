import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Briefcase, Clock, Layers, Check, Plus } from 'lucide-react';
import { PageHero } from '@/components/site/page-hero';
import { Reveal } from '@/components/primitives/reveal';
import { Button } from '@/components/ui/button';
import { site } from '@/config/site';
import { jobs, getJob } from '@/content/jobs';

export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) return {};
  return {
    title: job.title,
    description: job.summary,
    alternates: { canonical: `/careers/jobs/${job.slug}` },
  };
}

export default async function JobDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();

  const jobPostingLd = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.summary,
    datePosted: job.postedAt,
    employmentType: job.employmentType === 'Full-time' ? 'FULL_TIME' : 'CONTRACTOR',
    hiringOrganization: { '@type': 'Organization', name: site.legalName, sameAs: site.url },
    jobLocationType: job.location === 'Remote' ? 'TELECOMMUTE' : undefined,
    applicantLocationRequirements: job.location === 'Remote' ? { '@type': 'Country', name: 'Anywhere' } : undefined,
  };

  const sections: { title: string; items: string[]; icon: typeof Check }[] = [
    { title: 'Responsibilities', items: job.responsibilities, icon: Layers },
    { title: 'Requirements', items: job.requirements, icon: Check },
    { title: 'Nice to have', items: job.niceToHave, icon: Plus },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingLd) }} />
      <PageHero
        overline={`${job.department} · ${job.experienceLevel}`}
        title={job.title}
        breadcrumb={[
          { name: 'Careers', href: '/careers' },
          { name: 'Open roles', href: '/careers/jobs' },
          { name: job.title, href: `/careers/jobs/${job.slug}` },
        ]}
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-fg-secondary">
          <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-brand-400" />{job.location}</span>
          <span className="inline-flex items-center gap-2"><Briefcase className="h-4 w-4 text-brand-400" />{job.employmentType}</span>
          <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-brand-400" />{job.minYears}+ years</span>
        </div>
      </PageHero>

      <section className="section">
        <div className="container-avz grid gap-12 lg:grid-cols-[1.5fr_0.9fr] lg:gap-16">
          <div className="space-y-12">
            <p className="text-lg leading-relaxed text-fg-secondary">{job.summary}</p>

            {sections.map((sec) => (
              <div key={sec.title}>
                <h2 className="text-h3 mb-5 text-fg">{sec.title}</h2>
                <ul className="space-y-3">
                  {sec.items.map((item, i) => (
                    <Reveal key={i} delay={i * 30} className="flex gap-3">
                      <sec.icon className="mt-1 h-4 w-4 shrink-0 text-teal" />
                      <span className="text-fg-secondary">{item}</span>
                    </Reveal>
                  ))}
                </ul>
              </div>
            ))}

            <div className="rounded-2xl border border-line bg-ink-850/60 p-6">
              <h2 className="text-h3 mb-3 text-fg">About the team</h2>
              <p className="text-fg-secondary">{job.aboutTeam}</p>
            </div>
          </div>

          {/* Apply sidebar */}
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-2xl border border-line bg-gradient-to-br from-brand-700/20 to-ink-850 p-7">
              <h2 className="text-lg font-semibold text-fg">Apply for this role</h2>
              <p className="mt-2 text-sm text-fg-muted">
                A short, guided application. No need to email anyone — you’ll get a reference ID on submission.
              </p>
              <Button href={`/careers/jobs/${job.slug}/apply`} size="lg" withArrow className="mt-6 w-full">
                Apply now
              </Button>

              <div className="mt-6 border-t border-line pt-5">
                <div className="overline mb-3">Benefits</div>
                <ul className="space-y-2">
                  {job.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-fg-secondary">
                      <Check className="h-3.5 w-3.5 text-teal" />{b}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-5">
                {job.technologies.map((t) => (
                  <span key={t} className="rounded-md border border-line px-2.5 py-1 font-mono text-xs text-fg-muted">{t}</span>
                ))}
              </div>
            </div>

            <Link href="/careers/jobs" className="mt-4 inline-block text-sm text-brand-400 hover:text-brand-300">
              ← Back to all roles
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
