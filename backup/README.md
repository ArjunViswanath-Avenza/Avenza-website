# Backup — Accelerators with POC videos

Snapshot of the **video-enabled** Accelerators section, taken before the videos
were removed at the client's request. Everything here mirrors the project's own
folder layout, so restoring is a straight copy-back.

## What's inside

```
backup/
├─ content/accelerators.ts                     # accelerator data WITH video/poster fields
├─ components/accelerators/accelerator-lab.tsx  # grid with hover-play montage previews
├─ components/accelerators/poc-video.tsx        # full-video player (detail page)
├─ app/accelerators/[slug]/page.tsx             # detail page WITH full video
└─ videos/                                      # all POC clips + generated *-preview.mp4
```

This folder is excluded from TypeScript/Next builds (see `tsconfig.json` →
`"exclude": ["node_modules", "backup"]`), so it never affects the live site.

## Current (live) version

The live Accelerators section keeps **all 9 POC names + details** (problem,
solution, how-it-works, benefits, stage) but has **no previews or videos** — it's
the older expand-in-place accordion.

## How to restore the video version

1. Copy each file back over its live counterpart:
   - `backup/content/accelerators.ts` → `content/accelerators.ts`
   - `backup/components/accelerators/accelerator-lab.tsx` → `components/accelerators/accelerator-lab.tsx`
   - `backup/components/accelerators/poc-video.tsx` → `components/accelerators/poc-video.tsx`
   - `backup/app/accelerators/[slug]/page.tsx` → `app/accelerators/[slug]/page.tsx`
2. Move the assets back: `backup/videos` → `public/videos`.
3. (Optional) remove `"backup"` from the `exclude` array in `tsconfig.json` if you
   delete this folder afterwards.
```
