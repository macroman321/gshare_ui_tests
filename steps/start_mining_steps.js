const defineSupportCode = require('cucumber').defineSupportCode;
const Application = require('spectron').Application;
const assert = require('assert');

defineSupportCode(function ({Given, Then, When}) {

    When('I click on the Start button', async function () {
        await  this.client.mainPage.startMining();
    });

    Then('I should see the application has started to successfully work', async function () {
        await  this.client.mainPage.isMinerWorking();
    });


    When('I click on the Stop button',async function () {
        await this.client.mainPage.startMining();
    });

    Then('I should see that the application has stopped mining',async function(){
        await this.client.mainPage.isMinerWorking();
    })

});


