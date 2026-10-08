# lab-notebook verification

Preview routes: /designs/lab-notebook/ and /designs/lab-notebook/article/.

Four Playwright screenshots cover the landing page and article at 1440×1000 and 390×844. The JSON reports contain browser, keyboard, image, link, responsive and WCAG 2.1 AA automated checks. Responsive scans also cover 768×1024 and 320×768. Existing Vitest suite: 39 passing tests. Production build, Astro/Svelte checks and lint pass.

## Repeat browser checks

Start the project dev server on port 4401. Install the standalone QA dependencies without changing project manifests:

```sh
npm install --prefix /tmp/blog-design-qa playwright @axe-core/playwright
/tmp/blog-design-qa/node_modules/.bin/playwright install chromium
NODE_PATH=/tmp/blog-design-qa/node_modules node designs/previews/lab-notebook/verify.mjs lab-notebook 4401 /tmp/lab-notebook-qa
NODE_PATH=/tmp/blog-design-qa/node_modules node designs/previews/lab-notebook/interactions.mjs lab-notebook 4401 /tmp/lab-notebook-qa
```

On Nix, set PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH to the Nix Chromium executable.
