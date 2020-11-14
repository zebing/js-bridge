
describe('未知平台', () => {
  test('没有可用 adapter', () => {
    const mockCallback = jest.fn(text => text);
    console.error = mockCallback;
    const JsBridge = require('../../dist').default;
    JsBridge.test({});
    const result = '[Invalid Adapter] 没有可用Adapter, 请通过 create 方法进行配置，或检查是否满足以下格式。{ platrform: [Function], support: [Function], run: [Function]}';
    expect(mockCallback.mock.results[0].value).toBe(result);
  });
});
