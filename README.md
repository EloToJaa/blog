# My personal blog website

## Description

My personal blog to which i will add articles.
CTF section is also planned.

## Project status

Currently under development.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:3000`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Testing

Run `nix develop` to use the project's Bun, Node.js, and Chromium. The shell
sets `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` so Playwright uses Nix's Chromium
without downloading a browser. Then install dependencies with
`bun install --frozen-lockfile`.

| Command                   | Action                                    |
| :------------------------ | :---------------------------------------- |
| `bun run test`            | Run the Vitest unit tests once            |
| `bun run test:watch`      | Run unit tests in watch mode              |
| `bun run test:e2e`        | Run the Playwright Chromium tests         |
| `bun run test:e2e:ui`     | Open Playwright's interactive test runner |
| `bun run test:e2e:report` | Open the last browser test report         |

Unit tests live beside the utilities in `src/**/*.test.ts`. Browser tests live in
`tests/e2e`; Playwright starts an Astro development server on port 4321 and
reuses an existing server locally. Outside Nix, install Chromium first with
`bunx --no-install playwright install --with-deps chromium`.

The GitHub Actions workflow runs the production build and both test suites on
pull requests and pushes to `main`, and uploads browser reports on failure.

## Useful links

- [Astro documentation](https://docs.astro.build)
- [Astro Discord server](https://astro.build/chat).
