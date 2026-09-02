'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { deliveryStages } from '@/content/site-content';
import { cn } from '@/lib/utils';

export function DeliveryLifecycle() {
  const [active, setActive] = useState(0);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            setActive(idx);
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );
    stageRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const stage = deliveryStages[active];

  return (
    <section className="section relative border-t border-line bg-ink-950/40">
      <div className="container-avz">
        <div className="max-w-2xl">
          <div className="overline mb-4">How we deliver</div>
          <h2 className="text-h2 text-balance">
            A continuity-first lifecycle, from discovery to optimisation.
          </h2>
          <p className="text-lead mt-4">
            Eight stages, run as one programme. Each step is proven before the next begins — so
            transformation stays measurable and go-live stays a non-event.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Sticky visual */}
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <div className="relative overflow-hidden rounded-2xl border border-line bg-ink-850 p-8">
              <div className="grid-lines pointer-events-none absolute inset-0 opacity-[0.2]" />
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full blur-3xl transition-all duration-700"
                style={{ background: 'radial-gradient(circle, rgba(255,154,36,0.18), transparent 70%)' }}
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage.num}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <div className="font-display text-[5rem] font-semibold leading-none text-gradient">
                    {stage.num}
                  </div>
                  <h3 className="mt-3 text-h3 text-fg">{stage.title}</h3>
                  <p className="mt-3 text-fg-secondary">{stage.summary}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {stage.capabilities.map((c) => (
                      <span key={c} className="rounded-md border border-line bg-white/[0.03] px-3 py-1.5 text-xs text-fg-muted">
                        {c}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Progress rail */}
              <div className="mt-8 flex gap-1.5">
                {deliveryStages.map((s, i) => (
                  <div
                    key={s.num}
                    className={cn(
                      'h-1 flex-1 rounded-full transition-colors duration-500',
                      i <= active ? 'bg-brand-400' : 'bg-line-strong',
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Scroll targets */}
          <div>
            {deliveryStages.map((s, i) => (
              <div
                key={s.num}
                data-idx={i}
                ref={(el) => {
                  stageRefs.current[i] = el;
                }}
                className={cn(
                  'flex gap-5 border-l py-8 pl-6 transition-colors duration-300 first:pt-0',
                  active === i ? 'border-brand-400' : 'border-line',
                )}
              >
                <div
                  className={cn(
                    'font-mono text-sm transition-colors duration-300',
                    active === i ? 'text-brand-400' : 'text-fg-faint',
                  )}
                >
                  {s.num}
                </div>
                <div>
                  <h3
                    className={cn(
                      'text-xl font-semibold transition-colors duration-300',
                      active === i ? 'text-fg' : 'text-fg-muted',
                    )}
                  >
                    {s.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-fg-muted">{s.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
