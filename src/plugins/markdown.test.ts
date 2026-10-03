import { starlightAsides } from "./asides";
import removeH1 from "./removeH1";
import { createMarkdownProcessor, unified } from "@astrojs/markdown-remark";
import { beforeAll, describe, expect, it } from "vitest";

describe("Astro unified Markdown pipeline", () => {
  let processor: Awaited<ReturnType<typeof createMarkdownProcessor>>;
  beforeAll(async () => {
    processor = await unified({
      remarkPlugins: [removeH1, ...starlightAsides()],
    }).createRenderer({});
  });

  it("removes consecutive H1 headings and preserves heading anchors", async () => {
    const { code, metadata } = await processor.render(
      "# One\n\n# Two\n\n## Section\n\n## Section"
    );
    expect(code).not.toContain("<h1");
    expect(metadata.headings.map(heading => heading.slug)).toEqual([
      "section",
      "section-1",
    ]);
    expect(code).toContain('id="section-1"');
  });

  it.each(["note", "tip", "caution", "danger"])(
    "renders %s callouts with a useful default title",
    async variant => {
      const { code } = await processor.render(
        `:::${variant}\nCallout content.\n:::`
      );
      expect(code).toContain(`starlight-aside--${variant}`);
      expect(code).toContain(
        `aria-label="${variant[0].toUpperCase() + variant.slice(1)}"`
      );
      expect(code).toContain("<p>Callout content.</p>");
    }
  );

  it("preserves custom callout titles and does not transform unknown directives", async () => {
    const { code } = await processor.render(
      ":::tip[Helpful hint]\nContent\n:::\n\n:::example\nOther content\n:::"
    );
    expect(code).toContain('aria-label="Helpful hint"');
    expect(code.match(/Helpful hint/g)).toHaveLength(2);
    expect(code).not.toContain("starlight-aside--example");
    expect(code).toContain("Other content");
  });
});
