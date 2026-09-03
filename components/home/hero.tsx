import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Ecosystem } from './ecosystem';
import { Button } from '@/components/ui/button';
import { trustPoints } from '@/content/site-content';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 lg:pt-40">
      {/* Background field */}
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(242,133,0,0.22), transparent 68%)' }}
      />

      <div className="container-avz relative">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* Copy */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-fill-2 px-3.5 py-1.5 text-xs text-fg-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-teal" />
              Banking technology transformation
            </div>

            <h1 className="text-display mt-6">
              Engineering the
              <br />
              <span className="text-gradient">future of banking.</span>
            </h1>

            <p className="text-lead mt-6 max-w-xl">
              Avenza modernises core banking, payments and financial-crime platforms — combining deep
              Temenos expertise with modern engineering, AI and proven delivery.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href="/contact" size="lg" withArrow>
                Start a conversation
              </Button>
              <Button href="/capabilities" size="lg" variant="secondary">
                Explore capabilities
              </Button>
            </div>

            {/* Quick answers row */}
            <div className="mt-12 flex flex-wrap gap-x-6 gap-y-3">
              {trustPoints.slice(0, 4).map((t) => (
                <div key={t} className="flex items-center gap-2 text-sm text-fg-muted">
                  <span className="h-1 w-1 rounded-full bg-brand-400" />
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Visualization */}
          <div className="relative">
            <Ecosystem />
          </div>
        </div>

        {/* Platform strip */}
        <div className="mt-16 flex flex-col gap-4 border-t border-line py-6 md:flex-row md:items-center md:justify-between lg:mt-24">
          <span className="overline">Specialised platform expertise</span>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-sm text-fg-secondary">
            <span>Temenos Transact / T24</span>
            <span className="hidden text-line-strong md:inline">·</span>
            <span>Temenos Payment Hub</span>
            <span className="hidden text-line-strong md:inline">·</span>
            <span>Temenos FCM</span>
            <Link href="/capabilities" className="inline-flex items-center gap-1 text-brand-400 hover:text-brand-300">
              All capabilities <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
