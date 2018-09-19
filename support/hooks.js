const {Before, After} = require('cucumber')
const Application = require('spectron').Application
const TestData = require('./util/test_data')
const LoginPage = require('../support/pages/login_page')
const MainPage = require('../support/pages/main_page')

Before(async function (scenario) {
  this.logger.debug(`Before scenario ${scenario.pickle.name}`)

  // Start the Electron app
  this.app = new Application({
    path: TestData.clientPathname
  })

  this.page = {}
  this.page.mainPage = new MainPage(this)
  this.page.loginPage = new LoginPage(this)

  this.logger.info(`Start test: ${scenario.pickle.name}`)
})

After(async function (scenario) {
  this.logger.info(`Scenario '${scenario.pickle.name}' ${scenario.result.status}!`)
  await this.app.stop()
})
