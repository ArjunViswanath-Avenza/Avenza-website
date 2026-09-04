# Accelerator POC clips

Each accelerator can show a POC demo clip in the Accelerator Lab (expanded card)
and on its detail page. To add one, set the `video` (and optional `poster`)
field on that accelerator in `content/accelerators.ts`, e.g.:

```ts
{
  slug: 'migration-toolkit',
  // ...
  video: '/videos/migration-toolkit.mp4',
  poster: '/videos/migration-toolkit.jpg', // optional still frame
}
```

## Suggested filenames (by accelerator slug)

| Accelerator | Suggested clip |
|---|---|
| Migration Toolkit          | `migration-toolkit.mp4` |
| Configuration Templates    | `config-templates.mp4` |
| Data Mapping Utilities     | `data-mapping.mp4` |
| Test Automation Framework  | `test-automation.mp4` |
| Deployment Automation      | `deployment-automation.mp4` |
| Documentation Automation   | `documentation-automation.mp4` |
| AI Implementation Tools    | `ai-implementation.mp4` |

## Tips
- **MP4 (H.264 + AAC)** plays everywhere. Keep clips short (10–40s) and, ideally,
  compressed (≈720p) so pages stay fast — the player only preloads metadata and
  never autoplays.
- Add a `poster` still (JPG/PNG) so the frame looks intentional before play.
- Just hand me the clip files + which accelerator each belongs to, and I'll drop
  them here and wire the `video` fields for you.
```
