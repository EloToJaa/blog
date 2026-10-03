import js from "@eslint/js";
import astro from "eslint-plugin-astro";
import svelte from "eslint-plugin-svelte";
import ts from "typescript-eslint";
import globals from "globals";
export default [
  {
    ignores: [
      "dist/**",
      ".astro/**",
      ".vercel/**",
      "node_modules/**",
      "playwright-report/**",
      "test-results/**",
    ],
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  ...astro.configs["flat/recommended"],
  ...astro.configs["flat/jsx-a11y-recommended"],
  ...svelte.configs["flat/recommended"],
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  {
    files: ["**/*.astro", "**/*.svelte"],
    languageOptions: { parserOptions: { parser: ts.parser } },
  },
];
