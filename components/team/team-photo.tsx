'use client';

import { useState } from 'react';

/**
 * Shows the leader's photo; if the file is missing or fails to load, it swaps to
 * a branded monogram. The parent frame supplies a soft tinted backdrop, so
 * transparent PNGs still look framed. Drop <slug>.png into /public/team to set a
 * photo (see the README there).
 */
export function TeamPhoto({ src, name, initials }: { src: string; name: string; initials: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-500/30 via-brand-600/10 to-transparent">
        <span className="font-display text-6xl font-semibold text-brand-600/90">{initials}</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={`Portrait of ${name}`}
      onError={() => setFailed(true)}
      className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-[var(--dur-slower)] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
    />
  );
}
