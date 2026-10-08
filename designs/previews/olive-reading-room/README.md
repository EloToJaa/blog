# olive-reading-room verification

Preview routes: /designs/olive-reading-room/ and /designs/olive-reading-room/article/.

Four Playwright screenshots cover the landing page and article at 1440×1000 and 390×844. The JSON reports contain browser, keyboard, image, link, responsive and WCAG 2.1 AA automated checks. Responsive scans also cover 768×1024 and 320×768. Existing Vitest suite: 39 passing tests. Production build, Astro/Svelte checks and lint pass.

## Repeat browser checks

Start the project dev server on port 4401. Install the standalone QA dependencies without changing project manifests:

```sh
npm install --prefix /tmp/blog-design-qa playwright @axe-core/playwright
/tmp/blog-design-qa/node_modules/.bin/playwright install chromium
NODE_PATH=/tmp/blog-design-qa/node_modules node designs/previews/olive-reading-room/verify.cjs olive-reading-room 4401 /tmp/olive-reading-room-qa
NODE_PATH=/tmp/blog-design-qa/node_modules node designs/previews/olive-reading-room/interactions.cjs olive-reading-room 4401 /tmp/olive-reading-room-qa
```

On Nix, set PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH to the Nix Chromium executable.
