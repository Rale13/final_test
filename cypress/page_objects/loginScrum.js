class LoginPage {

    get emailInput() {
        return cy.get('.el-input__inner').eq(0);
    }

    get passInput() {
        return cy.get('.el-input__inner').eq(1);
    }

    get loginBtn() {
        return cy.get('button[type="submit"]');
    }

    get sidebar() {
        return cy.get('.vb-content')
    }

    login(email, pass) {
        this.emailInput.type(email);
        this.passInput.type(pass);
        this.loginBtn.click();
    }
}

export const loginScrum = new LoginPage();