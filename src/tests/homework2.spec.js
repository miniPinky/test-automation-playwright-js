import { test, expect } from './pages/fixtures.js';

test.describe('Test for navigation and page loading', async () => {

    test('Should navigate to order page through navigation menu', async ({ orderPage }) => {
        await test.step('Navigate to order page', async () => {
            await orderPage.page.getByRole('button', { name: 'Pro učitelé' }).click();
            await orderPage.page.getByText('Objednávka pro MŠ/ZŠ').click();
        });

        await test.step('Verify navigation and page content', async () => {
            await expect(orderPage.page.locator('h1')).toHaveText('Nová objednávka');
            await orderPage.page.screenshot({ path: 'nova_objednavka.png', fullPage: true });
        });
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
      });

    test('Check if Ares works for ICO search', async ({ orderPage }) => {
        await test.step('Fill ICO and wait for response', async () => {
            await orderPage.fillICOAndWait(defaultFormData.ico);
        });

        await test.step('Validate ARES response and error message', async () => {
            await expect(orderPage.icoLocator).toHaveValue('08750866');
            await expect(orderPage.toastMessageLocator).toBeVisible();
            await expect(orderPage.toastMessageLocator).toHaveText(
                'Data z ARESu se nepodařilo načíst, vyplňte je prosím ručně'
            );
        });
    });

    test('Should successfully fill and validate the order form', async ({ orderPage }) => {
        const formData = { ...defaultFormData };

        await test.step('Fill the order form and validate correct values', async () => {
            await orderPage.fillOrderForm(formData);
            await expect(orderPage.clientNameLocator).toHaveValue(formData.client);
            await expect(orderPage.substituteLocator).toHaveValue(formData.substitute);
            await expect(orderPage.contactNameLocator).toHaveValue(formData.contactName);
            await expect(orderPage.phoneLocator).toHaveValue(formData.phone);
            await expect(orderPage.mailLocator).toHaveValue(formData.mail);
            await expect(orderPage.firstStartDateLocator).toHaveValue(formData.startDate);
            await expect(orderPage.firstEndDateLocator).toHaveValue(formData.endDate);
        });

        await test.step('Select camp, fill camp details and validate correct values', async () => {
            await orderPage.selectCamp();
            const options = await orderPage.getCampOptions();
            expect(options).toEqual(['Dopolední', 'Odpolední']);
            await orderPage.fillCampDetails(campFormData);
            await expect(orderPage.courseOptionLocator).toHaveValue(campFormData.dateOption);
            await expect(orderPage.numberOfStudentsLocator).toHaveValue(campFormData.students);
            await expect(orderPage.studentsAgeLocator).toHaveValue(campFormData.age);
            await expect(orderPage.numberOfAdultsLocator).toHaveValue(campFormData.adults);
        });

        await test.step('Submit the form and verify submit page', async () => {
            await orderPage.submit();
            await expect(orderPage.page.locator("h3")).toHaveText("Děkujeme za objednávku");
            await orderPage.page.screenshot({ path: 'dokoncena_objednavka.png', fullPage: true });
        });
    });

    test('Should not allow submission with invalid email format', async ({ orderPage }) => {
        const formData = { ...defaultFormData, mail: 'testatest.cz' };

        await test.step('Fill the order form with invalid email', async () => {
            await orderPage.fillOrderForm(formData);
        });

        await test.step('Select camp and fill camp details', async () => {
            await orderPage.selectCamp();
            await orderPage.fillCampDetails(campFormData);
        });

        await test.step('Attempt to submit the form and verify that the form has not been submitted', async () => {
            await orderPage.submit();  
            await expect(orderPage.page.locator("h1")).toHaveText("Nová objednávka");
        });   
    });

    test.afterEach(async ({ orderPage }, testInfo) => {
        if (testInfo.status === 'failed') {
            await orderPage.page.screenshot({ path: 'screenshots/${testInfo.title}.png' });
        }
    });
});


