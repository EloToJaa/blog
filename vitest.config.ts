import { svelte } from "@sveltejs/vite-plugin-svelte";
import { svelteTesting } from "@testing-library/svelte/vite";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [svelte(), svelteTesting()],
  resolve: {
    alias: {
      "astro:actions": fileURLToPath(
        new URL("./tests/mocks/actions.ts", import.meta.url)
      ),
      "@components": fileURLToPath(
        new URL("./src/components", import.meta.url)
      ),
      "@utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    include: ["src/**/*.test.ts"],
  },
});
