
const JsBridge = require('../../dist').default;
console.log(window.navigator.userAgent)
JsBridge.test({
  param: 'param',
  callback: function (options) {
  }
});
test('object assignment', () => {
  expect(2).toBe(2);
});