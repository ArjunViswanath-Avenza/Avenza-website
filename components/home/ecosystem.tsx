'use client';

import { useEffect, useRef, useState } from 'react';
import { ecosystemNodes } from '@/content/site-content';

const SIZE = 520;
const CENTER = SIZE / 2;
const RADIUS = 205;

type Pt = { x: number; y: number; label: string; id: string };

function nodePositions(): Pt[] {
  return ecosystemNodes.map((n) => {
    const rad = (n.angle * Math.PI) / 180;
    return {
      id: n.id,
      label: n.label,
      x: CENTER + RADIUS * Math.cos(rad),
      y: CENTER + RADIUS * Math.sin(rad),
    };
  });
}

/**
 * Interactive banking ecosystem: a hub-and-spoke network where data flows
 * animate along the spokes and the whole graph parallaxes to the cursor.
 * Fully static + still under prefers-reduced-motion.
 */
export function Ecosystem() {
  const nodes = nodePositions();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState<string | null>(null);
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const el = wrapRef.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        setParallax({ x: nx * 26, y: ny * 26 });
        // Nearest node highlight
        const px = CENTER + nx * SIZE;
        const py = CENTER + ny * SIZE;
        let best: string | null = null;
        let bestD = Infinity;
        for (const n of nodes) {
          const d = (n.x - px) ** 2 + (n.y - py) ** 2;
          if (d < bestD) {
            bestD = d;
            best = n.id;
          }
        }
        setActive(best);
      });
    };
    const onLeave = () => {
      setParallax({ x: 0, y: 0 });
      setActive(null);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [reduced, nodes]);

  return (
    <div ref={wrapRef} className="relative mx-auto aspect-square w-full max-w-[560px]" aria-hidden>
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(242,133,0,0.26), transparent 70%)' }}
      />
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="relative h-full w-full"
        style={{
          transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
          transition: reduced ? undefined : 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <defs>
          <radialGradient id="hub" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--brand-400)" />
            <stop offset="100%" stopColor="var(--brand-700)" />
          </radialGradient>
          <linearGradient id="flow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--accent-teal)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--accent-teal)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--brand-400)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Orbit ring */}
        <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="var(--border-hairline)" strokeWidth="1" />
        <circle cx={CENTER} cy={CENTER} r={RADIUS * 0.62} fill="none" stroke="var(--border-hairline)" strokeWidth="1" strokeDasharray="2 6" />

        {/* Spokes + animated flow */}
        {nodes.map((n, i) => {
          const isActive = active === n.id;
          return (
            <g key={n.id}>
              <line
                x1={CENTER}
                y1={CENTER}
                x2={n.x}
                y2={n.y}
                stroke={isActive ? 'var(--brand-400)' : 'var(--border-strong)'}
                strokeWidth={isActive ? 1.5 : 1}
                style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
              />
              {!reduced && (
                <line
                  x1={CENTER}
                  y1={CENTER}
                  x2={n.x}
                  y2={n.y}
                  stroke="url(#flow)"
                  strokeWidth="2.5"
                  strokeDasharray="14 210"
                  className="avz-flow"
                  style={{ animationDelay: `${i * 0.5}s` }}
                />
              )}
            </g>
          );
        })}

        {/* Outer nodes */}
        {nodes.map((n) => {
          const isActive = active === n.id;
          return (
            <g key={`node-${n.id}`} style={{ transition: 'transform 0.3s' }}>
              <circle
                cx={n.x}
                cy={n.y}
                r={isActive ? 8 : 6}
                fill={isActive ? 'var(--accent-teal)' : 'var(--ink-700)'}
                stroke={isActive ? 'var(--accent-teal)' : 'var(--brand-400)'}
                strokeWidth="1.5"
                style={{ transition: 'r 0.25s, fill 0.25s' }}
              />
              <text
                x={n.x}
                y={n.y > CENTER ? n.y + 22 : n.y - 14}
                textAnchor="middle"
                className="font-mono"
                style={{ fontSize: 11, letterSpacing: '0.03em' }}
                fill={isActive ? 'var(--text-primary)' : 'var(--text-muted)'}
              >
                {n.label}
              </text>
            </g>
          );
        })}

        {/* Hub */}
        <circle cx={CENTER} cy={CENTER} r="42" fill="url(#hub)" />
        <circle cx={CENTER} cy={CENTER} r="42" fill="none" stroke="var(--brand-300)" strokeOpacity="0.4" strokeWidth="1" />
        {!reduced && (
          <circle cx={CENTER} cy={CENTER} r="42" fill="none" stroke="var(--accent-teal)" strokeWidth="1.5" className="avz-pulse" />
        )}
        <text x={CENTER} y={CENTER + 5} textAnchor="middle" className="font-display" style={{ fontSize: 17, fontWeight: 700 }} fill="var(--ink-950)">
          Avenza
        </text>
      </svg>

      <style jsx>{`
        .avz-flow {
          animation: avz-dash 3s linear infinite;
        }
        @keyframes avz-dash {
          from {
            stroke-dashoffset: 224;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        .avz-pulse {
          transform-origin: center;
          animation: avz-pulse 3.5s ease-out infinite;
        }
        @keyframes avz-pulse {
          0% {
            r: 42px;
            opacity: 0.7;
          }
          100% {
            r: 62px;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
