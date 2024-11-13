import { expect, test } from "@playwright/test";

test("should open login page", async ({ page }) => {
  console.log("Third test");
  await page.goto("/prihlaseni");
  
  const email = page.getByLabel("Email");
  await expect(email).toBeVisible();
  await expect(email).toBeEnabled();

  const password = page.getByLabel("Heslo");
  await expect(password).toBeVisible();
  await expect(password).toBeEnabled();
  
  const loginbtn = page.getByRole("button", { name: "Přihlásit"});
  await expect(loginbtn).toContainText("hlásit");

  const forget = page.getByText("Zapomněli jste své heslo?").getAttribute("href");
  
  await email.fill("da-app.admin@czechitas.cz");
  await password.fill("Czechitas123")
  await loginbtn.click();
});