// main_page.js
const Page = require('./page');

function MainPage(app) {
  Page.call(this, app);

  this.storeTab = '[id="portalTabs-tab-1"]';
  this.myGamesTab = '[id="portalTabs-tab-2"]';
  this.accountMenu = '[class="gc-avatar"]';
  this.logoutButton = '[class="gc-profile-settings__link gc-profile-settings__link--signout"]';
  this.closeButton = 'button[id="window-close"]';
  this.gameIcon = '[class="gc-game-card"]';
  this.clickGame = 'button[class="gc-button gc-button--primary"]';
  this.buyGameButton = 'button[class="gc-button gc-button--primary gc-button--full gc-button--large"]';
  this.buyButton = 'button[class="gc-button gc-button--primary gc-button--full gc-button--large"]';
  this.buttonGoToMyGames = 'button[class="gc-button gc-button--secondary gc-button--full"]';
  this.pane2 = '[id=portalTabs-pane-2]';
  this.msgPurchaseFailed = '[class="gc-game-card__cover-overlay__insufficient-funds"]';
  this.cancelPurchase = 'button[class="gc-button gc-button--flat gc-button--large gc-buy-game-card__cancel-btn"]';
  this.cancelButtonAfterPurchase = '[class="gc-button gc-button--flat gc-buy-game-card__cancel-btn"]';
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

MainPage.prototype.clickMyGames = async function() {
  await this.app.client.click(this.myGamesTab);
  await this.app.client.waitForExist(this.gameIcon);
};

MainPage.prototype.clickOnStore = async function() {
  await this.app.client.click(this.storeTab);
  await this.app.client.waitForExist(this.gameIcon);
};

MainPage.prototype.showBuyedGames = async function() {
  await this.app.client.waitForVisible(this.pane2, 10000);
  await this.app.client.waitForVisible(this.gameIcon);
};

MainPage.prototype.clickForBuy = async function() {
  await this.app.client.waitForExist(this.clickGame);
  await this.app.client.moveToObject(this.clickGame);
  await this.app.client.waitForExist(this.clickGame);
  await this.app.client.click(this.clickGame);
  await this.app.client.waitForExist(this.buyGameButton);
}

MainPage.prototype.clickOnBuyButton = async function() {
  await this.app.client.click(this.buyGameButton);
  try {
    await this.app.client.waitForExist(this.goToMyGames);
    return true;
  } catch(_) {
    return false;
  }
};

MainPage.prototype.clickGoToMyGames = async function() {
  await this.app.client.waitForVisible(this.buttonGoToMyGames, 15000);
  await this.app.client.click(this.buttonGoToMyGames);
};

MainPage.prototype.purchaseFailed = async function() {
  await this.app.client.moveToObject(this.gameIcon, 5000);
  await this.app.client.waitForVisible(this.msgPurchaseFailed, 5000);
};

MainPage.prototype.clickCancelButton = async function() {
  await this.app.client.click(this.cancelPurchase);
  await this.app.client.waitForExist(this.myGamesTab, 30000);
};

MainPage.prototype.avoidGoToMyGamesButton = async function() {
  await this.app.client.waitForVisible(this.cancelButtonAfterPurchase, 30000);
  await this.app.client.click(this.cancelButtonAfterPurchase)
};

module.exports = MainPage;
