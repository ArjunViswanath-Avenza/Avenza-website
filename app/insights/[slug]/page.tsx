import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/site/page-hero';
import { CtaBand } from '@/components/site/cta-band';
import { JsonLdArticle } from '@/components/seo/article-json-ld';
import { insights, getInsight } from '@/content/insights';

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: { type: 'article', title: post.title, description: post.excerpt, publishedTime: post.date },
  };
}

export default async function InsightDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) notFound();

  const related = insights.filter((i) => i.slug !== post.slug && i.category === post.category).slice(0, 2);
  const fallback = insights.filter((i) => i.slug !== post.slug).slice(0, 2);
  const suggestions = related.length ? related : fallback;

  return (
    <>
      <JsonLdArticle title={post.title} description={post.excerpt} date={post.date} slug={post.slug} />
      <PageHero
        overline={`${post.type} · ${post.category}`}
        title={post.title}
        breadcrumb={[
          { name: 'Insights', href: '/insights' },
          { name: post.title, href: `/insights/${post.slug}` },
        ]}
      >
        <div className="flex items-center gap-3 text-sm text-fg-muted">
          <span>{new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          <span>·</span>
          <span>{post.readMinutes} min read</span>
        </div>
      </PageHero>

      <article className="section">
        <div className="container-avz max-w-3xl">
          <p className="text-xl leading-relaxed text-fg-secondary">{post.excerpt}</p>
          <div className="mt-8 space-y-6">
            {post.body.map((p, i) => (
              <p key={i} className="text-lg leading-relaxed text-fg-secondary">{p}</p>
            ))}
          </div>

          <div className="mt-12 border-t border-line pt-6">
            <Link href="/insights" className="inline-flex items-center gap-2 text-sm text-brand-400 hover:text-brand-300">
              <ArrowLeft className="h-4 w-4" /> All insights
            </Link>
          </div>
        </div>
      </article>

      <section className="border-t border-line py-16">
        <div className="container-avz">
          <h2 className="text-h3 mb-8 text-fg">Related reading</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {suggestions.map((s) => (
              <Link
                key={s.slug}
                href={`/insights/${s.slug}`}
                className="group flex items-center justify-between gap-4 rounded-xl border border-line bg-ink-850/60 p-6 transition-colors hover:border-brand-400/50"
              >
                <div>
                  <div className="text-xs text-fg-muted">{s.category}</div>
                  <div className="mt-1 font-semibold text-fg">{s.title}</div>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-fg-faint transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
