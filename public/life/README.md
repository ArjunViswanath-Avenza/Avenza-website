# Life at Avenza — photos

The `/life` gallery loads photos from this folder. Until a photo is present, each
tile shows a playful placeholder (emoji + title), so the gallery always looks
finished.

## Add photos

Drop a JPG/PNG named by the moment's `id` from `content/life.ts`. Current tiles:

| File | Moment |
|---|---|
| `town-hall.jpg`      | All-hands town hall |
| `diwali.jpg`         | Diwali celebrations |
| `offsite.jpg`        | Team offsite |
| `hack-day.jpg`       | Internal hack day |
| `birthdays.jpg`      | Birthday bashes |
| `cricket.jpg`        | Friday cricket |
| `coffee-code.jpg`    | Coffee & code |
| `cert-wins.jpg`      | Certification wins |
| `volunteering.jpg`   | Giving back |
| `festive-lunch.jpg`  | Festive team lunch |
| `workshop.jpg`       | Temenos workshop |
| `game-night.jpg`     | Game nights |
| `new-office.jpg`     | New office day |
| `anniversaries.jpg`  | Work anniversaries |

## Tips
- Any aspect ratio works — the mosaic crops to the tile (`tall` / `wide` /
  `square`, set per moment in `content/life.ts`).
- To add, remove or reorder moments (title, category, emoji, aspect), edit
  `content/life.ts`. Categories drive the filter chips.
- Landscape group shots look great as `wide`; portraits as `tall`.
