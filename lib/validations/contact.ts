import { z } from 'zod';

export const enquiryTopics = [
  'Core Banking', 'Temenos', 'Payments', 'Migration', 'Upgrade', 'Testing',
  'Application Support', 'AI & Automation', 'Consulting', 'Partnership', 'Other',
] as const;

export const companySizes = ['1–50', '51–250', '251–1,000', '1,001–5,000', '5,000+'] as const;
export const timelines = ['Exploring', '0–3 months', '3–6 months', '6–12 months', '12+ months'] as const;

export const contactSchema = z.object({
  topic: z.enum(enquiryTopics, { errorMap: () => ({ message: 'Please choose a topic' }) }),
  company: z.string().min(2, 'Please enter your company').max(160),
  companySize: z.enum(companySizes).optional().or(z.literal('')),
  challenge: z.string().min(10, 'Tell us a little more (10+ characters)').max(2000),
  timeline: z.enum(timelines).optional().or(z.literal('')),
  name: z.string().min(2, 'Please enter your name').max(120),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().max(30).optional().or(z.literal('')),
  role: z.string().max(120).optional().or(z.literal('')),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const contactSteps = [
  { id: 'topic', label: 'Topic', fields: ['topic'] },
  { id: 'company', label: 'Company', fields: ['company', 'companySize'] },
  { id: 'challenge', label: 'Challenge', fields: ['challenge'] },
  { id: 'timeline', label: 'Timeline', fields: ['timeline'] },
  { id: 'contact', label: 'Contact', fields: ['name', 'email', 'phone', 'role'] },
] as const;
