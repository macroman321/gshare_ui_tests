//
// FILE NAME: log_in_steps.js
// DESCRIPTION: log_in STEPS
// Step definitions for log_in.feature
// AUTHOR: Dragan Nikolić (DN)
// CREATED: 20-Apr-18
// NOTES:
//

const defineSupportCode = require('cucumber').defineSupportCode
const TestData = require('../support/util/test_data')

defineSupportCode(function ({Given, Then, When}) {
  When('I start GShare', async function () {
    await this.page.loginPage.startClient()
  })

  When('I log in as user {string}', async function (userId) {
    await this.page.loginPage.startClient()
    const user = TestData.getUser(userId)
    this.logger.debug(`user = ${JSON.stringify(user)}`)

    await this.page.loginPage.login(user)
  })

  When('I log in as user {string} without Remember me', async function (userId) {
    await this.page.loginPage.startClient()
    const user = TestData.getUser(userId)
    this.logger.debug(`user = ${JSON.stringify(user)}`)

    await this.page.loginPage.loginWithoutRememberMe(user)
  })

  When('I log in with username as user {string} without Remember me', async function (userId) {
    await this.page.loginPage.startClient()
    const user = TestData.getUser(userId)
    this.logger.debug(`user = ${JSON.stringify(user)}`)

    await this.page.loginPage.loginWithUsernameAndWithoutRememberMe(user)
  })

  When('I enter email for {string} and password {string}', async function (userId, password) {
    await this.page.loginPage.startClient()
    const user = TestData.getUser(userId)
    this.logger.debug(`user = ${JSON.stringify(user)}`)

    await this.page.loginPage.loginWithCustomPassword(user, password)
  })

  Then('I should see login has failed with {string}', async function (errMessage) {
    await this.page.loginPage.verifyErrorMessagesMatch(errMessage)
  })

  Then('I should see the user has been successfully logged in', async function () {
    await this.page.mainPage.isMainPageOpened()
  })

  Then('I should see the user has been successfully logged out', async function () {
    await this.page.loginPage.verifyImOnLoginPage()
  })

  When('I log out of the application', async function () {
    await this.page.mainPage.logout()
  })
})
