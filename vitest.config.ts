import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    coverage: {
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/index.ts",
        "src/components/index.ts",
        "src/layouts/index.ts",
        "src/components/astro/**",
        "src/pageletes/**",
        "**/test/**",
        "**/*.d.ts",
      ],
      reporter: ["text", "json", "json-summary", "html", "lcov"],
    },
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, "./src/components"),
      helpers: path.resolve(__dirname, "./src/helpers"),
    },
  },
});
