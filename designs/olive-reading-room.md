# Olive reading room

Subject: Łukasz Budziak's software engineering and cybersecurity notes, for programmers who want to understand the reasoning behind a solve. The home page's job is to invite a reader into the published Cyber Apocalypse writeup.

Palette: library olive #41482F, deep ink #29301F, butter paper #F4F0CC, leaf #D7DDBB, quiet moss #606747, paper highlight #FFFDEB.
Typography: Self-hosted Literata italic display; Literata normal for long-form reading; locally bundled Source Sans 3 for navigation and metadata; Fira Code for code.
Layout: a broad, unhurried opening with a vertical bookmark hanging through the right side. Below it, a book-like featured essay and a quiet author panel. The article uses a sticky chapter index beside a generous reading column.

```
NAME                         POSTS ABOUT
                                        | bookmark |
Notes worth                             |  read    |
keeping.                                |   ↓      |
[author / subject introduction]          |    V     |
--------------------------------------------------
LATEST WRITING    | featured real essay title
                 | abstract / categories / read
--------------------------------------------------
ABOUT THE AUTHOR | biography          social links
```

Signature: an oversized olive bookmark, cut to a swallowtail and labelled with the three actual subjects of the blog. It is a functional link to the featured writing, expressing the act of returning to technical notes.
Critique before build: a cream-and-serif treatment could default to a generic literary template. Replace cream/terracotta with explicitly pale yellow/olive, keep the display slanted and open, and use the physical bookmark as the sole large graphic. Avoid book illustrations, fake issue numbering, and fabricated archive rows: the repository currently has one published essay.
Accessibility: semantic navigation and headings, skip link, strong focus outlines, no motion dependency, readable mobile article with horizontal scroll contained to code. Use full original markdown with generated TOC anchors.

Typography verification: headless Linux did not supply Georgia or Palatino and resolved generic serif to monospace. Self-host Literata 400 normal/italic and 600 normal, with Latin and Latin extended subsets for the author's Polish name; retain its OFL license. This makes the literary direction deterministic without external font services or runtime dependencies. Removed the decorative star after critique to keep the bookmark as the sole signature.
