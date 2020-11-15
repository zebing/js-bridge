
const { create, register } = require('../../dist');

const runner = [{
  platform() {
    if (typeof window !== 'object') {
      return false;
    }
    
    return window.navigator.userAgent === 'unknown';
  },

  support(name) {
    const apis = window['jsBridgeMethods'] || {};
    const support = Object.prototype.toString.call(apis[name]) === '[object Function]';

    return support;
  },

  run(name, options) {
    const callback = options.callback;
    let data = options;

    if (callback) {
      data.callback = register(callback);
    }

    window.jsBridgeMethods[name](JSON.stringify(data));
  }
}]

describe('未知平台，create 创建 adapter', () => {
  describe('Proxy 已定义', () => {
    let JsBridge = create(runner);

    test('调用 已注测 test 方法', () => {
      const mockCallback = jest.fn(body => body.param);
      const options = {
        param: '调用 已注测 test 方法',
        callback: mockCallback
      };
      JsBridge.test(options);
      expect(mockCallback.mock.results[0].value).toBe(options.param);
    });

    test('调用 未注测 notRegister 方法', () => {
      const mockCallback = jest.fn(text => /^\[Not registered\] 方法 "notRegister" 未注册; 详情请查看/.test(text));
      console.warn = mockCallback;
      JsBridge.notRegister({});
      expect(mockCallback.mock.results[0].value).toBe(true);
    });

    test('兼容模式run调用 已注测 test 方法', () => {
      const mockCallback = jest.fn(body => body.param);
      const options = {
        param: '兼容模式run调用 已注测 test 方法',
        callback: mockCallback
      };
      JsBridge.run('test', options);
      expect(mockCallback.mock.results[0].value).toBe(options.param);
    });

    test('兼容模式run调用 未注测 notRegister 方法', () => {
      const mockCallback = jest.fn(text => /^\[Not registered\] 方法 "notRegister" 未注册; 详情请查看/.test(text));
      console.warn = mockCallback;
      JsBridge.run('notRegister', {});
      expect(mockCallback.mock.results[0].value).toBe(true);
    });
  });

  describe('Proxy 未定义', () => {
    Proxy = undefined;
    JsBridge = create(runner);

    test('兼容模式run调用 已注测 test 方法', () => {
      const mockCallback = jest.fn(body => body.param);
      const options = {
        param: '兼容模式run调用 已注测 test 方法',
        callback: mockCallback
      };
      JsBridge.run('test', options);
      expect(mockCallback.mock.results[0].value).toBe(options.param);
    });

    test('兼容模式run调用 未注测 notRegister 方法', () => {
      const mockCallback = jest.fn(text => /^\[Not registered\] 方法 "notRegister" 未注册; 详情请查看/.test(text));
      console.warn = mockCallback;
      JsBridge.run('notRegister', {});
      expect(mockCallback.mock.results[0].value).toBe(true);
    });
  });
});
