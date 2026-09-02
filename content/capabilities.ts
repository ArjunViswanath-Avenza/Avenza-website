import type { LucideIcon } from 'lucide-react';
import {
  Landmark,
  ArrowLeftRight,
  ShieldCheck,
  DatabaseZap,
  TestTubes,
  Wrench,
  ArrowUpCircle,
  BrainCircuit,
} from 'lucide-react';

export type Capability = {
  slug: string;
  title: string;
  icon: LucideIcon;
  overline: string;
  summary: string;
  outcome: string;
  detail: string[];
  services: string[];
  platforms?: string[];
};

export const capabilities: Capability[] = [
  {
    slug: 'core-banking-transformation',
    title: 'Core Banking Transformation',
    icon: Landmark,
    overline: 'Temenos Transact / T24',
    summary:
      'Implement, customise and modernise Temenos Transact — from greenfield builds to re-platforming a decades-old core.',
    outcome: 'A modern core that moves at the speed of the business, without a rip-and-replace gamble.',
    detail: [
      'Implementation and configuration of Temenos Transact (T24) across retail, corporate and commercial models.',
      'Local development, customisation and enterprise integration architecture.',
      'Core modernisation and optimisation for banks carrying years of technical debt.',
      'Architecture reviews that de-risk transformation before a single line is changed.',
    ],
    services: ['Implementation', 'Customisation', 'Modernisation', 'Architecture', 'Local development', 'Optimisation'],
    platforms: ['Temenos Transact', 'T24'],
  },
  {
    slug: 'payments',
    title: 'Payments',
    icon: ArrowLeftRight,
    overline: 'Temenos Payment Hub',
    summary:
      'Modernise payment processing on Temenos Payment Hub — faster clearing, cleaner integration and scalable throughput.',
    outcome: 'Payment capabilities that scale with volume and adapt to new schemes without re-engineering.',
    detail: [
      'Temenos Payment Hub (TPH) implementation and payment modernisation.',
      'Scheme, channel and core integration through well-governed APIs.',
      'High-throughput payment processing engineered for resilience.',
    ],
    services: ['Payment modernisation', 'TPH integration', 'Payment processing', 'API integration'],
    platforms: ['Temenos Payment Hub'],
  },
  {
    slug: 'financial-crime-compliance',
    title: 'Financial Crime & Compliance',
    icon: ShieldCheck,
    overline: 'Temenos FCM',
    summary:
      'Strengthen financial-crime and compliance posture with Temenos FCM — monitoring, screening and regulatory technology.',
    outcome: 'Compliance that keeps pace with regulation instead of trailing it.',
    detail: [
      'Financial Crime Mitigation (FCM) implementation and compliance transformation.',
      'Transaction monitoring, screening and risk tuning.',
      'Regulatory-technology change delivered under audit-grade governance.',
    ],
    services: ['FCM', 'Compliance transformation', 'Risk & monitoring', 'Regulatory technology'],
    platforms: ['Temenos FCM'],
  },
  {
    slug: 'migration',
    title: 'Migration',
    icon: DatabaseZap,
    overline: 'Managed Migration',
    summary:
      'Move critical banking data and workloads with a controlled, rehearsed, reconciled migration — not a leap of faith.',
    outcome: 'Every record accounted for, every cutover rehearsed, every risk retired before go-live.',
    detail: [
      'Migration strategy and data-quality assessment up front.',
      'Extraction, cleansing, mapping, transformation and reconciliation with full traceability.',
      'Cutover planning and dress rehearsals that turn go-live into a non-event.',
    ],
    services: ['Migration strategy', 'Extraction', 'Cleansing', 'Mapping', 'Transformation', 'Reconciliation', 'Cutover', 'Dress rehearsal'],
  },
  {
    slug: 'testing',
    title: 'Testing',
    icon: TestTubes,
    overline: 'Managed Testing',
    summary:
      'Assure quality across the transformation lifecycle with functional, non-functional and automated testing.',
    outcome: 'Confidence to release — backed by evidence, not optimism.',
    detail: [
      'Test strategy and planning aligned to the transformation roadmap.',
      'Functional, non-functional and performance testing.',
      'Test automation, SIT and UAT delivered as a managed service.',
    ],
    services: ['Functional testing', 'Non-functional testing', 'Test automation', 'SIT', 'UAT', 'Performance testing'],
  },
  {
    slug: 'run-and-change',
    title: 'Run & Change the Bank',
    icon: Wrench,
    overline: 'Application Management',
    summary:
      'Keep the bank running while it changes — L1/L2/L3 support, enhancements and environment management under one roof.',
    outcome: 'Stable operations and steady change, without trading one off against the other.',
    detail: [
      'L1/L2/L3 production support and application management services.',
      'Enhancements and continuous change delivered alongside run.',
      'Environment and release management engineered for predictability.',
    ],
    services: ['L1/L2/L3 support', 'Application management', 'Enhancements', 'Environment management', 'Production support'],
  },
  {
    slug: 'upgrades',
    title: 'Upgrades',
    icon: ArrowUpCircle,
    overline: 'Managed Upgrades',
    summary:
      'Reduce upgrade risk and unlock new platform capabilities — technical, database and OS upgrades, assessed and executed.',
    outcome: 'New capabilities adopted sooner, with the upgrade risk engineered out.',
    detail: [
      'Upgrade assessment and customisation-impact analysis.',
      'Technical, database and operating-system upgrades.',
      'New-module implementation to unlock platform value.',
    ],
    services: ['Upgrade assessment', 'Technical upgrades', 'Database upgrades', 'OS upgrades', 'Module implementation', 'Customisation assessment'],
  },
  {
    slug: 'ai-engineering',
    title: 'AI & Banking Engineering',
    icon: BrainCircuit,
    overline: 'Human expertise, amplified',
    summary:
      'Use AI to accelerate implementation, modernisation and engineering — responsibly, with a banking expert always in the loop.',
    outcome: 'Lower implementation effort and faster delivery, with quality that stands up to audit.',
    detail: [
      'AI-assisted implementation, code conversion and migration analysis.',
      'Automated documentation, test generation and knowledge retrieval.',
      'Intelligent developer tooling that raises engineering productivity.',
    ],
    services: ['AI-assisted implementation', 'Code conversion', 'Documentation automation', 'Test generation', 'Knowledge automation', 'Developer tooling', 'AI-powered modernisation'],
  },
];

export const getCapability = (slug: string) => capabilities.find((c) => c.slug === slug);
