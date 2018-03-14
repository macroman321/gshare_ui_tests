const {BeforeAll, Before, After} = require('cucumber');
const Logger = require('logplease');
const TestData = require('./util/test_data')

let logger = undefined;
let test_data = undefined;
let client = undefined;

BeforeAll(async function () {
  logger = Logger.create(
    'cmatest',  
    { filename: 'cmatest.log', appendFile: true });
  logger.info('Initialize test run...');
});

Before(async function (scenario) {
  if (!test_data) {
    logger.debug(`init test data *${this.parameters.platform}* *${this.parameters["platform"]}*`)
    TestData.load(
      this.parameters.platform,
      this.parameters.variant,
      this.parameters.environment);
    test_data = TestData.data;
    client = TestData.client;
  } else {
    logger.debug('test data already initialized!')
  }

  this.test_data = test_data;
  this.client = client;
  this.logger = logger;
  this.logger.info(`parameters: ${JSON.stringify(this.parameters)}`);
  this.logger.info(`Start test: ${scenario.pickle.name}`);
});

After(async function (scenario) {
  this.logger.info(`Complete test: ${scenario.pickle.name}`);
  await this.app.stop();
});
