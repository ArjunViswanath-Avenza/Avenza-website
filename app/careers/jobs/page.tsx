import type { Metadata } from 'next';
import { PageHero } from '@/components/site/page-hero';
import { JobBoard } from '@/components/careers/job-board';

export const metadata: Metadata = {
  title: 'Open Roles',
  description: 'Browse open roles at Avenza — Temenos developers, consultants, QA automation, pre-sales and AI engineers.',
  alternates: { canonical: '/careers/jobs' },
};

export default function JobsPage() {
  return (
    <>
      <PageHero
        overline="Open roles"
        title="Find your next role."
        lead="Search and filter open positions across delivery, product, quality engineering, pre-sales and AI."
        breadcrumb={[
          { name: 'Careers', href: '/careers' },
          { name: 'Open roles', href: '/careers/jobs' },
        ]}
      />
      <section className="section">
        <div className="container-avz">
          <JobBoard />
        </div>
      </section>
    </>
  );
}
