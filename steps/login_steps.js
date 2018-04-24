// login_steps.js
const defineSupportCode = require('cucumber').defineSupportCode;
const assert = require('assert');
const TestData = require('../support/util/test_data');

defineSupportCode(function ({Given, Then, When}) {
  When("I start GameClient", async function () {
    await this.client.loginPage.startClient();
  });

  Then("I should see GameClient app open", async function () {
    this.logger.debug('***** check if app is open');
    assert.notEqual(this.app, undefined, 'app is undefined!');
  });

  When('I enter email of the user {string} and password {string}', async function (user_id, password) {
    const user = TestData.get_user(user_id);
    user.password = password;

    if ((await this.client.loginPage.isOpen()) === false) {
      await this.client.mainPage.logout();
    }

    try {
      await this.client.loginPage.uncheckRememberMe();
      await this.client.loginPage.login(user);
    } catch (error) {
      await this.client.loginPage.handleError(error);
    }
  });

  When('I enter credentials for the user {string}', async function (user_id) {
    const user = TestData.get_user(user_id);
    this.logger.debug(`user = ${JSON.stringify(user)}`);
    if ((await this.client.loginPage.isOpen()) === false) {
      await this.client.mainPage.logout();
    }
    await this.client.loginPage.loginWithoutRememberMe(user);
  });

  When('I log in as user {string}', async function (user_id) {
    await this.client.loginPage.startClient();
    const user = TestData.get_user(user_id);
    this.logger.debug(`user = ${JSON.stringify(user)}`);
    if ((await this.client.loginPage.isOpen()) === false) {
      await this.client.mainPage.logout();
    }
    await this.client.loginPage.loginWithoutRememberMe(user);
    await this.client.mainPage.isOpen();
  });

  Then("I should see the user is logged in", async function () {
    await this.client.mainPage.isOpen();
  });

  Then("I should see login has failed with {string}", async function (message) {
    await this.client.loginPage.verifyFailedLoginMessage(message);
  })
});
