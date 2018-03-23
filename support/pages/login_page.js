// login_page.js
const Page = require('./page');

function LoginPage(client) {
  Page.call(this, client);

  this.emailInputSelector = '[name="email"]';
  this.passwordInputSelector = '[name="password"]';
  this.loginButtonSelector = '[type="submit"]';

  this.emailInput = this.app.client.element(this.emailInputSelector);
  this.passwordInput = this.app.client.element(this.passwordInputSelector);
  this.loginButton = this.app.client.element(this.loginButtonSelector);
}

// inherit everything from Page
LoginPage.prototype = Object.create(Page.prototype);

Loggin.prototype.login = function(user) {
  this.emailInput
    .waitForExist()
    .hasFocus()
    .setValue(user.email);

  this.passwordInput
    .hasFocus()
    .setValue(user.password);

  this.loginButton.click();
}

module.exports = LoginPage;
