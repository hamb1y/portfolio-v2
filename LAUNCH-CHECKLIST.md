# Launch checklist

Open questions for the site owner. Delete each item once it's settled.

## Missing images

These are referenced in content, but the files aren't in the repo, so they showed as broken images. Each reference is now commented out with a note. Add the file under `public/` and uncomment it.

- [ ] `src/content/projectContent/phoneserver-1.md`: the phone server photo
- [ ] `src/content/projectContent/localai.md`: `localai-ollamahome.png`
- [ ] `src/content/projectContent/how-i-updated-my-portfolio.md`: `/images/image-1-.png`
- [ ] `src/content/projectContent/portfolio.md`: `/images/image-1-.png` (same file)

## Content

- [ ] The Minecraft skill was named "Server/Administration", the same as another skill. It's now "Minecraft Servers". Check that the name and its description ("Infrastructure management and deployment automation") are what you mean.
- [ ] `portfolio` and `how-i-updated-my-portfolio` are two projects about the same rebuild. `portfolio` is no longer featured, so the home page doesn't show both. Keep one of them?
- [ ] Stem-G8's `link` points to `/products` on this site. Cards only show a "Visit" button for links to other sites. If Stem-G8 has its own URL or a repo, add it as `link` or `github`.
- [ ] The `portfolio` project's tags include "Server/Administration", which looks like it was copied from the skill.

## Deploy

- [ ] The live site is older than `main`. For example, it has no footer with `id="contact"`, so the hero's Contact button goes nowhere. Deploy after merging.
- [ ] `wrangler.jsonc` uses the Workers static-assets format, but `make deploy` runs `wrangler pages deploy`. Pick one:
  - If it's a Pages project, set the build command to `bun run check && bun run build`, set the output to `dist`, and set `BUN_VERSION=1.4.2`.
  - If it's a Worker, use `wrangler deploy`.
- [ ] Unknown URLs on the live site return 200 with the home page. After deploying, `https://www.rishimalnad.dev/does-not-exist` should return 404 with the new 404 page.
- [ ] `netlify.toml` and `vercel.json` were removed because the site is on Cloudflare. `vercel.json` also rewrote every path to `/`. Restore them if you still deploy there.
- [ ] Submit `https://www.rishimalnad.dev/sitemap-index.xml` in Google Search Console.
