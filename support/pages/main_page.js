// main_page.js
const Page = require('./page')
const {setDefaultTimeout} = require('cucumber')
setDefaultTimeout(5000 * 1000)

function MainPage (app) {
  Page.call(this, app)

  this.storeTab = '[id="portalTabs-tab-1"]'
  this.accountMenu = '[class="gc-avatar"]'
  this.logoutButton = '[class="gc-profile-settings__link gc-profile-settings__link--signout"]'
  this.startMiningButton = '[class="gc-pill gc-pill--icon"]'
  this.claimReward = 'button[class="gc-pill gc-pill--active"]'
  this.miningBalance = '[class = "gc-balance gc-balance--active"]'
  this.currrentBalance = '[class="gc-balance__amount"]'
  this.myGamesTab = '[id="portalTabs-tab-2"]'
  this.myGames = '[class="gc-game-card-wrapper"]'
  this.currencyList = '[class = "gc-profile-settings__balance"]'
  this.pane2 = '[id=portalTabs-pane-2]'
  this.gameIcon = '[class="gc-game-card"]'
  this.clickGame = 'button[class="gc-button gc-button--primary"]'
  this.buyGameButton = 'button[class="gc-button gc-button--primary gc-button--full gc-button--large"]'
  this.buttonGoToMyGames = 'button[class="gc-button gc-button--secondary gc-button--full"]'
  this.msgPurchaseFailed = '[class="gc-game-card__cover-overlay__insufficient-funds"]'
  this.cancelPurchase = 'button[class="gc-button gc-button--flat gc-button--large gc-buy-game-card__cancel-btn"]'
  this.cancelButtonAfterPurchase = '[class="gc-button gc-button--flat gc-buy-game-card__cancel-btn"]'
  this.emptyGamesList = '[class="gc-empty-list"]'
  this.minerWorkingText = '[class="gc-balance__text"]'
  this.profileMyAccountHeading = '[class="gc-profile-settings__title"]'
  this.profileMyAccountSpan = '[class="gc-profile-settings__email"]'
  this.profileMyWalletLink = '[class="gc-profile-settings__link gc-profile-settings__link--wallet"]'
  this.profileSignOutLink = '[class="gc-profile-settings__link gc-profile-settings__link--signout"]'
  this.profileLanguageButton = '[class="gc-dropdown-toggle btn btn-default"]'
  this.profileLanguageLabel = '[class="gc-label__text"]'
  this.profileDiscordLink = '[class="gc-text--secondary"]'
  this.minerWorkingMessage = '[class="gc-notification__message"]'
}

// Inherit everything from Page
MainPage.prototype = Object.create(Page.prototype)

MainPage.prototype.isOpen = async function () {
  try {
    await this.app.client.waitForExist(this.storeTab)
    return true
  } catch (_) {
    return false
  }
}

MainPage.prototype.logout = async function () {
  await this.app.client
    .waitForVisible(this.accountMenu)
    .click(this.accountMenu)

  await this.clickLogoutButton()
}

MainPage.prototype.close = async function () {
  await this.app.stop()
}

// Logout button click is unreliable, therefore this function
MainPage.prototype.clickLogoutButton = async function () {
  const client = this.app.client
  const t = Date.now()

  await client
    .waitForVisible(this.logoutButton)
    .click(this.logoutButton)

  let logoutExists = await client.isExisting(this.logoutButton)
  while (logoutExists) {
    await client.click(this.logoutButton)
    logoutExists = await client.isExisting(this.logoutButton)

    if (Date.now() - t > 30) {
      break
    }
  }
}

MainPage.prototype.claimBalanceCheck = async function () {
  const client = this.app.client
  let availableClaimButton = await client.isEnabled(this.claimReward)

  if (availableClaimButton === true) {
    await client.element(this.claimReward).click()
  } else {
    let availableStartMining = await client.waitForEnabled(this.startMiningButton, 30000)
    console.log('********', availableStartMining)
    if (availableStartMining === false) {
      throw new Error('Start mining button is not available')
    } else {
      await client
        .waitForEnabled(this.startMiningButton, 400000)
        .element(this.startMiningButton).click()
        .waitForEnabled(this.claimReward, 9999999)
        .element(this.claimReward).click()
    }
  }
}

MainPage.prototype.checkBalanceIncrease = async function () {
  let miningBalance = await this.app.client.getText(this.miningBalance)
  let currentBalance = await this.app.client.getText(this.currrentBalance)
  let currentBalanceIndex = currentBalance[1]
  const total = miningBalance + currentBalanceIndex

  if (total >= currentBalanceIndex) {
    console.log('Balance claimed successfully')
  } else {
    throw new Error('Balance was not claimed successfully ')
  }
}

MainPage.prototype.clickMyGamesTab = async function () {
  await this.app.client
    .waitForVisible(this.myGamesTab)
    .click(this.myGamesTab)
}

MainPage.prototype.checkTheEmptyGamesList = async function () {
  await this.app.client.waitForVisible(this.emptyGamesList)
}

MainPage.prototype.checkTheGamesList = async function () {
  const client = this.app.client
  let myGamesTabStatus = await client.getAttribute(this.myGamesTab, 'aria-selected')
  let myGamesCount = await client.elements(this.myGames)
  // TODO: Continue here
  console.log(myGamesTabStatus)

  if (myGamesTabStatus === true) {
    console.log(myGamesCount.value)
  }
}

MainPage.prototype.clickAccountMenu = async function () {
  await this.app.client
    .waitForVisible(this.accountMenu)
    .click(this.accountMenu)
}

MainPage.prototype.verifyCurrencyList = async function () {
  await this.app.client.waitForVisible(this.currencyList)
}

MainPage.prototype.clickMyGames = async function () {
  await this.app.client
    .click(this.myGamesTab)
    .waitForExist(this.gameIcon)
}

MainPage.prototype.clickOnStore = async function () {
  await this.app.client
    .click(this.storeTab)
    .waitForExist(this.gameIcon)
}

MainPage.prototype.showBoughtGames = async function () {
  await this.app.client
    .waitForVisible(this.pane2, 10000)
    .waitForVisible(this.gameIcon)
}

MainPage.prototype.clickForBuy = async function () {
  await this.app.client
    .waitForVisible(this.gameIcon)
    .moveToObject(this.clickGame) // moveToObject will be deprecated soon, check for new function
    .waitForVisible(this.clickGame)
    .waitForExist(this.clickGame)
    .click(this.clickGame)
    .waitForExist(this.buyGameButton)
}

MainPage.prototype.clickOnBuyButton = async function () {
  await this.app.client.click(this.buyGameButton)
  try {
    await this.app.client.waitForExist(this.goToMyGames)
    return true
  } catch (_) {
    return false
  }
}

MainPage.prototype.clickGoToMyGames = async function () {
  await this.app.client
    .waitForVisible(this.buttonGoToMyGames, 15000)
    .click(this.buttonGoToMyGames)
}

MainPage.prototype.mouseOverGame = async function () {
  await this.app.client
    .waitForExist(this.gameIcon, 1000)
    .moveToObject(this.gameIcon, 5000)
}

MainPage.prototype.purchaseFailed = async function () {
  await this.app.client.waitForVisible(this.msgPurchaseFailed, 5000)
}

MainPage.prototype.clickCancelButton = async function () {
  await this.app.client
    .click(this.cancelPurchase)
    .waitForExist(this.myGamesTab, 30000)
}

MainPage.prototype.cancelButton = async function () {
  await this.app.client
    .waitForVisible(this.cancelButtonAfterPurchase, 30000)
    .click(this.cancelButtonAfterPurchase)
}

MainPage.prototype.gameList = async function () {
  await this.app.client.waitForExist(this.gameIcon)
}

MainPage.prototype.dialogDisapper = async function () {
  await this.app.client.waitForExist(this.buyGameButton, 1000, true)
}

MainPage.prototype.startMining = async function () {
  await this.app.client
    .waitForEnabled(this.startMiningButton)
    .click(this.startMiningButton)
}

MainPage.prototype.minerWorking = async function () {
  await this.app.client.waitForExist(this.minerWorkingText)
  let minerStatus = await this.app.client.getText(this.minerWorkingText)
  let minerStatusText = minerStatus[0]
  await this.app.client.waitForExist(this.minerWorkingMessage)

  if (minerStatusText !== 'Working') {
    throw new Error('Miner is not working')
  }
}

MainPage.prototype.minerStopped = async function () {
  let minerStatus = await this.app.client.getText(this.minerWorkingText)
  let minerStatusText = minerStatus[0]

  if (minerStatusText !== 'Reward') {
    throw new Error('Miner is working when it should not')
  }
}

MainPage.prototype.checkForBalanceRequirement = async function () {
  let requirement = 0.1
  let miningBalance = await this.app.client.getText(this.miningBalance)
  if (miningBalance < requirement) {
    console.log('The mining balance is below the required threshold')
  }
}

MainPage.prototype.balanceNotClaimable = async function () {
  let availableClaimButton = await this.app.client.isEnabled(this.claimReward)
  if (availableClaimButton === false) {
    console.log('You cannot claim the balance')
  }
}

MainPage.prototype.verifyProfileOptions = async function () {
  await this.app.client
    .waitForExist(this.profileMyAccountHeading)
    .waitForExist(this.profileMyAccountSpan)
    .waitForExist(this.profileMyWalletLink)
    .waitForExist(this.profileSignOutLink)
    .waitForExist(this.profileLanguageButton)
    .waitForExist(this.profileLanguageLabel)
    .waitForExist(this.profileDiscordLink)
}

module.exports = MainPage
