import { Reveal } from '@/components/primitives/reveal';
import { Button } from '@/components/ui/button';

export function CtaBand({
  title = 'Ready to talk about your transformation?',
  body = 'Whether you are modernising a core, transforming payments or planning a migration — start with a conversation, not a pitch.',
  primaryLabel = 'Start a conversation',
  primaryHref = '/contact',
  secondaryLabel = 'Explore careers',
  secondaryHref = '/careers',
}: {
  title?: string;
  body?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="section">
      <div className="container-avz">
        <Reveal className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-brand-700/25 via-ink-850 to-ink-900 p-10 lg:p-16">
          <div className="grid-lines pointer-events-none absolute inset-0 opacity-[0.2]" />
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(242,133,0,0.32), transparent 70%)' }}
          />
          <div className="relative max-w-2xl">
            <h2 className="text-h2 text-balance">{title}</h2>
            <p className="text-lead mt-4">{body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={primaryHref} size="lg" withArrow>
                {primaryLabel}
              </Button>
              <Button href={secondaryHref} size="lg" variant="secondary">
                {secondaryLabel}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
