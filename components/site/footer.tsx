import Link from 'next/link';
import { Linkedin, ArrowUpRight } from 'lucide-react';
import { site, footerNav } from '@/config/site';
import { Logo } from './logo';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-line bg-ink-950">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-[0.15]" />
      <div className="container-avz relative py-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-fg-muted">{site.tagline}</p>
            <p className="mt-4 text-sm leading-relaxed text-fg-secondary">
              Deep Temenos expertise, modern engineering and proven delivery for banking transformation.
            </p>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-fg-secondary transition-colors hover:border-brand-400/60 hover:text-fg"
              aria-label="Avenza on LinkedIn"
            >
              <Linkedin className="h-4.5 w-4.5" />
            </a>
          </div>

          <FooterCol title="Company" links={footerNav.company} />
          <FooterCol title="Technology" links={footerNav.technology} />

          <div>
            <h3 className="overline mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={`mailto:${site.contact.email}`} className="text-fg-secondary transition-colors hover:text-fg">
                  {site.contact.email}
                </a>
              </li>
              <li>
                <address className="not-italic leading-relaxed text-fg-muted">
                  {site.contact.officeLines.map((line) => (
                    <span key={line} className="block">{line}</span>
                  ))}
                </address>
              </li>
              <li>
                <Link href="/contact" className="inline-flex items-center gap-1 text-brand-400 hover:text-brand-300">
                  Start a conversation <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 text-sm text-fg-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {footerNav.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-fg-secondary">
                  {l.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { title: string; href: string }[] }) {
  return (
    <div>
      <h3 className="overline mb-4">{title}</h3>
      <ul className="space-y-3 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-fg-secondary transition-colors hover:text-fg">
              {l.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
