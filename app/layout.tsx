import type { Metadata } from 'next';
import { Inter, Sora, JetBrains_Mono, Caveat } from 'next/font/google';
import './globals.css';
import { site } from '@/config/site';
import { Header } from '@/components/site/header';
import { Footer } from '@/components/site/footer';
import { PromoBanner } from '@/components/site/promo-banner';
import { SmoothScroll } from '@/components/primitives/smooth-scroll';
import { OrganizationJsonLd, WebsiteJsonLd } from '@/components/seo/json-ld';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const sora = Sora({ subsets: ['latin'], variable: '--font-display', display: 'swap', weight: ['400', '500', '600', '700'] });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });
const hand = Caveat({ subsets: ['latin'], variable: '--font-hand', display: 'swap', weight: ['400', '600'] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    'Temenos', 'Temenos Transact', 'T24', 'core banking', 'core banking transformation',
    'Temenos Payment Hub', 'payments modernisation', 'financial crime', 'FCM',
    'banking migration', 'core banking testing', 'Temenos upgrade', 'banking technology consulting',
  ],
  authors: [{ name: site.legalName }],
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${inter.variable} ${sora.variable} ${mono.variable} ${hand.variable}`} suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('avz-theme');if(t!=='light'&&t!=='dark'){t='dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();",
          }}
        />
        <OrganizationJsonLd />
        <WebsiteJsonLd />
        <SmoothScroll />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand-600 focus:px-4 focus:py-2 focus:font-semibold focus:text-[color:var(--on-brand)]"
        >
          Skip to content
        </a>
        <PromoBanner />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
