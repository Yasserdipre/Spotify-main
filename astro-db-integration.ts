import { defineDbIntegration } from '@astrojs/db/utils';

export default function MyIntegration() {
  return defineDbIntegration({
    name: 'spotify-astro-db-integration',
    hooks: {
      'astro:db:setup': ({ extendDb }) => {
        extendDb({
          configEntrypoint: './db/config',
          seedEntrypoint: './db/seed',
        });
      },
    },
  });
}
