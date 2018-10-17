const Page = require('./page')
const TestData = require('../util/test_data')
// Increase default test timeout duration for Cucumber
const {setDefaultTimeout} = require('cucumber')
setDefaultTimeout(5000 * 1000)

// Custom timeouts
const shortTimeout = 5000
const mediumTimeout = 10000

function MainPage (world) {
  Page.call(this, world)

  // Please follow this syntax when defining elements:
  // nameType
  // Examples:
  // loginButton, emailTextField etc.

  this.miningButton = '[class="gc-button gc-button--full gc-button--large gc-pocket-miner__miner-control"]'
  // this.profileButton = '[class="gc-pill gc-pill--icon gc-pill--flat"]'
  this.profileUsernameLabel = '[class="gc-label gc-profile-settings__user-info--username"]'
  this.profileSignOutButton = '[class="gc-profile-settings__link gc-profile-settings__link--signout"]'
  this.profileLanguageDropDown = '[class="gc-dropdown-toggle btn btn-default"]'
  this.profileAccountSettingsLink = '[class="gc-profile-settings__link gc-profile-settings__link--accounts"]'
  this.profileFAQLink = '[class="gc-profile-settings__link gc-profile-settings__link--faq"]'
  this.profileDiscordLink = '[class="gc-profile-settings__link gc-profile-settings__link--discord"]'
  this.dropdownMenuButton = '[class="gc-dropdown gc-dropdown--icon gc-dropdown--right btn-group"]'
  this.cpuGpuSettingsSwitch = '[class="gc-form__group gc-form__group--inline gc-form__group--switch"]'
  this.cpuGpuSettingsSlider = '[class="gc-slider__body"]'
  this.checkForUpdatesButton = '[class="gc-button gc-button--full gc-button--large"]'
  this.checkForUpdatesMessageNoUpdateParagraph = '[class="gc-settings-section__about--message"]'
  this.preventBatteryDrainCheckBox = '[name="batterySaver"]'
  this.settingsMenuApplicationOptions = '[class="gc-form__group gc-form__group--switch"]'

  // TODO: These selectors are temporary until I figure out how to pass the name selector (regular way doesn't work)
  this.signOutMenuButton = '=Sign out'
  this.settingsMenuButton = '=Settings'
  this.quitMenuButton = '=Quit'
}

// Inherit everything from Page
MainPage.prototype = Object.create(Page.prototype)

// Main functions
MainPage.prototype.logout = async function () {
  await this.clickDropdownMenuButton()
  await this.clickSignOutButtonInDropdownMenu()
}

MainPage.prototype.enterSettingsMenu = async function () {
  await this.clickDropdownMenuButton()
  await this.clickOnSettingsInDropdownMenu()
}

MainPage.prototype.verifyAppUpToDateMessage = async function (message) {
  let client = this.app.client
  await client.waitForExist(this.checkForUpdatesMessageNoUpdateParagraph, 2000)
  let getTextFromElement = await client.getText(this.checkForUpdatesMessageNoUpdateParagraph)

  if (getTextFromElement !== message) {
    throw new Error('Provided messages do no match!')
  }
}

MainPage.prototype.quitApplication = async function () {
  await this.clickDropdownMenuButton()
  await this.clickQuitButton()
}

MainPage.prototype.enableWorkers = async function () {
  if ((await this.preventBatteryDrainStatus() === 'true')) {
    await this.clickPreventBatteryDrainCheckBox()
  }

  // Element IDs for turning on/off CPU and GPU mining

  // let element = await this.app.client.elements(this.cpuGpuSettingsSwitch)
  // console.log(element)
  //
  // let gpuSwitchElementID = await this.findElementID('gc-form__group gc-form__group--inline gc-form__group--switch', 0)
  // console.log(gpuSwitchElementID)
  // let cpuSwitchElementID = await this.findElementID('gc-form__group gc-form__group--inline gc-form__group--switch', 1)
  // console.log(cpuSwitchElementID)

  // Element IDs for setting CPU and GPU load and setting random values
  // let gpuSliderElementID = await this.findElementID(this.cpuGpuSettingsSlider, 0)
  // let cpuSliderElementID = await this.findElementID(this.cpuGpuSettingsSlider, 1)
  // let gpuSliderRandomValueSetting = await this.randomNumberGenerator(8, 25)
  // let cpuSliderRandomValueSetting = await this.randomNumberGenerator(0, 8)

  // Slider location coordinates for CPU and GPU within the application
  // Necessary because there are no unique selectors we can use to scroll
  // to the element so we have get their coordinates via Element ID
  // let gpuSliderLocation = await this.app.client.elementIdLocation(gpuSliderElementID)
  // let cpuSliderLocation = await this.app.client.elementIdLocation(cpuSliderElementID)
  // let cpuSliderCoordinates = Object.values(cpuSliderLocation)
  // console.log(cpuSliderCoordinates)

  // TODO: Continue here when you come back to do mining.feature
  // await this.app.client
  //   .elementIdClick(gpuSwitchElementID)
  //   .scroll(gpuSliderLocation)
  //   .elementIdValue(gpuSliderElementID, [gpuSliderRandomValueSetting]) // value parameter has to be an array
  //   .elementIdClick(cpuSwitchElementID)
  //   .scroll(cpuSliderLocation)
  //   .elementIdValue(cpuSliderElementID, [cpuSliderRandomValueSetting]) // value parameter has to be an array
}

MainPage.prototype.startMining = async function () {
  await this.clickMiningButton()
}

MainPage.prototype.verifyMinerIsWorking = async function () {
  if ((await this.minerStatus() === 'false')) {
    throw new Error('Miner is not working when it should!')
  }
}

MainPage.prototype.verifyMinerIsStopped = async function () {
  if ((await this.minerStatus() === 'true')) {
    throw new Error('Miner is working when it should not!')
  }
}

MainPage.prototype.verifyMinerElements = async function () {
  await this.app.client
    .waitForVisible(this.settingsMenuApplicationOptions, mediumTimeout)
    .waitForVisible(this.checkForUpdatesButton, mediumTimeout)
    .waitForVisible(this.cpuGpuSettingsSwitch, mediumTimeout)

  let settingsMenuApplicationsOptionsElements = await this.app.client.elements(this.settingsMenuApplicationOptions)
  let settingsMenuApplicationsOptionsCount = settingsMenuApplicationsOptionsElements.value.length

  if (settingsMenuApplicationsOptionsCount !== 4) {
    throw new Error('Not all options elements are present and visible!')
  }
}

// Utility functions
MainPage.prototype.isMainPageOpened = async function () {
  await this.app.client.waitForVisible(this.miningButton)
}

// MainPage.prototype.clickProfileButton = async function () {
//   await this.app.client
//     .waitForVisible(this.profileButton, mediumTimeout)
//     .click(this.profileButton)
// }

MainPage.prototype.clickCheckForUpdatesButton = async function () {
  await this.app.client
    .waitForVisible(this.checkForUpdatesButton, mediumTimeout)
    .click(this.checkForUpdatesButton)
}

MainPage.prototype.verifyProfileElements = async function () {
  await this.app.client
    .waitForVisible(this.profileUsernameLabel, mediumTimeout)
    .waitForVisible(this.profileSignOutButton, mediumTimeout)
    .waitForVisible(this.profileLanguageDropDown, mediumTimeout)
    .waitForVisible(this.profileAccountSettingsLink, mediumTimeout)
    .waitForVisible(this.profileFAQLink, mediumTimeout)
    .waitForVisible(this.profileDiscordLink, mediumTimeout)
}

MainPage.prototype.verifyUsernamesMatch = async function (user) {
  let usernameValue = await this.app.client.getText(this.profileUsernameLabel)
  let loggedInUser = TestData.getUser(user)
  let loggedInUserValue = loggedInUser.username

  if (usernameValue !== loggedInUserValue) {
    throw new Error('Username displayed does not match username of logged in user')
  }
}

MainPage.prototype.clickSignOutButtonInDropdownMenu = async function () {
  await this.app.client
    .waitForVisible(this.signOutMenuButton, mediumTimeout)
    .click(this.signOutMenuButton)
}

MainPage.prototype.clickDropdownMenuButton = async function () {
  await this.app.client
    .pause(shortTimeout)
    .waitForVisible(this.dropdownMenuButton, mediumTimeout)
    .click(this.dropdownMenuButton)
}

MainPage.prototype.clickOnSettingsInDropdownMenu = async function () {
  await this.app.client.click(this.settingsMenuButton)
}

MainPage.prototype.clickMiningButton = async function () {
  await this.app.client
    .pause(mediumTimeout)
    .waitForVisible(this.miningButton, mediumTimeout)
    .click(this.miningButton)
}

MainPage.prototype.clickQuitButton = async function () {
  await this.app.client
    .waitForVisible(this.quitMenuButton, mediumTimeout)
    .click(this.quitMenuButton)
}

MainPage.prototype.minerStatus = async function () {
  return this.app.client.getAttribute(this.miningButton, 'data-selected')
}

MainPage.prototype.preventBatteryDrainStatus = async function () {
  return this.app.client.getAttribute(this.preventBatteryDrainCheckBox, 'aria-checked')
}

MainPage.prototype.clickPreventBatteryDrainCheckBox = async function () {
  await this.app.client
    .waitForVisible(this.preventBatteryDrainCheckBox, mediumTimeout)
    .click(this.preventBatteryDrainCheckBox)
}

// selector - str, selector that contains multiple elements with the same class
// positionInArray - int, which position your element is in inside the object from the .elements function
MainPage.prototype.findElementID = async function (selector, positionInArray) {
  // Returns an object with all elements for the given selector
  let element = await this.app.client.elements(selector)

  // Lists the specific element with the provided "positionInArray" parameter
  let elementValue = element.value[positionInArray]

  // Returns the element ID
  return Object.values(elementValue)[0]
}

// Generate a random number between two provided numbers
// bottom - int, low number
// top - int, high number
// Example: await this.randomNumberGenerator(5, 20)
MainPage.prototype.randomNumberGenerator = async function (bottom, top) {
  return Math.floor(Math.random() * (1 + top - bottom)) + bottom
}

module.exports = MainPage
