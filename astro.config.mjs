import netlify from "@astrojs/netlify";
import prefetch from "@astrojs/prefetch";
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";
import vue from "@astrojs/vue";
import { defineConfig } from "astro/config";

// why prefetch: https://docs.astro.build/en/guides/integrations-guide/prefetch/#why-prefetch

export default defineConfig({
	site: "https://design.avayacloud.com/",
	adapter: netlify(),
	output: "server",
	integrations: [react(), svelte(), vue(), prefetch()],
	redirects: {
		"/components/web/navbar-web": "/components/header",
		"/components/web/tables-web": "/components/table",
		"/components/web/switch-web": "/components/switch",
		"/components/web/widget-web": "/components/widget",
		"/components/icons": "/components/icon",
		"/components/web/dropdown-web": "/components/dropdown",
		"/components/web/checkbox-web": "/components/checkbox",
		"/components/web/pagination-web": "/components/pagination",
	},
	vite: {
		ssr: {
			noExternal: [
				"avaya-neo-react",
				"prism-react-renderer",
				"react-element-to-jsx-string",
				"octokit",
			],
		},
	},
});
