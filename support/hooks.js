const Application = require('spectron').Application
const {BeforeAll, Before, After} = require('cucumber')
const Logger = require('logplease')
const TestData = require('./util/test_data')
const LoginPage = require('../support/pages/login_page')
const MainPage = require('../support/pages/main_page')

let testData
let app
let client = {}

const logger = Logger.create(
  'gsharetest',
  {filename: 'gsharetest.log', appendFile: true}
)

BeforeAll(async function () {
  logger.info('Initialize test run...')
})

Before(async function (scenario) {
  logger.debug(`Before scenario ${scenario.pickle.name}`)
  if (!testData) {
    logger.info(`parameters: ${JSON.stringify(this.parameters)}`)
    TestData.load(
      this.parameters.platform,
      this.parameters.variant,
      this.parameters.environment)
    testData = TestData.data

    // Start the client
    app = new Application({
      path: TestData.clientPathname
    })
    client.loginPage = new LoginPage(app)
    client.mainPage = new MainPage(app)
  } else {
    logger.debug('Test data already initialized!')
  }

  this.testData = testData
  this.app = app
  this.client = client
  this.logger = logger
  this.logger.info(`Start test: ${scenario.pickle.name}`)
})

After(async function (scenario) {
  this.logger.info(`Scenario '${scenario.pickle.name}' ${scenario.result.status}!`)
  await this.app.stop()
})
