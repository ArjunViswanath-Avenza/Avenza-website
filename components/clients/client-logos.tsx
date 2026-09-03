import { Reveal } from '@/components/primitives/reveal';
import { ClientCarousel } from './client-carousel';

export function ClientLogos({
  overline = 'Clients & partners',
  title = 'Banks and financial institutions we’ve worked with.',
  lead = 'Our people have delivered on transformation, testing and support programmes for banks and financial institutions across markets.',
}: {
  overline?: string;
  title?: string;
  lead?: string;
}) {
  return (
    <section className="section relative border-t border-line">
      <div className="container-avz">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="overline mb-4">{overline}</div>
          <h2 className="text-h2 text-balance">{title}</h2>
          {lead && <p className="text-lead mt-4">{lead}</p>}
        </Reveal>
      </div>

      {/* Full-bleed carousel so logos scroll edge to edge */}
      <Reveal className="mt-12">
        <div className="mx-auto max-w-6xl px-4">
          <ClientCarousel />
        </div>
      </Reveal>

      <div className="container-avz">
        <p className="mt-8 text-center text-xs text-fg-faint">
          Logos are the property of their respective owners and shown to indicate experience.
        </p>
      </div>
    </section>
  );
}
