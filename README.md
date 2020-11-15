# @zebing/js-bridge
一个无感使用webview bridge 交互方案。
在Hybrid开发过程中，为了提供更多的功能和更好的用户体验，常常需要与原生进行交互，因此产生了js-bridge。

### 1. 默认交互方案：
js-bridge提供了无感使用的方案，只针对android和ios,只要h5跟native端遵循以下规则。

**native端：**
```
// android
// 将方法注入到 window.jsBridgeMethods 中

// ios
// 通过 messageHandlers 进行交互
```
> android和ios两端方法接收到的参数是一个json字符串，格式如下：
```
{
    xxx: '参数1'，
    xxx: '参数2',
    ...
    callback?: '回调函数名称', // 通过window[callbackName] 进行回调
}
```

**h5端：**
```
import jsBridge from '@zebing/js-bridge';

// test 为调用的方法名
jsBridge.test({
    xxx: '参数1'，
    xxx: '参数2',
    callback: function () {}
})
```
### 2. 自定义适配器交互方案
如果默认交互方案不满足，可以自定义适配器进行交互。通过调用create 进行初始化。以安卓端为例，如下：
```
import { create, register } from '@zebing/js-bridge'
const JsBridge = create([{
  platform () {
    if (typeof window !== 'object') {
      return false;
    }

    const userAgent = window.navigator.userAgent;
    return userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1;
  },

  support (name) {
    const apis = window['jsBridgeMethods'] || {};
    const support = Object.prototype.toString.call(apis[name]) === '[object Function]';

    return support;
  },

  run (name, options) {
    const callback = options.callback;
    let data = options;
    
    if (callback) {
      data.callback = register(callback);
    }
    
    window.jsBridgeMethods[name](JSON.stringify(data));
  }
}]);

jsBridge.test({
  xxx: '参数1'，
  xxx: '参数2',
  callback: function () {}
})
```
create 接收一个数组，可传入多个适配器。一个平台只会使用一个符合条件的适配器。即使传入的适配器有多个符合，后面的会忽略。

适配器必须满足以下条件：
1. platform 方法，用以判断是否适用当前平台。
2. support 方法， 用以判断要调用的方法是否可调用。
3. run 方法，用以执行调用原生方法进行交互。

