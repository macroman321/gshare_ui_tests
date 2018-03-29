const Application = require('spectron').Application;
const {BeforeAll, Before, After} = require('cucumber');
const Logger = require('logplease');
const TestData = require('./util/test_data')
const LoginPage = require('../support/pages/login_page');
const MainPage = require('../support/pages/main_page');

let test_data = undefined;
let app = undefined;
let client = {};

const logger = Logger.create(
  'cmatest',  
  { filename: 'cmatest.log', appendFile: true }
);

BeforeAll(async function () {
  logger.info('Initialize test run...');
});

Before(async function (scenario) {
  logger.debug(`Before scenario ${scenario.pickle.name}`);
  if (!test_data) {
    logger.debug(`init test data *${this.parameters.platform}* *${this.parameters.variant}*`)
    TestData.load(
      this.parameters.platform,
      this.parameters.variant,
      this.parameters.environment);
    test_data = TestData.data;

    // Start the client
    app = new Application({
      path: TestData.clientPathname
    });
    client.loginPage = new LoginPage(app);
    client.mainPage = new MainPage(app);
  } else {
    logger.debug('test data already initialized!')
  }

  this.test_data = test_data;
  this.app = app;
  this.client = client;
  this.logger = logger;
  this.logger.info(`parameters: ${JSON.stringify(this.parameters)}`);
  this.logger.info(`Start test: ${scenario.pickle.name}`);
});

After(async function (scenario) {
  this.logger.info(`Scenario '${scenario.pickle.name}' ${scenario.result.status}!`);
  await this.app.stop();
});
