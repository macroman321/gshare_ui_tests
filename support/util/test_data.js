const path = require('path')
const yaml = require('js-yaml')
const fs = require('fs')
const _ = require('lodash')
const username = require('username')

const configPath = path.join(
  path.dirname(
    path.dirname(__dirname)),
  'config')

class TestData {
  // Loads the config and test data from the following files:
  //   cd_<platform>_<environment>.yml
  //   td_<environment>.yml
  //
  // Parameters:
  // platform - windows, linux, osx (default: windows)
  // variant - gamecredits, esprit, ... (default: gamecredits)
  // environment - stage, prod (default: stage)
  //
  static load (
    platform,
    variant,
    environment) {
    platform = platform || 'windows'
    variant = variant || 'gamecredits'
    environment = environment || 'stage'

    let configData
    let testData

    try {
      const cdFile = path.join(configPath, `cd_${platform}_${environment}.yml`)
      configData = yaml.safeLoad(fs.readFileSync(cdFile, 'utf8'))
    } catch (e) {
      console.log(`Unable to load ${platform} config data for ${environment}!`)
      throw e
    }

    try {
      const tdFile = path.join(configPath, `td_${environment}.yml`)
      testData = yaml.safeLoad(fs.readFileSync(tdFile, 'utf8'))
    } catch (e) {
      console.log(`Unable to load ${environment} test data!`)
      throw e
    }

    try {
      TestData.data = _.merge(configData, testData)
      TestData.clientPathname = TestData.getClientPathName(
        TestData.data[`${variant}_client`])
    } catch (e) {
      console.log('Unable to load test data!')
      console.log(e)
    }
  }

  static getUser (userId) {
    return TestData.data.users[userId]
  }

  static getClientPathName (cpTemplate) {
    if (cpTemplate.includes('(username)')) {
      return cpTemplate.replace('(username)', username.sync())
    } else {
      return cpTemplate
    }
  }
}

module.exports = TestData
