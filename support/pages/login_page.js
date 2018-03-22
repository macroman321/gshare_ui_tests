// login_page.js
const Page = require('./page');

class LoginPage extends Page {

    get emailInput() { return this.app.client.element('[name="email"]'); }
    get passwordInput() { return this.app.client.element('[name="password"]'); }
    get loginButton() { return this.app.client.element('[type="submit"]'); }

    login(user) {
      this.emailInput
      .waitForExist()
      .hasFocus()
      .setValue(user.email);

    this.passwordInput
      .hasFocus()
      .setValue(user.password);

    this.loginButton.click();
    }

}

export default new LoginPage();
