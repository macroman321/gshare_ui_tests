// remember_me_steps.js
const defineSupportCode = require('cucumber').defineSupportCode;
const Application = require('spectron').Application;
const assert = require('assert');

// increased timeout
const {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

defineSupportCode(function ({Given, Then, When}) {
  When('I click on the Remember me checkbox', async function () {
    const isMainOpen = await this.client.mainPage.isOpen();
    if (isMainOpen) {
      await this.client.mainPage.logout();
    }
  });

  When('I press the Quit button', async function () {
    await this.client.mainPage.close();
  });

  When('I log out of the application', async function () {
    await this.client.mainPage.logout();
    const isLoginOpen = await this.client.loginPage.isOpen();
    assert(isLoginOpen, 'Login page is not open!')
  });
});
