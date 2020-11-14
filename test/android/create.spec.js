
const { create, register } = require('../../dist');

describe('Android平台, create', () => {
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
  
    test('调用已注册 test 方法', () => {
      const mockCallback = jest.fn(body => body.param);
      const options = {
        param: '调用已注册 test 方法',
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
  });
  