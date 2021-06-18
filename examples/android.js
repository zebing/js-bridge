exports.run = () => {
  window = {
    navigator: {
      userAgent: "Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.80 Mobile Safari/537.36"
    },
    jsBridgeMethods: {
      test (options) {
        const optionsParse = JSON.parse(options)
        // console.log('调用jsBridgeMethods test', optionsParse, window[optionsParse.callback], optionsParse.callback)
        window[optionsParse.callback](optionsParse);
      }
    }
  }
// Proxy = undefined;
  // 使用默认 JsBridge
  const JsBridge = require('../dist').default;
  console.log(JsBridge.test1())
  console.log(JsBridge.support('test1'))
  JsBridge.test({test:'test'}).then((body) => {
    console.log('body: ', body)
  })
  JsBridge.test({test:'test'}).then((body) => {
    console.log('body: ', body)
  })
  JsBridge.test({test:'test'}).then((body) => {
    console.log('body: ', body)
  })
  JsBridge.test({test:'test'}).then((body) => {
    console.log('body: ', body)
  })
  JsBridge.test({test:'test'}).then((body) => {
    console.log('body: ', body)
    console.log(Object.keys(window))
  })
  // Proxy = undefined;
  // 自定义适配器
  // const { create, register } = require('../dist');
  // const JsBridge = create([{
  //   platform () {
  //     if (typeof window !== 'object') {
  //       return false;
  //     }

  //     const userAgent = window.navigator.userAgent;
  //     return userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1;
  //   },

  //   support (name) {
  //     const apis = window['jsBridgeMethods'] || {};
  //     const support = Object.prototype.toString.call(apis[name]) === '[object Function]';

  //     return support;
  //   },

  //   run (name, options) {
  //     const callback = options.callback;
  //     let data = options;
      
  //     if (callback) {
  //       data.callback = register(callback);
  //     }
      
  //     window.jsBridgeMethods[name](JSON.stringify(data));
  //   }
  // }]);


  // JsBridge.test({
  //   param: 'param',
  //   callback: function (options) {
  //     console.log('回调', options)
  //   }
  // });

  // JsBridge.test1({
  //   param: 'param',
  //   callback: function (options) {
  //     console.log('回调', options)
  //   }
  // });

  // Proxy = undefined;
  // JsBridge.run('test', {
  //   param: 'run test方法',
  //   callback: function (options) {
  //     console.log('run test方法回调', options)
  //   }
  // });

  // JsBridge.run('test1', {
  //   param: 'run test1方法',
  //   callback: function (options) {
  //     console.log('run test1方法回调', options)
  //   }
  // });
}