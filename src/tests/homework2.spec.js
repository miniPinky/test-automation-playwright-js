import { test, expect } from './pages/fixtures.js';
import { OrderPage } from "./pages/order.page.js";

test.describe('Navigation test', async () => {

    test('Should navigate to order page through navigation menu', async ({ orderPage }) => {
        await orderPage.page.getByRole('button', { name: 'Pro učitelé' }).click();
        await orderPage.page.getByText('Objednávka pro MŠ/ZŠ').click();

        // Ověření URL a nadpisu
        await expect(orderPage.page).toHaveURL('https://team8-2022brno.herokuapp.com/objednavka/pridat');
        await expect(orderPage.page.locator('h1')).toHaveText('Nová objednávka');

        // Screenshot
        await orderPage.page.screenshot({ path: 'novaobjednavka.png', fullPage: true });
    });
});

test.describe('New Order test', async () => {

    test.beforeEach('Should navigate to order page', async ({ orderPage }) => {
        await orderPage.navigateToOrderPage();
        await expect(orderPage.page.locator('h1')).toHaveText('Nová objednávka');
      });

    test('ICO check', async ({ orderPage }) => {
        await orderPage.fillICO({
            ico: '08750866',
        });
        await expect(orderPage.icoLocator).toHaveValue('08750866');
        //await orderPage.toastMessageLocator.waitFor();
        await expect(orderPage.toastMessageLocator).toBeVisible();
        await expect(orderPage.toastMessageLocator).toHaveText(
            'Data z ARESu se nepodařilo načíst, vyplňte je prosím ručně'
        );
    });

    test('fill form', async ({ page }) => {
        const order = new OrderPage(page);

        await order.fillOrderForm({
            ico: '08750866',
            client: 'speedlo s.r.o.',
            adress: 'Hlaváčova 207, Pardubice 530 02',
            substitute: 'Jana Nováková',
            contactName: 'Tereza Pinkasová',
            phone: '+420603759600',
            mail:'t.pinkasova007@gmail.com',
            startDate:'01.01.2025',
            endDate:'10.01.2025',
        });
        
        await expect(order.icoLocator).toHaveValue(fillOrderForm.ico);
        await expect.soft(order.clientNameLocator).toHaveValue(fillOrderForm.client);
        await expect(order.clientAdressLocator).toHaveValue(fillOrderForm.adress);
        await expect(order.substituteLocator).toHaveValue(fillOrderForm.substitute);
        await expect(order.contactNameLocator).toHaveValue(fillOrderForm.contactName);
        await expect(order.phoneLocator).toHaveValue(fillOrderForm.phone);
        await expect(order.mailLocator).toHaveValue(fillOrderForm.mail);
        await expect(order.firstStartDateLocator).toHaveValue(fillOrderForm.startDate);
        await expect(order.secondStartDateLocator).toHaveValue(fillOrderForm.startDate);
        await expect(order.thirdStartDateLocator).toHaveValue(fillOrderForm.startDate);
        await expect(order.firstEndDateLocator).toHaveValue(fillOrderForm.endDate);
        await expect(order.secondEndDateLocator).toHaveValue(fillOrderForm.endDate);
        await expect(order.thirdEndDateLocator).toHaveValue(fillOrderForm.endDate);

        const navTabLocator = page.getByRole('tab', { name: 'Příměstský tábor' });
        await navTabLocator.click(); 
        

        const optionsLocator = await order.courseOptionLocator.locator('option').allTextContents();
        expect(optionsLocator).toEqual(['Dopolední', 'Odpolední']);
        await order.courseOptionLocator.selectOption('afternoon');
        const selectedOptionLocator = await order.courseOptionLocator.inputValue();
        expect(selectedOptionLocator).toBe('afternoon');

        await expect(order.numberOfStudentsLocator).toBeVisible();
        await order.numberOfStudentsLocator.fill('30');

        await expect(order.studentsAgeLocator).toBeVisible();
        await order.studentsAgeLocator.fill('12');

        await expect(order.numberOfAdultsLocator).toBeVisible();
        await order.numberOfAdultsLocator.fill('3');
    });
});


