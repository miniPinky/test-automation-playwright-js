// Domácí úkol: Lekce 3

// Prohldédni si strnánku pro registraci Otevřít stránku pro registraci https://team8-2022brno.herokuapp.com/registrace.

// Vycházej z úkolu z lekce 2 a napiš kód který na stránce pro registraci
// Vyplní jméno a příjmení
// Vyplní email
// Vyplní a potvrdí heslo
// Klikne na tlačítko pro odeslání registračního formuláře

// Zatím nemusíš kontrolovat, zda registrace proběhla v pořádku, to budeme řešit později.

//locator.isEnabled()
//locator.fill()
//locator.click()

import { test } from "@playwright/test";

test("Should register", async ({ page }) => {
    await page.goto("/registrace");

    // Konstanty
    const nameInputLocator = page.locator("#name");
    const mailInputLocator = page.locator("#email");
    const passInputLocator = page.getByLabel('Heslo');
    const confirmPassInputLocator = page.locator("#password-confirm");
    const registerButton = await page.getByRole('button', { name: 'Zaregistrovat' });

    // Zjistí jestli je input visible a enabled a Vyplní jméno a příjmení
    console.log("Name field is enable " + await nameInputLocator.isEnabled());
    console.log("Name field is visible " + await nameInputLocator.isVisible());
    await nameInputLocator.click();
    await nameInputLocator.fill("Tereza Pinkasová");

    //Zjistí jestli je input visible a enabled a Vyplní e-mail
    console.log("E-mail field is enable " + await mailInputLocator.isEnabled());
    console.log("E-mail field is visible " + await mailInputLocator.isVisible());
    await mailInputLocator.click();
    await mailInputLocator.fill("t.pinkasova007@gmail.com");

    // Vyplní a potvrdí heslo
    console.log("Password field is enable " + await passInputLocator.isEnabled());
    console.log("Password field is visible " + await passInputLocator.isVisible());
    console.log("Confirm password field is enable " + await confirmPassInputLocator.isEnabled());
    console.log("Confirm password field is visible " + await confirmPassInputLocator.isVisible());
    await passInputLocator.click();
    await passInputLocator.fill("testovaciheslo");
    await confirmPassInputLocator.click();
    await confirmPassInputLocator.fill("testovaciheslo");

    // Klikne na tlačítko pro odeslání registračního formuláře
    console.log("Button is enable " + await registerButton.isEnabled());
    console.log("Button is visible" + await registerButton.isVisible());
    await registerButton.click();
});