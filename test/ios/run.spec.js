
Proxy = undefined;
let JsBridge = require('../../dist').default;
const { create, register } = require('../../dist');
const runner = [{
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
    const callback = options.callback;
    let data = options;
    
    if (callback) {
      data.callback = register(callback);
    }
    
    window.webkit.messageHandlers[name].postMessage(JSON.stringify(data));
  }
}];


describe('ios平台 Proxy 不支持', () => {
  test('调用已注册 test 方法', () => {
    const mockCallback = jest.fn(body => body.param);
    const options = {
      param: '调用已注册 test 方法',
      callback: mockCallback
    };
    JsBridge.run('test', options);
    expect(mockCallback.mock.results[0].value).toBe(options.param);
  });
  
  test('调用 未注测 notRegister 方法', () => {
    const mockCallback = jest.fn(text => /^\[Not registered\] 方法 "notRegister" 未注册; 详情请查看/.test(text));
    console.warn = mockCallback;
    JsBridge.run('notRegister', {});
    expect(mockCallback.mock.results[0].value).toBe(true);
  });

  JsBridge = create(runner);
  test('create调用已注册 test 方法', () => {
    const mockCallback = jest.fn(body => body.param);
    const options = {
      param: 'create调用已注册 test 方法',
      callback: mockCallback
    };
    JsBridge.run('test', options);
    expect(mockCallback.mock.results[0].value).toBe(options.param);
  });
  
  test('create调用 未注测 notRegister 方法', () => {
    const mockCallback = jest.fn(text => /^\[Not registered\] 方法 "notRegister" 未注册; 详情请查看/.test(text));
    console.warn = mockCallback;
    JsBridge.run('notRegister', {});
    expect(mockCallback.mock.results[0].value).toBe(true);
  });
});
