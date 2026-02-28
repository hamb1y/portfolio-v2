---
title: How I Updated My Portfolio
description: How I migrated my portfolio from having to manually edit config.ts and add blogs to using DecapCMS for editing, And Netlify Auth for authenthication.
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
With my previous site, while it looked and functioned well to the end user, it had 2 drawbacks.
1. I had to directly clone the repository, edit the centralized `src/config.ts` then edit and add a blog in markdown(x) format in a code editor in a specific, convoluted method.
2. There was no good way of visualizing everything and it made things complicated.
# 2. How I migrated my site
I decided to start making my site from scratch, after realizing trying to adapt my current site was more effort than it was worth. So, instead I came up with a solution. I used DecapCMS (Previously Netlify CMS) for editing, as it has a robust, easy to use, and adaptable configuration system. For authentication, I chose DecapBridge as it was simple, robust and easy to setup, and also because Netlify Identity which I was planning to use is now deprecated and doesn't have good documentation.
I planned out the new site with a new glassmorphism look with a Star Background. It is also written in Astro but a much newer and non-unstable release of Astro. Also, it uses Svelte 5 for the StarBackground code. Instead of using something like bolt.dev which I used last time to code the old site, this time I was much more present in the creation process and used deepseek's deepseek-v3.2-thinking with opencode through the official API to make this site.
Whereas last time, Netlify was used to host and deploy this site, this time I've decided to use Cloudflare Pages as I already use Cloudflare Tunnel to route my self-hosted server to my domain and Cloudflare to manage my DNS, and also because of Netlify's new free tier being extremely limiting. Also, it was much easier to setup and deploy on Cloudflare Pages than Netlify.
# 3. The End Result
> Fun fact: You're currently reading this on the migrated site, and this blog/project was written using Decap CMS.
>
> ![Me editing this blog (using Decap CMS)](__/images/image-2-.png__ "Me editing this blog (using Decap CMS)")
A fully functional, headless, dynamic portfolio site with robust editing and authentication, hosted for free on Cloudflare Pages.
> Another fun fact: In the past 30 days this fully dynamic site was deployed, Cloudflare Pages handled 2.54k unique requests for free with ease.
>
> ![Unique Visitors in the past 30 days](__/images/image-1-.png__ "Unique Visitors in the past 30 days")
