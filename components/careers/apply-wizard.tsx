'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, UploadCloud, FileText, X, ArrowLeft, ArrowRight, PartyPopper, AlertCircle } from 'lucide-react';
import {
  applicationSchema,
  applicationSteps,
  noticePeriods,
  validateResumeFile,
  RESUME_EXTENSIONS,
} from '@/lib/validations/application';
import { cn } from '@/lib/utils';

type Errors = Record<string, string>;
const emptyForm = {
  fullName: '', email: '', phone: '', currentLocation: '', preferredLocation: '',
  totalExperience: '', relevantExperience: '', currentOrganization: '', currentRole: '', noticePeriod: '',
  linkedinUrl: '', portfolioUrl: '', skills: '', coverLetter: '', consent: false,
};

export function ApplyWizard({ jobSlug, jobTitle }: { jobSlug: string; jobTitle: string }) {
  const storageKey = `avz-application-${jobSlug}`;
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Record<string, unknown>>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [resume, setResume] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);
  const [uploadPct, setUploadPct] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);

  // Autosave (best-effort; storage can throw or be unavailable)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setForm((f) => ({ ...f, ...JSON.parse(saved) }));
    } catch { /* ignore */ }
  }, [storageKey]);

  useEffect(() => {
    try {
      const { consent, ...rest } = form as Record<string, unknown>;
      localStorage.setItem(storageKey, JSON.stringify(rest));
    } catch { /* ignore */ }
  }, [form, storageKey]);

  const isSubmitted = reference !== null;
  const totalSteps = applicationSteps.length;

  const set = (name: string, value: unknown) => {
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((e) => ({ ...e, [name]: '' }));
  };

  function validateStep(current: number): boolean {
    // Resume step
    if (applicationSteps[current].id === 'resume') {
      if (!resume) {
        setResumeError('Please attach your resume to continue');
        return false;
      }
      return true;
    }
    const fields = applicationSteps[current].fields as readonly string[];
    const result = applicationSchema.safeParse({ ...form, consent: form.consent === true ? true : undefined });
    if (result.success) return true;
    const next: Errors = {};
    let ok = true;
    for (const issue of result.error.issues) {
      const key = issue.path[0] as string;
      if (fields.includes(key)) {
        next[key] = issue.message;
        ok = false;
      }
    }
    setErrors((e) => ({ ...e, ...next }));
    return ok;
  }

  function next() {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(s + 1, totalSteps - 1));
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function onResume(file: File | null) {
    setResumeError(null);
    setUploadPct(0);
    if (!file) return setResume(null);
    const err = validateResumeFile(file);
    if (err) {
      setResume(null);
      setResumeError(err);
      return;
    }
    setResume(file);
    // Simulated upload progress for UX (real presigned upload wired in Phase 4)
    let pct = 0;
    const id = setInterval(() => {
      pct = Math.min(100, pct + 12);
      setUploadPct(pct);
      if (pct >= 100) clearInterval(id);
    }, 60);
  }

  async function submit() {
    if (!validateStep(step)) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      // Phase 4 replaces this with a real multipart POST to
      // /api/v1/jobs/{id}/applications (resume upload, DB persist, email).
      await new Promise((r) => setTimeout(r, 900));
      const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
      const ref = `AVZ-${new Date().getFullYear()}-${rand}`;
      setReference(ref);
      try { localStorage.removeItem(storageKey); } catch { /* ignore */ }
    } catch {
      setSubmitError('Something went wrong submitting your application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (isSubmitted) return <Success reference={reference!} jobTitle={jobTitle} />;

  return (
    <div className="grid gap-8 lg:grid-cols-[15rem_1fr] lg:gap-14">
      <Stepper step={step} />

      <div>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 0 && (
              <StepShell title="Your profile" desc="Tell us who you are and how to reach you.">
                <Field label="Full name" name="fullName" value={form.fullName} onChange={set} error={errors.fullName} required />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Email" name="email" type="email" value={form.email} onChange={set} error={errors.email} required />
                  <Field label="Phone" name="phone" value={form.phone} onChange={set} error={errors.phone} required />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Current location" name="currentLocation" value={form.currentLocation} onChange={set} error={errors.currentLocation} required />
                  <Field label="Preferred location" name="preferredLocation" value={form.preferredLocation} onChange={set} error={errors.preferredLocation} />
                </div>
              </StepShell>
            )}

            {step === 1 && (
              <StepShell title="Your experience" desc="A quick snapshot of your background.">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Total experience (years)" name="totalExperience" type="number" value={form.totalExperience} onChange={set} error={errors.totalExperience} required />
                  <Field label="Relevant experience (years)" name="relevantExperience" type="number" value={form.relevantExperience} onChange={set} error={errors.relevantExperience} required />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Current organisation" name="currentOrganization" value={form.currentOrganization} onChange={set} error={errors.currentOrganization} />
                  <Field label="Current role" name="currentRole" value={form.currentRole} onChange={set} error={errors.currentRole} />
                </div>
                <SelectField label="Notice period" name="noticePeriod" value={form.noticePeriod} onChange={set} error={errors.noticePeriod} options={noticePeriods} required />
              </StepShell>
            )}

            {step === 2 && (
              <StepShell title="Your resume" desc="PDF, DOC or DOCX up to 5 MB.">
                <ResumeDrop resume={resume} error={resumeError} pct={uploadPct} onFile={onResume} onRemove={() => onResume(null)} />
              </StepShell>
            )}

            {step === 3 && (
              <StepShell title="Additional information" desc="Optional, but it helps us understand you.">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="LinkedIn URL" name="linkedinUrl" value={form.linkedinUrl} onChange={set} error={errors.linkedinUrl} placeholder="https://linkedin.com/in/…" />
                  <Field label="Portfolio URL" name="portfolioUrl" value={form.portfolioUrl} onChange={set} error={errors.portfolioUrl} placeholder="https://…" />
                </div>
                <Field label="Key skills" name="skills" value={form.skills} onChange={set} error={errors.skills} placeholder="Temenos Transact, T24, Java…" />
                <TextArea label="Cover letter" name="coverLetter" value={form.coverLetter} onChange={set} error={errors.coverLetter} />
              </StepShell>
            )}

            {step === 4 && (
              <StepShell title="Review & submit" desc="Check everything looks right before you submit.">
                <ReviewList form={form} resume={resume} jobTitle={jobTitle} />
                <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-fill-1 p-4">
                  <input
                    type="checkbox"
                    checked={form.consent === true}
                    onChange={(e) => set('consent', e.target.checked)}
                    className="mt-0.5 h-4 w-4 accent-[color:var(--brand-600)]"
                  />
                  <span className="text-sm text-fg-secondary">
                    I consent to Avenza processing my information for recruitment purposes.
                  </span>
                </label>
                {errors.consent && <FieldError msg={errors.consent} />}
                {submitError && (
                  <div className="mt-4 flex items-center gap-2 rounded-lg border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger">
                    <AlertCircle className="h-4 w-4" /> {submitError}
                  </div>
                )}
              </StepShell>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Nav */}
        <div className="mt-8 flex items-center justify-between border-t border-line pt-6">
          <button
            onClick={back}
            disabled={step === 0}
            className="inline-flex items-center gap-2 text-sm text-fg-secondary transition-colors hover:text-fg disabled:opacity-30"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          {step < totalSteps - 1 ? (
            <button
              onClick={next}
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand-600 px-6 text-sm font-semibold text-[color:var(--on-brand)] transition-colors hover:bg-brand-500"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={submit}
              disabled={submitting}
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand-600 px-6 text-sm font-semibold text-[color:var(--on-brand)] transition-colors hover:bg-brand-500 disabled:opacity-60"
            >
              {submitting ? 'Submitting…' : 'Submit application'}
              {!submitting && <Check className="h-4 w-4" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- sub-components ---------- */

function Stepper({ step }: { step: number }) {
  return (
    <ol className="flex gap-4 overflow-x-auto lg:sticky lg:top-28 lg:h-fit lg:flex-col lg:gap-1">
      {applicationSteps.map((s, i) => {
        const state = i < step ? 'done' : i === step ? 'active' : 'todo';
        return (
          <li key={s.id} className="flex shrink-0 items-center gap-3 lg:py-2">
            <span
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium transition-colors',
                state === 'done' && 'border-brand-400 bg-brand-600 text-[color:var(--on-brand)]',
                state === 'active' && 'border-brand-400 text-brand-300',
                state === 'todo' && 'border-line text-fg-faint',
              )}
            >
              {state === 'done' ? <Check className="h-4 w-4" /> : String(i + 1).padStart(2, '0')}
            </span>
            <span className={cn('text-sm', state === 'active' ? 'font-medium text-fg' : 'text-fg-muted')}>{s.label}</span>
          </li>
        );
      })}
      <li className="flex shrink-0 items-center gap-3 lg:py-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-xs text-fg-faint">06</span>
        <span className="text-sm text-fg-muted">Submitted</span>
      </li>
    </ol>
  );
}

function StepShell({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-h3 text-fg">{title}</h2>
      <p className="mt-1.5 text-sm text-fg-muted">{desc}</p>
      <div className="mt-7 space-y-5">{children}</div>
    </div>
  );
}

function Field({
  label, name, value, onChange, error, type = 'text', required, placeholder,
}: {
  label: string; name: string; value: unknown; onChange: (n: string, v: unknown) => void;
  error?: string; type?: string; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-fg-secondary">
        {label} {required && <span className="text-brand-400">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={String(value ?? '')}
        placeholder={placeholder}
        onChange={(e) => onChange(name, e.target.value)}
        aria-invalid={!!error}
        className={cn(
          'h-11 w-full rounded-lg border bg-fill-1 px-4 text-sm text-fg placeholder:text-fg-faint focus:outline-none',
          error ? 'border-danger/60' : 'border-line focus:border-brand-400/60',
        )}
      />
      {error && <FieldError msg={error} />}
    </div>
  );
}

function TextArea({ label, name, value, onChange, error }: { label: string; name: string; value: unknown; onChange: (n: string, v: unknown) => void; error?: string }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-fg-secondary">{label}</label>
      <textarea
        id={name}
        name={name}
        rows={5}
        value={String(value ?? '')}
        onChange={(e) => onChange(name, e.target.value)}
        className={cn('w-full rounded-lg border bg-fill-1 p-4 text-sm text-fg placeholder:text-fg-faint focus:outline-none', error ? 'border-danger/60' : 'border-line focus:border-brand-400/60')}
      />
      {error && <FieldError msg={error} />}
    </div>
  );
}

function SelectField({ label, name, value, onChange, error, options, required }: { label: string; name: string; value: unknown; onChange: (n: string, v: unknown) => void; error?: string; options: readonly string[]; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-fg-secondary">
        {label} {required && <span className="text-brand-400">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={String(value ?? '')}
        onChange={(e) => onChange(name, e.target.value)}
        className={cn('h-11 w-full rounded-lg border bg-ink-900 px-4 text-sm text-fg focus:outline-none', error ? 'border-danger/60' : 'border-line focus:border-brand-400/60')}
      >
        <option value="" disabled>Select…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      {error && <FieldError msg={error} />}
    </div>
  );
}

function FieldError({ msg }: { msg: string }) {
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-danger" role="alert">
      <AlertCircle className="h-3.5 w-3.5" /> {msg}
    </p>
  );
}

function ResumeDrop({ resume, error, pct, onFile, onRemove }: { resume: File | null; error: string | null; pct: number; onFile: (f: File | null) => void; onRemove: () => void }) {
  const [drag, setDrag] = useState(false);
  if (resume) {
    return (
      <div className="rounded-xl border border-line bg-fill-1 p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-600/15">
            <FileText className="h-5 w-5 text-brand-400" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium text-fg">{resume.name}</div>
            <div className="text-xs text-fg-muted">{(resume.size / 1024).toFixed(0)} KB</div>
          </div>
          <button onClick={onRemove} className="text-fg-muted hover:text-fg" aria-label="Remove file"><X className="h-4 w-4" /></button>
        </div>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-line-strong">
          <div className="h-full rounded-full bg-brand-400 transition-all" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-1.5 text-xs text-fg-muted">{pct < 100 ? `Uploading… ${pct}%` : 'Ready'}</div>
      </div>
    );
  }
  return (
    <div>
      <label
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); onFile(e.dataTransfer.files?.[0] ?? null); }}
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-14 text-center transition-colors',
          drag ? 'border-brand-400 bg-brand-600/10' : 'border-line hover:border-line-strong',
        )}
      >
        <UploadCloud className="h-8 w-8 text-brand-400" />
        <div className="text-sm font-medium text-fg">Drag & drop your resume, or <span className="text-brand-400">browse</span></div>
        <div className="text-xs text-fg-muted">{RESUME_EXTENSIONS.join(', ')} · max 5 MB</div>
        <input type="file" accept={RESUME_EXTENSIONS.join(',')} className="hidden" onChange={(e) => onFile(e.target.files?.[0] ?? null)} />
      </label>
      {error && <FieldError msg={error} />}
    </div>
  );
}

function ReviewList({ form, resume, jobTitle }: { form: Record<string, unknown>; resume: File | null; jobTitle: string }) {
  const rows = useMemo(() => ([
    ['Role', jobTitle],
    ['Name', form.fullName], ['Email', form.email], ['Phone', form.phone],
    ['Current location', form.currentLocation], ['Preferred location', form.preferredLocation || '—'],
    ['Total experience', form.totalExperience ? `${form.totalExperience} yrs` : '—'],
    ['Relevant experience', form.relevantExperience ? `${form.relevantExperience} yrs` : '—'],
    ['Current organisation', form.currentOrganization || '—'], ['Current role', form.currentRole || '—'],
    ['Notice period', form.noticePeriod || '—'],
    ['LinkedIn', form.linkedinUrl || '—'], ['Portfolio', form.portfolioUrl || '—'],
    ['Skills', form.skills || '—'], ['Resume', resume?.name ?? '—'],
  ] as [string, unknown][]), [form, resume, jobTitle]);

  return (
    <div className="divide-y divide-[color:var(--border-hairline)] overflow-hidden rounded-xl border border-line">
      {rows.map(([k, v]) => (
        <div key={k} className="grid grid-cols-[9rem_1fr] gap-4 bg-ink-850/40 px-4 py-3 text-sm">
          <span className="text-fg-muted">{k}</span>
          <span className="truncate text-fg">{String(v)}</span>
        </div>
      ))}
    </div>
  );
}

function Success({ reference, jobTitle }: { reference: string; jobTitle: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-xl rounded-3xl border border-line bg-ink-850/60 p-10 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 14 }}
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600/15"
      >
        <PartyPopper className="h-8 w-8 text-brand-400" />
      </motion.div>
      <h2 className="mt-6 text-h3 text-fg">Application received.</h2>
      <p className="mt-3 text-fg-secondary">
        Thank you for applying for <span className="text-fg">{jobTitle}</span>. We’ll be in touch about next steps.
      </p>
      <div className="mt-6 inline-flex items-center gap-3 rounded-xl border border-line bg-fill-1 px-5 py-3">
        <span className="text-xs text-fg-muted">Reference</span>
        <span className="font-mono text-lg font-semibold text-gradient">{reference}</span>
      </div>
      <p className="mt-4 text-xs text-fg-faint">
        A confirmation email will be sent once the recruitment workflow is live (Phase 4).
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/careers/jobs" className="inline-flex h-11 items-center rounded-lg border border-line px-5 text-sm text-fg-secondary hover:text-fg">
          Browse more roles
        </Link>
        <Link href="/" className="inline-flex h-11 items-center rounded-lg bg-brand-600 px-5 text-sm font-semibold text-[color:var(--on-brand)] hover:bg-brand-500">
          Back to home
        </Link>
      </div>
    </motion.div>
  );
}
