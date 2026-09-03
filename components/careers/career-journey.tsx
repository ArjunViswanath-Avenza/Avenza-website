'use client';

import { useState } from 'react';
import { GraduationCap, BadgeCheck, Hammer, Compass, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

const stages = [
  { icon: GraduationCap, title: 'Learn', body: 'Deep exposure to banking domain and modern platforms from day one, with structured onboarding and mentorship.' },
  { icon: BadgeCheck, title: 'Certify', body: 'Sponsored Temenos and technology certifications that build recognised, career-defining expertise.' },
  { icon: Hammer, title: 'Build', body: 'Work on real transformation programmes for banks — building, migrating and modernising critical systems.' },
  { icon: Compass, title: 'Lead', body: 'Grow into technical and functional leadership, guiding teams and shaping how programmes are delivered.' },
  { icon: Rocket, title: 'Transform', body: 'Shape the future of banking technology — with AI, accelerators and engineering at the core.' },
];

export function CareerJourney() {
  const [active, setActive] = useState(0);
  const Stage = stages[active].icon;

  return (
    <div className="rounded-3xl border border-line bg-ink-850/60 p-6 lg:p-10">
      {/* Path */}
      <div className="relative flex items-center justify-between">
        <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-line-strong" />
        <div
          className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-brand-400 transition-all duration-500"
          style={{ width: `${(active / (stages.length - 1)) * 100}%` }}
        />
        {stages.map((s, i) => (
          <button
            key={s.title}
            onClick={() => setActive(i)}
            className="group relative z-10 flex flex-col items-center gap-2"
            aria-label={s.title}
          >
            <span
              className={cn(
                'flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300',
                i <= active ? 'border-brand-400 bg-brand-600 text-[color:var(--on-brand)]' : 'border-line-strong bg-ink-900 text-fg-muted',
              )}
            >
              <s.icon className="h-5 w-5" />
            </span>
            <span className={cn('text-xs font-medium transition-colors sm:text-sm', i === active ? 'text-fg' : 'text-fg-muted')}>
              {s.title}
            </span>
          </button>
        ))}
      </div>

      {/* Detail */}
      <div className="mt-10 flex items-start gap-4 rounded-2xl border border-line bg-ink-900 p-6">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-brand-400/30 bg-brand-600/10">
          <Stage className="h-6 w-6 text-brand-400" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-fg">{stages[active].title}</h3>
          <p className="mt-2 leading-relaxed text-fg-secondary">{stages[active].body}</p>
        </div>
      </div>
    </div>
  );
}
