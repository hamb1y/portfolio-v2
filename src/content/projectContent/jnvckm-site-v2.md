---
title: JNVCKM Site v2
description: Website of the JNVCKM Alumni Association, for former students of Jawahar Navodaya Vidyalaya, Chikkamagaluru.
technologies:
  - Astro
  - Svelte
  - TypeScript
  - Sveltia CMS
  - Cloudflare Pages
---

The JNVCKM Alumni Association is made up of former students of PM SHRI Jawahar Navodaya Vidyalaya, Chikkamagaluru, at Seegodu near Balehonnur. It was formed in 1994. I rebuilt its website, which is live at [jnvckm.org](https://jnvckm.org).

## What's on it

- **Programs:** IGNITE, where alumni come back to guide students in classes 10 to 12, and the Navodaya Cricket League, an annual tournament between batches.
- **Contributions:** what alumni and batches have funded and built at the school, and who they have helped.
- **Events:** the annual campus meet, reunions, workshops, and every IGNITE edition and cricket league season on record.
- **Stories:** news, reports and memories from alumni.
- **The Vidyalaya:** the school itself.

It is not an official site of the school or of Navodaya Vidyalaya Samiti.

## How it works

- Static pages with no trackers, ads or cookies.
- All content is JSON in the repository. The association edits it through Sveltia CMS at `/admin/`, so every edit is a commit, and Cloudflare Pages rebuilds the site from it.
- Built for phones first, with accessible contrast and headings.

## Stack

- Astro 7 with static output
- One Svelte 5 island: the filter on the contributions page
- Plain CSS, Lucide icons, and the Arvo and Mukta fonts
- Bun for installs and scripts

## Checks

A verification script drives Chromium over the built site. It fails on console errors, horizontal overflow at 320, 390 and 1440 px, skipped heading levels, low-contrast text, broken images and internal links that return 404. The build also generates WebP versions of every photo and a JPEG sharing image for each one.

The code is source-available under CWSL-1.0.
