# Dilshan & Pabasara — Wedding Invitation

The website behind the QR code on our invitation card. Built with Next.js, deployed on Vercel, and storing RSVPs and wishes in Neon Postgres.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Add `?guest=Nimal` to the URL to see a personalised invite.

| Command             | What it does                      |
| ------------------- | --------------------------------- |
| `npm run dev`       | Local dev server                  |
| `npm run build`     | Production build (same as Vercel) |
| `npm run typecheck` | TypeScript check                  |
| `npm run format`    | Format everything with Prettier   |

## Where things live

```
src/
  config/wedding.ts      All wedding details: names, date, venue, programme, story chapters, photo album, gallery
  app/page.tsx           Page order: opening → invitation → countdown → programme → venue → our story → RSVP → wishes → footer
  app/api/rsvp           Saves RSVPs to the database
  app/api/wishes         Lists and saves guest wishes
  app/calendar.ics       "Add to calendar" file for Apple / Outlook
  components/            One component + one .module.css per section (StoryArt.tsx draws the story frames)
  app/globals.css        Colour tokens taken from the V3c card
public/ornaments/        Garden arch, lotus seal, lotus divider and garden footer artwork
db/schema.sql            Table reference + handy queries
```

Most content changes only need `src/config/wedding.ts`.

- **Our Story in Frames:** edit the `story` chapters (the first two are placeholders). Each picks a drawing with `art`: `lanterns`, `lotus`, `rings` or `register`.
- **Shared photo album:** create a Google Photos shared album, turn on _Collaborate_, and paste its link into `photoAlbum.url`. The "Add your photos" button appears from `photoAlbum.opensAt` (midnight on the wedding day). To test it earlier, open the site with `?album=open`.
- **Table-card QR:** `/photos` always forwards to the album, so the printed QR keeps working if the album link changes.
- **Photos after the wedding:** drop them in `public/gallery/` and list them in `gallery`; they appear under the story as "From the day".

## Design

- **Theme:** white lotus with a green touch, matched to the V3c "garden in an arch window" card.
- **Colours:** off-white `#fcfbf7`, sage `#c9d4b8` / `#a9bb8c`, gold `#8c6d2f`, ink `#2b2620` (see `globals.css`).
- **Fonts:** Cormorant Garamond (names in Light, headings, dates), Jost (body, small caps labels).
- Mobile first: check every change at phone width (~390px) before desktop.
- Animations respect the phone's "reduce motion" setting.

## Personal invite links

`https://<site>/?guest=Nimal-Perera` shows "Dear Nimal Perera" on the opening screen, shows "We look forward to celebrating with Nimal Perera" on the invitation and pre-fills the RSVP form. Dashes become spaces. The WhatsApp link preview is personalised too.

Write the name exactly as it should appear, title included, e.g. `?guest=Mr-and-Mrs-Perera` or `?guest=Nimal-Aiya-and-Family` (use `and` rather than `&` in links). Each printed card's QR code encodes that guest's link.

## Database (Neon)

1. In the Vercel project, open **Storage → Create Database → Neon** and connect it to the project. This adds `DATABASE_URL` automatically.
2. Redeploy. Tables are created automatically on the first RSVP or wish.
3. To work against the database locally, copy `DATABASE_URL` from Vercel (**Settings → Environment Variables**) into a `.env.local` file. Never commit it.

Without `DATABASE_URL` the site still works; RSVP and wish forms show a friendly "not open yet" message.

View responses in the Neon console's SQL editor, e.g. `SELECT * FROM rsvps ORDER BY created_at DESC;` (more in `db/schema.sql`).

## Admin page (/admin)

`/admin` shows every RSVP and wish: totals (people coming, accepted, declined), one row per guest with their newest answer, every submission, and a CSV download for Excel or Google Sheets. Guests are matched by their personal-link name, so someone who replies twice is counted once.

1. In Vercel, open **Settings → Environment Variables**, add `ADMIN_PASSWORD` with your password, and redeploy.
2. Open `https://<site>/admin` and log in. You stay logged in on that browser for 14 days.

The password is never stored in the code. Locally, put `ADMIN_PASSWORD=…` in `.env.local`.

## Deploying

- Open a pull request → Vercel posts a preview link on the PR.
- Merge to `main` → the live site updates automatically.
