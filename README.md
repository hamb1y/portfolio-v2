# Portfolio v2

Astro 5 + Svelte static portfolio site. Content is stored locally in Astro Content Collections.

## Project Structure

```text
/
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── lib/
│   ├── pages/
│   └── styles/
└── package.json
```

Astro routes live in `src/pages/`. Content entries live in `src/content/` and are validated by `src/content/config.ts`.

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `bun install`             | Installs dependencies                            |
| `bun dev`             | Starts local dev server at `localhost:4321`      |
| `bun build`           | Build your production site to `./dist/`          |
| `bun preview`         | Preview your build locally, before deploying     |
| `bun astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `bun astro -- --help` | Get help using the Astro CLI                     |

## Deployment

Build output is written to `dist/` and can be hosted as static files.
