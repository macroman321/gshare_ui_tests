const Page = require('./page')
// Increase default test timeout duration for Cucumber
const {setDefaultTimeout} = require('cucumber')
setDefaultTimeout(5000 * 1000)

// Custom timeouts
const shortTimeout = 5000
const mediumTimeout = 10000

function MainPage (app) {
  Page.call(this, app)

  // Please follow this syntax when defining elements:
  // nameType
  // Examples:
  // loginButton, emailTextField etc.

  this.miningButton = '[class="gc-button gc-button--full gc-button--large gc-pocket-miner__miner-control"]'
  this.profileButton = '[class="gc-pill gc-pill--icon gc-pill--flat"]'
  this.signOutButton = '[class="gc-profile-settings__link gc-profile-settings__link--signout"]'
  this.dropdownMenuButton = '[class="gc-dropdown gc-dropdown--icon gc-dropdown--right-toggle btn"]'
}

// Inherit everything from Page
MainPage.prototype = Object.create(Page.prototype)

// Main functions
MainPage.prototype.logout = async function () {
  console.log('**************************')
  await this.clickProfileButton()
  await this.clickSignOutButton()
}

// Utility functions
MainPage.prototype.isMainPageOpened = async function () {
  await this.app.client.waitForVisible(this.miningButton)
}

MainPage.prototype.clickProfileButton = async function () {
  await this.app.client
    .waitForVisible(this.profileButton, mediumTimeout)
    .click(this.profileButton)
}

MainPage.prototype.clickSignOutButton = async function () {
  await this.app.client
    .waitForVisible(this.signOutButton, mediumTimeout)
    .click(this.signOutButton)
}

MainPage.prototype.clickDropdownMenuButton = async function () {
  await this.app.client
    .waitForVisible(this.dropdownMenuButton, mediumTimeout)
    .click(this.dropdownMenuButton)
}

module.exports = MainPage
