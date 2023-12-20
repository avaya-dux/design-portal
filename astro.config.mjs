import netlify from "@astrojs/netlify/functions"
import prefetch from "@astrojs/prefetch"
import react from "@astrojs/react"
import svelte from "@astrojs/svelte"
import vue from "@astrojs/vue"
import { defineConfig } from "astro/config"

// why prefetch: https://docs.astro.build/en/guides/integrations-guide/prefetch/#why-prefetch

export default defineConfig({
  site: "https://design.avayacloud.com/",
  adapter: netlify({
    cacheOnDemandPages: true,
  }),
  output: "server",
  integrations: [react(), svelte(), vue(), prefetch()],
  vite: {
    ssr: {
      noExternal: [
        "avaya-neo-react",
        "prism-react-renderer",
        "react-element-to-jsx-string",
      ],
    },
  },
})
