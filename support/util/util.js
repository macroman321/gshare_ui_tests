// sleep Promise
// 
// Usage with async-await:
// await sleep(2000);
//
// Usage with promise:
// (todo)
function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}