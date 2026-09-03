'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, AlertCircle, MessageSquareText } from 'lucide-react';
import {
  contactSchema, contactSteps, enquiryTopics, companySizes, timelines,
} from '@/lib/validations/contact';
import { cn } from '@/lib/utils';

type Errors = Record<string, string>;
const empty = { topic: '', company: '', companySize: '', challenge: '', timeline: '', name: '', email: '', phone: '', role: '' };

export function ContactWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Record<string, string>>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const total = contactSteps.length;
  const set = (n: string, v: string) => { setForm((f) => ({ ...f, [n]: v })); setErrors((e) => ({ ...e, [n]: '' })); };

  function validate(current: number) {
    const fields = contactSteps[current].fields as readonly string[];
    const res = contactSchema.safeParse(form);
    if (res.success) return true;
    const next: Errors = {}; let ok = true;
    for (const i of res.error.issues) {
      const k = i.path[0] as string;
      if (fields.includes(k)) { next[k] = i.message; ok = false; }
    }
    setErrors((e) => ({ ...e, ...next }));
    return ok;
  }

  async function submit() {
    if (!validate(step)) return;
    setSubmitting(true); setSubmitError(null);
    try {
      // Phase 4 wires this to POST /api/v1/contact (persist + notify + confirm).
      await new Promise((r) => setTimeout(r, 800));
      const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
      setReference(`AVZ-ENQ-${new Date().getFullYear()}-${rand}`);
    } catch {
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (reference) {
    return (
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-line bg-ink-850/60 p-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600/15">
          <MessageSquareText className="h-8 w-8 text-brand-400" />
        </div>
        <h2 className="mt-6 text-h3 text-fg">Thank you — message received.</h2>
        <p className="mt-3 text-fg-secondary">Our team will get back to you shortly. Here is your reference.</p>
        <div className="mt-6 inline-flex items-center gap-3 rounded-xl border border-line bg-fill-1 px-5 py-3">
          <span className="text-xs text-fg-muted">Reference</span>
          <span className="font-mono text-lg font-semibold text-gradient">{reference}</span>
        </div>
        <div className="mt-8">
          <Link href="/" className="inline-flex h-11 items-center rounded-lg bg-brand-600 px-5 text-sm font-semibold text-[color:var(--on-brand)] hover:bg-brand-500">Back to home</Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div className="mb-8 flex gap-1.5">
        {contactSteps.map((s, i) => (
          <div key={s.id} className="flex-1">
            <div className={cn('h-1 rounded-full transition-colors', i <= step ? 'bg-brand-400' : 'bg-line-strong')} />
            <div className={cn('mt-2 text-xs transition-colors', i === step ? 'text-fg' : 'text-fg-muted')}>{s.label}</div>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}>
          {step === 0 && (
            <Shell title="What can we help you with?">
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {enquiryTopics.map((t) => (
                  <button key={t} onClick={() => set('topic', t)} className={cn('rounded-xl border p-4 text-left text-sm transition-colors', form.topic === t ? 'border-brand-400 bg-brand-600/15 text-fg' : 'border-line text-fg-secondary hover:border-line-strong')}>
                    {t}
                  </button>
                ))}
              </div>
              {errors.topic && <Err msg={errors.topic} />}
            </Shell>
          )}
          {step === 1 && (
            <Shell title="Tell us about your company">
              <Input label="Company" name="company" value={form.company} onChange={set} error={errors.company} required />
              <Chips label="Company size" name="companySize" value={form.companySize} onChange={set} options={companySizes} />
            </Shell>
          )}
          {step === 2 && (
            <Shell title="What's the business challenge?">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-fg-secondary">Describe the challenge <span className="text-brand-400">*</span></label>
                <textarea rows={6} value={form.challenge} onChange={(e) => set('challenge', e.target.value)} placeholder="e.g. We're planning a Temenos Transact upgrade and need to de-risk the customisation impact…" className={cn('w-full rounded-lg border bg-fill-1 p-4 text-sm text-fg placeholder:text-fg-faint focus:outline-none', errors.challenge ? 'border-danger/60' : 'border-line focus:border-brand-400/60')} />
                {errors.challenge && <Err msg={errors.challenge} />}
              </div>
            </Shell>
          )}
          {step === 3 && (
            <Shell title="What's your timeline?">
              <Chips label="Timeline" name="timeline" value={form.timeline} onChange={set} options={timelines} />
            </Shell>
          )}
          {step === 4 && (
            <Shell title="How can we reach you?">
              <div className="grid gap-5 sm:grid-cols-2">
                <Input label="Name" name="name" value={form.name} onChange={set} error={errors.name} required />
                <Input label="Work email" name="email" type="email" value={form.email} onChange={set} error={errors.email} required />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Input label="Phone" name="phone" value={form.phone} onChange={set} error={errors.phone} />
                <Input label="Role" name="role" value={form.role} onChange={set} error={errors.role} placeholder="e.g. Head of Core Banking" />
              </div>
              {submitError && <div className="flex items-center gap-2 rounded-lg border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger"><AlertCircle className="h-4 w-4" />{submitError}</div>}
            </Shell>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex items-center justify-between border-t border-line pt-6">
        <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="inline-flex items-center gap-2 text-sm text-fg-secondary hover:text-fg disabled:opacity-30">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        {step < total - 1 ? (
          <button onClick={() => validate(step) && setStep((s) => s + 1)} className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand-600 px-6 text-sm font-semibold text-[color:var(--on-brand)] hover:bg-brand-500">
            Continue <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button onClick={submit} disabled={submitting} className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand-600 px-6 text-sm font-semibold text-[color:var(--on-brand)] hover:bg-brand-500 disabled:opacity-60">
            {submitting ? 'Sending…' : 'Send message'} {!submitting && <Check className="h-4 w-4" />}
          </button>
        )}
      </div>
    </div>
  );
}

function Shell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-h3 text-fg">{title}</h2>
      <div className="mt-6 space-y-5">{children}</div>
    </div>
  );
}
function Input({ label, name, value, onChange, error, type = 'text', required, placeholder }: { label: string; name: string; value: string; onChange: (n: string, v: string) => void; error?: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-fg-secondary">{label} {required && <span className="text-brand-400">*</span>}</label>
      <input id={name} type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(name, e.target.value)} className={cn('h-11 w-full rounded-lg border bg-fill-1 px-4 text-sm text-fg placeholder:text-fg-faint focus:outline-none', error ? 'border-danger/60' : 'border-line focus:border-brand-400/60')} />
      {error && <Err msg={error} />}
    </div>
  );
}
function Chips({ label, name, value, onChange, options }: { label: string; name: string; value: string; onChange: (n: string, v: string) => void; options: readonly string[] }) {
  return (
    <div>
      <div className="mb-2 text-sm font-medium text-fg-secondary">{label}</div>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button key={o} onClick={() => onChange(name, o)} className={cn('rounded-lg border px-4 py-2 text-sm transition-colors', value === o ? 'border-brand-400 bg-brand-600/15 text-fg' : 'border-line text-fg-muted hover:text-fg-secondary')}>{o}</button>
        ))}
      </div>
    </div>
  );
}
function Err({ msg }: { msg: string }) {
  return <p className="mt-1.5 flex items-center gap-1.5 text-xs text-danger" role="alert"><AlertCircle className="h-3.5 w-3.5" />{msg}</p>;
}
