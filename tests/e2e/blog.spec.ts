import { expect, test } from "@playwright/test";

test("navigates from the home page to a rendered blog article", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.getByRole("link", { name: "Read Blog", exact: true }).click();
  await expect(page).toHaveURL(/\/posts\/?$/);
  await page.getByRole("link", { name: "Cyber Apocalypse 2024: Hacker Royale" }).click();
  await expect(page).toHaveURL(/\/blog\/cyber-apocalypse\/?$/);
  await expect(
    page.getByRole("heading", {
      name: "Cyber Apocalypse 2024: Hacker Royale",
      exact: true,
    })
  ).toBeVisible();
  await expect(page.locator("article #introduction")).toHaveText("Introduction");
});

test("serves an RSS feed with links to blog articles", async ({ request }) => {
  const response = await request.get("/rss.xml");
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("xml");
  const feed = await response.text();
  expect(feed).toContain("<rss");
  expect(feed).toContain("https://elotoja.com/blog/cyber-apocalypse");
  expect(feed).not.toContain("https://elotoja.com/blog/headings");
});

test("theme colors and controls survive navigation and reload", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  const root = page.locator("html");
  await expect(root).toHaveAttribute("data-theme", "light");
  const lightBackground = await page
    .locator("body")
    .evaluate(element => getComputedStyle(element).backgroundColor);
  await page.getByRole("button", { name: "Toggle theme" }).click();
  await expect(root).toHaveClass(/dark/);
  await expect(root).toHaveAttribute("data-theme", "dark");
  await expect
    .poll(() => page.locator("body").evaluate(element => getComputedStyle(element).backgroundColor))
    .not.toBe(lightBackground);
  await page.getByRole("link", { name: "Read Blog", exact: true }).click();
  await expect(root).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Toggle theme" }).click();
  await expect(root).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(root).toHaveAttribute("data-theme", "light");
  await expect(root).not.toHaveClass(/dark/);
});

test("mobile menu opens with keyboard and works after navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const menu = page.locator("#hamburger-button");
  await expect(page.locator("#navbar")).toBeHidden();
  await menu.focus();
  await page.keyboard.press("Enter");
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#navbar")).toBeVisible();
  await page.locator("header").getByRole("link", { name: "Posts", exact: true }).click();
  await expect(page).toHaveURL(/\/posts\/?$/);
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.locator("#navbar")).toBeVisible();
  await page.getByRole("button", { name: "Close menu" }).click();
  await expect(page.locator("#navbar")).toBeHidden();
});

test("table of contents expands and collapses after client navigation", async ({ page }) => {
  await page.goto("/posts");
  await page
    .getByRole("link", {
      name: "Cyber Apocalypse 2024: Hacker Royale",
      exact: true,
    })
    .click();
  const contents = page.locator("details.toc");
  const summary = page.getByText("On this page", { exact: true });
  await expect(contents).not.toHaveAttribute("open");
  await summary.click();
  await expect(contents).toHaveAttribute("open", "");
  await expect(contents.getByRole("link", { name: "Introduction", exact: true })).toBeVisible();
  await summary.click();
  await expect(contents).not.toHaveAttribute("open");
});

test("omits pagination when all posts fit on one page", async ({ page }) => {
  await page.goto("/posts");
  await expect(page.getByRole("navigation", { name: "Pagination" })).toHaveCount(0);
  await expect(
    page.getByRole("link", {
      name: "Cyber Apocalypse 2024: Hacker Royale",
      exact: true,
    })
  ).toBeVisible();
});

test("search inputs filter posts, add and remove tags, and restore URL state", async ({ page }) => {
  await page.goto("/search");
  await expect(page.getByRole("status")).toHaveText("Found 1 post");
  const search = page.getByRole("searchbox", { name: "Search posts" });
  await search.fill("Cyber Apocalypse");
  await expect(
    page.locator("#search").getByRole("link", {
      name: "Cyber Apocalypse 2024: Hacker Royale",
      exact: true,
    })
  ).toBeVisible();
  await page.getByRole("textbox", { name: "Add tag filter" }).fill("nonexistent-tag");
  await page.getByRole("button", { name: "Add tag", exact: true }).click();
  await expect(page.getByText("No posts found matching your search.")).toBeVisible();
  await expect(page.getByRole("button", { name: "Remove tag nonexistent-tag" })).toBeVisible();
  await expect(page).toHaveURL(/q=Cyber\+Apocalypse/);
  await page.reload();
  await expect(page).toHaveURL(/q=Cyber\+Apocalypse/);
  await expect(search).toHaveValue("Cyber Apocalypse");
  await page.getByRole("button", { name: "Remove tag nonexistent-tag" }).click();
  await expect(
    page.locator("#search").getByRole("link", {
      name: "Cyber Apocalypse 2024: Hacker Royale",
      exact: true,
    })
  ).toBeVisible();
  await search.fill("zzzzzzzzzzzzzzzz");
  await expect(page.getByText("No posts found matching your search.")).toBeVisible();
});

test("theme and navigation remain usable after client-side transitions", async ({
  page,
  isMobile,
}) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  if (!isMobile) await expect(page.getByRole("button", { name: "Open menu" })).toBeHidden();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.getByRole("button", { name: "Toggle theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  if (isMobile) await page.getByRole("button", { name: "Open menu" }).click();
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "About", exact: true })
    .click();
  await expect(page).toHaveURL(/\/about\/?$/);
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Toggle theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  if (isMobile) {
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.getByRole("button", { name: "Close menu" })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Open menu" })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
    await page.getByRole("button", { name: "Open menu" }).click();
  }
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Posts", exact: true })
    .click();
  await expect(page.getByRole("heading", { name: "All posts" })).toBeVisible();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("topic links filter posts and filters can be removed", async ({ page }) => {
  await page.goto("/posts");
  await page.getByRole("link", { name: "HackTheBox", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("Found 1 post");
  await expect(
    page.getByRole("link", {
      name: "Cyber Apocalypse 2024: Hacker Royale",
      exact: true,
    })
  ).toBeVisible();
  await page.getByRole("button", { name: "Remove tag hackthebox" }).click();
  await expect(page.getByRole("status")).toHaveText("Found 1 post");
  await page.getByRole("textbox", { name: "Add tag filter" }).fill("WRITEUP");
  await page.getByRole("button", { name: "Add tag", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("Found 1 post");
  await page.reload();
  await expect(page.getByRole("status")).toHaveText("Found 1 post");
});

test("search supports queries, empty results, and malformed filter URLs", async ({ page }) => {
  await page.goto("/search?tags=not-json");
  await expect(page.getByRole("status")).toHaveText("Found 1 post");
  await page.getByRole("searchbox", { name: "Search posts" }).fill("Cyber Apocalypse");
  await expect(page.getByRole("status")).toHaveText("Found 1 post");
  await expect(
    page.getByRole("link", {
      name: "Cyber Apocalypse 2024: Hacker Royale",
      exact: true,
    })
  ).toBeVisible();
  await page.getByRole("searchbox", { name: "Search posts" }).fill("zzzzzzzzzzzzzzzzzz");
  await expect(page.getByText("No posts found matching your search.")).toBeVisible();
  await page.getByRole("link", { name: "Browse all posts" }).click();
  await expect(page).toHaveURL(/\/posts\/?$/);
});

test("search failures offer a working retry", async ({ page }) => {
  await page.route("**/search-index.json", route => route.abort());
  await page.goto("/search");
  await expect(page.getByRole("alert")).toHaveText("Search is unavailable. Please try again.");
  await page.unroute("**/search-index.json");
  await page.getByRole("button", { name: "Retry search" }).click();
  await expect(page.getByRole("status")).toHaveText("Found 1 post");
});

test("contents links work across article navigation", async ({ page }) => {
  await page.goto("/posts");
  await page
    .getByRole("link", {
      name: "Cyber Apocalypse 2024: Hacker Royale",
      exact: true,
    })
    .click();
  await page.getByText("On this page", { exact: true }).click();
  await page
    .getByRole("navigation", { name: "Table of contents" })
    .getByRole("link", { name: "Introduction", exact: true })
    .first()
    .click();
  await expect(page).toHaveURL(/#introduction$/);
  await page.getByRole("link", { name: "Back to all posts" }).click();
  await page
    .getByRole("link", {
      name: "Cyber Apocalypse 2024: Hacker Royale",
      exact: true,
    })
    .click();
  await page.getByText("On this page", { exact: true }).click();
  await page
    .getByRole("navigation", { name: "Table of contents" })
    .getByRole("link", { name: "Crypto", exact: true })
    .click();
  await expect(page).toHaveURL(/#crypto$/);
});

test("keyboard skip link focuses the main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to main content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
});

for (const route of [
  "/",
  "/posts",
  "/posts/1",
  "/about",
  "/search",
  "/blog/cyber-apocalypse/",
  "/not-found",
]) {
  test(`layout fits the viewport and has one main heading: ${route}`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("main h1")).toHaveCount(1);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)
    ).toBe(true);
    expect(await page.locator("main").evaluate(el => getComputedStyle(el).textAlign)).not.toBe(
      "justify"
    );
  });
}

test("404 provides a route back home", async ({ page }) => {
  const response = await page.goto("/a-missing-page");
  expect(response?.status()).toBe(404);
  await page.getByRole("link", { name: "Back to home" }).click();
  await expect(page).toHaveURL(/\/$/);
});

test("updates a single page title and keeps theme controls working across navigation", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Toggle theme" }).click();
  const theme = await page.locator("html").getAttribute("data-theme");
  await page.getByRole("link", { name: "Read Blog", exact: true }).click();
  await expect(page).toHaveTitle("Posts · EloToJa's Blog");
  await expect(page.locator("title")).toHaveCount(1);
  await expect(page.locator("html")).toHaveAttribute("data-theme", theme!);
  await page.getByRole("button", { name: "Toggle theme" }).click();
  await expect(page.locator("html")).toHaveAttribute(
    "data-theme",
    theme === "dark" ? "light" : "dark"
  );
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute(
    "data-theme",
    theme === "dark" ? "light" : "dark"
  );
});

test("reinitializes article contents after client navigation", async ({ page }) => {
  await page.goto("/blog/cyber-apocalypse");
  const summary = page.getByText("On this page", { exact: true });
  await summary.click();
  await expect(page.locator("details.toc")).toHaveAttribute("open", "");
  await page.getByRole("link", { name: "All posts", exact: false }).first().click();
  await page
    .getByRole("link", {
      name: "Cyber Apocalypse 2024: Hacker Royale",
      exact: true,
    })
    .click();
  await expect(page.locator("article h1")).toHaveCount(1);
  await summary.click();
  await page
    .getByRole("navigation", { name: "Table of contents" })
    .getByRole("link", { name: "Introduction", exact: true })
    .click();
  await expect(page).toHaveURL(/#introduction$/);
  await expect(page.locator("article #introduction")).toBeVisible();
});

test("keeps the mobile menu usable on successive pages", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  await expect(page.getByRole("button", { name: "Close menu", exact: true })).toHaveAttribute(
    "aria-expanded",
    "true"
  );
  await page.getByRole("link", { name: "Posts", exact: true }).click();
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  await page.getByRole("link", { name: "About", exact: true }).click();
  await expect(page).toHaveURL(/\/about\/?$/);
  await expect(page.locator("#about-me")).toContainText("experienced software engineer");
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  await expect(page.getByRole("link", { name: "Posts", exact: true })).toBeVisible();
});

test("searches migrated entries and supports tag-only and malformed URL queries", async ({
  page,
}) => {
  await page.goto("/search?tags=%5B%22ctf%22%5D");
  await expect(page.getByRole("status")).toHaveText("Found 1 post");
  await expect(
    page.locator("#search").getByRole("link", { name: "Cyber Apocalypse 2024: Hacker Royale" })
  ).toHaveAttribute("href", "/blog/cyber-apocalypse/");
  await page.getByRole("button", { name: "Remove tag ctf" }).click();
  await expect(page.getByRole("status")).toHaveText("Found 1 post");
  await page
    .getByRole("searchbox", { name: "Search posts", exact: true })
    .fill("Cyber Apocalypse 2024: Hacker Royale");
  await expect(page.getByRole("status")).toHaveText("Found 1 post");
  await page
    .locator("#search")
    .getByRole("link", { name: "Cyber Apocalypse 2024: Hacker Royale" })
    .click();
  await expect(page).toHaveURL(/\/blog\/cyber-apocalypse\/?$/);
  await page.goto("/search?tags=not-json");
  await expect(page.getByRole("status")).toHaveText("Found 1 post");
});
