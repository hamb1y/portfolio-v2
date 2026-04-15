# Astro Starter Kit: Minimal

```sh
bun create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `bun install`             | Installs dependencies                            |
| `bun dev`             | Starts local dev server at `localhost:4321`      |
| `bun build`           | Build your production site to `./dist/`          |
| `bun preview`         | Preview your build locally, before deploying     |
| `bun astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `bun astro -- --help` | Get help using the Astro CLI                     |

## 📝 CMS Setup (Payload on Cloudflare Workers)

Content is managed via Payload CMS running on **separate** Cloudflare Workers deployment:

- **Frontend**: This repo on Cloudflare Pages
- **CMS API**: `../portfolio-payload` on Cloudflare Workers + D1 + R2

### Quick Start

**Local Development:**
```bash
# Terminal 1: Astro site
cd portfolio-v2
npm run dev  # http://localhost:3000

# Terminal 2: Payload CMS (if modifying schema)
cd ../portfolio-payload
npm run dev  # http://localhost:3000 (different port)
```

**Fetch Content from Payload:**
```typescript
// src/lib/payload.ts
const skills = await fetch(`http://localhost:3000/api/skills`).then(r => r.json())
```

See `../portfolio-payload/ASTRO_INTEGRATION.md` for full integration guide.

### Deployment

- **Astro**: Push to main → auto-deploys to Cloudflare Pages
- **Payload**: Deploy separately to Cloudflare Workers: `cd ../portfolio-payload && pnpm run deploy`

See `../portfolio-payload/DEPLOYMENT.md` for Cloudflare setup.

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
