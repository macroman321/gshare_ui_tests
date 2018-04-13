const defineSupportCode = require('cucumber').defineSupportCode;
const assert = require('assert');
const TestData = require('../support/util/test_data');

defineSupportCode(function ({ Given, Then, When }) {
  var countOne = 0;

When('I click on My Games', async function() {
    await this.client.mainPage.clickMyGames();
  });

  When('I click on Store', async function() {
    await this.client.mainPage.clickOnStore();

    const firstCount = await this.app.client.elements('[class="gc-game-card"]');
    
    for(var element in firstCount.value) {
      countOne += 1;
    }
    console.log(`first = ${countOne}`);
  });

  When('I click on a game that I want to buy', async function() {
    await this.client.mainPage.clickForBuy();
  });

  When('I click on Buy button', async function() {
    await this.client.mainPage.clickOnBuyButton();
  });

  When('I click on button Go to My Games', async function() {
    await this.client.mainPage.clickGoToMyGames();
  });

  Then('I should see the game in the list of bought games', async function() {
    await this.client.mainPage.showBuyedGames();

    const secondCount = await this.app.client.elements('[class="gc-game-card"]');
    var countTwo = 0

    for(var element in secondCount.value) {
      countTwo += 1;
    }
    console.log(`second = ${countTwo}`);

    if (countTwo > countOne) {
      return true;
    } else {
      return false;
    }
  });

  Then('I should see message that I can not purchase a Game', async function() {
    await this.client.mainPage.purchaseFailed();
  });

}); 