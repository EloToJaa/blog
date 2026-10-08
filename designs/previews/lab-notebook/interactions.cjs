const fs = require("fs"),
  { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch({
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
    args: ["--no-sandbox"],
  });
  for (const [i, name] of [
    "technical-atlas",
    "lab-notebook",
    "orange-poster",
    "olive-reading-room",
    "glass-workspace",
  ].entries()) {
    if (process.argv[2] && name !== process.argv[2]) continue;
    const p = await b.newPage({
      viewport: { width: 390, height: 844 },
      reducedMotion: "reduce",
      colorScheme: "dark",
    });
    const base = "http://127.0.0.1:" + (process.argv[3] || 4401 + i),
      route = "/designs/" + name + "/";
    const result = { design: name, checks: [], fonts: [] };
    await p.goto(base + route, { waitUntil: "networkidle" });
    await p.evaluate(() => document.fonts.ready);
    result.fonts = await p.evaluate(() =>
      [...document.fonts]
        .filter(f => f.status === "loaded")
        .map(f => ({ family: f.family, style: f.style, weight: f.weight }))
    );
    await p.keyboard.press("Tab");
    const first = await p.evaluate(() => ({
      href: document.activeElement.getAttribute("href"),
      outline: getComputedStyle(document.activeElement).outline,
    }));
    await p.keyboard.press("Enter");
    result.checks.push({
      skipLink: first.href,
      skipWorks:
        !!first.href?.startsWith("#") && new URL(p.url()).hash === first.href,
      visibleFocus: first.outline !== "none" && !first.outline.includes("0px"),
    });
    await p.goto(base + route + "article/", { waitUntil: "networkidle" });
    const anchors = await p
      .locator("a[href]")
      .evaluateAll(as =>
        as
          .map(a => a.getAttribute("href"))
          .filter(
            h =>
              h?.startsWith("#") &&
              h !== "#main-content" &&
              h !== "#content" &&
              h !== "#main" &&
              h !== "#top"
          )
      );
    if (anchors.length) {
      const href = anchors[0];
      await p
        .locator('a[href="' + href + '"]')
        .first()
        .click();
      result.checks.push({
        tocWorks: new URL(p.url()).hash === href,
        target: href,
      });
    } else result.checks.push({ tocWorks: false });
    await p.goto(base + route, { waitUntil: "networkidle" });
    const deepLinks = await p
      .locator("a[href]")
      .evaluateAll(as =>
        as
          .map(a => a.getAttribute("href"))
          .filter(
            h => h?.startsWith("/") && h.includes("/article") && h.includes("#")
          )
      );
    for (const href of [...new Set(deepLinks)]) {
      await p.goto(base + href, { waitUntil: "domcontentloaded" });
      const target = decodeURIComponent(new URL(p.url()).hash.slice(1));
      result.checks.push({
        deepLink: href,
        targetExists: (await p.locator('[id="' + target + '"]').count()) === 1,
      });
    }
    result.passed = result.checks.every(
      c =>
        c.skipWorks !== false &&
        c.visibleFocus !== false &&
        c.tocWorks !== false &&
        c.targetExists !== false
    );
    const out = process.argv[4] || "designs/previews/" + name;
    fs.writeFileSync(
      out + "/interactions.json",
      JSON.stringify(result, null, 2)
    );
    console.log(JSON.stringify(result));
    await p.close();
  }
  await b.close();
})().catch(e => {
  console.error(e);
  process.exit(1);
});
