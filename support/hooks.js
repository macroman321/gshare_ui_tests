const {After, Before} = require('cucumber');

Before(async function (testCase) {
  console.log(`***** before ${testCase.pickle.name}`);
});

After(async function (testCase) {
  console.log(`***** after ${testCase.pickle.name}`);
  await this.app.stop();
});
