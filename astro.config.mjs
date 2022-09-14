import netlify from "@astrojs/netlify/functions";
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";
import vue from "@astrojs/vue";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://design.avayacloud.com/",
  adapter: netlify(),
  output: "server",
  integrations: [react(), svelte(), vue()],
  vite: {
    server: {
      open: true,
    },
    ssr: {
      noExternal: ["avaya-neo-react"],
    },
  },
});
