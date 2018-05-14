//
// FILE NAME: profile_steps.rb
// DESCRIPTION: profile STEPS
// Step definitions for profile.feature
// AUTHOR: Milan Šubarević (MŠ)
// CREATED: 10-Apr-18
// NOTES:
//

const defineSupportCode = require('cucumber').defineSupportCode;

// increased timeout
const {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

defineSupportCode(function ({Given, Then, When}) {
  When('I click on my profile', async function () {
    await this.client.mainPage.clickAccountMenu();
  });

  Then('I should see the appropriate amount displayed for the selected currency', async function () {
    await this.client.mainPage.verifyCurrencyList();
  });
});
