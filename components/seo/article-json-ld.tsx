import { site } from '@/config/site';

export function JsonLdArticle({
  title,
  description,
  date,
  slug,
}: {
  title: string;
  description: string;
  date: string;
  slug: string;
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: title,
          description,
          datePublished: date,
          author: { '@type': 'Organization', name: site.legalName },
          publisher: { '@type': 'Organization', name: site.legalName },
          mainEntityOfPage: `${site.url}/insights/${slug}`,
        }),
      }}
    />
  );
}
