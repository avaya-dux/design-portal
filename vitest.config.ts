import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    coverage: {
      reporter: ["text", "json", "json-summary", "html", "lcov"],
    },
  },
});
