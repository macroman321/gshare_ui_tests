const defineSupportCode = require('cucumber').defineSupportCode;
const assert = require('assert');
const TestData = require('../support/util/test_data');
const util = require('../support/util/util')

defineSupportCode(function ({ Given, Then, When }) {

  var countOne = 0;
  When('I click on My Games', async function() {
    await this.client.mainPage.clickMyGames();
    await util.sleep(1000)
    const firstCount = await this.app.client.elements('#portalTabs-pane-2 .gc-game-card');
        
    for(var element in firstCount.value) {
      countOne += 1;
    }
    console.log(`first = ${countOne}`);
  });

  When('I click on Store', async function() {
    await this.client.mainPage.clickOnStore();
  });

  When('I click on a game that I want to buy', async function() {
    await util.sleep(1000)
    await this.client.mainPage.clickForBuy();
  });

  When('I click on Buy button', async function() {
    await this.client.mainPage.clickOnBuyButton();
  });

  When('I click on button Go to My Games', async function() {
    await this.client.mainPage.clickGoToMyGames();
  });

  Then('I should see that My Games has icreased by one game', async function() {
    await this.client.mainPage.showBuyedGames();
  
    const secondCount = await this.app.client.elements('#portalTabs-pane-2 .gc-game-card');
    var countTwo = 0;

    for(var element in secondCount.value) {
      countTwo += 1;
    }
    console.log(`second = ${countTwo}`);

    if (countTwo > countOne) {
      console.log("Game purchased successfully.")
    } else {
      throw new Error("Total number of games didn't increase.")
    }
  });

  When('I should see message that I can not purchase a Game', async function() {
    await this.client.mainPage.purchaseFailed();
  });

  Then('I should click on Cancel button', async function() {
    await this.client.mainPage.clickCancelButton();
  });

  Then('I should avoid Go To My Games button, and click on Cancel button', async function() {
    await this.client.mainPage.avoidGoToMyGamesButton();
  });

}); 