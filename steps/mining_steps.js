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
    await this.mainPage.startMining()
  })

  Then('I should see miner has started mining', async function () {
    await this.mainPage.verifyMinerIsWorking()
  })

  When('I click on the Stop button', async function () {
    await this.mainPage.startMining()
  })

  Then('I should see miner has stopped mining', async function () {
    await this.mainPage.verifyMinerIsStopped()
  })
})
