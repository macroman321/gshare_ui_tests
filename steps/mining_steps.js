//
// FILE NAME: mining_steps.js
// DESCRIPTION: mining STEPS
// Step definitions for mining.feature
// AUTHOR: Milan Šubarević (MŠ)
// CREATED: 26-Sep-18
// NOTES:
//

const defineSupportCode = require('cucumber').defineSupportCode

defineSupportCode(function ({Given, Then, When}) {
  When('I click on the Start button', async function () {
    await this.page.mainPage.startMining()
  })

  When('I enter the settings menu', async function () {
    await this.page.mainPage.enterSettingsMenu()
  })

  When('I enable workers', async function () {
    await this.page.mainPage.enableWorkers()
  })

  Then('I should see miner has started mining', async function () {
    await this.page.mainPage.verifyMinerIsWorking()
  })

  When('I click on the Stop button', async function () {
    await this.page.mainPage.startMining()
  })

  Then('I should see miner has stopped mining', async function () {
    await this.page.mainPage.verifyMinerIsStopped()
  })
})
