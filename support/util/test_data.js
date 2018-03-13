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
  //   <platform>_<environment>.yml
  //   td_<stage>.yml
  static load(platform, environment) {
    try {
      const client = yaml.safeLoad(fs.readFileSync(client_config_file, 'utf8'));
      const environment = yaml.safeLoad(fs.readFileSync(environment_config_file, 'utf8'));
      const test_data = yaml.safeLoad(fs.readFileSync(test_data_file, 'utf8'));
      TestData.data = _.merge(client, environment, test_data)
      TestData.client = TestData.data.client
    
      console.log('Test data successfully loaded.');
    } catch (e) {
      console.log('Unable to load test data!');
      console.log(e);
    }
  }
}

module.exports = TestData
