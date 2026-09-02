import type { Metadata } from 'next';
import { PageHero } from '@/components/site/page-hero';
import { ContactWizard } from '@/components/contact/contact-wizard';
import { site } from '@/config/site';
import { Mail, Linkedin, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: "Let's Talk",
  description:
    'Start a conversation about your banking transformation — core modernisation, payments, migration, upgrades, testing or AI-enabled engineering.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        overline="Let's talk"
        title="Start with a conversation, not a pitch."
        lead="Tell us what you're trying to achieve. We'll come back with people who understand banking — and a point of view, not a brochure."
        breadcrumb={[{ name: 'Contact', href: '/contact' }]}
      />
      <section className="section">
        <div className="container-avz grid gap-12 lg:grid-cols-[1.4fr_0.8fr] lg:gap-16">
          <div className="rounded-3xl border border-line bg-ink-850/40 p-6 lg:p-10">
            <ContactWizard />
          </div>
          <aside className="space-y-6">
            <div className="rounded-2xl border border-line bg-ink-850/60 p-6">
              <div className="overline mb-4">Prefer to reach us directly?</div>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-brand-400" />
                  <a href={`mailto:${site.contact.email}`} className="text-sm text-fg-secondary hover:text-fg">{site.contact.email}</a>
                </li>
                <li className="flex items-center gap-3">
                  <Linkedin className="h-4 w-4 text-brand-400" />
                  <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-fg-secondary hover:text-fg">LinkedIn</a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                  <address className="not-italic text-sm leading-relaxed text-fg-secondary">
                    {site.contact.officeLines.map((line) => (
                      <span key={line} className="block">{line}</span>
                    ))}
                  </address>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-line bg-gradient-to-br from-brand-700/20 to-ink-850 p-6">
              <div className="overline mb-2">Looking to join us?</div>
              <p className="text-sm text-fg-secondary">We're hiring across delivery, product, quality and AI.</p>
              <a href="/careers" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-400 hover:text-brand-300">
                Explore careers →
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
