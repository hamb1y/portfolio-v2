# AGENTS.md - Project Documentation

This document provides guidance for AI agents working on this Astro + Svelte portfolio project.

## Project Overview

- **Framework**: Astro 5 with Svelte integration
- **Styling**: Custom minimal CSS (Black background #000, White text #fff)
- **Content**: Astro Content Collections
- **Deployment**: Static site generation

## Project Structure

```
src/
├── components/           # Astro & Svelte components
│   ├── Card.astro       # Reusable card component
│   └── Layout.astro     # Main layout
├── content/             # Content collections
│   ├── config.ts        # Zod schemas for collections
│   ├── achievements/    # Achievement entries (.json)
│   ├── projects/        # Project entries (.json)
│   ├── blog/           # Blog posts (.md)
│   └── skills/         # Skill entries (.json)
├── lib/                 # Utility libraries
│   └── starfield.ts    # Canvas-based starfield animation
├── pages/               # Astro pages
│   └── index.astro     # Homepage
└── styles/             # Global CSS
    └── global.css      # Design tokens & base styles

scripts/
└── migrate_*.js/py     # Migration scripts from v1
```

## Content Collections

Collections are defined in `src/content/config.ts`:

### 1. Achievements
- **Type**: `data`
- **Fields**: `type` (string), `title`, `description`, `image` (optional), `date` (optional), `priority` (number)
- **Usage**: Awards, certifications, milestones

### 2. Projects
- **Type**: `data`
- **Fields**: `title`, `description`, `tags[]`, `link` (optional), `github` (optional), `live` (optional), `featured` (boolean)
- **Usage**: Project showcases with tags and links

### 3. Blog
- **Type**: `content`
- **Fields**: `title`, `description`, `image` (optional), `date`, `readTime` (optional), `tags[]` (optional), markdown body
- **Usage**: Full blog posts with markdown content

### 4. Skills
- **Type**: `data`
- **Fields**: `emoji`, `name`, `description`, `level` (string)
- **Usage**: Skill listing with emoji and proficiency level

## Available Tools & Commands

### Development
```bash
bun dev          # Start dev server (port 4321)
bun run build        # Build production site
bun preview      # Preview build locally
bun astro check  # TypeScript validation
```

## Key Components

### Card.astro
Reusable card component:
- **Usage**: Wrap content with a minimalistic border and background.

## Development Guidelines

### Code Style
- **Components**: Use existing patterns from StarBackground.svelte
- **CSS**: Follow design tokens in `global.css` (--color-*, --spacing-*, etc.)
- **Types**: Always use TypeScript; run `astro check` before committing

### Content
1. Content is type-safe via Zod schemas in `config.ts`
2. Use `getCollection()` to fetch entries:
   ```typescript
   import { getCollection } from 'astro:content';
   const achievements = await getCollection('achievements');
   ```
3. Sort/filter as needed (e.g., by `priority` or `date`)

### File Operations
- **New components**: Add to `src/components/` following existing patterns
- **New pages**: Add `.astro` files to `src/pages/`
- **Content entries**: Add JSON/Markdown to appropriate collection directory

## Common Tasks & Solutions

### Adding a New Content Field
1. Update Zod schema in `src/content/config.ts`
2. Regenerate TypeScript types (automatic on dev server restart)

### Fixing TypeScript Errors
Run `bun astro check` to identify issues. Common fixes:
- Import paths: Use `./` for same directory, `../` for parent
- Component props: Ensure they match Svelte component definitions
- Collection types: Verify against Zod schemas
- **Svelte component props**: Editor LSP may show false errors for Svelte component props. If `astro check` passes but editor shows errors, ignore editor errors. The build will work correctly.

## Build & Deployment

### Production Build
```bash
bun build
```
- Output: `dist/` directory
- Static files only (no server required)

### Pre-commit Checks
Before committing:
1. Run `bun build` to ensure no build errors
2. Run `bun astro check` for TypeScript validation

## Environment Notes

- **Node.js**: Project uses ES modules (`"type": "module"`)
- **Dependencies**: Managed via npm (see `package.json`)
- **TypeScript**: Strict mode enabled via Astro config
- **Git**: Repository at `hamb1y/portfolio-v2` (main branch)

---

*Last Updated: Wed Feb 18 07:10:57 PM IST 2026*
