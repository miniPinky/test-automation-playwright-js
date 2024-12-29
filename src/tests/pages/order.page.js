export class OrderPage {

    constructor(page) {
        this.page = page;
        this.icoLocator = page.locator('#ico');
        this.toastMessageLocator = page.locator('.toast-message');
        this.clientNameLocator = page.locator('#client');
        this.clientAdressLocator = page.locator('#address');
        this.substituteLocator = page.locator('#substitute');
        this.contactNameLocator = page.locator('#contact_name');
        this.phoneLocator = page.locator('#contact_tel');
        this.mailLocator = page.locator('#contact_mail');
        this.firstStartDateLocator = page.locator('#start_date_1');
        this.firstEndDateLocator = page.locator('#end_date_1');
        this.secondStartDateLocator = page.locator('#start_date_2');
        this.secondEndDateLocator = page.locator('#end_date_2');
        this.thirdStartDateLocator = page.locator('#start_date_3');
        this.thirdEndDateLocator = page.locator('#end_date_3');
        this.courseOptionLocator = page.locator('#camp-date_part');
        this.numberOfStudentsLocator = page.locator('#camp-students');
        this.studentsAgeLocator = page.locator('#camp-age');
        this.numberOfAdultsLocator = page.locator('#camp-adults');
    }

    async navigateToOrderPage() {
        await this.page.goto('/objednavka/pridat');
    }

    async fillICOAndWait(ico) {
        await this.icoLocator.fill(ico);
        await this.page.keyboard.press('Enter');
        await this.toastMessageLocator.waitFor({ state: 'attached', timeout: 10_000 });
    }

    async fillOrderForm({ ico, client, adress, substitute, contactName, phone, mail, startDate, endDate }) {
        await this.fillICOAndWait(ico);
        await this.clientNameLocator.fill(client);
        await this.clientAdressLocator.fill(adress);
        await this.substituteLocator.fill(substitute);
        await this.contactNameLocator.fill(contactName);
        await this.phoneLocator.fill(phone);
        await this.mailLocator.fill(mail);
        await this.firstStartDateLocator.fill(startDate);
        await this.firstEndDateLocator.fill(endDate);
        await this.secondStartDateLocator.fill(startDate);
        await this.secondEndDateLocator.fill(endDate);
        await this.thirdStartDateLocator.fill(startDate);
        await this.thirdEndDateLocator.fill(endDate);
    }

    async selectCamp() {
        await this.page.getByRole('tab', { name: 'Příměstský tábor' }).click();
    }
   
    async getCampOptions() {
        return await this.courseOptionLocator.locator('option').allTextContents();
    }

    async fillCampForm({ dateOption, students, age, adults }) {
        await this.courseOptionLocator.selectOption(dateOption);
        await this.numberOfStudentsLocator.fill(students);
        await this.studentsAgeLocator.fill(age);
        await this.numberOfAdultsLocator.fill(adults);
    }

    async fillCampDetails(campFormData) {
        await this.fillCampForm(campFormData);
    }

    async submit() {
        await this.page.getByRole('button', { name: 'Uložit objednávku' }).click();
    }
}