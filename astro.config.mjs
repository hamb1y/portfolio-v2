// @ts-check
import { defineConfig } from 'astro/config';
import { z } from 'astro/zod';

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  integrations: [svelte()],
  env: {
    schema: {
      PUBLIC_PAYLOAD_API_URL: z.string().url().optional().default('http://localhost:3000'),
    },
  },
});