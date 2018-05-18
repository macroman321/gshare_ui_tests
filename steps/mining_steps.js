//
// FILE NAME: claim_reward_steps.rb
// DESCRIPTION: claim_reward STEPS
// Step definitions for claim_reward.feature
// AUTHOR: Dimitrije Dragasevic (DD)
// CREATED: 20-Apr-18
// NOTES:
//

const defineSupportCode = require('cucumber').defineSupportCode;

defineSupportCode(function ({Given, Then, When}) {
  When('I click on the Start button', async function () {
    await  this.client.mainPage.startMining()
  });

  Then('I should see the application has started to successfully work', async function () {
    await  this.client.mainPage.minerWorking()
  });

  When('I click on the Pause button', async function () {
    await this.client.mainPage.startMining()
  });

  Then('I should see that the application has stopped mining', async function () {
    await this.client.mainPage.minerStopped()
  })
});
