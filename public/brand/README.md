# Brand assets

## Palette (official)

| Token | Hex | Use |
|---|---|---|
| Orange | `#F28500` | Brand / primary actions / accents (`--brand-600`) |
| Black | `#161B26` | Primary background (`--ink-900`) |
| White | `#FFFFFF` | Primary text (`--text-primary`) |

All colours are CSS variables in `app/globals.css`. The orange scale
(`--brand-300…-700`) and the black/ink scale (`--ink-600…-950`) are derived from
these three. Change them in one place to re-tune the whole system.

## Logo (official)

The official Avenza wordmark is embedded as inline SVG in
`components/site/logo.tsx` (paths use `currentColor`; defaults to brand orange,
supports a `tone="white"` variant). No external asset file is required.

If a higher-fidelity or full lockup logo is later provided, drop it here as
`avenza-logo.svg` and swap the inline paths in `logo.tsx`.
