import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/site/page-hero';
import { ApplyWizard } from '@/components/careers/apply-wizard';
import { jobs, getJob } from '@/content/jobs';

export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);
  return {
    title: job ? `Apply · ${job.title}` : 'Apply',
    robots: { index: false, follow: true },
    alternates: { canonical: `/careers/jobs/${slug}/apply` },
  };
}

export default async function ApplyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();

  return (
    <>
      <PageHero
        overline="Application"
        title={`Apply — ${job.title}`}
        lead="A short, guided application. Your progress is saved as you go."
        breadcrumb={[
          { name: 'Careers', href: '/careers' },
          { name: 'Open roles', href: '/careers/jobs' },
          { name: job.title, href: `/careers/jobs/${job.slug}` },
          { name: 'Apply', href: `/careers/jobs/${job.slug}/apply` },
        ]}
      />
      <section className="section">
        <div className="container-avz">
          <ApplyWizard jobSlug={job.slug} jobTitle={job.title} />
        </div>
      </section>
    </>
  );
}
