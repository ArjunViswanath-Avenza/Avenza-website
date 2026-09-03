import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/primitives/reveal';
import { insights } from '@/content/insights';

export function InsightsTeaser() {
  const featured = insights.filter((i) => i.featured).slice(0, 2);
  const rest = insights.filter((i) => !i.featured).slice(0, 2);

  return (
    <section className="section relative border-t border-line bg-ink-950/40">
      <div className="container-avz">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <div className="overline mb-4">Insights</div>
            <h2 className="text-h2 text-balance">Thinking from people who deliver banking programmes.</h2>
          </div>
          <Link
            href="/insights"
            className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-brand-400 hover:text-brand-300"
          >
            All insights <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {featured.map((post, i) => (
            <Reveal key={post.slug} delay={i * 80}>
              <Link
                href={`/insights/${post.slug}`}
                className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-line bg-ink-850/60 p-7 transition-all hover:-translate-y-1 hover:border-brand-400/50"
              >
                <div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="rounded-full bg-brand-600/15 px-2.5 py-1 font-medium text-brand-300">{post.type}</span>
                    <span className="text-fg-muted">{post.category}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold leading-snug text-fg group-hover:text-gradient">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">{post.excerpt}</p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-xs text-fg-faint">
                  {new Date(post.date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                  <span>·</span>
                  {post.readMinutes} min read
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={i * 80}>
              <Link
                href={`/insights/${post.slug}`}
                className="group flex items-center justify-between gap-4 rounded-xl border border-line bg-fill-1 px-5 py-4 transition-colors hover:border-brand-400/40"
              >
                <div>
                  <div className="text-sm font-medium text-fg">{post.title}</div>
                  <div className="mt-1 text-xs text-fg-muted">{post.category} · {post.type}</div>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-fg-faint transition-colors group-hover:text-brand-400" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
