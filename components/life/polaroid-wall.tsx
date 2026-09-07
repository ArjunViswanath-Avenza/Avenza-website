'use client';

import { motion, useReducedMotion } from 'framer-motion';

export type Snap = { src: string; label: string };

// Deterministic pseudo-random (index-based) so server and client render the same tilt.
const tilt = (i: number) => ((i * 37) % 11) - 5; // settled tilt: -5deg..5deg
const throwRot = (i: number) => ((i * 53) % 37) - 18; // tossed-in rotation: -18..18
const throwX = (i: number) => ((i * 29) % 25) - 12; // tossed-in x offset

/**
 * A collage of photos styled as analog polaroids — each tossed onto the pile
 * with a spring "throw-in" and a slight resting tilt; straightens on hover.
 */
export function PolaroidWall({ photos }: { photos: Snap[] }) {
  const reduced = useReducedMotion();

  return (
    <div className="columns-2 gap-4 sm:columns-3 md:columns-4 lg:columns-5">
      {photos.map((p, i) => (
        <motion.figure
          key={p.src}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: -90, x: throwX(i), rotate: throwRot(i), scale: 1.18 }}
          whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0, x: 0, rotate: tilt(i), scale: 1 }}
          viewport={{ once: false, margin: '0px 0px -8% 0px' }}
          transition={reduced ? { duration: 0.3 } : { type: 'spring', stiffness: 140, damping: 13, mass: 0.7, delay: (i % 8) * 0.05 }}
          whileHover={reduced ? undefined : { rotate: 0, scale: 1.05, zIndex: 20, transition: { type: 'spring', stiffness: 300, damping: 18 } }}
          className="relative mb-4 break-inside-avoid rounded-[3px] bg-white p-2 pb-8 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.45)]"
        >
          <div className="overflow-hidden bg-neutral-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.src} alt={p.label} loading="lazy" className="block w-full" />
          </div>
          <figcaption
            className="mt-2 text-center text-[1.05rem] leading-none text-neutral-600"
            style={{ fontFamily: 'var(--font-hand)' }}
          >
            {p.label}
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}
