'use client';

import { LogoImg } from './logo-img';
import { clients } from '@/content/clients';

/**
 * Infinite, seamless auto-scrolling logo carousel showing 4 logos at a time
 * (2 on small screens). The list is rendered twice and the track animates to
 * -50%, so it loops without a visible jump. Pauses on hover; static under
 * prefers-reduced-motion.
 */
export function ClientCarousel() {
  const total = clients.length * 2; // list rendered twice
  const duration = clients.length * 5; // seconds — keeps speed consistent as logos change

  return (
    <div className="avz-marquee">
      <div
        className="avz-track"
        style={{ ['--total']: total, ['--dur']: `${duration}s` } as React.CSSProperties}
      >
        {[...clients, ...clients].map((client, i) => (
          <div className="avz-item" key={`${client.name}-${i}`} aria-hidden={i >= clients.length}>
            <div className="flex h-28 items-center justify-center rounded-xl border border-line bg-white px-5 transition-all duration-[var(--dur-slow)] ease-[var(--ease-out-expo)] hover:border-brand-400/50 hover:shadow-lg">
              <LogoImg src={client.logo} name={client.name} imgClass={client.imgClass} />
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .avz-marquee {
          --visible: 4;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(
            90deg,
            transparent 0,
            #000 6%,
            #000 94%,
            transparent 100%
          );
          mask-image: linear-gradient(90deg, transparent 0, #000 6%, #000 94%, transparent 100%);
        }
        .avz-track {
          display: flex;
          width: calc(var(--total) / var(--visible) * 100%);
          animation: avz-scroll var(--dur) linear infinite;
        }
        .avz-marquee:hover .avz-track {
          animation-play-state: paused;
        }
        .avz-item {
          flex: 0 0 auto;
          width: calc(100% / var(--total));
          padding-inline: 0.5rem;
          box-sizing: border-box;
        }
        @keyframes avz-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @media (max-width: 640px) {
          .avz-marquee {
            --visible: 2;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .avz-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
