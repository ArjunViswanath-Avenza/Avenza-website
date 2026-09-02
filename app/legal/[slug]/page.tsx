import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/site/page-hero';
import { legalDocs, getLegalDoc } from '@/content/legal';

export function generateStaticParams() {
  return legalDocs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) return {};
  return { title: doc.title, alternates: { canonical: `/legal/${doc.slug}` }, robots: { index: true, follow: true } };
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) notFound();

  return (
    <>
      <PageHero
        overline="Legal"
        title={doc.title}
        breadcrumb={[{ name: doc.title, href: `/legal/${doc.slug}` }]}
      >
        <p className="text-sm text-fg-muted">
          Last updated {new Date(doc.updated).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </PageHero>
      <section className="section">
        <div className="container-avz max-w-3xl space-y-10">
          {doc.sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-h3 mb-3 text-fg">{s.heading}</h2>
              {s.body.map((p, i) => (
                <p key={i} className="mb-3 leading-relaxed text-fg-secondary">{p}</p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
