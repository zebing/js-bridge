import { isFunction, register, printErrorTips, Options, AdapterBase } from '../shared';

declare const window: Window & { webkit: any };

export default class IOS implements AdapterBase {
  platform (): boolean {
    if (typeof window !== 'object') {
      return false;
    }

    return !!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  }

  support (name: string): boolean {
    let support: boolean = false;

    try {
      const postMessage: unknown = window.webkit.messageHandlers[name].postMessage;
      if (isFunction(postMessage)) {
        support = true;
      }
    } catch(error) {}

    return support;
  }

  run (name: string, options: Options = {}): void {
    const callback: unknown = options.callback;
    let data: Options = options;

    try {
      if (callback) {
        data.callback = register(callback);
      }

      window.webkit.messageHandlers[name].postMessage(JSON.stringify(data));
    } catch (error) {
      printErrorTips({ name, platrform: 'ios', options, error })
    }
  }
}