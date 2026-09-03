'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, ArrowUpRight } from 'lucide-react';
import { insights, insightCategories } from '@/content/insights';
import { cn } from '@/lib/utils';

export function InsightsExplorer() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');

  const categories = useMemo(() => ['All', ...insightCategories.filter((c) => insights.some((i) => i.category === c))], []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return insights.filter((i) => {
      const matchesCat = cat === 'All' || i.category === cat;
      const matchesQ =
        !query ||
        i.title.toLowerCase().includes(query) ||
        i.excerpt.toLowerCase().includes(query) ||
        i.category.toLowerCase().includes(query);
      return matchesCat && matchesQ;
    });
  }, [q, cat]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-faint" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search insights…"
            aria-label="Search insights"
            className="h-11 w-full rounded-lg border border-line bg-fill-1 pl-10 pr-4 text-sm text-fg placeholder:text-fg-faint focus:border-brand-400/60 focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={cn(
                'rounded-full border px-3.5 py-1.5 text-xs transition-colors',
                cat === c ? 'border-brand-400 bg-brand-600/15 text-fg' : 'border-line text-fg-muted hover:text-fg-secondary',
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-16 rounded-2xl border border-dashed border-line py-20 text-center">
          <p className="text-fg-muted">No insights match your search.</p>
          <button onClick={() => { setQ(''); setCat('All'); }} className="mt-3 text-sm text-brand-400 hover:text-brand-300">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/insights/${post.slug}`}
              className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-ink-850/60 p-7 transition-all hover:-translate-y-1 hover:border-brand-400/50"
            >
              <div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="rounded-full bg-brand-600/15 px-2.5 py-1 font-medium text-brand-300">{post.type}</span>
                  <span className="text-fg-muted">{post.category}</span>
                </div>
                <h2 className="mt-5 text-xl font-semibold leading-snug text-fg group-hover:text-gradient">{post.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{post.excerpt}</p>
              </div>
              <div className="mt-6 flex items-center justify-between text-xs text-fg-faint">
                <span>
                  {new Date(post.date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })} · {post.readMinutes} min read
                </span>
                <ArrowUpRight className="h-4 w-4 transition-colors group-hover:text-brand-400" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
