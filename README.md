# Portfolio v2

Rishi Malnad's portfolio: projects, product ideas, skills, achievements and blog posts. Live at [www.rishimalnad.dev](https://www.rishimalnad.dev).

Built with Astro 5 and Svelte 5 as a static site. Content lives in Astro content collections under `src/content/`.

## Commands

| Command | Action |
| :-- | :-- |
| `bun install` | Install dependencies |
| `bun run dev` | Dev server at `localhost:4321` |
| `bun run check` | Type-check with `astro check` |
| `bun run build` | Make certificate thumbnails and build to `dist/` |
| `bun run preview` | Serve the build locally |
| `bun run thumbs` | Make certificate thumbnails only |

Use `bun run build`, not `bun build`. The latter is Bun's bundler.

## Structure

```text
public/        static files; certificates/ holds achievement images and thumbs/
scripts/       thumbs.mjs (used by the build) and old v1 migration scripts
src/
├── components/
├── content/   collections; schemas in config.ts
├── lib/       nav list, date formatting, starfield
├── pages/
└── styles/
```

See [AGENTS.md](AGENTS.md) for how the pieces fit together.

## Deployment

Cloudflare Pages builds the site on every push to `main` (`bun run check && bun run build`, output `dist/`).

## Licence

Source-available under the Controlled Website Source License 1.1 (CWSL-1.1). See [LICENSE](LICENSE). It is not an open-source licence.
