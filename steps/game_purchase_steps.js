const defineSupportCode = require('cucumber').defineSupportCode;
const assert = require('assert');
const TestData = require('../support/util/test_data');
const util = require('../support/util/util')

defineSupportCode(function ({ Given, Then, When }) {

  var countOne = 0;
  When('I click on My Games', async function() {
    await this.client.mainPage.clickMyGames();
    await this.app.client.waitForExist('#portalTabs-pane-2 .gc-game-card');
    const firstCount = await this.app.client.elements('#portalTabs-pane-2 .gc-game-card');
        
    for(var element in firstCount.value) {
      countOne += 1;
    }
    this.logger.debug(`first = ${countOne}`);
  });

  When('I click on Store', async function() {
    await this.client.mainPage.clickOnStore();
  });

  When('I click on a game that I want to buy', async function() {
    await this.app.client.waitForExist('button[class="gc-button gc-button--primary"]');
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
    this.logger.debug(`second = ${countTwo}`);

    if (countTwo > countOne) {
      this.logger.debug("Game purchased successfully.")
    } else {
      throw new Error("Total number of games didn't increase.")
    }
  });

  Then('I should see message that I can not purchase a Game', async function() {
    await this.client.mainPage.purchaseFailed();
  });

  Then('I should click on Cancel button', async function() {
    await this.client.mainPage.clickCancelButton();
  });

  When('I click on Cancel button', async function() {
    await this.client.mainPage.cancelButton();
  });

  Then('I should see that button goToMyGames does not exist no more', async function() {
    await this.app.client.waitForExist('button[class="gc-button gc-button--secondary gc-button--full"]', 1000, true);
    await this.client.mainPage.gameList();
  });

}); 