const path = require('path');

const config_path = path.join(
  path.dirname(
    path.dirname(__dirname)),
  'config');

class TestData {
  // platform - windows, linux, osx
  // environment - stage, prod
  // 
  // Files: 
  //   cd_<platform>_<environment>.yml
  //   td_<environment>.yml
  static load(platform, environment) {

    try {
      const cd_file = `cd_${platform}_${environment}`
      const config_data = yaml.safeLoad(fs.readFileSync(cd_file, 'utf8'));
      console.log(`${platform} config data for ${environment} successfully loaded.`);
    } catch (e) {
      console.log(`Unable to load ${platform} config data for ${environment}!`);
      console.log(e);
      return;
    }

    try {
      const td_file = `td_${environment}`
      const test_data = yaml.safeLoad(fs.readFileSync(td_file, 'utf8'));
      console.log(`Test data for ${environment} successfully loaded.`);
    } catch (e) {
      console.log(`Unable to load ${environment} test data!`);
      console.log(e);
      return;
    }

    try {
      TestData.data = _.merge(config_data, test_data)
      TestData.client = TestData.data.client
      console.log('Test data successfully loaded.');
    } catch (e) {
      console.log('Unable to load test data!');
      console.log(e);
    }
  }
}

module.exports = TestData
