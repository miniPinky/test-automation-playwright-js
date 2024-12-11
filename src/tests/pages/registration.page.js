export class RegistrationPage {

    constructor(page) {
        this.page = page;
        this.titleLocator = page.locator('h1').filter({ hasText: 'Registrace' });
        this.nameInputLocator = page.locator('#name');
        this.mailInputLocator = page.locator('#email');
        this.passInputLocator = page.getByLabel('Heslo');
        this.confirmPassInputLocator = page.locator('#password-confirm');
        this.registerButton = page.getByRole('button', { name: 'Zaregistrovat' });
        this.validationMessage = page.getByText('Účet s tímto emailem již existuje');
        this.passwordValidation = page.getByText('Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici');
    }

    getAllLocators() {
        return [
          this.titleLocator,
          this.nameInputLocator,
          this.mailInputLocator,
          this.passInputLocator,
          this.confirmPassInputLocator,
          this.registerButton,
        ];
    }

    generateUniqueEmail() {
         return 'test+' + Date.now() + '@test.cz';
    }

    async fillRegistrationForm({ name, email, password, confirmPassword }) {
        await this.nameInputLocator.fill(name);
        await this.mailInputLocator.fill(email);
        await this.passInputLocator.fill(password);
        await this.confirmPassInputLocator.fill(confirmPassword);
    }
}