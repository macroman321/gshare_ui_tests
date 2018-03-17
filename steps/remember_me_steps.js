const defineSupportCode = require('cucumber').defineSupportCode;
const Application = require('spectron').Application;
const assert = require('assert');

// increased timeout
const {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

// scenario elements
const rememberMeCheckbox = '.gc-checkbox';
const emailField = '[name="email"]';
const passwordField = '[name="password"]';
const loginButton = 'button*=Войти';
const mainHeader = '.gc-header';
const closeButton = 'button[id="window-close"]';
const accountMenu = '[class="gc-avatar"]';
const logoutButton = '[class="gc-profile-settings__link gc-profile-settings__link--signout"]';

defineSupportCode(function ({Given, Then, When}) {
    When('I click on the Remember me checkbox', async function () {
        const rememberMeCheckboxBoolean = await this.app.client.isExisting(rememberMeCheckbox);

        if (rememberMeCheckboxBoolean === false) {
            await this.app.client
                .waitForExist('[id=portalTabs-tab-1]', 50000)
                .element(accountMenu).click()
                .waitForVisible(logoutButton, 50000)
                .element(logoutButton).click();
            if (await this.app.client.isExisting(logoutButton) === true) {
                await this.app.client
                    .element(logoutButton).click();
            }
            await this.app.client
                .waitForVisible(rememberMeCheckbox, 50000)
                .element(rememberMeCheckbox).click();
        }
        else {
            await this.app.client
                .element(rememberMeCheckbox).click();
        }
    });

    Then('I should see that I have been successfully logged in', async function () {
        await this.app.client
            .waitForVisible(mainHeader, 50000)
    });

    When('I press the Quit button', async function () {
        await this.app.client
            .element(closeButton).click();
    });

    When('I log out of the application', async function () {
        await this.app.client
            .element(accountMenu).click()
            .waitForVisible(logoutButton, 50000)
            .element(logoutButton).click();
        if (await this.app.client.isExisting(logoutButton) === true) {
            await this.app.client
                .element(logoutButton).click();
        }
        await this.app.client
            .waitForExist(emailField, 50000);
    });
});