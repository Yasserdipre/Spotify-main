import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";
import vue from "@astrojs/vue";

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte(), react(), vue(), db()],
  output: 'server',
  adapter: vercel(),
  devToolbar: {
    enabled: false
  }
});