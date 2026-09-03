'use client';

import { useState } from 'react';

/**
 * Renders a client logo; if the asset is missing/fails, falls back to the brand
 * name as text so the wall never shows a broken image. `imgClass` controls the
 * per-logo size so tall/square marks and wide wordmarks read at a similar scale.
 */
export function LogoImg({
  src,
  name,
  imgClass = 'max-h-12 w-auto max-w-[85%]',
}: {
  src: string;
  name: string;
  imgClass?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <span className="text-lg font-semibold tracking-tight text-[color:var(--ink-900)]">{name}</span>;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`${imgClass} object-contain`}
    />
  );
}
