import type { LucideIcon } from 'lucide-react';
import { Rocket, ScanFace, Keyboard, ScanLine, MapPin, Mic, FileCode2, Lock, Workflow } from 'lucide-react';

export type Accelerator = {
  slug: string;
  name: string;
  icon: LucideIcon;
  stage: string; // maps to a delivery lifecycle stage
  problem: string;
  solution: string;
  howItWorks: string;
  benefits: string[];
  /** POC demo clip — /public/videos/<slug>.mp4 (+ optional poster). */
  video?: string;
  poster?: string;
};

/**
 * Avenza POCs / accelerators. Each is backed by a real proof-of-concept demo
 * video in /public/videos. No confidential implementation detail is exposed.
 */
export const accelerators: Accelerator[] = [
  {
    slug: 'ci-cd-devops-solution',
    name: 'CI/CD & DevOps Solution',
    icon: Rocket,
    stage: 'Deploy',
    problem: 'Manual, inconsistent banking deployments introduce risk and slow every release across environments.',
    solution: 'An automated CI/CD and DevOps pipeline that builds, tests and promotes banking changes with repeatable, auditable deployments.',
    howItWorks: 'Source changes trigger automated build, test and deploy stages with approvals and rollback, standardising promotion from development through to production.',
    benefits: ['Predictable, repeatable releases', 'Faster environment turnaround', 'Built-in approvals & rollback', 'Reduced cutover risk'],
    video: '/videos/ci-cd-devops-solution.mp4',
  },
  {
    slug: 'jumio-integration',
    name: 'Jumio Identity Integration',
    icon: ScanFace,
    stage: 'Transform',
    problem: 'Manual identity verification slows digital onboarding and adds compliance risk.',
    solution: 'A Jumio-powered identity and document verification integration for fast, compliant digital KYC and onboarding.',
    howItWorks: 'The onboarding journey captures ID documents and biometrics, verifies them through Jumio, and returns a decision straight back into the banking flow.',
    benefits: ['Faster digital onboarding', 'Automated KYC/AML checks', 'Reduced manual review', 'Stronger fraud protection'],
    video: '/videos/jumio-integration.mp4',
  },
  {
    slug: 'virtual-keyboard',
    name: 'Secure Virtual Keyboard',
    icon: Keyboard,
    stage: 'Transform',
    problem: 'Credential entry on shared or untrusted devices is exposed to keyloggers and screen capture.',
    solution: 'An on-screen secure virtual keyboard that protects sensitive credential entry across banking channels.',
    howItWorks: 'Users enter PINs and passwords through a randomised on-screen keypad, keeping keystrokes off the physical keyboard and out of reach of keyloggers.',
    benefits: ['Keylogger-resistant input', 'Safer login on any device', 'Randomised layout', 'Drop-in for banking channels'],
    video: '/videos/virtual-keyboard.mp4',
  },
  {
    slug: 'smart-card-scan',
    name: 'Smart Card Scan',
    icon: ScanLine,
    stage: 'Transform',
    problem: 'Typing card and ID details during onboarding is slow and error-prone.',
    solution: 'Camera-based card and ID scanning that auto-captures details with OCR to speed onboarding and data entry.',
    howItWorks: 'The device camera scans the card or ID, OCR extracts the fields, and the values pre-fill the form for the customer to confirm.',
    benefits: ['Faster data capture', 'Fewer keying errors', 'Smoother onboarding', 'Works on mobile'],
    video: '/videos/smart-card-scan.mp4',
  },
  {
    slug: 'smart-fill-address',
    name: 'Smart Fill Address',
    icon: MapPin,
    stage: 'Transform',
    problem: 'Manual address entry is slow, inconsistent and a common source of data-quality issues.',
    solution: 'Intelligent address lookup and auto-fill that completes accurate, structured addresses from a few keystrokes.',
    howItWorks: 'As the customer types, the field suggests validated addresses and auto-fills the structured fields on selection.',
    benefits: ['Faster form completion', 'Cleaner address data', 'Fewer errors', 'Better customer experience'],
    video: '/videos/smart-fill-address.mp4',
  },
  {
    slug: 'voice-banking',
    name: 'Voice Banking',
    icon: Mic,
    stage: 'Transform',
    problem: 'Common banking tasks still require navigating menus and forms, which is not always fast or accessible.',
    solution: 'A voice-enabled banking assistant that lets customers perform tasks and get answers simply by speaking.',
    howItWorks: 'Speech is transcribed and interpreted into banking intents, actions are performed securely, and responses are spoken back to the customer.',
    benefits: ['Hands-free banking', 'More accessible journeys', 'Faster common tasks', 'Natural interaction'],
    video: '/videos/voice-banking.mp4',
  },
  {
    slug: 'es6-transformation',
    name: 'ES6 Code Transformation',
    icon: FileCode2,
    stage: 'Transform',
    problem: 'Legacy JavaScript is hard to maintain, slower to build on, and holds back modernisation.',
    solution: 'Automated transformation of legacy JavaScript to modern ES6+, accelerating modernisation with consistent results.',
    howItWorks: 'Source is analysed and converted to modern ES6+ patterns, with engineers reviewing every output before it lands.',
    benefits: ['Faster modernisation', 'More maintainable code', 'Consistent conversions', 'Expert-reviewed output'],
    video: '/videos/es6-transformation.mp4',
  },
  {
    slug: 'rsa-encryption',
    name: 'RSA Encryption',
    icon: Lock,
    stage: 'Transform',
    problem: 'Sensitive banking data in transit and at rest must be protected to a high, provable standard.',
    solution: 'An RSA-based encryption implementation that secures sensitive data across banking flows.',
    howItWorks: 'Data is encrypted with RSA public-key cryptography at the boundary and decrypted only where authorised, protecting it end to end.',
    benefits: ['Strong data protection', 'Secure in transit & at rest', 'Standards-based', 'Audit-ready'],
    video: '/videos/rsa-encryption.mp4',
  },
  {
    slug: 'api-automation',
    name: 'API Test Automation',
    icon: Workflow,
    stage: 'Validate',
    problem: 'Manual API testing cannot keep pace with a live banking programme, so coverage and confidence slip.',
    solution: 'An API test-automation framework that validates banking services continuously across the delivery lifecycle.',
    howItWorks: 'Reusable automated API test suites run in the pipeline, checking functional and integration behaviour on every change.',
    benefits: ['Higher coverage', 'Faster releases', 'Continuous validation', 'Audit-ready evidence'],
    video: '/videos/api-automation.mp4',
  },
];

export const getAccelerator = (slug: string) => accelerators.find((a) => a.slug === slug);
