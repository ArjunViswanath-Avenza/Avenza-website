/**
 * Seed job data. Phase 3 loads these into the Job table; Phase 4 serves the
 * board and detail pages from the database/API. Until then the careers pages
 * read from this file so the experience is navigable. Roles are grounded in the
 * live site's openings plus representative examples.
 */
export type EmploymentType = 'Full-time' | 'Contract';
export type ExperienceLevel = 'Junior' | 'Mid' | 'Senior' | 'Lead' | 'Principal';

export type Job = {
  slug: string;
  title: string;
  department: string;
  location: string;
  employmentType: EmploymentType;
  experienceLevel: ExperienceLevel;
  minYears: number;
  technologies: string[];
  domain: string;
  postedAt: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  benefits: string[];
  aboutTeam: string;
};

export const jobDepartments = ['Delivery', 'Product', 'Pre-Sales', 'Quality Engineering', 'AI & Automation'];
export const jobLocations = ['Remote', 'Hybrid', 'On-site'];

export const jobs: Job[] = [
  {
    slug: 'senior-temenos-developer',
    title: 'Senior Temenos Developer',
    department: 'Delivery',
    location: 'Hybrid',
    employmentType: 'Full-time',
    experienceLevel: 'Senior',
    minYears: 6,
    technologies: ['Temenos Transact', 'T24', 'jBASE', 'Java', 'APIs'],
    domain: 'Core Banking',
    postedAt: '2026-08-18',
    summary:
      'Design, build and modernise Temenos Transact solutions on complex core-banking transformation programmes.',
    responsibilities: [
      'Deliver customisation, local development and integration on Temenos Transact / T24.',
      'Translate banking requirements into robust, maintainable configuration and code.',
      'Contribute to modernisation and technical-debt reduction on legacy cores.',
      'Uphold engineering quality through reviews, testing and documentation.',
    ],
    requirements: [
      '6+ years of hands-on Temenos Transact / T24 development.',
      'Strong grasp of core-banking data models and integration patterns.',
      'Experience across at least one full implementation or upgrade lifecycle.',
    ],
    niceToHave: ['Temenos certification', 'Exposure to TPH or FCM', 'CI/CD and automation experience'],
    benefits: ['Certification sponsorship', 'Global programme exposure', 'Mentorship', 'Flexible working'],
    aboutTeam: 'You will join a senior delivery pod working directly on a bank’s core transformation.',
  },
  {
    slug: 'temenos-technical-consultant',
    title: 'Temenos Technical Consultant',
    department: 'Delivery',
    location: 'Hybrid',
    employmentType: 'Full-time',
    experienceLevel: 'Mid',
    minYears: 4,
    technologies: ['Temenos Transact', 'Integration', 'APIs', 'SQL'],
    domain: 'Core Banking',
    postedAt: '2026-08-22',
    summary: 'Bridge banking requirements and Temenos technical delivery across implementation and upgrade work.',
    responsibilities: [
      'Configure and support Temenos Transact modules to meet business requirements.',
      'Support integration, environment management and release activities.',
      'Work with testing teams to resolve defects and validate changes.',
    ],
    requirements: [
      '4+ years working with Temenos Transact in a technical role.',
      'Solid understanding of banking products and workflows.',
      'Comfortable across environments, releases and integrations.',
    ],
    niceToHave: ['Temenos certification', 'Cloud exposure', 'Scripting/automation'],
    benefits: ['Certification sponsorship', 'Learning budget', 'Mentorship', 'Flexible working'],
    aboutTeam: 'A collaborative delivery team spanning implementation, upgrades and run-and-change.',
  },
  {
    slug: 'lead-product-consultant',
    title: 'Lead Product Consultant',
    department: 'Product',
    location: 'Hybrid',
    employmentType: 'Full-time',
    experienceLevel: 'Lead',
    minYears: 10,
    technologies: ['Temenos Transact', 'Banking products', 'Solution design'],
    domain: 'Core Banking',
    postedAt: '2026-08-10',
    summary: 'Lead product and functional solutioning on core-banking transformation engagements.',
    responsibilities: [
      'Own functional solution design across banking product areas.',
      'Guide clients through product decisions, gaps and configuration choices.',
      'Mentor consultants and raise the functional quality bar across the team.',
    ],
    requirements: [
      '10+ years in banking product/functional consulting on Temenos.',
      'Deep knowledge of retail and/or corporate banking product models.',
      'Proven leadership on complex transformation programmes.',
    ],
    niceToHave: ['Multiple full lifecycle implementations', 'Pre-sales exposure'],
    benefits: ['Leadership track', 'Global exposure', 'Certification sponsorship', 'Flexible working'],
    aboutTeam: 'A senior product function shaping how banks configure and adopt their core.',
  },
  {
    slug: 'pre-sales-solutioning-lead',
    title: 'Pre-Sales Solutioning Lead',
    department: 'Pre-Sales',
    location: 'Hybrid',
    employmentType: 'Full-time',
    experienceLevel: 'Principal',
    minYears: 18,
    technologies: ['Temenos', 'Solution architecture', 'Bid management'],
    domain: 'Banking Transformation',
    postedAt: '2026-07-30',
    summary: 'Shape winning solutions for banking transformation pursuits, from first conversation to proposal.',
    responsibilities: [
      'Lead solutioning and estimation for core-banking, payments and migration pursuits.',
      'Translate client challenges into compelling, deliverable solution approaches.',
      'Partner with delivery leadership to ensure what is sold can be delivered.',
    ],
    requirements: [
      '18+ years in banking technology, including senior pre-sales/solutioning.',
      'Breadth across Temenos platforms and transformation delivery.',
      'Exceptional client-facing and proposal-shaping ability.',
    ],
    niceToHave: ['Regional market knowledge', 'Partner ecosystem experience'],
    benefits: ['Strategic role', 'Global exposure', 'Flexible working'],
    aboutTeam: 'You will work at the front of the business, shaping the programmes we take on.',
  },
  {
    slug: 'qa-automation-engineer',
    title: 'QA Automation Engineer',
    department: 'Quality Engineering',
    location: 'Remote',
    employmentType: 'Full-time',
    experienceLevel: 'Mid',
    minYears: 3,
    technologies: ['Test automation', 'Selenium', 'API testing', 'CI/CD'],
    domain: 'Testing',
    postedAt: '2026-08-25',
    summary: 'Build and maintain automation frameworks that assure quality across banking transformation.',
    responsibilities: [
      'Develop and maintain automated regression and integration test suites.',
      'Integrate automated testing into delivery pipelines.',
      'Work with functional teams to expand meaningful coverage.',
    ],
    requirements: [
      '3+ years in test automation, ideally in financial services.',
      'Strong scripting and framework-building skills.',
      'Understanding of SIT/UAT and non-functional testing.',
    ],
    niceToHave: ['Banking/Temenos exposure', 'Performance testing', 'Cloud CI/CD'],
    benefits: ['Remote-first', 'Learning budget', 'Modern tooling', 'Flexible working'],
    aboutTeam: 'A quality-engineering team that treats automation as a first-class deliverable.',
  },
  {
    slug: 'ai-automation-engineer',
    title: 'AI / Automation Engineer',
    department: 'AI & Automation',
    location: 'Remote',
    employmentType: 'Full-time',
    experienceLevel: 'Senior',
    minYears: 5,
    technologies: ['Python', 'LLMs', 'Automation', 'Prompt engineering', 'APIs'],
    domain: 'AI & Engineering',
    postedAt: '2026-08-28',
    summary: 'Build the AI-assisted tooling that accelerates banking implementation, migration and documentation.',
    responsibilities: [
      'Design and build AI-assisted tooling for code conversion, docs and test generation.',
      'Keep a human-in-the-loop design at the centre of every workflow.',
      'Partner with delivery teams to embed accelerators into real programmes.',
    ],
    requirements: [
      '5+ years in software/automation engineering.',
      'Hands-on experience building with LLMs and modern AI tooling.',
      'Pragmatic, quality-first approach to applied AI.',
    ],
    niceToHave: ['Banking or Temenos exposure', 'Data engineering', 'Cloud'],
    benefits: ['Cutting-edge work', 'Remote-first', 'Learning budget', 'Flexible working'],
    aboutTeam: 'A small, high-leverage team building the AI that amplifies our engineers.',
  },
];

export const getJob = (slug: string) => jobs.find((j) => j.slug === slug);
