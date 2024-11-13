// DOMÁCÍ ÚKOL 1
//Otevřít stránku pro registraci 
// https://team8-2022brno.herokuapp.com/registrace
// Udělej a ulož screenshot stránky

import { test } from "@playwright/test";

test("Open login page and take screenshot", async ({ page }) => {
    await page.goto("/registrace");
    await page.screenshot({ path: 'registrace.png' });
});
