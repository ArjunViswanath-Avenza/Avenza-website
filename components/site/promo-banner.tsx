'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ArrowRight, PartyPopper, ExternalLink, AlertCircle } from 'lucide-react';
import { promo } from '@/content/promo';
import { cn } from '@/lib/utils';

const BAR_HEIGHT = '2.75rem';

export function PromoBanner() {
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Show unless dismissed before (remembered per visitor).
  useEffect(() => {
    setMounted(true);
    if (!promo.enabled) return;
    try {
      if (localStorage.getItem(promo.storageKey) !== 'dismissed') setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  // Push the fixed header down by the bar height while it's shown.
  useEffect(() => {
    document.documentElement.style.setProperty('--promo-h', visible ? BAR_HEIGHT : '0px');
    return () => document.documentElement.style.setProperty('--promo-h', '0px');
  }, [visible]);

  // Lock body scroll while the modal is open.
  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setModalOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  function dismiss() {
    setVisible(false);
    setModalOpen(false);
    try {
      localStorage.setItem(promo.storageKey, 'dismissed');
    } catch {
      /* ignore */
    }
  }

  if (!promo.enabled || !mounted) return null;

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-0 z-[60] text-white"
            style={{ height: BAR_HEIGHT, background: 'linear-gradient(90deg, #161b26 0%, #7a2f00 55%, #c24e00 100%)' }}
            role="region"
            aria-label="Announcement"
          >
            <div className="container-avz flex h-full items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="hidden shrink-0 rounded bg-white/15 px-2 py-0.5 font-mono text-[0.6rem] font-semibold uppercase tracking-wider sm:inline">
                  {promo.tag}
                </span>
                <span className="truncate text-xs sm:text-sm">{promo.message}</span>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                <button
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[color:var(--ink-950)] transition-colors hover:bg-white/90"
                >
                  {promo.cta}
                  <ArrowRight className="h-3 w-3" />
                </button>
                <button
                  onClick={dismiss}
                  aria-label="Dismiss announcement"
                  className="flex h-7 w-7 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>{modalOpen && <RegistrationModal onClose={() => setModalOpen(false)} />}</AnimatePresence>
    </>
  );
}

/* ---------------- registration modal ---------------- */

type Form = { name: string; email: string; company: string; phone: string; consent: boolean };
const emptyForm: Form = { name: '', email: '', company: '', phone: '', consent: false };

function RegistrationModal({ onClose }: { onClose: () => void }) {
  const { modal } = promo;
  const [form, setForm] = useState<Form>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k: keyof Form, v: string | boolean) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: '' }));
  };

  function validate() {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = 'Please enter your name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (form.company.trim().length < 2) e.company = 'Please enter your company';
    if (!form.consent) e.consent = 'Please accept to continue';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit() {
    if (!validate()) return;
    setSubmitting(true);
    // TODO: wire to real submit target (email/API). For now we just confirm.
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setDone(true);
  }

  const inputCls = (k: string) =>
    cn(
      'h-11 w-full rounded-lg border bg-fill-1 px-4 text-sm text-fg placeholder:text-fg-faint focus:outline-none',
      errors[k] ? 'border-danger/60' : 'border-line focus:border-brand-400/60',
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={modal.heading}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative my-8 grid w-full max-w-3xl overflow-hidden rounded-2xl border border-line bg-elevated shadow-2xl md:grid-cols-2"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white ring-1 ring-white/20 backdrop-blur transition-colors hover:bg-black/50"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Speaker panel */}
        <div className="relative min-h-[240px] overflow-hidden bg-ink-900 md:min-h-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={modal.speaker.photo}
            alt={modal.speaker.name}
            onError={(e) => {
              const t = e.currentTarget;
              if (!t.dataset.fb) {
                t.dataset.fb = '1';
                t.src = '/team/gopinath-chandran.png';
              }
            }}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-brand-600 px-2.5 py-1 font-mono text-[0.6rem] font-semibold uppercase tracking-wider text-[color:var(--ink-950)]">
            Featured Speaker
          </span>
          <div className="absolute inset-x-0 bottom-0 p-5">
            <div className="text-lg font-semibold text-white">{modal.speaker.name}</div>
            <div className="text-xs text-white/80">{modal.speaker.role}</div>
            <p className="mt-2 text-xs leading-relaxed text-white/75">{modal.speaker.caption}</p>
          </div>
        </div>

        {/* Content / form */}
        <div className="flex flex-col p-6 sm:p-8">
          {done ? (
            <div className="flex flex-1 flex-col items-center justify-center py-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600/15">
                <PartyPopper className="h-7 w-7 text-brand-600" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-fg">You’re on the list.</h3>
              <p className="mt-2 text-sm text-fg-muted">
                Thanks, {form.name.split(' ')[0] || 'there'} — we’ll be in touch about TRF APAC 2026.
              </p>
              <button
                onClick={onClose}
                className="mt-6 inline-flex h-11 items-center rounded-lg bg-brand-600 px-5 text-sm font-semibold text-[color:var(--ink-950)] hover:bg-brand-500"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              <h3 className="text-lg font-semibold text-fg sm:text-xl">{modal.heading}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{modal.body}</p>
              {modal.eventUrl && (
                <a
                  href={modal.eventUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-500"
                >
                  {modal.eventLabel} <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}

              <div className="mt-5 space-y-3">
                <div>
                  <input placeholder="Full name *" value={form.name} onChange={(e) => set('name', e.target.value)} className={inputCls('name')} aria-label="Full name" />
                  {errors.name && <Err msg={errors.name} />}
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <input type="email" placeholder="Work email *" value={form.email} onChange={(e) => set('email', e.target.value)} className={inputCls('email')} aria-label="Work email" />
                    {errors.email && <Err msg={errors.email} />}
                  </div>
                  <div>
                    <input placeholder="Phone" value={form.phone} onChange={(e) => set('phone', e.target.value)} className={inputCls('phone')} aria-label="Phone" />
                  </div>
                </div>
                <div>
                  <input placeholder="Company *" value={form.company} onChange={(e) => set('company', e.target.value)} className={inputCls('company')} aria-label="Company" />
                  {errors.company && <Err msg={errors.company} />}
                </div>
                <label className="flex cursor-pointer items-start gap-2.5 pt-1">
                  <input type="checkbox" checked={form.consent} onChange={(e) => set('consent', e.target.checked)} className="mt-0.5 h-4 w-4 accent-[color:var(--brand-600)]" />
                  <span className="text-xs leading-relaxed text-fg-muted">
                    I’d like Avenza to contact me about TRF APAC 2026 and consent to my details being used for that purpose.
                  </span>
                </label>
                {errors.consent && <Err msg={errors.consent} />}
              </div>

              <button
                onClick={submit}
                disabled={submitting}
                className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 text-sm font-semibold text-[color:var(--ink-950)] transition-colors hover:bg-brand-500 disabled:opacity-60"
              >
                {submitting ? 'Submitting…' : 'Submit'}
                {!submitting && <ArrowRight className="h-4 w-4" />}
              </button>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function Err({ msg }: { msg: string }) {
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-danger" role="alert">
      <AlertCircle className="h-3.5 w-3.5" /> {msg}
    </p>
  );
}
