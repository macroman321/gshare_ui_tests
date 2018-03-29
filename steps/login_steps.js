// login_steps.js
const defineSupportCode = require('cucumber').defineSupportCode;
const assert = require('assert');
const TestData = require('../support/util/test_data');

defineSupportCode(function ({ Given, Then, When }) {
  When("I start GameClient", async function () {
    const result = await this.client.loginPage.startClient();
    this.logger.debug(`Start GameClient result: ${result}`);
  });

  Then("I should see GameClient app open", async function () {
    this.logger.debug('***** check if app is open');
    assert.notEqual(this.app, undefined, 'app is undefined!');
  });

  When('I enter credentials for the user {string}', async function (user_id) {
    const user = TestData.get_user(user_id);
    this.logger.debug(`user = ${JSON.stringify(user)}`);
    await this.client.loginPage.login(user);
  });

  Then("I should see the user is logged in", async function () {
    await this.client.mainPage.isOpen();
  });
});
