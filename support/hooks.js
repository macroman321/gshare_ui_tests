const {BeforeAll, Before, After} = require('cucumber');
const Logger = require('logplease');
const TestData = require('./util/test_data')

let test_data = undefined;
let client = undefined;

const logger = Logger.create(
  'cmatest',  
  { filename: 'cmatest.log', appendFile: true }
);

BeforeAll(async function () {
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

    // Start the client
    this.app = new Application({
      path: TestData.client
    });
    this.app.start();
  } else {
    logger.debug('test data already initialized!')
  }

  this.test_data = test_data;
  this.logger = logger;
  this.logger.info(`parameters: ${JSON.stringify(this.parameters)}`);
  this.logger.info(`Start test: ${scenario.pickle.name}`);
});

After(async function (scenario) {
  this.logger.info(`Complete test: ${scenario.pickle.name}`);
  await this.app.stop();
});
