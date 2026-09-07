'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

/**
 * Ambient trip video — autoplays muted and loops, with NO browser controls.
 * The only control is a mute/unmute toggle.
 */
export function TripVideo({ src, overlayText }: { src: string; overlayText?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  // Ensure autoplay works reliably (React can miss the `muted` attribute).
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  function toggle() {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) v.play().catch(() => {});
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-line bg-black">
      <video
        ref={ref}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        controlsList="nodownload noplaybackrate"
        preload="auto"
        className="aspect-video w-full object-cover"
      />

      {/* Big centered overlay text */}
      {overlayText && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-black/25" />
          <span className="relative font-display text-5xl font-bold tracking-tight text-white drop-shadow-[0_6px_28px_rgba(0,0,0,0.6)] sm:text-7xl lg:text-8xl">
            {overlayText}
          </span>
        </div>
      )}

      {/* Only control: mute / unmute */}
      <button
        onClick={toggle}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
        className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white ring-1 ring-white/20 backdrop-blur transition-colors hover:bg-black/70"
      >
        {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </button>
    </div>
  );
}
