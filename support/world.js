const { setWorldConstructor } = require('cucumber')
const Logger = require('logplease')
const TestData = require('./util/test_data')

function CustomWorld ({ attach, parameters }) {
  this.attach = attach
  this.parameters = parameters

  this.logger = Logger.create(
    'gsharetest',
    {filename: 'gsharetest.log', appendFile: true}
  )
  
  this.logger.info(`parameters: ${JSON.stringify(this.parameters)}`)

  TestData.load(
    this.parameters.platform,
    this.parameters.environment)
  this.testData = TestData.data
}

setWorldConstructor(CustomWorld)
