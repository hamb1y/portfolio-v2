---
title: How I Updated My Portfolio
description: How I migrated my portfolio from having to manually edit config.ts and manage markdown files, to using Decap CMS for editing and Netlify Auth for authentication.
technologies:
  - Astro
  - Netlify
  - Decap CMS
  - Netlify Identity
  - Dynamic
  - Server/Administration
link: www.rishimalnad.dev
---

# 1. Issues with previous site:

With my previous site, while it looked and functioned well to the end user 2 drawbacks.
1. I had to directly clone the repository, edit the centralized `src/config.ts`, and then write blogs in markdown format using a code editor in a specific, convoluted way.

2. There was no good way of visualizing everything and it made things complicated.

# 2. How I migrated my site

I decided to build my new site from scratch after realizing that adapting the old one was more effort than it was worth. I used Decap CMS (previously Netlify CMS) for editing because of its robust, adaptable configuration system. For authentication, I chose DecapBridge — it was simple to set up, and Netlify Identity (which I originally planned to use) is now deprecated.

I planned out the new site with a black, minimalistic theme using solid colors and modern Astro capabilities. Rather than using an automated builder like bolt.dev (which I used for the old site), I was much more present in the creation process this time, using DeepSeek-V3 via the official API to assist with writing the code.

For hosting, I decided to migrate from Netlify to Cloudflare Pages. I already use Cloudflare Tunnel and their DNS management, and Netlify's free tier has become quite limiting for my needs. I also found it much easier to set up and deploy on Cloudflare Pages.

# 3. The End Result

> Fun fact: You're currently reading this on the migrated site, and this blog/project was written using Decap CMS.
>
> ![Me editing this blog (using Decap CMS)](/images/image-2-.png "Me editing this blog (using Decap CMS)")

A fully functional, headless, dynamic with robust editing and authentication portfolio site, hosted for free on the hosting provider Netlify.


> Another fun fact: In the past 30 days this fully dynamic site was deployed, Cloudflare Pages handled 2.54k unique requests for free with ease.
>
> ![Unique Visitors in the past 30 days](/images/image-1-.png "Unique Visitors in the past 30 days")
`
