import { defineConfig } from 'astro/config';
import compress from 'astro-compress';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), sitemap(), react(), compress({ Image: false })],
  image: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.ytimg.com',
      },
    ],
  },
  output: 'server',
  adapter: vercel({
    edgeMiddleware: true,
    webAnalitics: { enabled: true },
    maxDuration: 10,
    imageService: true,
  }),
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'pt'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
