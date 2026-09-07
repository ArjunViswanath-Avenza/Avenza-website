import type { Metadata } from 'next';
import { TripVideo } from '@/components/life/trip-video';
import { TripCollage } from '@/components/life/trip-collage';
import { LifeCarousel } from '@/components/life/life-carousel';
import { LifeGallery } from '@/components/life/life-gallery';
import { CtaBand } from '@/components/site/cta-band';
import { lifeIntro, yercaud } from '@/content/life';

export const metadata: Metadata = {
  title: 'Life @ Avenza',
  description:
    'The people, moments and mischief behind Avenza — meetups, celebrations, offsites, learning and giving back. Serious about banking, not so serious about ourselves.',
  alternates: { canonical: '/life' },
};

const vibeTags = [
  '☕ Coffee & code',
  '🎉 Celebrations',
  '🏏 Friday cricket',
  '🎓 Cert wins',
  '🧠 Always learning',
  '🤝 Giving back',
  '🏝️ Offsites',
  '🎮 Game nights',
];

export default function LifePage() {
  return (
    <>
      {/* Latest trip — Yercaud (single photo-rectangle collage + resort video) */}
      <section className="pt-32 lg:pt-36">
        <div className="container-avz">
          <TripCollage tag={yercaud.tag} title={yercaud.title} subtitle={yercaud.subtitle} photos={yercaud.photos} />

          {/* Resort stay — video (left, ~50%) + write-up (right) */}
          <div className="mt-16 grid items-center gap-8 lg:mt-24 lg:grid-cols-2 lg:gap-12">
            <TripVideo src={yercaud.video} />
            <div>
              <h2 className="text-h2 text-balance">{yercaud.stayHeading}</h2>
              <p className="text-lead mt-4">{yercaud.stayBody}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {yercaud.highlights.map((h) => (
                  <span key={h} className="rounded-full border border-line bg-elevated px-3.5 py-1.5 text-sm text-fg-secondary">
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured carousel */}
      <section className="section border-t border-line">
        <div className="container-avz">
          <div className="overline mb-4">{lifeIntro.overline}</div>
          <LifeCarousel />
        </div>
      </section>

      {/* Intro + gallery */}
      <section className="section">
        <div className="container-avz">
          <div className="max-w-2xl">
            <h2 className="text-h2 text-balance">{lifeIntro.title}</h2>
            <p className="text-lead mt-4">{lifeIntro.lead}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {vibeTags.map((t) => (
                <span key={t} className="rounded-full border border-line bg-elevated px-3.5 py-1.5 text-sm text-fg-secondary">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-14">
            <LifeGallery />
          </div>

          <p className="mt-10 text-center text-xs text-fg-faint">
            Snapshots from Avenza life. Add your own photos in <code className="font-mono">/public/life</code>.
          </p>
        </div>
      </section>

      <CtaBand
        title="Like what you see?"
        body="If this looks like your kind of place, come build banking technology with people who actually enjoy the work — and each other."
        primaryLabel="View open roles"
        primaryHref="/careers/jobs"
        secondaryLabel="Why Avenza"
        secondaryHref="/careers"
      />
    </>
  );
}
