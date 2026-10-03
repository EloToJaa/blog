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
  await page.getByRole("button", { name: "open menu" }).click();
  await expect(page.locator("#navbar")).toBeVisible();
  await page.getByRole("button", { name: "close menu" }).click();
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
  const toggle = page.getByRole("button", { name: "Table Of Contents toggle" });
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("#toc-items")).toBeHidden();
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#toc-items")).toBeVisible();
  await expect(page.locator("#toc-items").locator('a[href="#introduction"]')).toBeVisible();
  await toggle.click();
  await expect(page.locator("#toc-items")).toBeHidden();
});

test("pagination marks the current page and disables unavailable directions", async ({ page }) => {
  await page.goto("/posts");
  const pagination = page.getByRole("navigation", { name: "Pagination" });
  await expect(pagination.getByRole("button", { name: "Previous" })).toBeDisabled();
  await expect(pagination.getByRole("button", { name: "Next" })).toBeDisabled();
  const current = pagination.getByRole("link", { name: "1", exact: true });
  await expect(current).toHaveAttribute("aria-current", "page");
  await current.click();
  await expect(page).toHaveURL(/\/posts\/?$/);
});

test("search inputs filter posts, add and remove tags, and restore URL state", async ({ page }) => {
  await page.goto("/search");
  await expect(page.getByRole("heading", { name: /Found \d+ posts?/ })).toBeVisible();
  const search = page.getByRole("textbox", { name: "Search posts" });
  await search.fill("cyber-apocalypse");
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
  await expect(page).toHaveURL(/q=cyber-apocalypse/);
  await page.reload();
  await expect(page).toHaveURL(/q=cyber-apocalypse/);
  await expect(search).toHaveValue("cyber-apocalypse");
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

test("updates a single page title and keeps theme controls working across navigation", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Toggle theme" }).click();
  const theme = await page.locator("html").getAttribute("data-theme");
  await page.getByRole("link", { name: "Posts", exact: true }).click();
  await expect(page).toHaveTitle("Posts | EloToJa's Blog");
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

test("reinitializes article table of contents after client navigation", async ({ page }) => {
  await page.goto("/blog/cyber-apocalypse");
  const toggle = page.getByRole("button", { name: "Table Of Contents toggle" });
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#toc-items")).toBeVisible();
  await page.getByRole("link", { name: "Posts", exact: true }).click();
  await page.getByRole("link", { name: "Cyber Apocalypse 2024: Hacker Royale" }).click();
  await expect(page.locator("article h1")).toHaveCount(1);
  await toggle.click();
  await expect(page.locator("#toc-items")).toBeVisible();
  await page
    .getByRole("navigation", { name: "Table Of Contents" })
    .getByRole("link", { name: "Introduction", exact: true })
    .first()
    .click();
  await expect(page).toHaveURL(/#introduction$/);
  await expect(page.locator("article #introduction")).toBeVisible();
});

test("keeps the mobile menu usable on successive pages", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "open menu", exact: true }).click();
  await expect(page.getByRole("button", { name: "close menu", exact: true })).toHaveAttribute(
    "aria-expanded",
    "true"
  );
  await page.getByRole("link", { name: "Posts", exact: true }).click();
  await page.getByRole("button", { name: "open menu", exact: true }).click();
  await page.getByRole("link", { name: "About", exact: true }).click();
  await expect(page).toHaveURL(/\/about\/?$/);
  await expect(page.locator("#about-me")).toContainText("experienced software engineer");
  await page.getByRole("button", { name: "open menu", exact: true }).click();
  await expect(page.getByRole("link", { name: "Posts", exact: true })).toBeVisible();
});

test("searches migrated entries and supports tag-only and malformed URL queries", async ({
  page,
}) => {
  await page.goto("/search?tags=%5B%22ctf%22%5D");
  await expect(page.getByRole("heading", { name: "Found 1 post", exact: true })).toBeVisible();
  await expect(
    page.locator("#search").getByRole("link", { name: "Cyber Apocalypse 2024: Hacker Royale" })
  ).toHaveAttribute("href", "/blog/cyber-apocalypse/");
  await page.getByRole("button", { name: "Remove tag ctf" }).click();
  await expect(page.getByRole("heading", { name: "Found 1 post", exact: true })).toBeVisible();
  await page
    .getByRole("textbox", { name: "Search posts", exact: true })
    .fill("Cyber Apocalypse 2024: Hacker Royale");
  await expect(page.getByRole("heading", { name: "Found 1 post", exact: true })).toBeVisible();
  await page
    .locator("#search")
    .getByRole("link", { name: "Cyber Apocalypse 2024: Hacker Royale" })
    .click();
  await expect(page).toHaveURL(/\/blog\/cyber-apocalypse\/?$/);
  await page.goto("/search?tags=not-json");
  await expect(page.getByRole("heading", { name: "Found 1 post", exact: true })).toBeVisible();
});
