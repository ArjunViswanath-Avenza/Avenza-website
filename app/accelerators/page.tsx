import type { Metadata } from 'next';
import { PageHero } from '@/components/site/page-hero';
import { AcceleratorLab } from '@/components/accelerators/accelerator-lab';
import { CtaBand } from '@/components/site/cta-band';

export const metadata: Metadata = {
  title: 'Accelerators',
  description:
    'The Avenza Accelerator Lab: proprietary migration, configuration, testing, deployment, documentation and AI accelerators that cut effort and de-risk delivery.',
  alternates: { canonical: '/accelerators' },
};

export default function AcceleratorsPage() {
  return (
    <>
      <PageHero
        overline="Accelerator Lab · Our IP"
        title="Proprietary accelerators, built from real programmes."
        lead="Reusable frameworks, templates and tooling that take the effort and risk out of the most repetitive, error-prone work in a transformation."
        breadcrumb={[{ name: 'Accelerators', href: '/accelerators' }]}
      />
      <section className="section">
        <div className="container-avz">
          <AcceleratorLab />
        </div>
      </section>
      <CtaBand
        title="Want these working on your programme?"
        body="Our accelerators are deployed within a delivery engagement — configured to your platform and your data."
      />
    </>
  );
}
