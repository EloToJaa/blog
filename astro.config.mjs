import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import Icons from "unplugin-icons/vite";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  adapter: node({
    mode: "standalone",
  }),
  vite: {
    plugins: [
      Icons({
        compiler: "astro",
        defaultStyle: "font-size: 1.5em",
        defaultClass: "hover:text-blue-700",
      }),
    ],
  },
  integrations: [
    svelte(),
    tailwind({ applyBaseStyles: false }),
    mdx(),
    sitemap(),
  ],
  markdown: {
    shikiConfig: {
      experimentalThemes: {
        light: "github-light",
        dark: "github-dark",
      },
      langs: [],
      wrap: true,
    },
    redirects: {
      "/github": "https://github.com/elotojaa/",
    },
  },
});
