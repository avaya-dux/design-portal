import netlify from "@astrojs/netlify/functions";
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import svelte from "@astrojs/svelte";
import vue from "@astrojs/vue";

export default defineConfig({
  adapter: netlify(),
  integrations: [react(), svelte(), vue()],
  output: "server",
  // site: "https://design.avayacloud.com/", // TODO: uncomment when we release v3
  vite: {
    server: {
      open: true,
    },
    ssr: {
      noExternal: ["avaya-neo-react"],
    },
  },
});
