const defineSupportCode = require('cucumber').defineSupportCode;
const Application = require('spectron').Application;
const assert = require('assert');

const {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

defineSupportCode(function ({Given, Then, When}) {

    When('If there is a claimable balance I should be able to claim it', async function () {
        await this.client.mainPage.claimBalanceCheck();
    });

    Then('I should see my current balance increase', async function () {
        await this.client

    });

});