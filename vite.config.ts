import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",

      injectRegister: "auto",

      includeAssets: [
        "grimforge-icon.svg",
        "grimforge-maskable.svg",
      ],

      manifest: {
        id: ".",

        name: "Grimforge",
        short_name: "Grimforge",

        description:
          "Ein düsteres digitales Charakterarchiv und Spielwerkzeug.",

        lang: "de",
        dir: "ltr",

        start_url: ".",
        scope: ".",

        display: "standalone",
        orientation: "any",

        background_color: "#09090b",
        theme_color: "#17111f",

        categories: [
          "games",
          "utilities",
          "entertainment",
        ],

        icons: [
          {
            src: "grimforge-icon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any",
          },
          {
            src: "grimforge-maskable.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "maskable",
          },
        ],
      },

      workbox: {
        cleanupOutdatedCaches: true,

        clientsClaim: true,
        skipWaiting: true,

        globPatterns: [
          "**/*.{js,css,html,svg,png,webp,ico,woff,woff2}",
        ],

        navigateFallback: "index.html",

        runtimeCaching: [
          {
            urlPattern: ({ request }) =>
              request.destination === "image",

            handler: "CacheFirst",

            options: {
              cacheName: "grimforge-images-v1",

              expiration: {
                maxEntries: 80,
                maxAgeSeconds:
                  60 * 60 * 24 * 30,
              },

              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },

      devOptions: {
        enabled: false,
      },
    }),
  ],
});