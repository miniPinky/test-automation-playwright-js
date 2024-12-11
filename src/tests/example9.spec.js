import {expect, test} from "@playwright/test";
import { LoginPage } from './pages/login.page.js';
import { username, password, userFullName } from "../fixtures/fixtures.js";

test.describe("Login Page", async () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
    });

    test("should show login form", async ({ page }) => {
        const loginPage = new LoginPage(page);

        await expect(loginPage.emailField, "email field should be visible").toBeVisible();
        await expect(loginPage.emailField, "email field should be enabled").toBeEnabled();

        await expect(loginPage.passwordField, "password field should be visible").toBeVisible();
        await expect(loginPage.passwordField, "password field should be enabled").toBeEnabled();

        await expect(loginPage.loginButton, "login button should be visible").toBeVisible();
        await expect(loginPage.loginButton, "login button text should have text").toHaveText("Přihlásit");
    });

    test("should login with valid credentials", async ({page}) => {
        const loginPage = new LoginPage(page);

        await loginPage.login(username, password);
        await expect(loginPage.usernameDropdown).toHaveText(userFullName);
    });

    test("should not login with invalid credentials", async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.emailField.fill(username);
        await loginPage.passwordField.fill("invalid");
        await loginPage.loginButton.click();

        //const toast = await getToast(page);
        //const errorField = await getFieldError(page);

        await expect(loginPage.toast).toHaveText("Některé pole obsahuje špatně zadanou hodnotu");
        await expect(loginPage.fieldError).toHaveText("Tyto přihlašovací údaje neodpovídají žadnému záznamu.");

        await expect(loginPage.emailField).toBeVisible();
        await expect(loginPage.passwordField).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();
    });

    test("should logout", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(username, password);

        await expect(loginPage.usernameDropdown).toHaveText(userFullName);

        await loginPage.usernameDropdown.click();
        await loginPage.logoutLink.click();

        await expect(await loginPage.usernameDropdown).toBeVisible({ visible: false });
        await expect(await loginPage.navbarRight).toHaveText("Přihlásit");
    });
});
