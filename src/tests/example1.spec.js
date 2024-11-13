import { test } from "@playwright/test";

test("should open login page", async ({ page }) => {
  console.log("First test");
  await page.goto("/prihlaseni");
  const title1 = await page.title();
  await page.setViewportSize({ width: 800, height: 600 });
  await page.screenshot({ path: "screenshot_800_600.png" });

  await page.goto("/pro-rodice");
  const title2 = await page.title();
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.screenshot({ path: "screenshot_1920_1080.png" });

  await page.goto("/kontakt");
  const title3 = await page.title();
  await page.screenshot({ path: title3 + ".png" });

  console.log("the end");
});