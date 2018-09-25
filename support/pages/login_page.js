const Page = require('./page')
// Increase default test timeout duration for Cucumber
const {setDefaultTimeout} = require('cucumber')
setDefaultTimeout(5000 * 1000)

// Custom timeouts
const shortTimeout = 5000
const mediumTimeout = 10000

function LoginPage (world) {
  Page.call(this, world)

  // Please follow this syntax when defining elements:
  // nameType
  // Examples:
  // loginButton, emailTextField etc.

  this.emailTextField = '[name="email"]'
  this.passwordTextField = '[name="password"]'
  this.rememberMeCheckbox = '[name="remember_me"]'
  this.loginButton = '[type="submit"]'
  this.incorrectPasswordMsgDiv = '[class="gc-notification__message"]'
  this.minEightSymbolsMsgDiv = '[class="gc-input__message"]'
}

// Inherit everything from Page
LoginPage.prototype = Object.create(Page.prototype)

// Main functions
LoginPage.prototype.login = async function (user) {
  await this.logoutIfLoggedIn()
  await this.enterEmail(user.email)
  await this.enterPassword(user.password)
  await this.checkRememberMe()
  await this.clickLoginButton()
}

LoginPage.prototype.loginWithoutRememberMe = async function (user) {
  await this.logoutIfLoggedIn()
  await this.enterEmail(user.email)
  await this.enterPassword(user.password)
  await this.uncheckRememberMe()
  await this.clickLoginButton()
}

LoginPage.prototype.loginWithCustomPassword = async function (user, password) {
  await this.logoutIfLoggedIn()
  await this.enterEmail(user.email)
  await this.enterPassword(password)
  await this.checkRememberMe()
  await this.clickLoginButton()
}

LoginPage.prototype.verifyImOnLoginPage = async function () {
  if ((await this.isLoginPageOpened()) === false) {
    throw new Error('Login page is not opened!')
  }
}

// Utility functions
LoginPage.prototype.logoutIfLoggedIn = async function () {
  if ((await this.isLoginPageOpened()) === false) {
    // TODO: Find a solution for pause here
    await this.app.client.pause(shortTimeout)
    await this.page.mainPage.logout()
  }
}

LoginPage.prototype.isLoginPageOpened = async function () {
  return this.app.client.isVisible(this.emailTextField)
}

LoginPage.prototype.enterEmail = async function (email) {
  await this.app.client
    .waitForVisible(this.emailTextField, mediumTimeout)
    .setValue(this.emailTextField, email)
}

LoginPage.prototype.enterPassword = async function (password) {
  await this.app.client
    .waitForVisible(this.passwordTextField, mediumTimeout)
    .setValue(this.passwordTextField, password)
}

LoginPage.prototype.clickLoginButton = async function () {
  await this.app.client
    .waitForVisible(this.loginButton, mediumTimeout)
    .click(this.loginButton)
}

LoginPage.prototype.uncheckRememberMe = async function () {
  await this.app.client.waitForVisible(this.rememberMeCheckbox, mediumTimeout)
  if ((await this.isRememberMeChecked() === true)) {
    await this.app.client.click(this.rememberMeCheckbox)
  }
}

LoginPage.prototype.checkRememberMe = async function () {
  await this.app.client.waitForVisible(this.rememberMeCheckbox, mediumTimeout)
  if ((await this.isRememberMeChecked() === false)) {
    await this.app.client.click(this.rememberMeCheckbox)
  }
}

LoginPage.prototype.isRememberMeChecked = async function () {
  return this.app.client.isSelected(this.rememberMeCheckbox)
}

LoginPage.prototype.getElementText = async function (selector) {
  await this.app.client.getValue(selector)
}

LoginPage.prototype.verifyMessagesMatch = async function (selector, errMessage) {
  let elementValue = await this.getElementText(this.`${selector}`)

  if (elementValue !== errMessage) {
    throw new Error('Messages do not match!')
  }
}

module.exports = LoginPage
