'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/** Lenis smooth scroll, disabled when the user prefers reduced motion. */
export function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Allow disabling smooth scroll (used for automated screenshots/tests).
    const disabled = prefersReduced || new URLSearchParams(window.location.search).has('nosmooth');
    if (disabled) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
