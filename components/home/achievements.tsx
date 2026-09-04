import { Reveal } from '@/components/primitives/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { AchievementsShowcase } from './achievements-showcase';

export function Achievements() {
  return (
    <section className="section relative border-t border-line">
      <div
        className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full blur-[130px]"
        style={{ background: 'radial-gradient(circle, rgba(242,133,0,0.14), transparent 70%)' }}
      />
      <div className="container-avz relative">
        <SectionHeading
          overline="Recognition"
          title="Recent wins we’re proud of."
          lead="A couple of moments that meant a lot to the team — and a sign of where we’re headed."
        />
        <Reveal className="mt-12">
          <AchievementsShowcase />
        </Reveal>
      </div>
    </section>
  );
}
