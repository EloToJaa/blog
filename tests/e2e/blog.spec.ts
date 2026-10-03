import { expect, test } from "@playwright/test";
const article = "Cyber Apocalypse 2024: Hacker Royale";
test("navigates to a rendered article with correct metadata", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Read Blog", exact: true }).click();
  await expect(page).toHaveURL(/\/posts\/?$/);
  await page.getByRole("link", { name: article, exact: true }).click();
  await expect(page.getByRole("heading", { name: article, exact: true })).toBeVisible();
  await expect(page).toHaveTitle(article + " | EloToJa's Blog");
  await expect(page.locator("head title")).toHaveCount(1);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /Writeups from Hack The Box/
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /elotoja.com\/blog\/cyber-apocalypse/
  );
});
test("theme and table of contents work after repeated navigation", async ({ page }) => {
  await page.goto("/");
  for (let i = 0; i < 2; i++) {
    await page.getByRole("link", { name: "Read Blog", exact: true }).click();
    const before = await page.locator("html").getAttribute("data-theme");
    await page.getByRole("button", { name: "Toggle theme" }).click();
    await expect(page.locator("html")).toHaveAttribute(
      "data-theme",
      before === "dark" ? "light" : "dark"
    );
    await page.getByRole("link", { name: article, exact: true }).click();
    const toc = page.getByRole("button", { name: "Table Of Contents toggle" });
    await toc.click();
    await expect(toc).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#toc-items")).toBeVisible();
    await page.getByRole("link", { name: "EloToJa", exact: true }).click();
  }
});
test("tag links navigate and match normalized tags", async ({ page }) => {
  await page.goto("/blog/cyber-apocalypse/");
  await page.getByRole("link", { name: "Writeup,", exact: true }).click();
  await expect(page).toHaveURL(/\/search\//);
  await expect(page.getByRole("heading", { name: "Found 1 post", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: article, exact: true })).toBeVisible();
});
test("invalid URL parameters recover and search responds to input", async ({ page }) => {
  await page.goto("/search/?tags=invalid");
  await expect(page.getByRole("heading", { name: "Found 1 post", exact: true })).toBeVisible();
  await page.getByRole("textbox", { name: "Search posts", exact: true }).fill("zzzzzzzzzzzzzzzzzz");
  await expect(page.getByRole("heading", { name: "Found 0 posts", exact: true })).toBeVisible();
  await page.getByRole("textbox", { name: "Search posts", exact: true }).fill("Cyber Apocalypse");
  await expect(page.getByRole("link", { name: article, exact: true })).toBeVisible();
});
test("search reports download failures and retries", async ({ page }) => {
  let requests = 0;
  await page.route("**/search-index.json", route => {
    requests++;
    return requests === 1 ? route.fulfill({ status: 503, body: "unavailable" }) : route.continue();
  });
  await page.goto("/search/");
  await expect(page.getByRole("alert")).toContainText("Search is unavailable");
  await page.getByRole("button", { name: "Retry search" }).click();
  await expect(page.getByRole("heading", { name: "Found 1 post", exact: true })).toBeVisible();
});
test("mobile menu works after navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "open menu", exact: true }).click();
  await page.getByRole("link", { name: "Posts", exact: true }).click();
  await page.getByRole("button", { name: "open menu", exact: true }).click();
  await expect(page.getByRole("button", { name: "close menu", exact: true })).toHaveAttribute(
    "aria-expanded",
    "true"
  );
  await expect(page.getByRole("link", { name: "About", exact: true })).toBeVisible();
});
test("pagination has one canonical first page and real disabled controls", async ({ page }) => {
  await page.goto("/posts/");
  await expect(
    page.getByRole("navigation", { name: "Post pages" }).getByRole("button", { name: "Previous" })
  ).toBeDisabled();
  await expect(
    page
      .getByRole("navigation", { name: "Post pages" })
      .getByRole("link", { name: "1", exact: true })
  ).toHaveAttribute("aria-current", "page");
});
test("RSS and search index contain published articles only", async ({ request }) => {
  const response = await request.get("/rss.xml");
  expect(response.ok()).toBe(true);
  expect(await response.text()).toContain("https://elotoja.com/blog/cyber-apocalypse/");
  const index = await request.get("/search-index.json");
  const posts = await index.json();
  expect(posts).toHaveLength(1);
  expect(posts[0].href).toBe("/blog/cyber-apocalypse/");
  expect(JSON.stringify(posts)).not.toContain("Testing headings");
});
