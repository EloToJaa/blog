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
