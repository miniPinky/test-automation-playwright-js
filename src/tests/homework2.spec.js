import { test, expect } from './pages/fixtures.js';
//import { OrderPage } from "./pages/order.page.js";

test.describe('Test for navigation and page loading', async () => {

    test('Should navigate to order page through navigation menu', async ({ orderPage }) => {
        await orderPage.page.getByRole('button', { name: 'Pro učitelé' }).click();
        await orderPage.page.getByText('Objednávka pro MŠ/ZŠ').click();

        await expect(orderPage.page).toHaveURL('https://team8-2022brno.herokuapp.com/objednavka/pridat');
        await expect(orderPage.page.locator('h1')).toHaveText('Nová objednávka');

        await orderPage.page.screenshot({ path: 'nova_objednavka.png', fullPage: true });
    });
});

test.describe('Tests for creating a new order', async () => {

    const defaultFormData = {
        ico: '08750866',
        client: 'speedlo s.r.o.',
        adress: 'Hlaváčova 207, Pardubice 530 02',
        substitute: 'Jana Nováková',
        contactName: 'Tereza Pinkasová',
        phone: '+420603759600',
        mail: 't.pinkasova007@gmail.com',
        startDate: '01.01.2025',
        endDate: '10.01.2025',
    };

    const campFormData = { 
        students: '30', 
        age: '12', 
        adults: '3',
        dateOption:'afternoon',
    };

    test.beforeEach('Should navigate to order page', async ({ orderPage }) => {
        await orderPage.navigateToOrderPage();
        await expect(orderPage.page.locator('h1')).toHaveText('Nová objednávka');
      });

    test('Check if Ares works for ICO search', async ({ orderPage }) => {
        await orderPage.fillICOAndWait('08750866');
        await expect(orderPage.icoLocator).toHaveValue('08750866');
        await expect(orderPage.toastMessageLocator).toBeVisible();
        await expect(orderPage.toastMessageLocator).toHaveText(
            'Data z ARESu se nepodařilo načíst, vyplňte je prosím ručně'
        );
    });

    test('Should successfully fill and validate the order form', async ({ orderPage }) => {
        const formData = { ...defaultFormData };

        await orderPage.fillOrderForm(formData);
        
        await expect(orderPage.icoLocator).toHaveValue(formData.ico);
        await expect(orderPage.clientNameLocator).toHaveValue(formData.client);
        await expect(orderPage.firstStartDateLocator).toHaveValue(formData.startDate);
        await expect(orderPage.firstEndDateLocator).toHaveValue(formData.endDate);

        await orderPage.page.getByRole('tab', { name: 'Příměstský tábor' }).click();

        const options = await orderPage.getCampOptions();
        expect(options).toEqual(['Dopolední', 'Odpolední']);
        await orderPage.fillCampDetails(campFormData);
        
        await expect(orderPage.courseOptionLocator).toHaveValue(campFormData.dateOption);
        await expect(orderPage.numberOfStudentsLocator).toHaveValue(campFormData.students);
        await expect(orderPage.studentsAgeLocator).toHaveValue(campFormData.age);
        await expect(orderPage.numberOfAdultsLocator).toHaveValue(campFormData.adults);

        await orderPage.page.getByRole('button', { name: 'Uložit objednávku' }).click();
        await expect(orderPage.page.locator("h3")).toHaveText("Děkujeme za objednávku");
    
        await orderPage.page.screenshot({ path: 'dokoncena_objednavka.png', fullPage: true });
    });

    test('Should not allow submission with invalid email format', async ({ orderPage }) => {
        const formData = { ...defaultFormData, mail: 'testatest.cz' };

        await orderPage.fillOrderForm(formData);
        await orderPage.page.getByRole('tab', { name: 'Příměstský tábor' }).click();

        await orderPage.fillCampDetails(campFormData);

        await orderPage.page.getByRole('button', { name: 'Uložit objednávku' }).click();
  
        await expect(orderPage.page.locator("h1")).toHaveText("Nová objednávka");
        await expect(orderPage.page).toHaveURL('https://team8-2022brno.herokuapp.com/objednavka/pridat');
    });

    test.afterEach(async ({ orderPage }, testInfo) => {
        if (testInfo.status === 'failed') {
            await orderPage.page.screenshot({ path: 'screenshots/${testInfo.title}.png' });
        }
    });
});


