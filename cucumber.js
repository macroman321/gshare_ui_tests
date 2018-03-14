/*
cucumber.js

The cucumber.js defines profiles and project variables.
*/

const common = '-r ./steps -r ./support';
module.exports = {
  'default': common + '--format pretty',
  dry: common + '--dry-run',
  progress: common + '--format progress'
};
