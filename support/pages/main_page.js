// main_page.js
const Page = require('./page');
const {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(5000 * 1000);


function MainPage(app) {
    Page.call(this, app);

    this.storeTab = '[id="portalTabs-tab-1"]';
    this.accountMenu = '[class="gc-avatar"]';
    this.logoutButton = '[class="gc-profile-settings__link gc-profile-settings__link--signout"]';
    this.closeButton = 'button[id="window-close"]';
    this.startMiningButton = '[class="gc-pill gc-pill--icon"]';
    this.claimReward = 'button[class="gc-pill gc-pill--active"]';
    this.miningBalance = '[class = "gc-balance gc-balance--active"]';
    this.currrentBalance = '[class="gc-balance__amount"]';
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


//I think this should be executed on stage env only
MainPage.prototype.claimBalanceCheck = async function () {
    const client = this.app.client;
    let miningBalance = await client.getText(this.miningBalance);
    let currentBalance = await client.getText(this.currrentBalance);

    //let currentBalanceIndex = await client.selectByIndex(this.currrentBalance,2);
    console.log(parseInt(currentBalance)[1]);
    console.log(miningBalance);

    let availableClaimButton = await client.isEnabled(this.claimReward);
    if (availableClaimButton === true) {
        await client.element(this.claimReward).click();
    }
    else {
        let availableStartMining = await  client.waitForEnabled(this.startMiningButton, 30000);
        console.log('********', availableStartMining);
        if (availableStartMining === false) {
            throw new Error('Start mining button is not available');
        }
        else {
            await client
                .waitForEnabled(this.startMiningButton, 400000)
                .element(this.startMiningButton).click()
                .waitForEnabled(this.claimReward, 9999999)
                .element(this.claimReward).click();
        }
    }
};

MainPage.prototype.startMining = async function () {
    const client = this.app.client;
    await client.waitForEnabled(this.startMining, 400000).element(this.startMining).click();
};


MainPage.prototype.checkBalanceIncrease = async function () {
    const client = this.app.client;
    let miningBalance = await client.getText(this.miningBalance);
    let currentBalance = await client.getText(this.miningBalance);
    console.log(miningBalance);
    console.log(currentBalance);
    const total = miningBalance + currentBalance;

    if (total > currentBalanceIndex) {
        console.log('Balance claimed successfully');
    }
    else {
        throw new Error("Balance was not claimed successfully ");
    }
};

module.exports = MainPage;