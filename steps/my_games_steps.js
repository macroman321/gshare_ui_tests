//
// FILE NAME: my_games_steps.rb
// DESCRIPTION: my_games STEPS
// Step definitions for my_games.feature
// AUTHOR: Ivan Babić (IB)
// CREATED: 10-Apr-18
// NOTES:
//

const defineSupportCode = require('cucumber').defineSupportCode;

defineSupportCode(function ({Given, Then, When}) {

  When('I click on the My Games tab', async function () {
    await this.client.mainPage.clickMyGamesTab();
  });

  Then('I should see no games displayed', async function () {
    await this.client.mainPage.checkTheEmptyGamesList();
  });

  Then('I should see my games displayed', async function () {
    await this.client.mainPage.checkTheGamesList();
  });
});
