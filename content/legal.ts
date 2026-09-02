/** Placeholder legal copy. Replace with client-approved policies before launch. */
export type LegalDoc = { slug: string; title: string; updated: string; sections: { heading: string; body: string[] }[] };

const placeholderNotice =
  '[PLACEHOLDER — replace with client-approved legal text reviewed by counsel before launch.]';

export const legalDocs: LegalDoc[] = [
  {
    slug: 'privacy',
    title: 'Privacy Policy',
    updated: '2026-09-01',
    sections: [
      { heading: 'Overview', body: [placeholderNotice, 'This policy explains how Avenza collects, uses and protects personal information submitted through this website, including contact enquiries and job applications.'] },
      { heading: 'Information we collect', body: ['Contact details and any information you choose to provide through enquiry and application forms, including uploaded resumes.'] },
      { heading: 'How we use it', body: ['To respond to enquiries, manage recruitment, and operate the website. We do not sell personal information.'] },
      { heading: 'Data retention & your rights', body: [placeholderNotice] },
    ],
  },
  {
    slug: 'cookies',
    title: 'Cookie Policy',
    updated: '2026-09-01',
    sections: [
      { heading: 'Overview', body: [placeholderNotice, 'This website uses only essential cookies by default. Analytics are configurable and privacy-preserving.'] },
      { heading: 'Managing cookies', body: ['You can control cookies through your browser settings.'] },
    ],
  },
  {
    slug: 'terms',
    title: 'Terms of Use',
    updated: '2026-09-01',
    sections: [
      { heading: 'Overview', body: [placeholderNotice, 'These terms govern use of the Avenza website.'] },
      { heading: 'Acceptable use', body: ['You agree to use this website lawfully and not to misuse its forms or services.'] },
    ],
  },
  {
    slug: 'accessibility',
    title: 'Accessibility Statement',
    updated: '2026-09-01',
    sections: [
      { heading: 'Our commitment', body: ['Avenza is committed to WCAG 2.2 AA principles: keyboard navigation, visible focus, semantic structure, sufficient contrast and reduced-motion support.'] },
      { heading: 'Feedback', body: ['If you encounter an accessibility barrier, please contact us so we can address it.'] },
    ],
  },
];

export const getLegalDoc = (slug: string) => legalDocs.find((d) => d.slug === slug);
