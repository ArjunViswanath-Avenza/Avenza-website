import { site } from '@/config/site';

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: site.legalName,
        alternateName: site.name,
        url: site.url,
        description: site.description,
        email: site.contact.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: site.contact.address.street,
          addressLocality: site.contact.address.locality,
          addressRegion: site.contact.address.region,
          postalCode: site.contact.address.postalCode,
          addressCountry: site.contact.address.country,
        },
        sameAs: [site.social.linkedin],
      }}
    />
  );
}

export function WebsiteJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: site.name,
        url: site.url,
      }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; href: string }[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((it, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: it.name,
          item: `${site.url}${it.href}`,
        })),
      }}
    />
  );
}
