/** Structured marketing content for the signature home-page interactions. */

/* --- Hero ecosystem nodes (the interactive banking network) --- */
export const ecosystemNodes = [
  { id: 'core', label: 'Core Banking', angle: 0 },
  { id: 'payments', label: 'Payments', angle: 51 },
  { id: 'channels', label: 'Digital Channels', angle: 102 },
  { id: 'data', label: 'Data', angle: 154 },
  { id: 'ai', label: 'AI', angle: 205 },
  { id: 'risk', label: 'Risk & Compliance', angle: 257 },
  { id: 'cloud', label: 'Cloud', angle: 308 },
] as const;

/* --- "What we solve" challenge nodes --- */
export const challenges = [
  'Legacy modernisation',
  'Core banking transformation',
  'Platform upgrades',
  'Data migration',
  'Payments modernisation',
  'Integration complexity',
  'Testing at scale',
  'Regulatory change',
  'Operational efficiency',
  'AI adoption',
  'Technical debt',
] as const;

/* --- "We connect the pieces" pipeline --- */
export const connectPipeline = [
  'Legacy systems',
  'Transformation',
  'Core banking',
  'Integration',
  'Data',
  'Digital',
  'AI',
  'Operational excellence',
] as const;

/* --- Transformation lifecycle (the signature scroll interaction) --- */
export type DeliveryStage = {
  num: string;
  title: string;
  summary: string;
  capabilities: string[];
};

export const deliveryStages: DeliveryStage[] = [
  { num: '01', title: 'Discover', summary: 'Understand the business, the estate and the ambition — before proposing change.', capabilities: ['Domain discovery', 'Estate mapping', 'Ambition alignment'] },
  { num: '02', title: 'Assess', summary: 'Profile the core, customisations, data quality and risk to build a fact-based baseline.', capabilities: ['Architecture review', 'Data profiling', 'Risk assessment'] },
  { num: '03', title: 'Design', summary: 'Design the target architecture and a sequenced, continuity-first delivery path.', capabilities: ['Target architecture', 'Roadmap', 'Migration strategy'] },
  { num: '04', title: 'Transform', summary: 'Implement, customise and modernise — incrementally, with accelerators doing the heavy lifting.', capabilities: ['Implementation', 'Customisation', 'Accelerators'] },
  { num: '05', title: 'Validate', summary: 'Prove every step with functional, non-functional and automated testing plus reconciliation.', capabilities: ['SIT / UAT', 'Automation', 'Reconciliation'] },
  { num: '06', title: 'Deploy', summary: 'Rehearse and execute cutover so go-live becomes a controlled, measured event.', capabilities: ['Dress rehearsal', 'Cutover', 'Rollback planning'] },
  { num: '07', title: 'Stabilise', summary: 'Support the live platform through hypercare with L1/L2/L3 and rapid resolution.', capabilities: ['Hypercare', 'L1/L2/L3', 'Incident response'] },
  { num: '08', title: 'Optimise', summary: 'Tune, enhance and continuously improve — running and changing the bank together.', capabilities: ['Optimisation', 'Enhancements', 'Run & change'] },
];

/* --- Trust / credibility proof points (qualitative — no invented numbers) --- */
export const trustPoints = [
  'Deep core-banking domain expertise',
  'Specialised Temenos capability',
  'Certified banking-technology professionals',
  'Proven, repeatable delivery methodology',
  'Proprietary accelerators & IP',
  'AI-enabled transformation',
] as const;

/* --- Why Avenza pillars --- */
export const whyPillars = [
  { title: 'Deep Banking Expertise', body: 'People who have actually delivered banking programmes — not generalists learning on your transformation.' },
  { title: 'Platform Expertise', body: 'Specialised, certified capability across Temenos Transact, Payment Hub and FCM.' },
  { title: 'Engineering Excellence', body: 'Modern engineering discipline applied to a domain that has too often lacked it.' },
  { title: 'Proven Delivery Methodology', body: 'A repeatable, continuity-first lifecycle from discovery through optimisation.' },
  { title: 'Accelerators & IP', body: 'Proprietary accelerators that cut effort and de-risk the most error-prone work.' },
  { title: 'AI-Enabled Transformation', body: 'AI used responsibly to amplify expert engineers — always with a human in the loop.' },
  { title: 'Flexible Engagement', body: 'End-to-end delivery, staff augmentation or a hybrid — shaped to your programme.' },
  { title: 'People Who Understand Banking', body: 'The kind of team you would trust with a critical banking transformation.' },
] as const;

/* --- Industries (CMS-toggled in Phase 5) --- */
export const industries = [
  { slug: 'retail-banking', title: 'Retail Banking', summary: 'Modern cores and digital channels for high-volume retail banking.' },
  { slug: 'corporate-banking', title: 'Corporate Banking', summary: 'Complex product and relationship models delivered on a modern core.' },
  { slug: 'commercial-banking', title: 'Commercial Banking', summary: 'Scalable platforms for commercial lending and cash management.' },
  { slug: 'payments', title: 'Payments', summary: 'Payment modernisation and processing at scale on Temenos Payment Hub.' },
  { slug: 'financial-services', title: 'Financial Services', summary: 'Transformation and testing for the wider financial-services sector.' },
  { slug: 'fintech', title: 'FinTech', summary: 'Engineering velocity and banking depth for fast-moving fintechs.' },
] as const;
