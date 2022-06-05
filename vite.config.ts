import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  build: {
    sourcemap: mode === 'development',
    assetsDir: 'code',
    chunkSizeWarningLimit: 1000,
  },
  plugins: [
    VitePWA({
      // you can remove base and scope pwa plugin will use the base on vite: defaults to /
      base: '/',
      scope: '/',
      registerType: 'autoUpdate',
      injectRegister: false,
      manifest: false,
      workbox: {
        globDirectory: 'dist',
        globPatterns: ['**/*.{html,js,css,png,webp,jpg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/unpkg\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'unpkg-libs-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 60, // <== 60 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
}));
