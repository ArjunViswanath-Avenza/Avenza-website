/**
 * Site-level configuration and the single source of truth for company-level
 * facts. VERIFIED-DATA POLICY: any hard number a bank could check must live here
 * and default to a clearly-marked placeholder until the client confirms it.
 * In Phase 5 these move to the SiteConfiguration table (editable in /admin).
 */

export const site = {
  name: 'Avenza',
  legalName: 'Avenza Consulting Services Private Limited',
  domain: 'avenza-consulting.com',
  url: 'https://www.avenza-consulting.com',
  tagline: 'Engineering the future of banking.',
  description:
    'Avenza modernises core banking, payments and financial-crime platforms — combining deep Temenos expertise with modern engineering, AI and proven delivery.',
  founded: '2025',
  logo: {
    // Current low-res raster from the live Wix site. Flagged for replacement.
    placeholderSrc:
      'https://static.wixstatic.com/media/11062b_255717acdd2b4eebb0d592a02944df3ef000.jpg',
    note: 'REPLACE with a high-res SVG/PNG supplied by the client. See /public/brand/README.',
  },
  contact: {
    email: 'info@avenza-consulting.com',
    careersEmail: 'info@avenza-consulting.com',
    phone: '[INSERT VERIFIED PHONE]',
    // Verified office address (client-confirmed).
    officeLines: [
      '43/B, 1st Main Road',
      'Sarakki Industrial Layout, 3rd Phase',
      'JP Nagar, Bengaluru – 560 078',
    ],
    office: '43/B, 1st Main Road, Sarakki Industrial Layout, 3rd Phase, JP Nagar, Bengaluru – 560 078',
    address: {
      street: '43/B, 1st Main Road, Sarakki Industrial Layout, 3rd Phase',
      locality: 'Bengaluru',
      region: 'Karnataka',
      postalCode: '560 078',
      country: 'IN',
    },
  },
  social: {
    linkedin: 'https://www.linkedin.com/company/avenza-consulting-services/',
  },
} as const;

/**
 * Verified metrics. Only ONE claim on the current site is concrete
 * ("15+ years average experience"). Everything else is a placeholder for the
 * client to confirm; components render placeholders as an obvious editorial flag.
 */
export const metrics = {
  avgExperienceYears: { value: '15+', label: 'Years avg. core-banking experience', verified: true },
  certifiedSpecialists: { value: '[INSERT VERIFIED]', label: 'Temenos-certified specialists', verified: false },
  transformationPrograms: { value: '[INSERT VERIFIED]', label: 'Transformation programs delivered', verified: false },
  countriesServed: { value: '[INSERT VERIFIED]', label: 'Countries served', verified: false },
  acceleratorsBuilt: { value: '[INSERT VERIFIED]', label: 'Proprietary accelerators', verified: false },
} as const;

export type NavChild = {
  title: string;
  href: string;
  description?: string;
};

export type NavItem = {
  title: string;
  href: string;
  children?: NavChild[];
  featured?: { title: string; description: string; href: string };
};

export const primaryNav: NavItem[] = [
  { title: 'About', href: '/about' },
  {
    title: 'Capabilities',
    href: '/capabilities',
    featured: {
      title: 'AI & Banking Engineering',
      description: 'Human expertise, amplified by intelligent engineering.',
      href: '/capabilities/ai-engineering',
    },
    children: [
      { title: 'Core Banking Transformation', href: '/capabilities/core-banking-transformation', description: 'Temenos Transact / T24 implementation & modernisation.' },
      { title: 'Payments', href: '/capabilities/payments', description: 'Temenos Payment Hub, modernisation, integration.' },
      { title: 'Financial Crime & Compliance', href: '/capabilities/financial-crime-compliance', description: 'FCM, monitoring, regulatory technology.' },
      { title: 'Migration', href: '/capabilities/migration', description: 'Strategy, ETL, reconciliation, cutover.' },
      { title: 'Testing', href: '/capabilities/testing', description: 'Functional, non-functional, automation, SIT/UAT.' },
      { title: 'Run & Change', href: '/capabilities/run-and-change', description: 'L1/L2/L3 support, AMS, environments.' },
      { title: 'Upgrades', href: '/capabilities/upgrades', description: 'Assessment, technical & DB/OS upgrades.' },
      { title: 'AI & Engineering', href: '/capabilities/ai-engineering', description: 'AI-assisted implementation & modernisation.' },
    ],
  },
  {
    title: 'Solutions',
    href: '/solutions',
    children: [
      { title: 'Core Modernisation', href: '/solutions/core-modernisation', description: 'Modernise the core without losing continuity.' },
      { title: 'Payments Transformation', href: '/solutions/payments-transformation', description: 'Faster, more scalable payment capabilities.' },
      { title: 'Platform Migration', href: '/solutions/platform-migration', description: 'Move critical data & workloads with confidence.' },
      { title: 'Platform Upgrade', href: '/solutions/platform-upgrade', description: 'Reduce upgrade risk, accelerate adoption.' },
      { title: 'Intelligent Testing', href: '/solutions/intelligent-testing', description: 'Automate quality across the lifecycle.' },
      { title: 'AI-Enabled Engineering', href: '/solutions/ai-enabled-engineering', description: 'Use AI to accelerate delivery.' },
    ],
  },
  {
    title: 'Industries',
    href: '/industries',
    children: [
      { title: 'Retail Banking', href: '/industries/retail-banking' },
      { title: 'Corporate Banking', href: '/industries/corporate-banking' },
      { title: 'Commercial Banking', href: '/industries/commercial-banking' },
      { title: 'Payments', href: '/industries/payments' },
      { title: 'Financial Services', href: '/industries/financial-services' },
      { title: 'FinTech', href: '/industries/fintech' },
    ],
  },
  { title: 'Accelerators', href: '/accelerators' },
  { title: 'Insights', href: '/insights' },
  { title: 'Careers', href: '/careers' },
];

export const footerNav = {
  company: [
    { title: 'About', href: '/about' },
    { title: 'Capabilities', href: '/capabilities' },
    { title: 'Solutions', href: '/solutions' },
    { title: 'Industries', href: '/industries' },
    { title: 'Insights', href: '/insights' },
    { title: 'Careers', href: '/careers' },
    { title: 'Contact', href: '/contact' },
  ],
  technology: [
    { title: 'Core Banking', href: '/capabilities/core-banking-transformation' },
    { title: 'Payments', href: '/capabilities/payments' },
    { title: 'AI & Engineering', href: '/capabilities/ai-engineering' },
    { title: 'Migration', href: '/capabilities/migration' },
    { title: 'Testing', href: '/capabilities/testing' },
  ],
  legal: [
    { title: 'Privacy Policy', href: '/legal/privacy' },
    { title: 'Cookie Policy', href: '/legal/cookies' },
    { title: 'Terms', href: '/legal/terms' },
    { title: 'Accessibility', href: '/legal/accessibility' },
  ],
};
