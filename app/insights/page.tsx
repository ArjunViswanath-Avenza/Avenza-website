import type { Metadata } from 'next';
import { PageHero } from '@/components/site/page-hero';
import { InsightsExplorer } from '@/components/insights/insights-explorer';

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Thought leadership on core banking, Temenos, payments, AI, migration, testing and engineering from a team that delivers banking programmes.',
  alternates: { canonical: '/insights' },
};

export default function InsightsPage() {
  return (
    <>
      <PageHero
        overline="Insights"
        title="Thinking from people who deliver banking programmes."
        lead="Points of view, whitepapers and articles on modernising, migrating and running banking platforms — grounded in delivery, not theory."
        breadcrumb={[{ name: 'Insights', href: '/insights' }]}
      />
      <section className="section">
        <div className="container-avz">
          <InsightsExplorer />
        </div>
      </section>
    </>
  );
}
