'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LifePhoto } from './life-photo';
import { carousel } from '@/content/life';
import { cn } from '@/lib/utils';

const INTERVAL = 4000;

export function LifeCarousel() {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);
  const n = carousel.length;

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const go = (dir: number) => setIndex((i) => (i + dir + n) % n);
  const goTo = (i: number) => setIndex(i);

  // Auto-advance — always running (not paused on hover); resets whenever the
  // slide changes (so a manual dot click restarts the 4s timer).
  useEffect(() => {
    if (reduced || n <= 1) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % n), INTERVAL);
    return () => clearTimeout(t);
  }, [index, reduced, n]);

  return (
    <div
      className="group relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-line bg-ink-950 sm:aspect-[16/9]"
      role="region"
      aria-roledescription="carousel"
      aria-label="Life at Avenza highlights"
    >
      {carousel.map((slide, i) => {
        const active = i === index;
        return (
          <div
            key={slide.id}
            className={cn(
              'absolute inset-0 transition-opacity duration-700 ease-[var(--ease-out-expo)]',
              active ? 'opacity-100' : 'pointer-events-none opacity-0',
            )}
            aria-hidden={!active}
          >
            {/* Ken Burns: active slide slowly zooms in until it changes */}
            <div className={cn('h-full w-full', active && !reduced && 'avz-kenburns')}>
              <LifePhoto src={slide.image} title={slide.title} emoji={slide.emoji} tint={i} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
              <div className="max-w-2xl">
                <h3 className="text-2xl font-semibold text-white sm:text-4xl">
                  <span aria-hidden className="mr-2">{slide.emoji}</span>
                  {slide.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm text-white/85 sm:text-base">{slide.subtitle}</p>
              </div>
            </div>
          </div>
        );
      })}

      {/* Prev / next */}
      <button
        onClick={() => go(-1)}
        aria-label="Previous"
        className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white opacity-0 ring-1 ring-white/20 backdrop-blur transition-opacity hover:bg-black/65 focus-visible:opacity-100 group-hover:opacity-100"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Next"
        className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white opacity-0 ring-1 ring-white/20 backdrop-blur transition-opacity hover:bg-black/65 focus-visible:opacity-100 group-hover:opacity-100"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots — active dot is a 4s loading bar; click changes immediately */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2 sm:bottom-6 sm:right-8">
        {carousel.map((slide, i) => {
          const active = i === index;
          return (
            <button
              key={slide.id}
              onClick={() => goTo(i)}
              aria-label={`Go to ${slide.title}`}
              aria-current={active}
              className={cn(
                'relative h-2 overflow-hidden rounded-full transition-all',
                active ? 'w-9 bg-white/30' : 'w-2 bg-white/50 hover:bg-white/80',
              )}
            >
              {active &&
                (reduced ? (
                  <span className="absolute inset-0 rounded-full bg-brand-600" />
                ) : (
                  <span key={index} className="avz-dotfill absolute inset-y-0 left-0 rounded-full bg-brand-600" />
                ))}
            </button>
          );
        })}
      </div>

      <style jsx>{`
        .avz-kenburns {
          animation: avz-kb 4500ms ease-out both;
        }
        @keyframes avz-kb {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.09);
          }
        }
        .avz-dotfill {
          animation: avz-fill 4000ms linear both;
        }
        @keyframes avz-fill {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
