import { Reveal } from '@/components/primitives/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { TeamPhoto } from './team-photo';
import { leadership } from '@/content/team';

export function Leadership() {
  return (
    <section id="leadership" className="section relative overflow-hidden border-t border-line scroll-mt-24">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-[0.12] [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[700px] -translate-x-1/2 blur-[130px]"
        style={{ background: 'radial-gradient(circle, rgba(242,133,0,0.14), transparent 68%)' }}
      />
      <div className="container-avz relative">
        <SectionHeading
          overline="Leadership"
          title="The brains behind Avenza."
          lead="The people who set the direction, win the work and make delivery dependable — the reason banks trust us with their transformation."
        />

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {leadership.map((leader, i) => (
            <Reveal key={leader.slug} delay={i * 100}>
              <article className="group relative flex h-full flex-col items-center rounded-2xl border border-line bg-elevated p-8 text-center transition-all duration-[var(--dur-slow)] ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-brand-400/60">
                {/* Avatar */}
                <div className="relative mb-6 h-48 w-48 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600/12 to-ink-850 ring-1 ring-line transition-shadow duration-[var(--dur-slow)] group-hover:ring-brand-400/50">
                  <TeamPhoto src={leader.photo} name={leader.name} initials={leader.initials} />
                </div>

                <h3 className="text-lg font-semibold text-fg">{leader.name}</h3>
                <div className="mt-1.5 font-mono text-[0.7rem] uppercase tracking-wider text-brand-600">{leader.role}</div>
                <div className="mx-auto mt-4 h-px w-8 bg-line-strong transition-all duration-[var(--dur-slow)] group-hover:w-12 group-hover:bg-brand-600" />
                <p className="mt-4 text-sm leading-relaxed text-fg-muted">{leader.focus}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
