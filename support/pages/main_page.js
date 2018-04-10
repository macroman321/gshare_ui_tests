// main_page.js
const Page = require('./page');

function MainPage(app) {
    Page.call(this, app);

    this.storeTab = '[id="portalTabs-tab-1"]';
    this.myGamesTab = '[id="portalTabs-tab-2"]';
    this.accountMenu = '[class="gc-avatar"]';
    this.logoutButton = '[class="gc-profile-settings__link gc-profile-settings__link--signout"]';
    this.closeButton = 'button[id="window-close"]';
    this.startMining = '[class="gc-pill gc-pill--icon"]';
    this.claimReward = 'button[class="gc-pill gc-pill--active"]';
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

MainPage.prototype.claimBalanceCheck = async function () {
    const client = this.app.client;
    let availabebutton = await client.isEnabled(this.claimReward);
    if (availabebutton == true) {
        await client.element(this.claimReward).click();
    }
    if (availabebutton == false) {
        await this.client
            .waitForEnabled(this.startMining, 400000)
            .element(this.startMining).click()
            .waitForEnabled(this.claimReward, 9999999)
            .element(this.claimReward).click();
    }
};

MainPage.prototype.startMining = async function () {
    const client = this.app.client;
    await client.waitForEnabled(this.startMining, 400000).element(this.startMining).click();
};


MainPage.prototype.checkBalanceIncrease = async function (){
    const client = this.app.client;


};



module.exports = MainPage;