//
// FILE NAME: store_steps.rb
// DESCRIPTION: store STEPS
// Step definitions for store.feature
// AUTHOR: Danilo Čupić (DČ)
// CREATED: 13-Apr-18
// NOTES:
//

const defineSupportCode = require('cucumber').defineSupportCode

defineSupportCode(function ({Given, Then, When}) {
  let countOne = 0

  When('I click on My Games', async function () {
    await this.client.mainPage.clickMyGames()
    await this.app.client.waitForExist('#portalTabs-pane-2 .gc-game-card')
    const firstCount = await this.app.client.elements('#portalTabs-pane-2 .gc-game-card')

    for (let element in firstCount.value) {
      countOne += 1
    }
    this.logger.debug(`first = ${countOne}`)
  })

  When('I click on Store', async function () {
    await this.client.mainPage.clickOnStore()
  })

  When('I click on a game that I want to buy', async function () {
    await this.app.client.waitForExist('button[class="gc-button gc-button--primary"]')
    await this.client.mainPage.clickForBuy()
  })

  When('I click on Buy button', async function () {
    await this.client.mainPage.clickOnBuyButton()
  })

  When('I click on button Go to My Games', async function () {
    await this.client.mainPage.clickGoToMyGames()
  })

  Then('I should see that My Games has increased by one game', async function () {
    await this.client.mainPage.showBoughtGames()

    const secondCount = await this.app.client.elements('#portalTabs-pane-2 .gc-game-card')
    let countTwo = 0

    for (let element in secondCount.value) {
      countTwo += 1
    }
    this.logger.debug(`second = ${countTwo}`)

    if (countTwo > countOne) {
      this.logger.debug('Game purchased successfully.')
    } else {
      throw new Error("Total number of games didn't increase.")
    }
  })

  When('I position the mouse over the game I want to buy', async function () {
    await this.client.mainPage.mouseOverGame()
  })

  Then('I should see message that I can not purchase a Game', async function () {
    await this.client.mainPage.purchaseFailed()
  })

  When('I cancel the purchase', async function () {
    await this.client.mainPage.clickCancelButton()
  })

  Then('Buy a Game dialog should disappear', async function () {
    await this.client.mainPage.dialogDisapper()
  })

  When('I should be back to the main page', async function () {
    await this.client.mainPage.gameList()
  })

  When('I click on Cancel button', async function () {
    await this.client.mainPage.cancelButton()
  })

  Then('I should see that button goToMyGames does not exist no more', async function () {
    await this.app.client.waitForExist('button[class="gc-button gc-button--secondary gc-button--full"]', 1000, true)
    await this.client.mainPage.gameList()
  })
})
