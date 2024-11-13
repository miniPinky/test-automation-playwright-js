import { expect, test } from "@playwright/test";

test("should open login page", async ({ page }) => {
  console.log("Fourth test");
  await page.goto("/prihlaseni");
  
  const emailFieldLocator = page.getByLabel("Email");
  const passwordFieldLocator = page.getByLabel("Heslo");
  const loginButtonLocator = page.getByRole("button", {name:"Přihlásit"})

  await expect(emailFieldLocator).toBeAttached()
  await expect(passwordFieldLocator).toBeEditable()
});