
const JsBridge = require('../../dist').default;

describe('ios平台', () => {
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
