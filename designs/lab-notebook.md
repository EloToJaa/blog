# Lab notebook

Subject: Łukasz Budziak's software engineering and cybersecurity notes. Readers are programmers and CTF participants; the homepage should lead them to the actual Cyber Apocalypse writeup.

Palette: paper lavender #F1ECFA, ink plum #352343, annotation violet #69429B, ruled line #D9CBE8, highlight lilac #DCC6F4, chalk #FCFAFF.

Typography: Self-hosted Lora italic is the expressive display voice, Source Sans 3 carries navigation and readable prose, Fira Code identifies dates, categories and source artifacts. Source Sans and Fira Code are existing dependencies; Lora Latin 400/600 normal and italic WOFF2 assets are included with their SIL Open Font License.

Layout: a generous open notebook with a quiet identity bar, oversized two-line thesis, marginal handwritten annotation, then a large research entry split between a graphical observation and its real post metadata.

```text
EloToJa / notebook                 Entries   About   GitHub
─────────────────────────────────────────────────────────
Notes from                      [software engineering]
a curious mind.                 [cybersecurity]
     ~ inspect, understand, explain
─────────────────────────────────────────────────────────
Latest entry       March 2024
┌────────────────────────┬───────────────────────────────┐
│ JS → command → flag    │ Cyber Apocalypse 2024          │
│ annotated observation  │ Hacker Royale                 │
│                        │ Read the field notes →        │
└────────────────────────┴───────────────────────────────┘
About the author                   What you'll find here
```

Signature: a drawn, lavender observation diagram derived from the real Flag Command challenge; marginal annotation explains the hidden command rather than adding generic decoration. The diagram repeats as an actual section reference on the article page.

Critique before implementation: discarded fake entry numbers and invented article cards because this archive contains one published post. Avoid a generic warm-paper journal by making paper distinctly lavender, using a deep-plum feature panel and the exact browser-JavaScript discovery as its visual focus. Limit handwriting to one brief annotation; let reading typography remain disciplined.

Accessibility: semantic landmarks, working archive/about/feed/profile links, visible focus, no decorative motion, narrow-screen stacking, full real article and section navigation.

## Verification

- Production Astro build passes with all eight routes generated.
- Astro check: 73 files, no errors, warnings or hints. Svelte check: no errors or warnings.
- ESLint and Vite+ lint pass; changed Astro files pass Prettier; git diff whitespace check passes.
- Existing unit suite: 10 files and 39 tests pass. Shared symlink dependencies initially prevented Vite's filesystem access; using local dependency copies resolved that environment issue.
- Central Playwright verification reports no horizontal overflow, broken images, missing section targets or axe violations for desktop/mobile homepage and article, with visible keyboard focus.
- Screenshot critique replaced an unavailable Unicode ornament with a deterministic SVG. Local bundled fonts require a local dependency directory for Vite dev to serve them correctly.

Final typography refinement: browser inspection showed no system serif available, so Lora is explicitly self-hosted for display, entry titles, annotations and article headings. This preserves the intended literary notebook contrast across environments.
