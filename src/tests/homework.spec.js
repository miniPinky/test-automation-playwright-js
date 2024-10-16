import { test } from "@playwright/test";

 test("should open registration page", async ({ page }) => {
    await page.goto("/registrace");
    console.log(await page.title());

    await page.setViewportSize({
        width: 640,
        height: 480,
    });

    await page.screenshot({ path: "registration_640_480.png" });

});
