
// 安卓
window = {
  navigator: {
    userAgent: "Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.80 Mobile Safari/537.36"
  },
  jsBridgeMethods: {
    test (options) {
      const optionsParse = JSON.parse(options)
      console.log('调用jsBridgeMethods test', optionsParse, window[optionsParse.callback], optionsParse.callback)
      window[optionsParse.callback](optionsParse);
    }
  }
}

// 使用默认 JsBridge
// const JsBridge = require('../dist').default;

// 自定义适配器
const { create } = require('../dist');
const JsBridge = create([{
  // platform () {
  //   return true;
  // }
}]);


JsBridge.test({
  param: 'param',
  callback: function (options) {
    console.log('回调', options)
  }
});

JsBridge.test1({
  param: 'param',
  callback: function (options) {
    console.log('回调', options)
  }
});