import { expect, test } from "@playwright/test";

test("should open login page", async ({ page }) => {
  console.log("First test");
  await page.goto("/prihlaseni");

  const h1Locator = page.locator("h1");
  await expect(h1Locator).toBeVisible();
  await h1Locator.screenshot({path: "header.png"});

  const h1Byrole = page.getByRole("heading", { level: 4}).nth(1);
  await h1Byrole.screenshot({ path: "h4.png"});

  const chain = page.locator("form").getByLabel("Email");
  await expect(page.getByRole("button", { name: "Přihlásit"})).toBeVisible();
  await chain.screenshot({ path: "chain.png"});
});