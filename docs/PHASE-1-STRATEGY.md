# Avenza 2.0 — Phase 1: Strategy, Architecture & Design System

**Project:** Redesign & rebuild of avenza-consulting.com as a production-grade banking-technology consulting platform.
**Prepared:** 2026-09-02
**Status:** Phase 1 (analysis + architecture + design system + data model + roadmap). No production code written yet — awaiting one architecture confirmation (see §12).

---

## 1. Analysis of the current site

**What exists today** (source: https://www.avenza-consulting.com/ — a Wix site, © 2025):

| Area | Current state |
|---|---|
| Positioning | "Where Technology & Knowledge Meet Results" — trusted partner for *timely core banking transformations*. Blends Temenos expertise with AI, digital, advanced analytics. |
| Platform expertise | Temenos **Transact (T24)**, **TPH** (Temenos Payment Hub), **FCM** (Financial Crime Mitigation). |
| Service lines | Managed **Testing**, Managed **Migration**, **Run & Change the Bank** (L1/L2/L3), Managed **Upgrades**. |
| Differentiators | Credentials · Talent Pool (*"15+ years average experience"*, Temenos-certified) · Thought Leadership (white papers) · Accelerators (pre-filled templates, reusable data mapping, methodologies). |
| Engagement models | End-to-end delivery · Staff augmentation · Hybrid. |
| Careers | Tagline *"We Don't Just Build Banking Solutions. We Build Careers That Matter!"* · 4 roles (Senior Developer, Sr. Product Specialist, Pre-Sales Lead 18+ yrs, Lead Product Consultant) · Apply flows through per-role pages. |
| Navigation | Home · Careers · Contact Us (flat, 3 items). |
| Logo asset | `https://static.wixstatic.com/media/11062b_255717acdd2b4eebb0d592a02944df3ef000.jpg` (160×90 raster JPG — low-res, needs a proper SVG/high-res source from the client). |

**Gaps we will fix:**
1. **Thin IA** — everything is on one long homepage; no room to prove depth. We introduce a real 7-section IA.
2. **No delivery story** — capabilities are listed, never *sequenced*. We add a signature transformation-lifecycle interaction.
3. **Careers is a dead end** — apply = click through to static pages. We build a real ATS-lite: job board, filters, multi-step application, resume upload, reference IDs, email automation, admin pipeline.
4. **No engineering/AI credibility** — "AI" is a bullet. We give it a section with a concrete, non-hype story (code conversion, test generation, migration analysis, documentation automation).
5. **No CMS** — content is locked in Wix. Business team can't publish insights or post jobs. We add a real admin CMS.
6. **Generic template aesthetic** — we replace it with a bespoke "engineered-banking" visual system.

**Factual guardrail:** the current site's only concrete claim is *"15+ years average experience"* (qualitative). We will **not** invent client names, revenue, headcount, award counts, savings %, or geographic claims. Every such value is a CMS/config field defaulting to a clearly-marked `[INSERT VERIFIED METRIC]` placeholder (see §11).

---

## 2. Positioning & messaging strategy (Avenza 2.0)

**Elevated positioning line (hero):**
> **Engineering the future of banking.**
> Avenza modernises core banking, payments and financial-crime platforms — combining deep Temenos expertise with modern engineering, AI and proven delivery.

**Message architecture** — the 30–60-second answers the site must deliver (§53 of brief):

| Visitor question | Where it's answered | One-line answer |
|---|---|---|
| Who is Avenza? | Hero + Trust strip | A banking-technology transformation specialist. |
| What do they specialise in? | Capabilities | Temenos Transact, Payments (TPH), Financial Crime (FCM), migration, testing, upgrades, run-the-bank. |
| Why trust them? | Trust strip + Why Avenza | Certified specialists, proven methodology, proprietary accelerators. |
| What problems do they solve? | "What We Solve" | Legacy modernisation, migration risk, upgrade risk, payments modernisation, quality at scale. |
| What makes them different? | Accelerators + AI | Proprietary accelerators + AI-amplified engineering, not bodyshopping. |
| Evidence they deliver? | Case studies (confidential-safe) | Outcome-led, anonymised transformation stories. |
| Start a conversation? | "Let's Talk" guided enquiry | Structured, routed to the business team. |
| Join the company? | Careers | Real job board + premium application experience. |

**Tone:** executive, confident, concrete. Ban phrases like *"leverage cutting-edge synergies."* Prefer outcome sentences: *"Modernise your core without compromising business continuity."*

---

## 3. Architecture recommendation

### Recommended: a single, unified **Next.js (App Router) full-stack application** + **PostgreSQL/Prisma**

The brief nominally prefers *Next.js + NestJS + Postgres*, but explicitly invites a superior architecture if justified. **For this product, a split NestJS backend adds cost without benefit.** Recommendation and rationale:

**Stack**
- **Next.js 15 (App Router) + React 19 + TypeScript** — SSR/SSG/ISR for SEO-critical marketing + careers pages; React Server Components for data-heavy pages; Route Handlers (`app/api/*`) + Server Actions for the backend.
- **Tailwind CSS v4** + a bespoke token layer (design system in §5).
- **Framer Motion** (component/scroll motion) + **GSAP ScrollTrigger** (the signature lifecycle scroll) + **Lenis** (smooth scroll). Motion is gated behind `prefers-reduced-motion`.
- **Prisma ORM + PostgreSQL** (Neon/Supabase/RDS in prod; Dockerised Postgres locally).
- **Auth.js (NextAuth v5)** credentials provider for `/admin`, `argon2` password hashing, JWT/session, RBAC (Super Admin / HR Admin / Content Admin).
- **Zod** for end-to-end validation (shared client + server schemas).
- **Resend** as default email provider behind a provider interface (SES/SendGrid/SMTP swappable via env).
- **S3-compatible storage** (AWS S3 / Cloudflare R2) for resumes, presigned uploads, private ACL.
- **React Email** for branded transactional templates.
- **Lucide** icons; **Recharts** (admin dashboards) + hand-built SVG/Canvas for the marketing data-viz.

**Why unified Next.js over Next+NestJS**
1. **One deployable, one type system** — Zod/Prisma types shared across UI, API and admin. No REST client/DTO duplication, no cross-service CORS/versioning overhead.
2. **SEO & performance** — the primary business goal is credibility for executives + Google-indexable careers pages. Next SSR/ISR + `next/image` + edge caching gives Lighthouse 90+ far more cheaply than an SPA calling a separate API.
3. **Delivery speed & operability** — a lean team ships and operates one app on Vercel; a separate NestJS service means a second runtime, deploy pipeline, and network hop for no domain complexity that warrants it.
4. **The API is still real & clean** — Route Handlers give us versioned REST (`/api/v1/*`) with the same middleware (rate limiting, validation, RBAC, audit logging). Business logic lives in a framework-agnostic `lib/services/*` layer, so it could be lifted into NestJS later if scale ever demands it.

**When we'd revisit:** if Avenza later needs the backend consumed by other clients (mobile app, partner integrations, heavy async/queue workloads), we extract `lib/services/*` into a standalone NestJS service — the layering makes that a lift, not a rewrite.

> This is the one decision I want to confirm before scaffolding (§12), since it defines the repo shape.

### Deployment architecture (recommended)
- **App:** Vercel (Next.js native; edge + serverless functions, ISR, image optimisation).
- **DB:** Neon (serverless Postgres, branching for previews) or Supabase Postgres.
- **Storage:** Cloudflare R2 or AWS S3 (private bucket, presigned URLs, lifecycle rules).
- **Email:** Resend (prod) — env-swappable.
- **Secrets:** Vercel env vars / `.env` (never in source). `.env.example` committed.
- **Observability:** structured JSON logging (pino), Sentry-ready hooks, analytics provider abstraction (§ analytics).

---

## 4. Information architecture / sitemap

```
/                     Home (hero → trust → what we solve → capabilities → delivery → accelerators → AI → why → insights teaser → CTA)
/about                Story, leadership approach, values, engagement models
/capabilities         Overview grid → detail per capability
  /capabilities/core-banking-transformation
  /capabilities/payments
  /capabilities/financial-crime-compliance
  /capabilities/migration
  /capabilities/testing
  /capabilities/run-and-change
  /capabilities/upgrades
  /capabilities/ai-engineering
/solutions            Solution journeys (problem → approach → outcomes → accelerators → CTA)
  /solutions/[slug]
/industries           Retail / Corporate / Commercial / Payments / FS / FinTech (CMS-toggled)
/accelerators         "Accelerator Lab" interactive index
  /accelerators/[slug]
/insights             Editorial hub: search, filters, categories, tags, featured
  /insights/[slug]
/case-studies         Confidential-safe, outcome-led (CMS)
  /case-studies/[slug]
/careers              Careers landing (culture, growth, "Learn→Certify→Build→Lead→Transform")
  /careers/jobs        Job board (search + filters)
  /careers/jobs/[slug] Job detail
  /careers/jobs/[slug]/apply   Multi-step application wizard
/contact              "Let's Talk" guided multi-step enquiry
/legal/privacy | /legal/cookies | /legal/terms | /legal/accessibility

/admin                Auth-gated CMS + ATS
  /admin/login
  /admin (dashboard)
  /admin/jobs · /admin/jobs/[id] · /admin/applications · /admin/applications/[id]
  /admin/insights · /admin/case-studies · /admin/accelerators
  /admin/capabilities · /admin/solutions · /admin/industries
  /admin/enquiries · /admin/users · /admin/settings · /admin/audit-logs

API (versioned): /api/v1/jobs · /jobs/[slug] · /jobs/[id]/applications · /contact ·
  /insights · /case-studies · /accelerators · /admin/* (auth) · /health
```

**Header nav (7 items):** About · Capabilities · Solutions · Industries · Accelerators · Insights · Careers — primary CTA **Let's Talk**, sticky, transforms on scroll, mega-menu on desktop, full-screen overlay on mobile.

---

## 5. Design system (foundations)

A bespoke "engineered banking" system — premium, technical, trustworthy. Not templated, not neon, not glassy.

**Color — dark-first, with a light mode.**
| Token | Value | Role |
|---|---|---|
| `--ink-950` | `#0A0E1A` | Primary background (deep near-black navy) |
| `--ink-900` | `#0F1626` | Elevated surface |
| `--ink-800` | `#161F33` | Cards / lines |
| `--slate-400` | `#8A97B0` | Muted text |
| `--paper` | `#F7F9FC` | Light-mode background |
| `--brand-600` | `#1D4ED8`→tuned | Primary brand blue (trust; refined once true logo colors confirmed) |
| `--brand-400` | `#3B82F6` | Interactive/hover |
| `--accent-teal` | `#2DD4BF` | Data-flow / signal accent (used sparingly) |
| `--accent-gold` | `#C9A227` | Premium highlight (metrics, seals) |
| `--success/warn/danger` | standard | States |

> Brand blue + accent are provisional until we get the real logo/brand hexes from the client (current logo is a low-res JPG). All colors are CSS variables, so a brand swap is one file.

**Typography.**
- Display/headings: a modern grotesk with character — **Söhne**/**Neue Haas** class; ship with **Geist** or **Inter Tight** as license-free default.
- Body: **Inter**. Mono (for technical/accelerator UI + data labels): **Geist Mono** / **JetBrains Mono**.
- Scale (fluid, `clamp()`): Display 64→96, H1 40→56, H2 32→40, H3 24→28, Body 16→18, Small 14, Overline 12/tracked-uppercase.

**Spacing:** 4px base; 4/8/12/16/24/32/48/64/96/128 scale. **Radius:** restrained — 4/8/12px; no jelly-rounded cards. **Elevation:** soft, low-spread shadows + 1px hairline borders (`--ink-800`) rather than heavy drop shadows.

**Components:** buttons (primary/secondary/ghost, magnetic on desktop), badges/pills, cards (hairline, hover-lift ≤4px), navigation (mega-menu, mobile overlay), forms (labelled, inline-validated, accessible errors), tabs, accordions, stat tiles, data-viz primitives, skeleton loaders, empty/error/success states.

**Motion system:** durations 150/250/400/700ms; easing `cubic-bezier(0.22,1,0.36,1)` (out-expo feel). Patterns: scroll reveals, text-splitting, number counters, SVG data-flow, parallax (subtle), page/section transitions. **Every motion respects `prefers-reduced-motion` and degrades to instant/opacity.**

**Breakpoints:** 360 (small mobile) · 480 · 768 (tablet) · 1024 (laptop) · 1280 · 1536 · 1920+ (4K). Mobile layouts designed intentionally, not stacked desktop.

---

## 6. Signature interactions (the 5+ differentiators)

1. **Banking Ecosystem (hero)** — Canvas/SVG node-graph: Core → Payments → Channels → Data → AI → Risk/Compliance → Cloud, with animated data-flows that subtly respond to cursor. Performant, reduced-motion aware, *not* game-like.
2. **"We connect the pieces" (What We Solve)** — scattered challenge nodes animate into a coherent transformation pipeline on scroll.
3. **Transformation Journey (How We Deliver)** — GSAP ScrollTrigger: 8 stages (Discover→Assess→Design→Transform→Validate→Deploy→Stabilise→Optimise) activate as you scroll; capabilities + background viz change per stage. The signature scroll.
4. **Accelerator Lab** — interactive index where each accelerator expands to problem→solution→how→benefits→stage.
5. **Banking Architecture diagram** — interactive layered stack (Channels→Integration→Core→Payments→Data→AI→Analytics).
6. **Careers Journey** — Learn→Certify→Build→Lead→Transform interactive path.

---

## 7. Data model (Prisma outline)

```
User(id, email, name, passwordHash, role[SUPER_ADMIN|HR_ADMIN|CONTENT_ADMIN], isActive, lastLoginAt, timestamps)
Job(id, slug, title, department, location, employmentType, experienceLevel, minYears, maxYears,
    technologies[], domain, summary, responsibilities[], requirements[], niceToHave[], benefits[],
    aboutTeam, status[DRAFT|PUBLISHED|UNPUBLISHED|ARCHIVED], postedAt, publishedById, timestamps)
JobApplication(id, referenceId "AVZ-2026-XXXXX", jobId, fullName, email, phone, currentLocation,
    preferredLocation, totalExperience, relevantExperience, currentOrganization, currentRole,
    noticePeriod, linkedinUrl, portfolioUrl, skills[], coverLetter, resumeKey, resumeFilename,
    consent, status[NEW|SCREENING|SHORTLISTED|INTERVIEW|SELECTED|REJECTED|ON_HOLD], source, timestamps)
ApplicationStatusHistory(id, applicationId, fromStatus, toStatus, note, changedById, createdAt)
ApplicationNote(id, applicationId, authorId, body, createdAt)
Insight(id, slug, title, excerpt, body(MDX/rich), category, tags[], type[ARTICLE|WHITEPAPER|POV|REPORT|VIDEO],
    coverImageKey, featured, status, publishedAt, authorId, seo{...}, timestamps)
CaseStudy(id, slug, title, clientLabel "Confidential Global Bank", industry, challenge, transformation,
    solution, technologies[], deliveryModel, outcomes[], metrics[], images[], tags[], status, timestamps)
Accelerator(id, slug, name, problem, solution, howItWorks, benefits[], stage, category, status, timestamps)
Capability / Solution / Industry(id, slug, title, summary, body, order, isVisible, ...)   // CMS-toggled
ContactEnquiry(id, referenceId "AVZ-ENQ-...", topic, company, companySize, challenge, timeline,
    name, email, phone, role, status[NEW|IN_REVIEW|CONTACTED|CLOSED], source, timestamps)
SiteConfiguration(key, value json)   // hero copy, metrics, contact info, feature flags, verified-metric fields
AuditLog(id, actorId, action, entity, entityId, metadata json, ip, createdAt)
```

Relationships: `Job 1—* JobApplication`, `JobApplication 1—* StatusHistory/Note`, `User 1—* AuditLog`. All destructive/admin mutations write `AuditLog`. Prisma migrations from day one; seed script for demo jobs/insights/accelerators.

---

## 8. API design (versioned REST via Route Handlers)

**Public:** `GET /api/v1/jobs` (+filters: role, experience, location, tech, domain, type) · `GET /api/v1/jobs/[slug]` · `POST /api/v1/jobs/[id]/applications` (multipart, resume) · `POST /api/v1/contact` · `GET /api/v1/insights` (+search/filter) · `GET /api/v1/insights/[slug]` · `GET /api/v1/case-studies` · `GET /api/v1/accelerators` · `GET /api/health`.
**Admin (auth + RBAC):** `POST/PUT/DELETE /api/v1/admin/jobs[/:id]` · `PATCH /api/v1/admin/applications/:id/status` · `GET /api/v1/admin/applications` · resume download (presigned, access-controlled) · CRUD for insights/case-studies/accelerators/capabilities/solutions/industries · `GET /api/v1/admin/enquiries` · settings · audit-logs.
**Conventions:** consistent envelope `{ data, error, meta }`; Zod validation on every input; standard error codes; pagination `?page&pageSize`; rate limiting per-route.

---

## 9. Security, SEO, performance, accessibility

**Security:** security headers + CSP (nonce-based), CORS policy, per-route rate limiting (upstash/in-memory), Zod input validation + sanitisation, CSRF protection for mutations, secure/httpOnly cookies, argon2 hashing, RBAC, file-upload validation (type via magic-bytes + extension + size cap, unique keys, private ACL, malware-scan hook point), audit logging, secrets via env only. Resumes never public — served through access-controlled presigned URLs.
**SEO:** per-page metadata (title/description/canonical/OG/Twitter), JSON-LD for `Organization`, `WebSite`, `JobPosting`, `Article`, `BreadcrumbList`; `sitemap.xml` + `robots.txt`; careers pages SSG/ISR and indexable.
**Performance (Lighthouse 90+ target):** RSC + streaming, `next/image`, font subsetting/`next/font`, code-splitting + dynamic imports for heavy motion, ISR caching, minimal client JS, animation on transform/opacity only.
**Accessibility (WCAG 2.2 AA):** semantic HTML, keyboard nav + visible focus, ARIA where needed, screen-reader labels, contrast-checked tokens, reduced-motion, accessible forms + error messaging.

---

## 10. Analytics

Provider-agnostic `track(event, props)` abstraction (env-selectable: Plausible/GA4/PostHog). Events: page_view, cta_click, contact_start/submit, job_search, job_view, application_start/step/complete, resume_upload, insight_engagement. No PII in event props.

---

## 11. Content & verified-data policy

Every hard number lives in `SiteConfiguration` / a `config/site.ts` file and defaults to `[INSERT VERIFIED METRIC]`. We ship qualitative proof points (certified specialists, proven methodology, proprietary accelerators, 15+ yrs avg experience — the one real claim) and leave numeric fields for the client to fill. Case studies default to anonymised labels ("Confidential Global Bank"). **Logo:** current asset is a low-res JPG — we'll integrate it as-is as a placeholder and flag exactly where the client must drop a proper SVG/high-res logo.

---

## 12. Roadmap & the one decision I need

**Phased delivery (maps to brief §50):**
- **P1 ✅ (this doc)** — analysis, architecture, IA, design system, data model, plan.
- **P2** — scaffold app + design system + tokens; header/nav; hero + ecosystem interaction; home sections; core marketing pages.
- **P3** — Postgres + Prisma schema/migrations/seed; Auth.js admin auth + RBAC; public read APIs.
- **P4** — Careers: job board + filters, job detail, multi-step application wizard, resume upload, reference IDs, email automation (React Email + Resend), contact guided enquiry.
- **P5** — Admin CMS + ATS: dashboard, job mgmt, application pipeline/status, insights, case studies, accelerators, enquiries, users, settings, audit logs.
- **P6** — security hardening, SEO/JSON-LD/sitemap, performance pass, accessibility pass.
- **P7** — tests (unit for business logic; API tests for jobs/applications/contact/auth; Playwright E2E for the apply + enquiry flows) + polish.

**Decision to confirm before I scaffold (§3):** unified **Next.js full-stack** (my strong recommendation) vs. the brief's nominal **Next.js + separate NestJS** split. This sets the repo shape, so I want your explicit call before generating the foundation.
