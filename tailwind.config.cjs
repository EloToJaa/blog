/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
    fontFamily: {
      main: ["'Fira Code'", "monospace"],
    }
  },
  darkMode: "class",
  daisyui: {
    themes: [
      "light",
      "dark",
    ]
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
