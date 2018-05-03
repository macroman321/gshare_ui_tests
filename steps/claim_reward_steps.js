//
// FILE NAME: claim_reward_steps.rb
// DESCRIPTION: claim_reward STEPS
// Step definitions for claim_reward.feature
// AUTHOR: Dimitrije Dragasevic (DD)
// CREATED: 20-Apr-18
// NOTES:
//

const defineSupportCode = require('cucumber').defineSupportCode;

// increased timeout
const {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(500 * 1000);

defineSupportCode(function ({Given, Then, When}) {
  When('If there is a claimable balance I should be able to claim it', async function () {
    await this.client.mainPage.claimBalanceCheck();
  });

  Then('I should see my current balance increase', async function () {
    await this.client.mainPage.checkBalanceIncrease();
  });

  When('the balance is below the required threshold', async function () {
    await this.client.mainPage.checkForBalanceRequirement();
  });

  Then('I will not be able to claim it', async function () {
    await this.client.mainPage.balanceNotClaimable();
  });
});

