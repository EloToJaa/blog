import { expect, test } from "@playwright/test";

test("navigates from the home page to a rendered blog article", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.getByRole("link", { name: "Read Blog", exact: true }).click();
  await expect(page).toHaveURL(/\/posts\/?$/);
  await page
    .getByRole("link", { name: "Cyber Apocalypse 2024: Hacker Royale" })
    .click();
  await expect(page).toHaveURL(/\/blog\/cyber-apocalypse\/?$/);
  await expect(
    page.getByRole("heading", {
      name: "Cyber Apocalypse 2024: Hacker Royale",
      exact: true,
    })
  ).toBeVisible();
  await expect(page.locator("article #introduction")).toHaveText(
    "Introduction"
  );
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
