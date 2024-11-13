import { expect, test } from "@playwright/test";
import {RegExp} from "../fixtures/regular-expressions";

test("should open login page", async ({ page }) => {
  await page.goto("/prihlaseni");

    //Políčko a tlačítka pro přihlášení jsou viditelná
    //Tlačítko pro přihlášení obsahuje správný text
    const email = page.getByLabel("Email");
    await expect(email).toBeVisible();
    await expect(email).toBeEnabled();

    const password = page.getByLabel("Heslo");
    await expect(password).toBeVisible();
    await expect(password).toBeEnabled();
  
    const loginbtn = page.getByRole("button", { name: "Přihlásit"});
    await expect(loginbtn).toContainText("Přihlásit");

    //Přihlaš se do aplikace a ověř
    //formulář přihlášení není vidět
    //že je v pravém horním rohu správné jméno uživatele
    
    await email.fill("da-app.admin@czechitas.cz");
    await password.fill("Czechitas123");
    await loginbtn.click();

    const loginform = page.locator('card');
    await expect(loginform).not.toBeVisible();

    const userName = page
    .locator(".navbar-right")
    .locator("strong");
    await expect(userName).toHaveText("Lišák Admin");

    // Cvičení 2
    // Uprav test pro tabulku přihlášek tak, aby …

    // Po přihlášení tabulka obsahuje správný počet přihlášek

    // Každá přihláška obsahuje:
    // – jméno účastníka
    // – kategorii kurzu
    // – datum konání
    // – cenu

    // Tip: k assertaci textového obsahu podle nějakého vzoru můžete použít regulární výrazy
    //regulární výraz se dá použít např. .toHaveText(RegExp.NAME);

    const applications = page.getByRole('link', { name: 'Přihlášky' });
    await applications.click();
    await page.waitForLoadState();

    const list = page.locator('tbody >> tr');
    await expect(list).toHaveCount(10);

});