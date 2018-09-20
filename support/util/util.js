// sleep as Promise
//
// Usage with async-await:
// await sleep(2000);
//
// Usage with promise:
//
exports.sleep = function (milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
