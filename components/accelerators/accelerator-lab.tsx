'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { accelerators } from '@/content/accelerators';
import { cn } from '@/lib/utils';

const stages = ['All', 'Assess', 'Transform', 'Validate', 'Deploy', 'Optimise'];

export function AcceleratorLab() {
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState<string | null>(accelerators[0]?.slug ?? null);

  const list = filter === 'All' ? accelerators : accelerators.filter((a) => a.stage === filter);

  return (
    <div>
      {/* Filter rail */}
      <div className="mb-8 flex flex-wrap gap-2">
        {stages.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={cn(
              'rounded-full border px-4 py-1.5 text-sm transition-colors',
              filter === s
                ? 'border-brand-400 bg-brand-600/15 text-fg'
                : 'border-line text-fg-muted hover:border-line-strong hover:text-fg-secondary',
            )}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {list.map((a) => {
          const Icon = a.icon;
          const isOpen = open === a.slug;
          return (
            <div key={a.slug} className="overflow-hidden rounded-2xl border border-line bg-ink-850/60">
              <button
                onClick={() => setOpen(isOpen ? null : a.slug)}
                className="flex w-full items-center gap-4 p-6 text-left"
                aria-expanded={isOpen}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-fill-2">
                  <Icon className="h-6 w-6 text-brand-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-fg">{a.name}</h3>
                    <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-fg-muted">
                      {a.stage}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-fg-muted">{a.solution}</p>
                </div>
                <div className={cn('shrink-0 text-2xl font-light text-fg-faint transition-transform', isOpen && 'rotate-45')}>
                  +
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="grid gap-6 border-t border-line px-6 py-6 md:grid-cols-3 md:pl-[5.5rem]">
                      <Detail label="Problem" text={a.problem} />
                      <Detail label="How it works" text={a.howItWorks} />
                      <div>
                        <div className="overline mb-2">Benefits</div>
                        <ul className="space-y-1.5">
                          {a.benefits.map((b) => (
                            <li key={b} className="flex items-start gap-2 text-sm text-fg-secondary">
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-teal" />
                              {b}
                            </li>
                          ))}
                        </ul>
                        <Link
                          href={`/accelerators/${a.slug}`}
                          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-400 hover:text-brand-300"
                        >
                          Full detail <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Detail({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <div className="overline mb-2">{label}</div>
      <p className="text-sm leading-relaxed text-fg-secondary">{text}</p>
    </div>
  );
}
