# Technical Atlas

Subject: Łukasz Budziak's software engineering and cybersecurity notes, for developers who enjoy understanding how systems work. The landing page's job is to lead readers into the real Cyber Apocalypse writeup.

Palette: cobalt #1649E8, deep ink #10244A, ice #E9F2FF, paper #F8FBFF, line #C5D7EF, white #FFFFFF.
Typography: Source Sans 3 for large, tightly spaced display and comfortable body text; Fira Code for navigation, dates, and map labels. Both are already bundled locally.
Layout: a generous two-column thesis and systems map, followed by a wide featured writeup, then a concise author note. Article has an oversized blue title block and a quiet white reading column with a sticky section index.

```
NAME                         Notes / About / RSS
THESIS                       [CONNECTED SUBJECT MAP]
intro                        [web, pwn, crypto, rev, misc]
LATEST NOTE ------------------------------
[CYBER APOCALYPSE title       real section index]
ABOUT AUTHOR                 GitHub / LinkedIn
```

Signature: a navigable systems map connecting the five actual categories of the Cyber Apocalypse article to a central observation node. Its connections express the author's inspection/modelling/scripting method, not fictitious statistics.

Critique before build: a conventional abstract technical diagram could fit any software site. Revised it into a useful content map: each named node links directly to that real writeup's section. Avoided fabricated post cards, ornamental numbering, gradients, and generic dashboard widgets. The blue composition carries the visual risk; the reading surface remains quiet.

## Implementation and validation

Preview routes: `/designs/technical-atlas` and `/designs/technical-atlas/article`.

Both pages use locally bundled fonts and existing published content; the article renders the full Markdown, including syntax-highlighted code and the certificate. All map nodes and the reading index link to real heading anchors. Existing pages, content, and Nix setup stay intact. Responsive breakpoints adapt the map, article columns, title, and navigation; keyboard focus is visible and reduced-motion preferences are respected.

Verified: Astro static build; Astro diagnostics (73 files, zero errors/warnings/hints); Svelte diagnostics (zero errors/warnings); existing Vitest suite (10 files, 39 passing tests); Vite+ lint; targeted ESLint for the three Astro files; Prettier formatting. Coordinator captures and verifies desktop, mobile, and article screenshots with Playwright.
