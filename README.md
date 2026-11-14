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
  config/wedding.ts      All wedding details: names, date, venue, programme, gallery photos
  app/page.tsx           Page order: opening → invitation → countdown → programme → venue → gallery → RSVP → wishes → footer
  app/api/rsvp           Saves RSVPs to the database
  app/api/wishes         Lists and saves guest wishes
  app/calendar.ics       "Add to calendar" file for Apple / Outlook
  components/            One component + one .module.css per section
  app/globals.css        Colour tokens taken from the printed card
public/ornaments/        Mandala and pun kalasa artwork exported from the Figma card
db/schema.sql            Table reference + handy queries
```

Most content changes only need `src/config/wedding.ts`. To add photos, drop them in `public/gallery/` and list them in `gallery` in that file.

## Design

- **Colours:** cream `#fbf6ea`, gold `#8c6d2f`, ink `#2b2620` (see `globals.css`).
- **Fonts:** Pinyon Script (names), Cormorant Garamond (headings, dates), Jost (body, small caps labels).
- Mobile first: check every change at phone width (~390px) before desktop.
- Animations respect the phone's "reduce motion" setting.

## Personal invite links

`https://<site>/?guest=Nimal-Perera` shows "Dear Nimal Perera" on the opening screen, fills the name on the invitation and pre-fills the RSVP form. Dashes become spaces. The WhatsApp link preview is personalised too.

## Database (Neon)

1. In the Vercel project, open **Storage → Create Database → Neon** and connect it to the project. This adds `DATABASE_URL` automatically.
2. Redeploy. Tables are created automatically on the first RSVP or wish.
3. To work against the database locally, copy `DATABASE_URL` from Vercel (**Settings → Environment Variables**) into a `.env.local` file. Never commit it.

Without `DATABASE_URL` the site still works; RSVP and wish forms show a friendly "not open yet" message.

View responses in the Neon console's SQL editor, e.g. `SELECT * FROM rsvps ORDER BY created_at DESC;` (more in `db/schema.sql`).

## Deploying

- Open a pull request → Vercel posts a preview link on the PR.
- Merge to `main` → the live site updates automatically.
