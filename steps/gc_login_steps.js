const defineSupportCode = require('cucumber').defineSupportCode;
const Application = require('spectron').Application;
const assert = require('assert');

//on login page elements 
const emailField = '[name="email"]';
const passwordField = '[name="password"]';
const loginButton = 'button=Log In';

defineSupportCode(function ({ Given, Then, When }) {
  When('I start GameClient', async function () {
    console.log('***** start app');
    this.app = new Application({
      path: 'C:\\Program Files\\GameCredits\\Client\\0.7\\gc-client.exe',
    });
    await this.app.start();
  });

  Then('I should see GameClient app open', async function () {
    console.log('***** check if app is open');
    assert.notEqual(this.app, undefined, 'app is undfined!');
  });

  When('I enter email {string} and password {string}', async function (email, password) {

    await this.app.client
      .waitUntilTextExists('h3', 'Sign in')
      .element(emailField).hasFocus()
      .setValue(emailField, email)
      .element(passwordField).hasFocus()
      .setValue(passwordField, password)
      .element(loginButton).click();
  });

  Then('I should see the user is logged in', async function () {
    await this.app.client.waitUntilTextExists('button', 'Buy Games', 30000);
  });
});
