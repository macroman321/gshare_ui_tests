// main_page.js
const Page = require('./page');

function MainPage(app) {
    Page.call(this, app);

    this.storeTab = '[id="portalTabs-tab-1"]';
    this.myGamesTab = '[id="portalTabs-tab-2"]';
    this.accountMenu = '[class="gc-avatar"]';
    this.logoutButton = '[class="gc-profile-settings__link gc-profile-settings__link--signout"]';
    this.closeButton = 'button[id="window-close"]';
    this.currencyList = '[class = "gc-profile-settings__balance"]';
    this.minerWorkingText = '[class="gc-balance__text"]';
    this.startMiningButton = '[class="gc-pill gc-pill--icon"]';
}

// inherit everything from Page
MainPage.prototype = Object.create(Page.prototype);

MainPage.prototype.isOpen = async function () {
    try {
        await this.app.client.waitForExist(this.storeTab);
        return true;
    } catch (_) {
        return false;
    }
};

MainPage.prototype.logout = async function () {
    const client = this.app.client;

    await client.waitForVisible(this.accountMenu);
    await client.click(this.accountMenu);
    await this.clickLogoutButton();
};

MainPage.prototype.close = async function () {
    await this.app.client.click(this.closeButton);
};

// Logout button click is unreliable, therefore this function
MainPage.prototype.clickLogoutButton = async function () {
    const client = this.app.client;

    await client.waitForVisible(this.logoutButton);
    await client.click(this.logoutButton);

    const t = Date.now();
    let logoutExists = await client.isExisting(this.logoutButton);
    while (logoutExists) {
        await client.click(this.logoutButton);
        logoutExists = await client.isExisting(this.logoutButton);

        if (Date.now() - t > 30) {
            break;
        }
    }
};

MainPage.prototype.clickAccountMenu = async function () {
    const client = this.app.client;

    await client.waitForVisible(this.accountMenu);
    await client.click(this.accountMenu);
};

MainPage.prototype.verifyCurrencyList = async function () {
    const client = this.app.client;

    await client.waitForVisible(this.currencyList);
};

MainPage.prototype.startMining = async function () {
    const client = this.app.client;
    await client.waitForEnabled(this.startMiningButton, 400000).element(this.startMiningButton).click();
};

MainPage.prototype.isMinerWorking = async function () {
    const clinet = this.app.client;
    await clinet.isExisting(this.minerWorkingText);


};

module.exports = MainPage;
