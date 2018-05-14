// login_page.js
const Page = require('./page');

function LoginPage(app) {
  Page.call(this, app);

  this.emailInput = '[name="email"]';
  this.passwordInput = '[name="password"]';
  this.rememberMeCheckbox = '[name="remember_me"]';
  this.loginButton = '[type="submit"]';
  this.loginErrorNotificationMessage = '[class="gc-notification__message"]';
  this.loginMinimumEightSymbolsMessage = '[class="gc-input__message"]';
  this.loginBackground = '[class="gc-authentication"]'
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
  await this.uncheckRememberMe();
  await this.login(user);
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
  await this.app.client.waitForExist(this.rememberMeCheckbox);
  return this.app.client.isSelected(this.rememberMeCheckbox);
};

LoginPage.prototype.uncheckRememberMe = async function () {
  if ((await this.isRememberMeChecked()) === true) {
    this.clickRememberMe();
  }
};

LoginPage.prototype.verifyFailedLoginMessage = async function (message) {
  let errorNotificationMessage;

  try {
    await this.app.client.waitForExist(this.loginErrorNotificationMessage);
    errorNotificationMessage = await this.app.client.getText(this.loginErrorNotificationMessage);
  } catch (error) {
    await this.app.client.waitForExist(this.loginMinimumEightSymbolsMessage);
    errorNotificationMessage = await this.app.client.getText(this.loginMinimumEightSymbolsMessage);
  }
  if (errorNotificationMessage !== message) {
    throw new Error("Error messages do not match!");
  }
};

LoginPage.prototype.handleError = async function (error) {
  if (error.message.includes("is not clickable") !== true) {
    console.log(error.message);
    throw new error;
  }
  await this.clickRememberMe();
};

LoginPage.prototype.verifyRememberMeIsChecked = async function () {
  let client = this.app.client;
  let rememberMeCheckBoxStatus = await client.isSelected(this.rememberMeCheckbox);
  if (rememberMeCheckBoxStatus !== true) {
    throw new Error("Remember Me is not selected")
  }
};

module.exports = LoginPage;
