# AGENTS.md

Rules for agents working on this Astro 5 + Svelte 5 portfolio (www.rishimalnad.dev).

## Commands

Use bun. There is no npm lockfile; don't add one.

```bash
bun install
bun run dev       # dev server on :4321
bun run check     # astro check: must report 0 errors and 0 warnings
bun run build     # makes certificate thumbnails, then builds to dist/
bun run preview   # serve dist/
bun run thumbs    # thumbnails only
```

`bun build` (without `run`) is Bun's bundler, not the build script. Always use `bun run build`.

## Structure

```
src/
├── components/
│   ├── Layout.astro        # <head>, nav, footer, starfield, lightbox <dialog>, page-load scripts
│   ├── Nav.astro           # desktop links + mobile menu (breakpoint 900px)
│   ├── Footer.astro        # id="contact"; social links, copyright, licence and source link
│   ├── Hero.astro
│   ├── Card.astro          # base card
│   ├── EntryCard.astro     # project/product card (home grids and list pages)
│   ├── EntryDetail.astro   # /projects/<slug> and /products/<slug> pages
│   ├── BlogCard.astro
│   ├── SkillCard.astro
│   ├── HobbyCard.astro
│   └── AchievementsGrid.astro, *Grid.astro, BlogSection.astro
├── content/                # collections, schemas in config.ts
├── lib/
│   ├── nav.ts              # nav items: the single list used by Nav and Footer
│   ├── format.ts           # formatDate(), isoDate(), thumb(), achievementMeta()
│   ├── entries.ts          # featuredFirst()
│   └── starfield.ts
├── pages/                  # routes, including 404.astro
└── styles/global.css       # tokens and the utility classes the site uses
scripts/
├── thumbs.mjs              # public/certificates/*.jpg|png -> thumbs/*.webp (900px)
└── migrate_*               # one-off v1 migration scripts, not part of the build
```

## Content

| Collection | Type | Notes |
| --- | --- | --- |
| `site` | data | name, description, socials |
| `achievements` | data | `image` points into `public/certificates/`; the card shows its thumbnail and the lightbox opens the original |
| `projects`, `products` | data | card data and links (`live`, `github`, `link`); `featured: true` sorts it first, and the home page shows the first 3 |
| `projectContent`, `productContent` | content | detail pages at `/projects/<slug>` and `/products/<slug>`; same slug as the card file. No links here: the page takes them from the card data |
| `blog` | content | `/blog/<slug>` |
| `skills` | data | `icon` is `set:name` (Iconify, e.g. `simple-icons:python`) or a plain name mapped to Lucide in `SkillCard.astro`; `level` is Beginner, Intermediate or Advanced |
| `hobbies` | data | `icon` is a key in `HobbyCard.astro`'s map |

Markdown headings are renumbered at build time so a document's top level becomes h2 under the page's h1. Write posts starting at `#` or `##`; don't repeat the title as a heading.

Adding a certificate: drop the file into `public/certificates/`, add the JSON entry, then run `bun run thumbs` (or just build).

## Rules

- There is no Tailwind. Classes like `grid md:grid-cols-2` are hand-written in `global.css`. If you use one that isn't defined there, it does nothing, so add it or use a scoped style.
- Keep the look: black background, starfield, bordered cards, white text, Google Sans.
- No pills, badges, glass, glows, gradients, scroll reveals or CSS animations. Tags are a comma-separated text list; metadata is muted text.
- Three radii: 4, 8 and 12 px (the tokens in `global.css`).
- Home sections have an h2 and, when there are more entries than shown, an "All n …" text link. Nav links are underlined text.
- Use the same name for a section everywhere (nav, heading, page title): Projects, Products, Blog, Skills, Achievements, Hobbies.
- Page scripts run on `astro:page-load` (view transitions are on), not on `DOMContentLoaded`.
- One h1 per page, and headings never skip a level. Card components take `headingLevel` (3 on the home page, 2 on list pages).
- A whole card is clickable through `.stretched-link` on its title. Other buttons inside the card sit above it with `z-index`.
- No horizontal scroll at 320, 390 or 1440 px. Check phone layouts before calling a change done.
- Respect `prefers-reduced-motion` for anything that moves.
- Run `bun run check` and `bun run build` before committing. Commit only when asked.

## Deploy

Cloudflare Pages project `portfolio-v2` builds every push to `main`: `bun run check && bun run build`, output `dist`, `BUN_VERSION=1.4.2`. Unknown paths get `404.html` with a 404 status. `make deploy` checks, builds and pushes `main`; don't upload `dist/` by hand. `site` in `astro.config.mjs` is `https://www.rishimalnad.dev`; canonical URLs and the sitemap come from it.
