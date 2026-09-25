# pramodgobburi.com — portfolio

A fast, no-build static portfolio (HTML + CSS + vanilla JS). All content is
loaded **at runtime** from a JSON file, so you can update the site **without
redeploying** — just edit the JSON.

## How content loading works

```
┌─────────────────────────┐        fetch (cache-busted)        ┌──────────────────────┐
│  pramodgobburi3.github.io │  ───────────────────────────────▶ │  content repo         │
│  (this site — static)     │   raw.githubusercontent.com/...   │  content.json         │
└─────────────────────────┘                                    └──────────────────────┘
        │  if remote fetch fails
        ▼
  falls back to the local ./content.json bundled here (site never goes blank)
```

- `assets/js/app.js` fetches `REMOTE_CONTENT_URL` first, then falls back to the
  bundled `content.json`. A `?t=<timestamp>` cache-buster + `cache: "no-store"`
  means edits go live within seconds (raw.githubusercontent has a ~5-min edge
  cache at most).

## One-time setup

### 1. Create the content repo (holds the editable JSON)

1. Create a new **public** GitHub repo, e.g. `portfolio-content`.
2. Add `content.json` to it (copy the one in this folder as your starting point).
3. That's it — the raw URL is:
   ```
   https://raw.githubusercontent.com/<user>/portfolio-content/master/content.json
   ```

### 2. Point the site at it

In `assets/js/app.js`, set:

```js
const REMOTE_CONTENT_URL =
  "https://raw.githubusercontent.com/pramodgobburi3/portfolio-content/master/content.json";
```

(Already pre-filled with that path — just create the repo to match, or change
the URL.) Set it to `""` to always use the local bundled copy.

### 3. Deploy the site to GitHub Pages

This site replaces the old Create-React-App build in
`pramodgobburi3.github.io`. Copy these files to the root of that repo:

```
index.html
content.json          (local fallback copy)
favicon.png
assets/
```

Commit + push to `master`. Pages serves it as-is (no build step). Your `CNAME`
(`pramodgobburi.com`) and the repo's Pages setting stay as they are.

## Updating content later (no redeploy)

Edit `content.json` in the **content repo** via GitHub's web UI → commit.
Refresh the site — the new content is live. You never touch the site repo.

> Keeping the local `content.json` in the site repo in sync is optional — it's
> only the offline fallback. Update it occasionally so the fallback stays fresh.

## Content schema (`content.json`)

- `profile` — `name`, `title`, `tagline`, `location`, `email`, `resumeUrl`,
  `availableForWork` (bool → hero pill), `socials[] {label, url, icon}`
  (icon: `github` | `linkedin` | `mail` | `twitter` | anything else → link icon).
- `about` — `heading`, `body[]` (array of paragraphs).
- `skills[]` — `{ name, icon }` where `icon` is a
  [devicon](https://devicon.dev) class (e.g. `devicon-react-original`).
- `experience[]` — `{ company, role, period, logo, highlights[] }`.
- `education[]` — `{ school, degree, period, logo, detail }`.
- `projects[]` — `{ name, description, image, tags[], links[] {label,url}, featured }`.
  `featured: true` sorts a project to the top.

Project/company/school images live in `assets/img/` in the **site** repo and are
referenced by relative path (e.g. `assets/img/cheep.png`). To add a project
image: drop the file in `assets/img/` (site repo), then reference it in
`content.json`.

## Local preview

```bash
python3 -m http.server 8788
# open http://localhost:8788
```

## Design

Theme: "Modern Dark + Gradient" — dark UI, gradient accents, glassmorphism
cards, subtle motion, scroll-reveal. Fonts: Space Grotesk (display), Inter
(body), JetBrains Mono (mono). Respects `prefers-reduced-motion`.
