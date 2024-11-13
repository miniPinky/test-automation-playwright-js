//Jdi na stránku pro přihlášení
import { expect, test } from "@playwright/test";
import {RegExp} from "../fixtures/regular-expressions";

test("open login page", async ({ page }) => {
    //jdi na stránku pro přihlášení
    await page.goto("/prihlaseni");
    //klikni na přihlásit
    const loginbtn = page.getByRole("button", { name: "Přihlásit"});
    await loginbtn.click();
    //Zkontroluj, že se objevila chyba a uživatel se nepřihlásil
    
    //Vyplň správný e-mail a nesprávné heslo
    const email = page.getByLabel("Email");
    const password = page.getByLabel("Heslo");
    await email.fill("da-app.admin@czechitas.cz");
    await password.fill("Czechitas1");
    //Klikni na Přihlásit
    await loginbtn.click();
    //Zkontroluj, že se objevila chyba a uživatel se nepřihlásil
    const toast = page.locator('.toast-message');
    await expect(toast).toHaveText('Některé pole obsahuje špatně zadanou hodnotu');
    //Vyplň správný e-mail a správné heslo
    await email.fill("da-app.admin@czechitas.cz");
    await password.fill("Czechitas123");
    // Klikni na Přihlásit
    await loginbtn.click();
    // Zkontroluj, že se uživatel přihlásil
    const userName = page
    .locator(".navbar-right")
    .locator("strong");
    await expect(userName).toHaveText("Lišák Admin");
    // Jdi na stránku Přihlášky
    const applications = page.getByRole('link', { name: 'Přihlášky' });
    await applications.click();
    await page.waitForLoadState();
    //Vypiš všechny řádky tabulky
    const list = page.locator('tbody >> tr');
    await expect(list).toHaveCount(13);
    //Zadej něco do políčka pro filtrování tabulky
    const search = page.getByText('Hledat:')
    await search.fill("Lamarr");
    //Zkontroluj, že se stránka profiltrovala

    //Odhlaš se a zkontroluj, že jsi byl/a odhlášen/a
    await Username.click();
});