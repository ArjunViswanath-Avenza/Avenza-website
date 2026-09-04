'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { Play, ArrowUpRight } from 'lucide-react';
import { accelerators, type Accelerator } from '@/content/accelerators';
import { cn } from '@/lib/utils';

const stages = ['All', 'Assess', 'Transform', 'Validate', 'Deploy', 'Optimise'];

export function AcceleratorLab() {
  const [filter, setFilter] = useState('All');
  const list = filter === 'All' ? accelerators : accelerators.filter((a) => a.stage === filter);

  return (
    <div>
      {/* Stage filter */}
      <div className="mb-10 flex flex-wrap gap-2">
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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((a) => (
          <AcceleratorCard key={a.slug} a={a} />
        ))}
      </div>
    </div>
  );
}

function AcceleratorCard({ a }: { a: Accelerator }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const Icon = a.icon;
  // Short montage preview (a few scenes across the clip); full video is on the detail page.
  const previewSrc = a.video ? a.video.replace(/\.mp4$/, '-preview.mp4') : undefined;

  const play = () => {
    const v = videoRef.current;
    if (v) v.play().catch(() => {});
  };
  const stop = () => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  return (
    <Link
      href={`/accelerators/${a.slug}`}
      onMouseEnter={play}
      onMouseLeave={stop}
      onFocus={play}
      onBlur={stop}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-elevated transition-all duration-[var(--dur-slow)] ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-brand-400/60"
    >
      {/* Video preview (plays on hover; full video with sound lives on the detail page) */}
      <div className="relative aspect-video overflow-hidden bg-black">
        {previewSrc ? (
          <video
            ref={videoRef}
            src={`${previewSrc}#t=0.1`}
            poster={a.poster}
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-600/20 to-ink-900">
            <Icon className="h-10 w-10 text-brand-400" />
          </div>
        )}

        {/* Stage tag */}
        <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/50 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-wider text-white/90 backdrop-blur">
          {a.stage}
        </span>

        {/* Play affordance (hidden while hovering/playing) */}
        {a.video && (
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/55 ring-1 ring-white/20 backdrop-blur">
              <Play className="h-5 w-5 translate-x-0.5 fill-white text-white" />
            </span>
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 shrink-0 text-brand-600" />
          <h3 className="text-base font-semibold text-fg">{a.name}</h3>
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">{a.solution}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600">
          Watch full demo
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
