// login_page.js
const Page = require('./page');

function LoginPage(app) {
  Page.call(this, app);

  this.emailInput = '[name="email"]';
  this.passwordInput = '[name="password"]';
  this.rememberMeCheckbox = '[name="remember_me"]';
  this.loginButton = '[type="submit"]';
}

// inherit everything from Page
LoginPage.prototype = Object.create(Page.prototype);

LoginPage.prototype.isOpen = async function () {
  try {
    await this.app.client.waitForExist(this.emailInput);
    return true;
  } catch (_) {
    return false;
  }
};

// Login the given user
LoginPage.prototype.login = async function (user) {
  await this.enterEmail(user.email);
  await this.enterPassword(user.password);
  await this.clickLogin();
};

LoginPage.prototype.loginWithoutRememberMe = async function (user) {
  await this.enterEmail(user.email);
  await this.enterPassword(user.password);
  await this.uncheckRememberMe();
  await this.clickLogin();
};

LoginPage.prototype.enterEmail = async function (email) {
  const client = this.app.client;

  await client.waitForExist(this.emailInput);
  await client.setValue(this.emailInput, email);
};

LoginPage.prototype.enterPassword = async function (password) {
  const client = this.app.client;

  await client.waitForExist(this.passwordInput);
  await client.setValue(this.passwordInput, password);
};

LoginPage.prototype.clickLogin = async function () {
  await this.app.client.click(this.loginButton);
};

LoginPage.prototype.clickRememberMe = async function () {
  await this.app.client.click(this.rememberMeCheckbox);
};

LoginPage.prototype.isRememberMeChecked = async function () {
  return this.app.client.isSelected(this.rememberMeCheckbox);
};

LoginPage.prototype.uncheckRememberMe = async function () {
  if ((await this.isRememberMeChecked()) === true) {
    this.clickRememberMe();
  }
};

module.exports = LoginPage;