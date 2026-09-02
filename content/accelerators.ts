import type { LucideIcon } from 'lucide-react';
import { Boxes, FileStack, GitCompareArrows, ClipboardCheck, Rocket, FileText, Sparkles } from 'lucide-react';

export type Accelerator = {
  slug: string;
  name: string;
  icon: LucideIcon;
  stage: string; // maps to a delivery lifecycle stage
  problem: string;
  solution: string;
  howItWorks: string;
  benefits: string[];
};

/** Positioned as Avenza IP. No confidential implementation detail is exposed. */
export const accelerators: Accelerator[] = [
  {
    slug: 'migration-toolkit',
    name: 'Migration Toolkit',
    icon: Boxes,
    stage: 'Transform',
    problem: 'Migrations lose time and confidence to bespoke extraction, mapping and reconciliation built from scratch each time.',
    solution: 'A reusable migration framework covering extraction, transformation and reconciliation with built-in traceability.',
    howItWorks: 'Pre-built pipelines and reconciliation controls are configured to the target model, so effort shifts from plumbing to data quality.',
    benefits: ['Lower migration effort', 'End-to-end traceability', 'Faster reconciliation', 'Repeatable across programmes'],
  },
  {
    slug: 'config-templates',
    name: 'Configuration Templates',
    icon: FileStack,
    stage: 'Transform',
    problem: 'Core and upgrade configuration is repetitive, error-prone and slow when started from a blank canvas.',
    solution: 'A library of proven configuration templates for common banking models and modules.',
    howItWorks: 'Templates are adapted to the bank’s requirements, giving a known-good baseline instead of first-principles configuration.',
    benefits: ['Faster configuration', 'Fewer defects', 'Consistency across environments'],
  },
  {
    slug: 'data-mapping',
    name: 'Data Mapping Utilities',
    icon: GitCompareArrows,
    stage: 'Assess',
    problem: 'Source-to-target mapping is one of the most time-consuming and error-sensitive parts of any migration.',
    solution: 'Reusable mapping utilities that accelerate and document source-to-target definitions.',
    howItWorks: 'Mappings are captured, validated and versioned in a structured form that feeds directly into migration pipelines.',
    benefits: ['Accelerated mapping', 'Documented lineage', 'Reduced rework'],
  },
  {
    slug: 'test-automation',
    name: 'Test Automation Framework',
    icon: ClipboardCheck,
    stage: 'Validate',
    problem: 'Manual regression cannot keep pace with a live transformation, so coverage and confidence slip.',
    solution: 'A banking-aware automation framework for regression, integration and non-functional testing.',
    howItWorks: 'Reusable test assets and harnesses are configured to the programme, enabling repeatable automated runs.',
    benefits: ['Higher coverage', 'Faster releases', 'Audit-ready evidence'],
  },
  {
    slug: 'deployment-automation',
    name: 'Deployment Automation',
    icon: Rocket,
    stage: 'Deploy',
    problem: 'Manual, inconsistent deployments introduce risk and slow every environment promotion.',
    solution: 'Automation that standardises and de-risks build, promotion and deployment.',
    howItWorks: 'Deployment steps are codified and repeatable, reducing manual error and shortening cutover.',
    benefits: ['Predictable deployments', 'Reduced cutover risk', 'Faster environment turnaround'],
  },
  {
    slug: 'documentation-automation',
    name: 'Documentation Automation',
    icon: FileText,
    stage: 'Optimise',
    problem: 'Documentation drifts out of date the moment a programme moves, eroding knowledge and audit-readiness.',
    solution: 'AI-assisted generation and maintenance of technical and configuration documentation.',
    howItWorks: 'Documentation is generated from the current state and reviewed by experts, keeping knowledge current with far less effort.',
    benefits: ['Always-current documentation', 'Lower manual effort', 'Stronger audit-readiness'],
  },
  {
    slug: 'ai-implementation',
    name: 'AI Implementation Tools',
    icon: Sparkles,
    stage: 'Transform',
    problem: 'Skilled engineers spend too much time on repeatable implementation and conversion work.',
    solution: 'AI-powered tooling for code analysis, conversion and implementation assistance — with a human in the loop.',
    howItWorks: 'AI proposes conversions, documentation and test cases; banking experts validate every output before it lands.',
    benefits: ['Reduced implementation effort', 'Consistent quality', 'Expert oversight retained'],
  },
];

export const getAccelerator = (slug: string) => accelerators.find((a) => a.slug === slug);
