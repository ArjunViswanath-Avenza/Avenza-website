import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/primitives/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { capabilities } from '@/content/capabilities';

export function CapabilitiesSection() {
  return (
    <section className="section relative border-t border-line">
      <div className="container-avz">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            overline="Capabilities"
            title="Specialised across the banking-platform lifecycle."
            lead="Eight capabilities that span the whole transformation — from core and payments to migration, testing, upgrades and AI-enabled engineering."
            className="max-w-2xl"
          />
          <Link
            href="/capabilities"
            className="hidden shrink-0 items-center gap-1 text-sm font-medium text-brand-400 hover:text-brand-300 sm:inline-flex"
          >
            View all capabilities <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <Reveal key={cap.slug} delay={(i % 4) * 60}>
                <Link
                  href={`/capabilities/${cap.slug}`}
                  className="group flex h-full flex-col justify-between gap-8 bg-ink-900 p-6 transition-colors hover:bg-ink-850"
                >
                  <div className="flex items-start justify-between">
                    <Icon className="h-6 w-6 text-brand-400 transition-colors group-hover:text-teal" />
                    <ArrowUpRight className="h-4 w-4 -translate-x-1 translate-y-1 text-fg-faint opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                  </div>
                  <div>
                    <div className="mb-1 font-mono text-[0.7rem] uppercase tracking-wider text-fg-faint">
                      {cap.overline}
                    </div>
                    <h3 className="text-[1.05rem] font-semibold leading-snug text-fg">{cap.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-fg-muted">{cap.summary}</p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
