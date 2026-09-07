'use client';

import { motion } from 'framer-motion';

// Deterministic scattered tilt per photo (index-based → no hydration mismatch).
const tilt = (i: number) => ((i * 41) % 11) - 5; // -5deg .. 5deg

export function TripCollage({
  tag,
  title,
  subtitle,
  photos,
}: {
  tag: string;
  title: string;
  subtitle: string;
  photos: string[];
}) {
  const list = photos.slice(0, 10);
  const front = list.slice(0, 4); // fill the cells before the centre title
  const back = list.slice(4); // fill the cells after it

  const Photo = (src: string, i: number) => (
    <motion.figure
      key={src}
      initial={{ opacity: 0, scale: 0.85, rotate: tilt(i) * 2, y: 18 }}
      whileInView={{ opacity: 1, scale: 1, rotate: tilt(i), y: 0 }}
      viewport={{ once: false, margin: '0px 0px -8% 0px' }}
      transition={{ type: 'spring', stiffness: 90, damping: 14, delay: (i % 8) * 0.05 }}
      whileHover={{ scale: 1.08, rotate: 0, zIndex: 30, transition: { type: 'spring', stiffness: 300, damping: 18 } }}
      className="aspect-square overflow-hidden rounded-xl border border-line bg-white p-1.5 shadow-[0_14px_34px_-16px_rgba(0,0,0,0.55)] lg:aspect-auto lg:h-full"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={`${title} trip`} loading="lazy" className="h-full w-full rounded-lg object-cover" />
    </motion.figure>
  );

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:h-[640px] lg:grid-cols-4 lg:grid-rows-3">
      {front.map((s, i) => Photo(s, i))}

      {/* Centre title — reserved centre cell on lg, full-width band on mobile */}
      <div className="col-span-2 flex items-center justify-center px-4 py-8 text-center lg:col-span-2 lg:col-start-2 lg:row-start-2 lg:py-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 12 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          className="max-w-[280px]"
        >
          <div className="overline mb-2">{tag}</div>
          <h2 className="text-gradient font-display text-3xl font-semibold leading-none tracking-tight sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-fg-secondary">{subtitle}</p>
        </motion.div>
      </div>

      {back.map((s, i) => Photo(s, i + 4))}
    </div>
  );
}
