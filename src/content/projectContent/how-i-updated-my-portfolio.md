---
title: How I Updated My Portfolio
description: How I rebuilt my portfolio around Astro Content Collections, local markdown and JSON content, and static hosting on Cloudflare Pages.
technologies:
  - Astro
  - Content Collections
  - Markdown
  - Static Site
  - Server/Administration
link: https://www.rishimalnad.dev
---

# 1. Issues with previous site:

With my previous site, while it looked and functioned well for the end user, it had two drawbacks.
1. I had to directly clone the repository, edit the centralized `src/config.ts`, and then write blogs in markdown format using a code editor in a specific, convoluted way.

2. There was no good way to visualize everything, which made things complicated.

# 2. How I migrated my site

I decided to build my new site from scratch after realizing that adapting the old one was more effort than it was worth. I moved the site to Astro Content Collections so projects, blog posts, achievements, hobbies, and skills can stay type-safe while still living directly in the repository.

I planned out the new site with a black, minimalist theme using solid colors and modern Astro capabilities. Rather than using an automated builder like bolt.dev (which I used for the old site), I was more involved in the creation process this time, using DeepSeek-V3 via the official API to assist with writing the code.

For hosting, I decided to migrate from Netlify to Cloudflare Pages. I already use Cloudflare Tunnel and their DNS management, and Netlify's free tier has become quite limiting for my needs. I also found it much easier to set up and deploy on Cloudflare Pages.

# 3. The End Result

A static portfolio site with typed local content, markdown detail pages, and no external content service required.


> Another fun fact: In the past 30 days, Cloudflare Pages handled 2.54k unique requests for this site at no cost.
>
> ![Unique Visitors in the past 30 days](/images/image-1-.png "Unique Visitors in the past 30 days")
`
