//
// FILE NAME: profile_steps.js
// DESCRIPTION: profile STEPS
// Step definitions for profile.feature
// AUTHOR: Milan Šubarević (MŠ)
// CREATED: 5-Oct-18
// NOTES:
//

const defineSupportCode = require('cucumber').defineSupportCode

defineSupportCode(function ({Given, Then, When}) {
  When('I click on my profile', async function () {
    await this.page.mainPage.clickProfileButton()
  })

  Then('I should see all the options I can interact with in the Profile menu', async function () {
    await this.page.mainPage.verifyProfileElements()
  })
})
