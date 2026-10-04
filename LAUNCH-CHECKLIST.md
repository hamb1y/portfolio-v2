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
- [ ] JNVCKM now points to `https://jnvckm.org` and `github.com/hamb1y/jnvckm`, with a write-up built from that repo's README. Check the write-up.

## Changes to check

- The site uses "Achievements" and "Products" everywhere. "Academics" and "Achievements & Certifications" are gone.
- Selfhost was removed from products.
- The `portfolio` project was removed. It was a copy of `how-i-updated-my-portfolio`, which now links to this repo.
- Skill progress bars were replaced with the level as text.
- Featured projects and products come first, on the home page and on the list pages.

## Deploy

- [ ] `netlify.toml` and `vercel.json` were removed because the site is on Cloudflare. `vercel.json` also rewrote every path to `/`. Restore them if you still deploy there.
- [ ] Submit `https://www.rishimalnad.dev/sitemap-index.xml` in Google Search Console.
