// @ts-check
import { defineConfig, envField } from 'astro/config';

import svelte from '@astrojs/svelte';

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [svelte()],

  env: {
    schema: {
      PUBLIC_PAYLOAD_API_URL: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
        default: 'http://localhost:3000',
      }),
    },
  },

  adapter: cloudflare()
});