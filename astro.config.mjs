import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), sitemap(), react(), compress({ Image: false })],
  output: 'server',
  adapter: netlify({
    imageCDN: true
  }),
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'pt'],
    routing: {
      prefixDefaultLocale: false
    }
  }
});
