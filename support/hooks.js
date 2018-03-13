const {BeforeAll, Before, After} = require('cucumber');
const Logger = require('logplease');

BeforeAll(async function () {
  this.loggerx = Logger.create(
    'cmatestx',  
    { filename: 'cmatest.log', appendFile: true });

});

Before(async function (testCase) {
  console.log(this.logger);
  if (!this.logger) {
    console.log('Initialize framework...');
    this.logger = Logger.create(
      'cmatest',  
      { filename: 'cmatest.log', appendFile: true });

    this.logger.info(`parameters: ${JSON.stringify(this.parameters)}`);
  }

  this.logger.info(`Start test: ${testCase.pickle.name}`);
});

After(async function (testCase) {
  this.logger.info(`Complete test: ${testCase.pickle.name}`);
  await this.app.stop();
});
