import { expect, test } from "@playwright/test";

test("navigates from the home page to a rendered blog article", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.getByRole("link", { name: "Read Blog", exact: true }).click();
  await expect(page).toHaveURL(/\/posts\/?$/);
  await page.getByRole("link", { name: "Testing headings" }).click();
  await expect(page).toHaveURL(/\/blog\/headings\/?$/);
  await expect(
    page.getByRole("heading", { name: "Testing headings", exact: true })
  ).toBeVisible();
  await expect(page.locator("article #heading-2")).toHaveText("Heading 2");
});

test("serves an RSS feed with links to blog articles", async ({ request }) => {
  const response = await request.get("/rss.xml");
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("xml");
  const feed = await response.text();
  expect(feed).toContain("<rss");
  expect(feed).toContain("https://elotoja.com/blog/headings");
});

test("theme colors and controls survive navigation and reload", async ({
  page,
}) => {
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
    .poll(() =>
      page
        .locator("body")
        .evaluate(element => getComputedStyle(element).backgroundColor)
    )
    .not.toBe(lightBackground);
  await page.getByRole("link", { name: "Read Blog", exact: true }).click();
  await expect(root).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Toggle theme" }).click();
  await expect(root).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(root).toHaveAttribute("data-theme", "light");
  await expect(root).not.toHaveClass(/dark/);
});

test("mobile menu opens with keyboard and works after navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const menu = page.locator("#hamburger-button");
  await expect(page.locator("#navbar")).toBeHidden();
  await menu.focus();
  await page.keyboard.press("Enter");
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#navbar")).toBeVisible();
  await page
    .locator("header")
    .getByRole("link", { name: "Posts", exact: true })
    .click();
  await expect(page).toHaveURL(/\/posts\/?$/);
  await page.getByRole("button", { name: "open menu" }).click();
  await expect(page.locator("#navbar")).toBeVisible();
  await page.getByRole("button", { name: "close menu" }).click();
  await expect(page.locator("#navbar")).toBeHidden();
});

test("table of contents expands and collapses after client navigation", async ({
  page,
}) => {
  await page.goto("/posts");
  await page
    .getByRole("link", { name: "Testing headings", exact: true })
    .click();
  const toggle = page.getByRole("button", { name: "Table Of Contents toggle" });
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("#toc-items")).toBeHidden();
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#toc-items")).toBeVisible();
  await expect(
    page.locator("#toc-items").locator('a[href="#heading-2"]')
  ).toBeVisible();
  await toggle.click();
  await expect(page.locator("#toc-items")).toBeHidden();
});

test("pagination marks the current page and disables unavailable directions", async ({
  page,
}) => {
  await page.goto("/posts");
  const pagination = page.getByRole("navigation", { name: "Pagination" });
  await expect(
    pagination.getByRole("button", { name: "Previous" })
  ).toBeDisabled();
  await expect(pagination.getByRole("button", { name: "Next" })).toBeDisabled();
  const current = pagination.getByRole("link", { name: "1", exact: true });
  await expect(current).toHaveAttribute("aria-current", "page");
  await current.click();
  await expect(page).toHaveURL(/\/posts\/1\/?$/);
});

test("search inputs filter posts, add and remove tags, and restore URL state", async ({
  page,
}) => {
  await page.goto("/search");
  await expect(
    page.getByRole("heading", { name: /Found \d+ posts?/ })
  ).toBeVisible();
  const search = page.getByRole("textbox", { name: "Search posts" });
  await search.fill("headings");
  await expect(
    page
      .locator("#search")
      .getByRole("link", { name: "Testing headings", exact: true })
  ).toBeVisible();
  await page
    .getByRole("textbox", { name: "Add tag filter" })
    .fill("nonexistent-tag");
  await page.getByRole("button", { name: "Add tag", exact: true }).click();
  await expect(
    page.getByText("No posts found matching your search.")
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Remove tag nonexistent-tag" })
  ).toBeVisible();
  await expect(page).toHaveURL(/q=headings/);
  await page.reload();
  await expect(page).toHaveURL(/q=headings/);
  await expect(search).toHaveValue("headings");
  await page
    .getByRole("button", { name: "Remove tag nonexistent-tag" })
    .click();
  await expect(
    page
      .locator("#search")
      .getByRole("link", { name: "Testing headings", exact: true })
  ).toBeVisible();
  await search.fill("zzzzzzzzzzzzzzzz");
  await expect(
    page.getByText("No posts found matching your search.")
  ).toBeVisible();
});
