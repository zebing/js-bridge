exports.run = () => {
  window = {
    navigator: {
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"
    },
    webkit: {
      messageHandlers: {
        test: {
          postMessage (options) {
            const optionsParse = JSON.parse(options)
            console.log('调用jsBridgeMethods test', optionsParse, window[optionsParse.callback], optionsParse.callback)
            window[optionsParse.callback](optionsParse);
          }
        }
      }
    }
  }

  // 使用默认 JsBridge
  // const JsBridge = require('../dist').default;
  // console.log(JsBridge.support('test'))
  // console.log(JsBridge.support('test1'))
  // JsBridge.test({test:'test'}).then((body) => {
  //   console.log('body: ', body)
  // })

  // 自定义适配器
  const { create, register } = require('../dist');
  const JsBridge = create([{
    platform () {
      if (typeof window !== 'object') {
        return false;
      }

      return !!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    },

    support (name) {
      let support = false;

      try {
        const postMessage = window.webkit.messageHandlers[name].postMessage;
        if (Object.prototype.toString.call(postMessage) === '[object Function]') {
          support = true;
        }
      } catch(error) {}

      return support;
    },

    run (name, options) {
      
      window.webkit.messageHandlers[name].postMessage(JSON.stringify(options));
    }
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

  JsBridge.test({test:'test'}).then((body) => {
    console.log('body: ', body)
  })
}