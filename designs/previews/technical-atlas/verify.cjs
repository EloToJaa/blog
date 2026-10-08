const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");
const AxeBuilder = require("@axe-core/playwright").default;
const [name, port, output] = process.argv.slice(2);
(async () => {
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
    headless: true,
    args: ["--no-sandbox"],
  });
  const origin = "http://127.0.0.1:" + port;
  const route = "/designs/" + name + "/";
  const report = { design: name, checks: [], errors: [], screenshots: [] };
  for (const viewport of [
    { width: 1440, height: 1000 },
    { width: 768, height: 1024 },
    { width: 390, height: 844 },
    { width: 320, height: 768 },
  ]) {
    const context = await browser.newContext({
      viewport,
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", e => errors.push(e.message));
    page.on("response", r => {
      if (r.status() >= 400) errors.push("HTTP " + r.status() + " " + r.url());
    });
    page.on("console", m => {
      if (m.type() === "error") errors.push(m.text());
    });
    for (const type of ["home", "article"]) {
      console.log("Checking", name, viewport.width, type);
      const url = origin + route + (type === "article" ? "article/" : "");
      const response = await page.goto(url, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(async () => {
        await Promise.all(
          [...document.images].map(i => {
            i.loading = "eager";
            return i.decode().catch(() => null);
          })
        );
      });
      await page.addStyleTag({
        content: "astro-dev-toolbar { display:none !important; }",
      });
      const dom = await page.evaluate(() => ({
        title: document.title,
        h1: document.querySelectorAll("h1").length,
        main: document.querySelectorAll("main").length,
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        overflowElements: [...document.querySelectorAll("body *")]
          .filter(e => e.getBoundingClientRect().right > innerWidth + 1)
          .slice(0, 6)
          .map(e => ({ tag: e.tagName, class: e.className })),
        brokenImages: [...document.images]
          .filter(i => !i.complete || i.naturalWidth === 0)
          .map(i => i.src),
        hashLinks: [...document.querySelectorAll('a[href^="#"]')].map(a => ({
          href: a.getAttribute("href"),
          exists: !!document.getElementById(
            decodeURIComponent(a.getAttribute("href").slice(1))
          ),
        })),
      }));
      const accessibility = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      const check = {
        viewport,
        type,
        status: response.status(),
        ...dom,
        violations: accessibility.violations.map(v => ({
          id: v.id,
          impact: v.impact,
          description: v.description,
          nodes: v.nodes.map(n => ({
            target: n.target,
            summary: n.failureSummary,
          })),
        })),
      };
      await page.keyboard.press("Tab");
      check.keyboard = await page.evaluate(() => {
        const e = document.activeElement,
          s = getComputedStyle(e);
        return {
          tag: e.tagName,
          href: e.getAttribute("href"),
          outline: s.outline,
          visible: e.getBoundingClientRect().width > 0,
        };
      });
      if (viewport.width === 1440 || viewport.width === 390) {
        await page.evaluate(() => {
          document.activeElement.blur();
          scrollTo(0, 0);
        });
        const filename =
          type +
          "-" +
          (viewport.width === 1440 ? "desktop" : "mobile") +
          ".png";
        await page.screenshot({
          path: path.join(output, filename),
          fullPage: type === "home",
          animations: "disabled",
        });
        report.screenshots.push(filename);
      }
      report.checks.push(check);
    }
    await page.goto(origin + route);
    const articleLink = page.locator("a[href]").filter({ visible: true });
    const hrefs = await articleLink.evaluateAll(as =>
      as.map(a => a.getAttribute("href"))
    );
    const target = hrefs.find(
      h => h && h.includes("/designs/" + name + "/article")
    );
    if (target) {
      await page
        .locator('a[href="' + target + '"]')
        .first()
        .click();
      report.checks.push({
        viewport,
        articleNavigation: page.url().includes("/article"),
      });
    } else
      report.errors.push(
        "No design article navigation at width " + viewport.width
      );
    const links = [
      ...new Set(
        hrefs
          .filter(h => h && h.startsWith("/") && !h.startsWith("//"))
          .map(h => h.split("#")[0])
      ),
    ];
    for (const href of links) {
      const r = await context.request.get(origin + href);
      if (r.status() >= 400)
        report.errors.push("Broken internal link " + href + " " + r.status());
    }
    report.errors.push(...errors.map(e => viewport.width + ": " + e));
    await context.close();
  }
  report.passed =
    report.errors.length === 0 &&
    report.checks.every(
      c =>
        c.articleNavigation !== false &&
        (!c.type ||
          (c.status === 200 &&
            c.h1 === 1 &&
            c.main === 1 &&
            !c.overflow &&
            c.brokenImages.length === 0 &&
            c.violations.length === 0 &&
            c.hashLinks.every(h => h.exists)))
    );
  fs.writeFileSync(
    path.join(output, "verification.json"),
    JSON.stringify(report, null, 2)
  );
  console.log(
    JSON.stringify(
      {
        design: name,
        passed: report.passed,
        errors: report.errors,
        checks: report.checks.map(c => ({
          width: c.viewport.width,
          type: c.type,
          status: c.status,
          overflow: c.overflow,
          violations: c.violations?.map(v => v.id),
          articleNavigation: c.articleNavigation,
          brokenHashes: c.hashLinks?.filter(h => !h.exists),
        })),
      },
      null,
      2
    )
  );
  await browser.close();
  process.exitCode = report.passed ? 0 : 1;
})().catch(e => {
  console.error(e);
  process.exit(1);
});
