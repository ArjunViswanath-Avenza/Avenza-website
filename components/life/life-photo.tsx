'use client';

import { useState } from 'react';

const TINTS = [
  'from-brand-500/30 to-brand-700/10',
  'from-brand-400/25 to-ink-800',
  'from-brand-600/25 to-brand-400/5',
  'from-brand-500/20 to-ink-850',
];

/**
 * Renders a culture photo; if the file is missing/fails, shows a playful
 * placeholder (emoji + title on a warm gradient) so the gallery always looks
 * alive. Drop /public/life/<id>.jpg to replace it.
 */
export function LifePhoto({
  src,
  title,
  emoji,
  tint = 0,
}: {
  src: string;
  title: string;
  emoji: string;
  tint?: number;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br ${TINTS[tint % TINTS.length]} p-4 text-center`}>
        <span className="text-5xl" aria-hidden>{emoji}</span>
        <span className="text-sm font-medium text-fg-secondary">{title}</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={title}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover transition-transform duration-[var(--dur-slower)] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
    />
  );
}
