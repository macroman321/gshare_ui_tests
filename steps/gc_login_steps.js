const defineSupportCode = require('cucumber').defineSupportCode;
const Application = require('spectron').Application;
const assert = require('assert');

const TestData = require('../support/util/test_data');

//on login page elements
const emailField = '[name="email"]';
const passwordField = '[name="password"]';
const loginButton = '[type="submit"]';

defineSupportCode(function ({ Given, Then, When }) {
  When("I start GameClient", async function () {
    this.logger.debug(`***** start app *${this.client}*`);
    this.app = new Application({
      path: this.client,
    });
    await this.app.start();
  });

  Then("I should see GameClient app open", async function () {
    this.logger.debug('***** check if app is open');
    assert.notEqual(this.app, undefined, 'app is undfined!');
  });

  When('I enter credentials for the user {string}', async function (user_id) {
    const user = TestData.get_user(user_id);
    this.logger.debug(`user = ${JSON.stringify(user)}`);
    await this.app.client
      .waitForExist(emailField)
      .hasFocus(emailField)
      .setValue(emailField, user.email)
      .element(passwordField).hasFocus()
      .setValue(passwordField, user.password)
      .element(loginButton).click();
  });

  Then("I should see the user is logged in", async function () {
    await this.app.client.waitForExist('[id="portalTabs-tab-1"]', 30000);
  });
});
