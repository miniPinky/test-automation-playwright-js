import { App } from "./app.page";

export class LoginPage  extends App{
    
    constructor(page) {
        super(page);
        this.page = page;
    }

    async open() {
        await this.page.goto("/prihlaseni");
    }
}
