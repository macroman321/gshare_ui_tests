//
// FILE NAME: remember_me_steps.js
// DESCRIPTION: remember_me STEPS
// Step definitions for remember_me.feature
// AUTHOR: Milan Šubarević (MŠ)
// CREATED: 20-Sep-18
// NOTES:
//

const defineSupportCode = require('cucumber').defineSupportCode

defineSupportCode(function ({Given, Then, When}) {
  When('I press the Quit button', async function () {
    await this.page.mainPage.quitApplication()
  })
})
