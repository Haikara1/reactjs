import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'


export default defineConfig({

    plugins: [

        react(),

        VitePWA({

            registerType: "autoUpdate",

            devOptions: {
                enabled: true
            },

            manifest: {

              name: "Agenda React",

              short_name: "Agenda",

              description:
                  "Aplicativo de gerenciamento de lembretes",

              theme_color: "#111827",

              background_color: "#ffffff",

              display: "standalone",

              orientation: "portrait",

              lang: "pt-BR",

              start_url: "/",

              scope: "/",

              icons: [

                  {
                      src: "/icon-192.png",
                      sizes: "192x192",
                      type: "image/png",
                      purpose: "any"
                  },

                  {
                      src: "/icon-512.png",
                      sizes: "512x512",
                      type: "image/png",
                      purpose: "any"
                  },

                  {
                      src: "/icon-512.png",
                      sizes: "512x512",
                      type: "image/png",
                      purpose: "maskable"
                  }

              ]

            }

        })

    ]

})