import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import Icons from "unplugin-icons/vite";
import removeH1 from "/src/plugins/removeH1.ts";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  adapter: cloudflare({ mode: "directory" }),
  vite: {
    plugins: [
      Icons({
        compiler: "astro",
        defaultStyle: "font-size: 1.5em",
        defaultClass: "hover:text-accent",
      }),
    ],
  },
  integrations: [
    svelte(),
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
    sitemap(),
  ],
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      experimentalThemes: {
        light: "github-light",
        dark: "github-dark",
      },
      langs: [],
      wrap: true,
    },
    remarkPlugins: [removeH1],
  },
  redirects: {
    "/github": "https://github.com/elotojaa",
  },
});
