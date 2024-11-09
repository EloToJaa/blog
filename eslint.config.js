import js from "@eslint/js";
import eslintPluginAstro from "eslint-plugin-astro";
import eslintPluginSvelte from "eslint-plugin-svelte";

export default [
  // Use the JavaScript recommended rules
  {
    ...js.configs.recommended,
  },
  // Astro plugin configuration
  {
    plugins: {
      astro: eslintPluginAstro,
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
      },
    },
    rules: {
      ...eslintPluginAstro.configs.recommended.rules,
    },
  },
  // Svelte plugin configuration
  {
    plugins: {
      svelte: eslintPluginSvelte,
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
      },
    },
    rules: {
      ...eslintPluginSvelte.configs["flat/recommended"].rules,
    },
  },
  // Custom rules (applied globally)
  {
    rules: {
      // Override or add any specific rule settings here
      "no-unused-vars": "warn",
      // Add any additional custom rules if needed
    },
  },
];
