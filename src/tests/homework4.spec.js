// Pokračuj v úkolu z lekce 3 pro stránku https://team8-2022brno.herokuapp.com/registrace,
// místo console.log ale použij assertace

// Test který provede validní registraci uživatele - zkontroluj, že registrace proběhla úspěšně

// Test, který provede registraci uživatele s již existujícím emailem - zkontroluj, že registrace neproběhla a ověř chyby

// Test, který provede registraci uživatele s nevalidním heslem (obsahující pouze čísla) - zkontroluj, že registrace neproběhla a ověř chyby

import { expect, test } from "@playwright/test";

test("Should register + assertion", async ({ page }) => {
    await page.goto("/registrace");

    const nameInputLocator = page.locator("#name");
    await expect(nameInputLocator,"Name input should be attached ").toBeAttached();
    await expect(nameInputLocator,"Name input should be visible ").toBeVisible();

    await nameInputLocator.click();
    await nameInputLocator.fill("Tereza Pinkasová");

    const mailInputLocator = page.locator("#email");
    await expect(mailInputLocator,"E-mail input should be attached ").toBeAttached();
    await expect(mailInputLocator,"E-mail input should be visible ").toBeVisible();

    await mailInputLocator.click();
    await mailInputLocator.fill("t.pinkasova007@test.com");

    const passInputLocator = page.getByLabel('Heslo');
    await expect(passInputLocator,"Password input should be attached ").toBeAttached();
    await expect(passInputLocator,"Password input should be visible ").toBeVisible();

    await passInputLocator.click();
    await passInputLocator.fill("TestovaciHeslo123");


    const confirmPassInputLocator = page.locator("#password-confirm");
    await expect(confirmPassInputLocator,"Confirm password input should be attached ").toBeAttached();
    await expect(confirmPassInputLocator,"Confirm password input should be visible ").toBeVisible();

    await confirmPassInputLocator.click();
    await confirmPassInputLocator.fill("TestovaciHeslo123");

    const registerButton = await page.getByRole('button', { name: 'Zaregistrovat' });
    await expect(registerButton,"Confirm password input should be enabled ").toBeEnabled();
    await expect(registerButton,"Confirm password input should be visible ").toBeVisible();

    await registerButton.click();
    await expect(page).toHaveURL("https://team8-2022brno.herokuapp.com/zaci")
});