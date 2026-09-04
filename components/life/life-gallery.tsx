'use client';

import { useState } from 'react';
import { Reveal } from '@/components/primitives/reveal';
import { PolaroidWall, type Snap } from './polaroid-wall';
import { themes, lifeCategories, categoryEmoji, categoryBlurbs, type LifeCategory } from '@/content/life';
import { cn } from '@/lib/utils';

function photosFor(category: LifeCategory): Snap[] {
  return themes
    .filter((t) => t.category === category)
    .flatMap((t) => t.photos.map((p) => ({ src: p.src, label: p.caption })));
}

export function LifeGallery() {
  const [cat, setCat] = useState<string>('All');
  const cats: LifeCategory[] = cat === 'All' ? [...lifeCategories] : lifeCategories.filter((c) => c === cat);

  return (
    <div>
      {/* Filter chips */}
      <div className="mb-12 flex flex-wrap gap-2">
        {['All', ...lifeCategories].map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={cn(
              'rounded-full border px-4 py-1.5 text-sm transition-colors',
              cat === c
                ? 'border-brand-400 bg-brand-600/15 text-fg'
                : 'border-line text-fg-muted hover:border-line-strong hover:text-fg-secondary',
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-16">
        {cats.map((category) => {
          const photos = photosFor(category);
          if (!photos.length) return null;
          return (
            <div key={category}>
              <Reveal className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <h3 className="text-h3 flex items-center gap-2 text-fg">
                    <span aria-hidden>{categoryEmoji[category]}</span>
                    {category}
                  </h3>
                  <p className="mt-1 max-w-xl text-fg-muted">{categoryBlurbs[category]}</p>
                </div>
                <span className="shrink-0 font-mono text-xs text-fg-faint">{photos.length} photos</span>
              </Reveal>
              <PolaroidWall photos={photos} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
