const Page = require('./page')
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
  this.profileButton = '[class="gc-pill gc-pill--icon gc-pill--flat"]'
  this.signOutButton = '[class="gc-profile-settings__link gc-profile-settings__link--signout"]'
  this.dropdownMenuButton = '[class="gc-dropdown gc-dropdown--icon gc-dropdown--right btn-group"]'
  this.cpuGpuSettingsSwitch = '[class="gc-form__group gc-form__group--inline gc-form__group--switch"]'
  this.cpuGpuSettingsSlider = '[class="gc-slider__body"]'
}

// Inherit everything from Page
MainPage.prototype = Object.create(Page.prototype)

// Main functions
MainPage.prototype.logout = async function () {
  await this.clickProfileButton()
  await this.clickSignOutButton()
}

MainPage.prototype.enableWorkers = async function () {
  await this.clickDropdownMenuButton()
  await this.clickOnSettingsInDropdownMenu()
  await this.enableBothWorkers()
}

MainPage.prototype.startMining = async function () {
  await this.clickMiningButton()
}

MainPage.prototype.verifyMinerIsWorking = async function () {
  if ((await this.minerStatus() === false)) {
    throw new Error('Miner is not working when it should!')
  }
}

MainPage.prototype.verifyMinerIsStopped = async function () {
  if ((await this.minerStatus() === true)) {
    throw new Error('Miner is working when it should not!')
  }
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
    .pause(shortTimeout)
    .waitForVisible(this.dropdownMenuButton, mediumTimeout)
    .click(this.dropdownMenuButton)
}

MainPage.prototype.clickOnSettingsInDropdownMenu = async function () {
  // TODO: Find a way not to use "=Settings" as a selector here
  await this.app.client.click('=Settings')
}

MainPage.prototype.clickMiningButton = async function () {
  await this.app.client
    .pause(mediumTimeout)
    .waitForVisible(this.miningButton, mediumTimeout)
    .click(this.miningButton)
}

MainPage.prototype.minerStatus = async function () {
  return this.app.client.getAttribute(this.miningButton, 'data-selected')
}

// selector - str, selector that contains multiple elements with the same class
// positionInArray - int, which position your element is in inside the object from the .elements function
MainPage.prototype.findElementID = async function (selector, positionInArray) {
  // Returns an object with all elements for the given selector
  await this.app.client.pause(shortTimeout)
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

MainPage.prototype.enableBothWorkers = async function () {
  // Element IDs for turning on/off CPU and GPU mining
  let gpuSwitchElementID = await this.findElementID(this.cpuGpuSettingsSwitch, 0)
  let cpuSwitchElementID = await this.findElementID(this.cpuGpuSettingsSwitch, 1)

  // Element IDs for setting CPU and GPU load and setting random values
  let gpuSliderElementID = await this.findElementID(this.cpuGpuSettingsSlider, 0)
  let cpuSliderElementID = await this.findElementID(this.cpuGpuSettingsSlider, 1)
  let gpuSliderRandomSetting = await this.randomNumberGenerator(8, 25)
  let cpuSliderRandomSetting = await this.randomNumberGenerator(0, 8)

  // Slider location coordinates for CPU and GPU within the application
  // Necessary because there are no unique selectors we can use to scroll
  // to the element so we have get their coordinates via Element ID
  let gpuSliderLocation = await this.app.client.elementIdLocation(gpuSliderElementID)
  let cpuSliderLocation =  await this.app.client.elementIdLocation(cpuSliderElementID)
  let cpuSliderCoordinates = Object.values(cpuSliderLocation)
  console.log(cpuSliderCoordinates)


  await this.app.client
    // .elementIdClick(gpuSwitchElementID)
    // .elementIdValue(gpuSliderElementID, [gpuSliderRandomSetting]) // value parameter has to be an array
    // .elementIdClick(cpuSwitchElementID)
    // .elementIdValue value parameter has to be an array
    // .elementIdValue(cpuSliderElementID, [cpuSliderRandomSetting]) // value parameter has to be an array
}

module.exports = MainPage
