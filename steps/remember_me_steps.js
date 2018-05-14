//
// FILE NAME: remember_me_steps.rb
// DESCRIPTION: remember_me STEPS
// Step definitions for remember_me.feature
// AUTHOR: Milan Šubarević (MŠ)
// CREATED: 10-Apr-18
// NOTES:
//

const defineSupportCode = require('cucumber').defineSupportCode;
const assert = require('assert');

// Increased timeout
const {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

defineSupportCode(function ({Given, Then, When}) {
  When('I ensure the Remember me is checked', async function () {
    await this.client.loginPage.verifyRememberMeIsChecked();
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
