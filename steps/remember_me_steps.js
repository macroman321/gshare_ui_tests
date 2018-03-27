const defineSupportCode = require('cucumber').defineSupportCode;
const Application = require('spectron').Application;
const assert = require('assert');

const LoginPage = require('../support/pages/login_page');
const mainPage = require('../support/pages/main_page');

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
        // if main screen is open, log out
        // click on remember me checkbox
        if (mainPage.isOpen()) {
            
        }
        const rememberMeCheckboxBoolean = 
            await this.app.client.waitForExist(rememberMeCheckbox);
        this.logger.debug(`remember checkbox: ${rememberMeCheckboxBoolean}`);
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