// DOMÁCÍ ÚKOL 2
//Prohldédni si stránku pro registraci 
//Otevřít stránku pro registraci https://team8-2022brno.herokuapp.com/registrace v Developer Tools.

// Najdi nejvhodnější lokátory pro všechny prvky formuláře
// Políčko pro jméno a příjmení
// Políčko pro email
// Políčko pro zadání hesla
// Políčko pro kontrolu zadaného hesla
// Tlačítko na registraci

// Dobrovolné:
// Tvým úkolem je si zatím jen selektory najít a otestovat v Developer Tools.
//Pokud se na to cítíš, můžeš zkusit najít elementy a zapsat je do homework.spec.js 
//podobně jako jsme to dělali ve cvičení .

import { test } from "@playwright/test";

test("Finding locators and printscreen them", async ({ page }) => {
    await page.goto("/registrace");

    // Políčko pro jméno a příjmení
    await page.getByText('Jméno a příjmení').screenshot({ path: 'screenshot-jméno.png'});
    await page.locator("#name").screenshot({ path: "screenshot-políčko-jméno.png" });
    // Políčko pro email
    await page.locator("#email").screenshot({ path: "screenshot-políčko-email.png" });
    // Políčko pro heslo
    await page.getByLabel('Heslo').screenshot({path: "screenshot-políčko-heslo.png" });
    //tlačítko pro registraci
    await page.getByRole('button', { name: 'Zaregistrovat' }).screenshot({path: "screenshot-tlačítko-registrace.png" });
});