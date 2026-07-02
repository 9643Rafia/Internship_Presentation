# Team Nexus — Internship Showcase (Vanilla HTML/CSS/JS)

This is a plain HTML + CSS + JavaScript rebuild of your internship showcase — no React, no build
step, no npm install. Just open it in a browser (via a local server) and edit.

## Project structure

```
nexus-showcase/
├── index.html          ← all sections/markup live here (nav, hero, about, weekly, innovation,
│                          cyber, activities, conclusion)
├── css/
│   └── styles.css       ← every style: design tokens (colors/fonts), layout, components
├── js/
│   ├── data.js          ← ALL your editable content (team info, weekly entries, innovation
│   │                       ideas, cyber content, skills, projects, gallery, conclusion text)
│   └── app.js            ← renders data.js into index.html and wires up interactivity
│                            (accordions, filters, modal, cipher playground, CTF checker,
│                            radar chart, gallery lightbox, counters, nav, dark mode, etc.)
└── assets/
    └── images/           ← put your real photos here (see below)
```

## How to run it locally in VS Code

1. Open the `nexus-showcase` folder in VS Code.
2. Install the **Live Server** extension (by Ritwick Dey) from the Extensions panel.
3. Right-click `index.html` → **"Open with Live Server"**.

> Why not just double-click index.html? The site uses JavaScript ES modules
> (`<script type="module">`), which browsers block from `file://` for security reasons.
> Live Server (or any local dev server) serves it over `http://localhost`, which fixes this.

Alternative without VS Code extensions: run `python -m http.server 8000` inside the folder,
then visit `http://localhost:8000`.

## How to edit content

**You almost never need to touch `app.js` or the HTML.** Nearly everything on the page is driven
by `js/data.js` — open that file and edit the plain JS objects/arrays:

- `teamMembers`, `internshipTimeline` → About section
- `weeklyEntries` → Weekly Highlights journal (add a new object to add a new week)
- `innovationIdeas`, `innovationStats` → Innovation Centre cards
- `cyberConcepts`, `securityTips`, `cyberTools`, `ctfChallenges` → Cyber Corner
- `technicalSkills`, `softSkills`, `skillRadar`, `projects`, `certificates`, `gallery` → Activities
- `conclusionStats`, `summary`, `takeaways`, `appreciation`, `signatures` → Conclusion
- `siteConfig`, `navItems` → team name/org/year and the top navigation

Save the file and refresh the browser — Live Server will even auto-refresh for you.

## Adding your own images

The original project referenced a few branded photos that weren't included in this export
(logo, front-of-building photo, signage photo, hero photo, gallery screenshots). Drop your own
files into `assets/images/` using these exact names and they'll appear automatically:

- `assets/images/logo.png` — small logo used in the nav, hero badge, and conclusion seal
- `assets/images/pellets-hands.jpg` — hero centerpiece image
- `assets/images/qapco-front.jpg` — About section main photo
- `assets/images/qapco-sign.jpg` — About section side photo
- `assets/images/gallery-1.jpg` … `gallery-4.jpg` — Activities screenshot gallery

If a file is missing, that image area just gracefully hides/collapses instead of showing a
broken-image icon — so the site still looks fine while you're filling in images.

## Notes on what changed from the React version

- **Icons** — now loaded via the [Lucide](https://lucide.dev) CDN script (`data-lucide="..."`
  attributes), so all the original icon names still work.
- **Fonts** — Inter, Playfair Display, JetBrains Mono, loaded from Google Fonts (same as before).
- **Radar chart** — recharts isn't available without React, so it's now a small hand-drawn
  `<canvas>` radar chart in `app.js` (`drawRadar()`), same data, same look.
- **Dialog/Modal** — the Innovation "Details" popup is a plain CSS/JS modal now (see
  `#innovation-modal` in `index.html`).
- **Dark mode** — toggle button in the nav adds/removes a `.dark` class on `<html>` and remembers
  your choice in `localStorage`.
- Everything else (filters, accordions, cipher playground, CTF checker, gallery lightbox, scroll
  reveal animations, animated counters, particle background, tilt-on-hover effect) is reimplemented
  in plain JavaScript with the same behavior as the original React components.

## Deploying

Since this is fully static, you can drag-and-drop the whole `nexus-showcase` folder onto Netlify,
GitHub Pages, Vercel, or any static host — no build step needed.
