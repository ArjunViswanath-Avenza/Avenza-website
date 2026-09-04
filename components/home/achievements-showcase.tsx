'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { achievements } from '@/content/achievements';
import { cn } from '@/lib/utils';

const INTERVAL = 5000;

const textGroup: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const textItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export function AchievementsShowcase() {
  const [i, setI] = useState(0);
  const [reduced, setReduced] = useState(false);
  const n = achievements.length;

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  // Auto-advance one at a time — keeps running (no pause on hover).
  useEffect(() => {
    if (reduced || n <= 1) return;
    const t = setTimeout(() => setI((v) => (v + 1) % n), INTERVAL);
    return () => clearTimeout(t);
  }, [i, reduced, n]);

  const a = achievements[i];

  return (
    <div>
      <div className="relative overflow-hidden rounded-3xl border border-line bg-elevated">
        <AnimatePresence mode="wait">
          <motion.div
            key={a.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid lg:min-h-[440px] lg:grid-cols-2"
          >
            {/* Image */}
            <div className="relative min-h-[260px] overflow-hidden lg:min-h-0">
              <motion.img
                src={a.image}
                alt={a.title}
                initial={reduced ? { opacity: 0 } : { scale: 1.12, opacity: 0 }}
                animate={reduced ? { opacity: 1 } : { scale: 1, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/10" />
            </div>

            {/* Text */}
            <motion.div
              variants={reduced ? undefined : textGroup}
              initial={reduced ? undefined : 'hidden'}
              animate={reduced ? undefined : 'show'}
              className="flex flex-col justify-center gap-3 p-8 lg:p-12"
            >
              <motion.div variants={textItem} className="font-mono text-xs uppercase tracking-wider text-brand-600">
                {a.event}
              </motion.div>
              <motion.h3 variants={textItem} className="text-2xl font-semibold text-fg sm:text-3xl">
                {a.title}
              </motion.h3>
              <motion.p variants={textItem} className="max-w-md leading-relaxed text-fg-secondary">
                {a.description}
              </motion.p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicators — active one is a running progress bar */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {achievements.map((ach, idx) => {
          const active = idx === i;
          return (
            <button
              key={ach.id}
              onClick={() => setI(idx)}
              aria-label={`Show: ${ach.title}`}
              aria-current={active}
              className={cn(
                'relative h-2 overflow-hidden rounded-full transition-all',
                active ? 'w-9 bg-brand-600/25' : 'w-2 bg-line-strong hover:bg-brand-400/60',
              )}
            >
              {active &&
                (reduced ? (
                  <span className="absolute inset-0 rounded-full bg-brand-600" />
                ) : (
                  <span key={i} className="ach-fill absolute inset-y-0 left-0 rounded-full bg-brand-600" />
                ))}
            </button>
          );
        })}
      </div>

      <style jsx>{`
        .ach-fill {
          animation: ach-fill 5000ms linear both;
        }
        @keyframes ach-fill {
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
