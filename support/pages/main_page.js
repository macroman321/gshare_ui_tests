// login_page.js
const Page = require('./page');

function MainPage() {
  this.storeTab = '[id="portalTabs-tab-1"]';
  this.myGamesTab = '[id="portalTabs-tab-2"]';
}

// inherit everything from Page
MainPage.prototype = Object.create(Page.prototype);

module.exports = new MainPage();
