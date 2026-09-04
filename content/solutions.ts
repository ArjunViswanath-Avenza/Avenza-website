export type Solution = {
  slug: string;
  title: string;
  promise: string;
  problem: string;
  whyItMatters: string;
  approach: string[];
  capabilities: string[]; // capability slugs
  outcomes: string[];
  relatedAccelerators: string[]; // accelerator slugs
};

export const solutions: Solution[] = [
  {
    slug: 'core-modernisation',
    title: 'Core Modernisation',
    promise: 'Modernise your banking core without losing business continuity.',
    problem:
      'A legacy core accumulates customisation, technical debt and operational risk until every change becomes slow, expensive and fragile.',
    whyItMatters:
      'The core is where products, compliance and customer experience all converge. Modernising it safely is the difference between a bank that can launch and one that cannot.',
    approach: [
      'Assess the current core, customisations and integration surface to build a fact-based transformation baseline.',
      'Design a target architecture and a sequenced, continuity-first modernisation path.',
      'Transform incrementally — proving each step with automated testing and reconciliation before the next.',
    ],
    capabilities: ['core-banking-transformation', 'migration', 'testing', 'ai-engineering'],
    outcomes: [
      'A modern, maintainable core with technical debt retired deliberately.',
      'Faster time-to-market for new products and regulatory change.',
      'Transformation delivered without disrupting live banking operations.',
    ],
    relatedAccelerators: ['es6-transformation', 'ci-cd-devops-solution', 'rsa-encryption'],
  },
  {
    slug: 'payments-transformation',
    title: 'Payments Transformation',
    promise: 'Build faster, more scalable payment capabilities.',
    problem:
      'Fragmented payment flows and point-to-point integrations make new schemes slow to adopt and volume hard to scale.',
    whyItMatters:
      'Payments are the most visible, most real-time part of the bank. Modern payment capability is now a baseline expectation, not a differentiator to defer.',
    approach: [
      'Map current payment flows, schemes and integration points.',
      'Modernise onto Temenos Payment Hub with governed, reusable APIs.',
      'Assure throughput and resilience with non-functional and performance testing.',
    ],
    capabilities: ['payments', 'testing', 'run-and-change'],
    outcomes: [
      'Scalable payment processing ready for new schemes and volume.',
      'Cleaner integration that lowers the cost of future change.',
      'Resilience proven before production, not discovered in it.',
    ],
    relatedAccelerators: ['api-automation', 'ci-cd-devops-solution'],
  },
  {
    slug: 'platform-migration',
    title: 'Banking Platform Migration',
    promise: 'Move critical banking data and workloads with confidence.',
    problem:
      'Migrations fail on the details — data quality, reconciliation, and an under-rehearsed cutover that only reveals its gaps at go-live.',
    whyItMatters:
      'A migration touches every customer and every balance. There is no partial credit: it either reconciles or it does not.',
    approach: [
      'Profile and remediate data quality before mapping begins.',
      'Extract, cleanse, map, transform and reconcile with end-to-end traceability.',
      'Rehearse the cutover until go-live is a controlled, measured event.',
    ],
    capabilities: ['migration', 'testing', 'ai-engineering'],
    outcomes: [
      'Full reconciliation with a documented audit trail.',
      'A rehearsed, low-risk cutover with clear rollback triggers.',
      'Migration effort reduced through reusable accelerators.',
    ],
    relatedAccelerators: ['es6-transformation', 'api-automation', 'smart-card-scan'],
  },
  {
    slug: 'platform-upgrade',
    title: 'Platform Upgrade',
    promise: 'Reduce upgrade risk and accelerate adoption of new capabilities.',
    problem:
      'Upgrades stall because the impact on years of customisation is unknown, so banks defer — and fall further behind.',
    whyItMatters:
      'Every deferred upgrade widens the gap to current platform capability and compounds future risk and cost.',
    approach: [
      'Assess customisation impact and upgrade readiness.',
      'Execute technical, database and OS upgrades under controlled governance.',
      'Adopt new modules to convert the upgrade into business value.',
    ],
    capabilities: ['upgrades', 'testing', 'run-and-change'],
    outcomes: [
      'A predictable, de-risked upgrade path.',
      'New platform capabilities adopted, not just installed.',
      'Reduced customisation-impact surprises at go-live.',
    ],
    relatedAccelerators: ['ci-cd-devops-solution', 'api-automation'],
  },
  {
    slug: 'intelligent-testing',
    title: 'Intelligent Testing',
    promise: 'Automate quality across the transformation lifecycle.',
    problem:
      'Manual testing cannot keep pace with a modern transformation programme — coverage lags, regressions slip through, and release confidence erodes.',
    whyItMatters:
      'In banking, an undetected defect is not a bug ticket — it is a regulatory, financial or reputational event.',
    approach: [
      'Build a risk-based test strategy across functional and non-functional scope.',
      'Automate regression and integration testing with reusable frameworks.',
      'Generate and maintain test cases faster with AI assistance.',
    ],
    capabilities: ['testing', 'ai-engineering'],
    outcomes: [
      'Higher coverage with lower manual effort.',
      'Faster, more confident releases.',
      'Quality evidence ready for audit and sign-off.',
    ],
    relatedAccelerators: ['api-automation', 'ci-cd-devops-solution'],
  },
  {
    slug: 'ai-enabled-engineering',
    title: 'AI-Enabled Banking Engineering',
    promise: 'Use AI to accelerate implementation, modernisation and engineering.',
    problem:
      'Skilled banking engineers spend too much time on repeatable work — documentation, conversion, boilerplate — that AI can accelerate under expert supervision.',
    whyItMatters:
      'AI does not replace banking expertise; it multiplies it. The banks that harness it responsibly will out-deliver those that do not.',
    approach: [
      'Apply AI to code analysis, conversion and migration assessment.',
      'Automate documentation, test generation and knowledge retrieval.',
      'Keep a banking expert in the loop on every AI-assisted output.',
    ],
    capabilities: ['ai-engineering', 'core-banking-transformation', 'testing'],
    outcomes: [
      'Reduced implementation and modernisation effort.',
      'Consistent, up-to-date documentation and test coverage.',
      'Engineering productivity gains that compound across a programme.',
    ],
    relatedAccelerators: ['voice-banking', 'es6-transformation'],
  },
];

export const getSolution = (slug: string) => solutions.find((s) => s.slug === slug);
