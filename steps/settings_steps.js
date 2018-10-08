//
// FILE NAME: settings_steps.js
// DESCRIPTION: settings STEPS
// Step definitions for settings.feature
// AUTHOR: Milan Šubarević (MŠ)
// CREATED: 20-Sep-18
// NOTES:
//

const defineSupportCode = require('cucumber').defineSupportCode

defineSupportCode(function ({Given, Then, When}) {
  When('I click the Check for updates button', async function () {
    await this.page.mainPage.clickCheckForUpdatesButton()
  })

  Then('I should see the message {string}', async function (message) {
    await this.page.mainPage.verifyAppUpToDateMessage(message)
  })
})
