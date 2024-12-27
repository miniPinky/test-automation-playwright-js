import { expect, test } from "@playwright/test";

test.describe('Navigation test', async () => {

    test('Should navigate to order page through navigation menu', async ({ page }) => {
        await page.goto('/');
        await page.getByRole('button', { name: 'Pro učitelé' }).click();
        await page.getByText('Objednávka pro MŠ/ZŠ').click();
        await expect(page).toHaveURL('https://team8-2022brno.herokuapp.com/objednavka/pridat');
        await expect(page.locator('h1')).toHaveText('Nová objednávka');
        await page.screenshot({ path: 'novaobjednavka.png', fullPage: true });
    });
});

test.describe('New Order test', async () => {

    test.beforeEach('Should navigate to order page', async ({ page }) => {
        await page.goto('/objednavka/pridat');
        await expect(page.locator('h1')).toHaveText('Nová objednávka');
      });

    test('ICO check', async ({ page }) => {
        const icoLocator = page.locator('#ico');
        const toastMessageLocator = page.locator('.toast-message');
        await expect(icoLocator).toBeVisible();
        await icoLocator.fill('08750866');
        await page.keyboard.press('Enter');
        await expect(toastMessageLocator).toBeVisible();
        await expect(toastMessageLocator).toHaveText('Data z ARESu se nepodařilo načíst, vyplňte je prosím ručně')
    });

    test('fill form', async ({ page }) => {
        const icoLocator = page.locator('#ico');
        const toastMessageLocator = page.locator('.toast-message');
        await expect(icoLocator).toBeVisible();
        await icoLocator.fill('08750866');
        await page.keyboard.press('Enter');
        await expect(toastMessageLocator).toBeVisible();
        await expect(toastMessageLocator).toHaveText('Data z ARESu se nepodařilo načíst, vyplňte je prosím ručně')

        const clientNameLocator = page.locator('#client');
        await expect(clientNameLocator).toBeVisible();
        await clientNameLocator.fill('speedlo s.r.o.');

        const clientAdressLocator = page.locator('#address');
        await expect(clientAdressLocator).toBeVisible();
        await clientAdressLocator.fill('Hlaváčova 207, Pardubice 530 02');

        const substituteLocator = page.locator('#substitute');
        await expect(substituteLocator).toBeVisible();
        await substituteLocator.fill('Jana Nováková');
        
        const contactNameLocator = page.locator('#contact_name');
        await expect(contactNameLocator).toBeVisible();
        await contactNameLocator.fill('Jana Nováková');

        const phoneLocator = page.locator('#contact_tel');
        await expect(phoneLocator).toBeVisible();
        await phoneLocator.fill('+420603759600');

        const mailLocator = page.locator('#contact_mail');
        await expect(mailLocator).toBeVisible();
        await mailLocator.fill('t.pinkasova007@gmail.com');

        const firstStartDateLocator = page.locator('#start_date_1');
        await expect(firstStartDateLocator).toBeVisible();
        await firstStartDateLocator.fill('1.1.2025');
        await page.keyboard.press('Enter');
        const firstEndDateLocator = page.locator('#end_date_1');
        await expect(firstEndDateLocator).toBeVisible();
        await firstEndDateLocator.fill('10.1.2025');
        await page.keyboard.press('Enter');

        const secondStartDateLocator = page.locator('#start_date_2');
        await expect(secondStartDateLocator).toBeVisible();
        await secondStartDateLocator.fill('1.1.2025');
        await page.keyboard.press('Enter');
        const secondEndDateLocator = page.locator('#end_date_2');
        await expect(secondEndDateLocator).toBeVisible();
        await secondEndDateLocator.fill('10.1.2025');
        await page.keyboard.press('Enter');

        const thirdStartDateLocator = page.locator('#start_date_3');
        await expect(thirdStartDateLocator).toBeVisible();
        await thirdStartDateLocator.fill('1.1.2025');
        await page.keyboard.press('Enter');
        const thirdEndDateLocator = page.locator('#end_date_3');
        await expect(thirdEndDateLocator).toBeVisible();
        await thirdEndDateLocator.fill('10.1.2025');
        await page.keyboard.press('Enter');

        const navTabLocator = page.getByRole('tab', { name: 'Příměstský tábor' });
        await navTabLocator.click(); 
        

        const courseOptionLocator = page.locator('#camp-date_part');
        const optionsLocator = await courseOptionLocator.locator('option').allTextContents();
        expect(optionsLocator).toEqual(['Dopolední', 'Odpolední']);
        await courseOptionLocator.selectOption('afternoon');
        const selectedOptionLocator = await courseOptionLocator.inputValue();
        expect(selectedOptionLocator).toBe('afternoon');

        const numberOfStudentsLocator = page.locator('#camp-students')
        await expect(numberOfStudentsLocator).toBeVisible();
        await numberOfStudentsLocator.fill('30');

        const studentsAgeLocator = page.locator('#camp-age')
        await expect(studentsAgeLocator).toBeVisible();
        await studentsAgeLocator.fill('12');

        const numberOfAdultsLocator = page.locator('#camp-adults')
        await expect(numberOfAdultsLocator).toBeVisible();
        await numberOfAdultsLocator.fill('3');
    });
});


