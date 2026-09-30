// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

/**
 * Each page already renders the entry title as its <h1>. Some Markdown bodies start their
 * sections at `#`, others at `##`; shift each document so its top level becomes h2.
 */
function normalizeHeadings() {
  /** @param {any} node @param {(n: any) => void} fn */
  const visit = (node, fn) => {
    if (node.type === 'heading') fn(node);
    node.children?.forEach((/** @type {any} */ child) => visit(child, fn));
  };
  /** @param {any} tree */
  return (tree) => {
    let min = 6;
    visit(tree, (h) => (min = Math.min(min, h.depth)));
    const shift = 2 - min;
    if (shift > 0) visit(tree, (h) => (h.depth = Math.min(h.depth + shift, 6)));
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://www.rishimalnad.dev',
  output: 'static',
  integrations: [svelte(), icon(), sitemap()],
  markdown: {
    remarkPlugins: [normalizeHeadings],
  },
});
