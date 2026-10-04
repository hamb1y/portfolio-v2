# Launch checklist

Open questions for the site owner. Delete each item once it's settled.

## Missing images

These are referenced in content, but the files aren't in the repo, so they showed as broken images. Each reference is now commented out with a note. Add the file under `public/` and uncomment it.

- [ ] `src/content/projectContent/phoneserver-1.md`: the phone server photo
- [ ] `src/content/projectContent/localai.md`: `localai-ollamahome.png`
- [ ] `src/content/projectContent/how-i-updated-my-portfolio.md`: `/images/image-1-.png`

## Content

- [ ] The Minecraft skill was named "Server/Administration", the same as another skill. It's now "Minecraft Servers". Check that the name and its description ("Infrastructure management and deployment automation") are what you mean.
- [ ] Glome Notebook's demo link, `bookdemo.rishimalnad.dev`, doesn't resolve, so it was removed. If there's a working demo or a repo, add it as `live` or `github` in `src/content/products/glome-notebook.json`.
- [ ] Stem-G8's link pointed to `/products` on this site and was removed. If it has its own URL or a repo, add it as `live` or `github`.
- [ ] Achievements have no dates, so their cards show only the type ("Academic", "Computer science", "Ei ASSET"). Add a `date` to each entry if you want them dated.
- [ ] JNVCKM Site v3 points to `https://jnvckm.org` and `github.com/hamb1y/jnvckm`, with a write-up built from that repo's README. Check the write-up.
- [ ] JNVCKM Site v2's demo, `jnvckm.netlify.app`, returns 404, so the card links to the repo's `archive` branch instead. Its tags include "Artificial Intelligence"; remove it if v2 didn't use AI.
- [ ] The AI Tycoon screenshot (`public/images/projects/ai-tycoon-forest.webp`) shows Studio's yellow selection outline on one tree. Replace it with a capture taken with nothing selected.
- [ ] AI Tycoon is a working title. Rename `src/content/projects/ai-tycoon.json` and `projectContent/ai-tycoon.md` once the title is decided; the file name is the URL.
- [ ] The home page shows the first three featured projects: JNVCKM Site v3, Madilu Shantivana and AI Tycoon. "How I Updated My Portfolio" is no longer featured; set `featured` in each project's JSON to change this.

## Changes to check

- The site uses "Achievements" and "Products" everywhere. "Academics" and "Achievements & Certifications" are gone.
- Selfhost was removed from products.
- The `portfolio` project was removed. It was a copy of `how-i-updated-my-portfolio`, which now links to this repo.
- Skill progress bars were replaced with the level as text.
- Featured projects and products come first, on the home page and on the list pages.

## Deploy

- [ ] `netlify.toml` and `vercel.json` were removed because the site is on Cloudflare. `vercel.json` also rewrote every path to `/`. Restore them if you still deploy there.
- [ ] Submit `https://www.rishimalnad.dev/sitemap-index.xml` in Google Search Console.
