'use client';

import { PlayCircle } from 'lucide-react';

/**
 * POC demo clip player. Lazy (only metadata preloaded), poster-backed, no
 * autoplay — plays on user action, so it's bandwidth- and reduced-motion-safe.
 */
export function PocVideo({ src, poster, label = 'POC demo' }: { src: string; poster?: string; label?: string }) {
  return (
    <figure className="overflow-hidden rounded-xl border border-line bg-ink-950">
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <PlayCircle className="h-4 w-4 text-brand-600" />
        <span className="font-mono text-[0.7rem] uppercase tracking-wider text-fg-muted">{label}</span>
      </div>
      <video
        src={src}
        poster={poster}
        controls
        preload="metadata"
        playsInline
        className="aspect-video w-full bg-black"
      >
        Your browser doesn’t support embedded video.
      </video>
    </figure>
  );
}
