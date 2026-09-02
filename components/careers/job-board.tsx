'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, Briefcase, Clock, ArrowRight } from 'lucide-react';
import { jobs as seedJobs, type Job } from '@/content/jobs';
import { cn } from '@/lib/utils';

function timeAgo(dateStr: string) {
  const days = Math.round((Date.now() - new Date(dateStr).getTime()) / 86_400_000);
  if (days <= 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 30) return `${days}d ago`;
  return `${Math.round(days / 30)}mo ago`;
}

export function JobBoard({ initialJobs = seedJobs }: { initialJobs?: Job[] }) {
  const [q, setQ] = useState('');
  const [dept, setDept] = useState('All');
  const [loc, setLoc] = useState('All');
  const [level, setLevel] = useState('All');

  const departments = useMemo(() => ['All', ...Array.from(new Set(initialJobs.map((j) => j.department)))], [initialJobs]);
  const locations = useMemo(() => ['All', ...Array.from(new Set(initialJobs.map((j) => j.location)))], [initialJobs]);
  const levels = useMemo(() => ['All', ...Array.from(new Set(initialJobs.map((j) => j.experienceLevel)))], [initialJobs]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return initialJobs.filter((j) => {
      const okQ =
        !query ||
        j.title.toLowerCase().includes(query) ||
        j.technologies.some((t) => t.toLowerCase().includes(query)) ||
        j.domain.toLowerCase().includes(query);
      return (
        okQ &&
        (dept === 'All' || j.department === dept) &&
        (loc === 'All' || j.location === loc) &&
        (level === 'All' || j.experienceLevel === level)
      );
    });
  }, [q, dept, loc, level, initialJobs]);

  return (
    <div className="grid gap-8 lg:grid-cols-[16rem_1fr] lg:gap-12">
      {/* Filters */}
      <aside className="space-y-6 lg:sticky lg:top-28 lg:h-fit">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-faint" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search roles, tech…"
            aria-label="Search jobs"
            className="h-11 w-full rounded-lg border border-line bg-white/[0.02] pl-10 pr-4 text-sm text-fg placeholder:text-fg-faint focus:border-brand-400/60 focus:outline-none"
          />
        </div>
        <FilterGroup label="Department" value={dept} setValue={setDept} options={departments} />
        <FilterGroup label="Location" value={loc} setValue={setLoc} options={locations} />
        <FilterGroup label="Experience" value={level} setValue={setLevel} options={levels} />
      </aside>

      {/* Results */}
      <div>
        <div className="mb-5 text-sm text-fg-muted">
          {filtered.length} {filtered.length === 1 ? 'role' : 'roles'}
        </div>
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line py-20 text-center">
            <p className="text-fg-muted">No roles match your filters.</p>
            <button
              onClick={() => { setQ(''); setDept('All'); setLoc('All'); setLevel('All'); }}
              className="mt-3 text-sm text-brand-400 hover:text-brand-300"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((job) => (
              <Link
                key={job.slug}
                href={`/careers/jobs/${job.slug}`}
                className="group flex flex-col gap-4 rounded-2xl border border-line bg-ink-850/60 p-6 transition-all hover:border-brand-400/50 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-line px-2.5 py-0.5 text-xs text-fg-muted">{job.department}</span>
                    <span className="rounded-full bg-brand-600/15 px-2.5 py-0.5 text-xs text-brand-300">{job.experienceLevel}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-fg group-hover:text-gradient">{job.title}</h3>
                  <p className="mt-1.5 max-w-xl text-sm text-fg-muted">{job.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-fg-muted">
                    <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{job.location}</span>
                    <span className="inline-flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5" />{job.employmentType}</span>
                    <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{timeAgo(job.postedAt)}</span>
                  </div>
                </div>
                <ArrowRight className="hidden h-5 w-5 shrink-0 text-fg-faint transition-all group-hover:translate-x-1 group-hover:text-brand-400 sm:block" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({
  label,
  value,
  setValue,
  options,
}: {
  label: string;
  value: string;
  setValue: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <div className="overline mb-3">{label}</div>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => setValue(o)}
            className={cn(
              'rounded-md border px-3 py-1.5 text-xs transition-colors',
              value === o ? 'border-brand-400 bg-brand-600/15 text-fg' : 'border-line text-fg-muted hover:text-fg-secondary',
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
