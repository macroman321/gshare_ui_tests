const defineSupportCode = require('cucumber').defineSupportCode;

defineSupportCode(function ({Given, Then, When}) {

    When('I click on the My Games tab', async function () {

        await this.client.mainPage.clickMyGamesTab();

    });

    Then('I should see all my purchased games displayed', async function (){

        await this.client.mainPage.checkTheGamesList();

    });

});