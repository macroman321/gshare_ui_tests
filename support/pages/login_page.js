// login_page.js
const Page = require('./page');

function LoginPage(app) {
  console.log('LoginPage constructor');
  Page.call(this, app);

  this.emailInputSelector = '[name="email"]';
  this.passwordInputSelector = '[name="password"]';
  this.loginButtonSelector = '[type="submit"]';

  this.emailInput = this.app.client.element(this.emailInputSelector);
  this.passwordInput = this.app.client.element(this.passwordInputSelector);
  this.loginButton = this.app.client.element(this.loginButtonSelector);
}

// inherit everything from Page
LoginPage.prototype = Object.create(Page.prototype);

LoginPage.prototype.login = async function(user) {
  console.log('***** login *****');
  const emailInput = this.app.client.element(this.emailInputSelector);
  console.log(emailInput);
  let x = await this.app.client.waitForExist(this.emailInputSelector);
  console.log(x);
  //x = await this.app.client.hasFocus(this.emailInputSelector);
  //console.log(x);
  x = await this.app.client.setValue(this.emailInputSelector, user.email);
  console.log(x);

  passwordInput = this.app.client.element(this.passwordInputSelector);
  await passwordInput.setValue(user.password);

  const loginButton = this.app.client.element(this.loginButtonSelector);
  await loginButton.click();
}

module.exports = LoginPage;
