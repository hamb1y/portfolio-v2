---
title: Madilu Shantivana
description: Website of Madilu Shantivana, a three-acre farm of fruit and native timber trees in Kanakapura taluk, Karnataka.
technologies:
  - Astro
  - Svelte
  - TypeScript
  - Sveltia CMS
  - Cloudflare Pages
---

Madilu Shantivana is three acres of fruit trees and native timber trees at Tenginamaradoddi, Kanakapura taluk, Karnataka. The farm was planned in March 2024 and planted from June 2024. I built its website, live at [madilushantivana.org](https://madilushantivana.org), in English and Kannada.

## What's on it

- **Home:** the farm's story in chapters, from bare red earth to rows of young trees, with a drawing of the farm and a slider that shows the same ground two years apart.
- **Story:** every dated entry from the first plan onwards, by year, filtered by topic.
- **What grows:** the planting map, one mark per tree, redrawn from the farm's hand-drawn sheets. You can pick out any kind of tree on it, and the page counts every kind.
- **Farming:** where the farm's water, feed and mulch come from and where they go, and how it's watered, fed, weeded and protected.
- **Photos:** every photo on the site, by year.
- **About:** who runs the farm, what the name means, and where it is.

## How it works

- All content, including the interface text in both languages, is JSON in the repository. The farm edits it through Sveltia CMS at `/admin/`, signing in with GitHub through a small Cloudflare Worker.
- The tree counts on the site come from the planting map's data file, so they can't drift from the map.
- Kannada pages live under `/kn/` and fall back to English for anything not yet translated. Dates are formatted from the site's own month tables.
- Cloudflare Pages rebuilds the site on every commit.

## Stack

- Astro 7 with static output
- Svelte 5 islands for the planting map and the photo viewer
- Plain CSS, Lucide icons, and the Fraunces, Source Sans 3, Noto Sans Kannada and Noto Serif Kannada fonts
- Bun for installs and scripts

## Checks

A verification script serves the built site and checks every page in Chromium. A second script checks that every field in the content is declared in the CMS config, because Sveltia drops undeclared fields when it saves.

The code is source-available under CWSL-1.0. The farm's text, photos and name belong to Madilu Shantivana.
