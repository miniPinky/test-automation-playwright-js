import { expect, test } from "@playwright/test";
import { url } from "inspector";

//   const BASE_URL = 'https://stage.speedlo.cloud/app/vision-offices/test-pobocka/wb/home'; // Definice konstanty
  
//   test('navigace na konkrétní URL', async ({ page }) => {
//     await page.goto(BASE_URL);
//     await expect(page).toHaveURL(BASE_URL);
//   });

test('navigace na speedlo shop URL', async ({ page }) => {
    await page.goto('https://stage.speedlo.cloud/app/vision-offices/test-pobocka/wb/home');
    
    // Najdi název brandu a ověř jeho text
    const branch = page.locator('h1.chakra-heading');
    await expect(branch).toHaveText('Test Pobočka');

    //Výběr pickup metody
    const pickupLocator = page.getByRole('button', { name: 'pickup' });
    await expect(pickupLocator).toBeVisible();
    pickupLocator.click();

    //ověření textu v shopu
    const headingLocator = page.getByText('Select a branch');
    await expect(headingLocator).toBeVisible();
    
    //proklik do menu
    const submitLocator = page.getByTestId('submit-place')
    await expect(submitLocator).toBeEnabled();
    await submitLocator.click();
    await expect(page).toHaveURL("https://stage.speedlo.cloud/app/vision-offices/test-pobocka/wb/menu");

    //ověření zobrazení kategorie
    const firstCategoryName = page.locator('h2').first();
    await expect(firstCategoryName).toHaveText('StripsENG');

    //kliknutí na produkt
    const productLocator = page.locator('p.chakra-text', { hasText: 'Kyblík přírodní kuře' });
    await expect(productLocator).toBeVisible();
    await productLocator.click();

    //přidání produktu do košíku
    const addtoCartLocator = page.getByRole('button', { name: 'ADD TO CART' });
    await addtoCartLocator.click();
    
    //pokračování z košíku dál
    const buttonContinueLocator = page.getByRole('button', { name: 'continue' });
    await buttonContinueLocator.click();
    await expect(page).toHaveURL("https://stage.speedlo.cloud/app/vision-offices/test-pobocka/wb/form");

    //vyplnění formuláře
    const inputNameLocator = page.getByPlaceholder('John').first();
    await inputNameLocator.fill("Test");
    await expect(inputNameLocator).toHaveValue("Test");

    const inputSureNameLocator = page.getByPlaceholder('Doe').first();
    await inputSureNameLocator.fill("Test");
    await expect(inputSureNameLocator).toHaveValue("Test");

    const inputPhoneLocator = page.locator('input[inputmode="tel"]').nth(1);
    await inputPhoneLocator.fill("123456789");
    await expect(inputPhoneLocator).toHaveValue("123456789");

    const inputMailLocator = page.locator('input[inputmode="email"]');
    await inputMailLocator.fill("test@test.cz");
    await expect(inputMailLocator).toHaveValue("test@test.cz");

    //Potvrzení platební metody cash
    const buttonCashLocator = page.getByRole('button', { name: 'cash' });
    await buttonCashLocator.click();
    
    //Odeslání objednávky
    
    const buttonFinishLocator = page.getByRole('button', { name: 'ORDER WITH OBLIGATION TO PAY' });
    await buttonFinishLocator.click();
    // const orderSent = page.locator(h3.chakra-heading).first();
    // await expect(orderSent).toHaveText("Order sent!"); 
})




