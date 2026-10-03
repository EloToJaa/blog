# EloToJa's blog

A static Astro site with Svelte search, Markdown articles, and Tailwind/DaisyUI styling.

## Development

Run `nix develop`, then `bun install --frozen-lockfile` and `bun run dev --ignore-lock`.
The site runs at http://localhost:4321. The shell includes Bun, Node.js, bun2nix,
Oxlint, Oxfmt, and Chromium on Linux. Vite+ supplies the project command runner,
Oxlint/Oxfmt, and Vitest; ESLint adds Astro/Svelte template and accessibility checks.
Prettier handles Astro and Svelte formatting alongside Oxfmt for other files.

| Command                         | Purpose                                     |
| ------------------------------- | ------------------------------------------- |
| `bun run build`                 | Generate the static site in `dist/`         |
| `bun run preview --ignore-lock` | Serve the production build                  |
| `bun run check`                 | Check Astro, TypeScript, and Svelte types   |
| `bun run lint`                  | Run Oxlint and template-aware ESLint        |
| `bun run format`                | Format the source and configuration         |
| `bun run format:check`          | Check formatting                            |
| `bun run test`                  | Run unit and Markdown-plugin tests          |
| `bun run test:e2e`              | Run Playwright against the production build |
| `nix build`                     | Build and check the site with bun2nix       |
| `nix flake check`               | Run the Nix package checks                  |

Build before running browser tests. Playwright starts its own production preview
on port 4321; stop any existing preview first with `bun run preview stop`.
The Nix shell sets `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` on Linux. Outside Nix,
install Chromium with `bunx --no-install playwright install --with-deps chromium`.
CI runs formatting, lint, type checks, the production build, unit tests, and browser tests.

## Content and search

Articles live in `src/content/blog` and authors in `src/content/authors`.
Drafts and future-dated articles are excluded from every public listing, article
route, RSS feed, and search index. Scheduled articles require a rebuild to publish.
Post URLs use content IDs; there is no separate frontmatter slug override.
Dates display in UTC to keep server and browser rendering consistent.

Search downloads `/search-index.json` once and filters locally with Fuse.
Effect handles content loading, URL decoding, index loading, and search computation.
Selected tags use case-insensitive matching and all selected tags must match.
Queries are limited to 200 characters and tag filters to 20 tags of 100 characters.
Only the first five matches are displayed; refine the query to see other matches.
No server functions or project secrets are required. If a future integration needs
secrets, use SecretSpec with AWS Secrets Manager.

The headings demonstration is a test fixture, not a published article. Unit tests
cover publication rules, pagination, URL decoding, search filtering, and Markdown
transforms. Browser tests cover production navigation, theme persistence, mobile
menus, search recovery, tag links, metadata, RSS, and pagination semantics.

## Dependency updates

After updating `package.json`, run `bun install` and `bun2nix -o bun.nix`.
Commit both lockfiles and the generated dependency manifest. Nix outputs use
`flake-utils.lib.eachDefaultSystem`; Chromium is supplied on Linux only.
Run `nix build` on each target platform before relying on its package output.
