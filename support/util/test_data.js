const path = require('path');
const yaml = require('js-yaml');
const fs = require('fs');
const _ = require('lodash');

const config_path = path.join(
  path.dirname(
    path.dirname(__dirname)),
  'config');

class TestData {
  // platform - windows, linux, osx
  // variant - gamecredits, esprit, ...
  // environment - stage, prod
  // 
  // Files: 
  //   cd_<platform>_<environment>.yml
  //   td_<environment>.yml
  static load(platform, variant, environment) {
    let config_data = undefined;
    let test_data = undefined;

    try {
      const cd_file = path.join(config_path, `cd_${platform}_${environment}.yml`);
      console.log(`cd_file is: ${cd_file}`);
      config_data = yaml.safeLoad(fs.readFileSync(cd_file, 'utf8'));
      console.log(`${platform} config data for ${environment} successfully loaded.`);
    } catch (e) {
      console.log(`Unable to load ${platform} config data for ${environment}!`);
      console.log(e);
      return;
    }

    try {
      const td_file = path.join(config_path, `td_${environment}.yml`);
      console.log(`td_file is: ${td_file}`);
      test_data = yaml.safeLoad(fs.readFileSync(td_file, 'utf8'));
      console.log(`Test data for ${environment} successfully loaded.`);
    } catch (e) {
      console.log(`Unable to load ${environment} test data!`);
      console.log(e);
      return;
    }

    try {
      TestData.data = _.merge(config_data, test_data)
      TestData.client = TestData.data[`${variant}_client`]
      console.log('Test data successfully loaded.');
    } catch (e) {
      console.log('Unable to load test data!');
      console.log(e);
    }
  }

  static get_user(user_id) {
    return TestData.data.users[user_id];
  }
}

module.exports = TestData
