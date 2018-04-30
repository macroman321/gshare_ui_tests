const path = require('path');
const yaml = require('js-yaml');
const fs = require('fs');
const _ = require('lodash');
const username = require('username');

const config_path = path.join(
  path.dirname(
    path.dirname(__dirname)),
  'config');

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
  static load(
      platform, 
      variant, 
      environment) {

    platform = platform || 'windows';
    variant = variant || 'gamecredits';
    environment = environment || 'stage';
    
    let config_data = undefined;
    let test_data = undefined;

    try {
      const cd_file = path.join(config_path, `cd_${platform}_${environment}.yml`);
      config_data = yaml.safeLoad(fs.readFileSync(cd_file, 'utf8'));
    } catch (e) {
      console.log(`Unable to load ${platform} config data for ${environment}!`);
      throw e;
    }

    try {
      const td_file = path.join(config_path, `td_${environment}.yml`);
      test_data = yaml.safeLoad(fs.readFileSync(td_file, 'utf8'));
    } catch (e) {
      console.log(`Unable to load ${environment} test data!`);
      throw e;
    }

    try {
      TestData.data = _.merge(config_data, test_data)
      TestData.clientPathname = TestData.get_client_pathname(
        TestData.data[`${variant}_client`]);
    } catch (e) {
      console.log('Unable to load test data!');
      console.log(e);
    }
  }

  static get_user(user_id) {
    return TestData.data.users[user_id];
  }

  static get_client_pathname(cp_template) {
    if (cp_template.includes('(username)')) {
      return cp_template.replace('(username)', username.sync());
    } else {
      return TestData.data.users[user_id];
    }
  }
}

module.exports = TestData
