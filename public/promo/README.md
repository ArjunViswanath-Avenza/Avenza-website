# Promo modal — featured speaker photo

The "I'm Interested" registration modal shows a featured-speaker photo.

## Add the photo you supplied

Save the headshot here as:

```
speaker.jpg
```

(→ `public/promo/speaker.jpg`, referenced by `content/promo.ts`.)

Portrait/upright shot works best — the panel crops with `object-cover object-top`.
Until this file exists, the modal automatically falls back to
`/team/gopinath-chandran.png`, so nothing breaks. To use a different file name,
update `speaker.photo` in `content/promo.ts`.
