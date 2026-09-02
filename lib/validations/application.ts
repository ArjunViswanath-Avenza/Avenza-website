import { z } from 'zod';

/** Shared application schema — used by the wizard (client) and the API (Phase 4). */
export const RESUME_MAX_BYTES = 5 * 1024 * 1024; // 5 MB
export const RESUME_ACCEPT = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
export const RESUME_EXTENSIONS = ['.pdf', '.doc', '.docx'];

export const noticePeriods = ['Immediate', '15 days', '1 month', '2 months', '3 months', '3+ months'] as const;

export const applicationSchema = z.object({
  // Step 1 — Profile
  fullName: z.string().min(2, 'Please enter your full name').max(120),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().min(6, 'Enter a valid phone number').max(30),
  currentLocation: z.string().min(2, 'Enter your current location').max(120),
  preferredLocation: z.string().max(120).optional().or(z.literal('')),

  // Step 2 — Experience
  totalExperience: z.coerce.number().min(0, 'Cannot be negative').max(60),
  relevantExperience: z.coerce.number().min(0, 'Cannot be negative').max(60),
  currentOrganization: z.string().max(160).optional().or(z.literal('')),
  currentRole: z.string().max(160).optional().or(z.literal('')),
  noticePeriod: z.enum(noticePeriods),

  // Step 4 — Additional
  linkedinUrl: z.string().url('Enter a valid URL').max(300).optional().or(z.literal('')),
  portfolioUrl: z.string().url('Enter a valid URL').max(300).optional().or(z.literal('')),
  skills: z.string().max(600).optional().or(z.literal('')),
  coverLetter: z.string().max(4000).optional().or(z.literal('')),

  // Consent
  consent: z.literal(true, { errorMap: () => ({ message: 'Consent is required to submit' }) }),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;

/** Per-step field groups for the wizard. */
export const applicationSteps = [
  { id: 'profile', label: 'Profile', fields: ['fullName', 'email', 'phone', 'currentLocation', 'preferredLocation'] },
  { id: 'experience', label: 'Experience', fields: ['totalExperience', 'relevantExperience', 'currentOrganization', 'currentRole', 'noticePeriod'] },
  { id: 'resume', label: 'Resume', fields: [] },
  { id: 'additional', label: 'Additional', fields: ['linkedinUrl', 'portfolioUrl', 'skills', 'coverLetter'] },
  { id: 'review', label: 'Review', fields: ['consent'] },
] as const;

export function validateResumeFile(file: File): string | null {
  const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
  if (!RESUME_EXTENSIONS.includes(ext)) return 'Resume must be a PDF, DOC or DOCX file';
  if (file.size > RESUME_MAX_BYTES) return 'Resume must be 5 MB or smaller';
  if (file.size === 0) return 'The selected file appears to be empty';
  return null;
}
