import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { capabilities } from '@/content/capabilities';
import { solutions } from '@/content/solutions';
import { accelerators } from '@/content/accelerators';
import { industries } from '@/content/site-content';
import { insights } from '@/content/insights';
import { jobs } from '@/content/jobs';
import { legalDocs } from '@/content/legal';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const staticRoutes = ['', '/about', '/capabilities', '/solutions', '/industries', '/accelerators', '/insights', '/case-studies', '/careers', '/careers/jobs', '/contact'];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${base}${r}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: r === '' ? 1 : 0.8,
  }));

  const dynamic: [string, { slug: string }[]][] = [
    ['/capabilities', capabilities],
    ['/solutions', solutions],
    ['/accelerators', accelerators],
    ['/industries', industries.map((i) => ({ slug: i.slug }))],
    ['/insights', insights],
    ['/careers/jobs', jobs],
    ['/legal', legalDocs],
  ];

  for (const [prefix, items] of dynamic) {
    for (const it of items) {
      entries.push({ url: `${base}${prefix}/${it.slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 });
    }
  }

  return entries;
}
