import { expect, test } from "@playwright/test";
import { RegistrationPage } from "./pages/registration.page.js";

test.describe('Registration Page', async () => {

    test.beforeEach('Navigate to registration form', async ({page}) => {
        await page.goto('/registrace');
    });

    /* 
    ZADÁNÍ: Test který přejde na formulář registrace a zkontroluje, že se formulář správně zobrazil 
    */  

    test('1.Should check visibility of registration form', async ({ page }) => {
        const registration = new RegistrationPage(page);

        // Verify visibility of all locators
        const locators = registration.getAllLocators();
        for (const locator of locators) {
        await expect(locator).toBeVisible();
        }
    });

    /* 
    ZADÁNÍ: Test který provede validní registraci uživatele. 
    */

    test('2.Should register user', async ({ page }) => {
        const registration = new RegistrationPage(page);
        const uniqueEmail = registration.generateUniqueEmail();

        // Fill registration form with a valid email
        await registration.fillRegistrationForm({
            name: 'Tereza Pinkasová',
            email: uniqueEmail,
            password: 'Hesloheslo123',
            confirmPassword: 'Hesloheslo123',
        });

        // Assertions
        await expect(registration.nameInputLocator).toHaveValue('Tereza Pinkasová');
        await expect(uniqueEmail).toContain('@test.cz')
        await expect(registration.passInputLocator).toHaveValue('Hesloheslo123');
        await expect(registration.confirmPassInputLocator).toHaveValue('Hesloheslo123');

        // Submitting registration form and confirmation of redirection
        await registration.registerButton.click();
        await expect(page).toHaveURL('https://team8-2022brno.herokuapp.com/zaci');
    });

    /*
    ZADÁNÍ: Test, který provede registraci uživatele s již existujícím emailem
    */

    test('3.Should register user with existing e-mail', async ({ page }) => {
        const registration = new RegistrationPage(page);

        // Filling the form with an existing email
        await registration.fillRegistrationForm({
            name: 'Tereza Pinkasová',
            email: 't.pinkasova007@gmail.com',
            password: 'Hesloheslo123',
            confirmPassword: 'Hesloheslo123',
        });
        
        // Assertions
        await expect(registration.nameInputLocator).toHaveValue('Tereza Pinkasová');
        await expect(registration.passInputLocator).toHaveValue('Hesloheslo123');
        await expect(registration.confirmPassInputLocator).toHaveValue('Hesloheslo123');

        // Submitting registration form and check that email already exist
        await registration.registerButton.click();
        await expect(registration.mailInputLocator).toHaveClass('form-control is-invalid');
        await expect(registration.validationMessage).toBeVisible();
    });

    /* 
    ZADÁNÍ: Test, který provede registraci uživatele s nevalidním heslem (obsahující pouze čísla)
    */

    test('4.Should register user with invalid password', async ({ page }) => {
        const registration = new RegistrationPage(page);
        const uniqueEmail = registration.generateUniqueEmail();

         // Filling the form with an invalid password
         await registration.fillRegistrationForm({
            name: 'Tereza Pinkasová',
            email: uniqueEmail,
            password: '123456789',
            confirmPassword: '123456789',
        });

        // Assertions
        await expect(registration.nameInputLocator).toHaveValue('Tereza Pinkasová');
        await expect(registration.passInputLocator).toHaveValue('123456789');
        await expect(registration.confirmPassInputLocator).toHaveValue('123456789');
    
        // Submitting registration form and check that password is invalid
        await registration.registerButton.click();
        await expect(registration.passInputLocator).toHaveClass('form-control is-invalid');
        await expect(registration.passwordValidation).toBeVisible();
    });
});