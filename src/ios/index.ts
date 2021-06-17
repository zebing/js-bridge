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
    try {
      window.webkit.messageHandlers[name].postMessage(JSON.stringify(options));
    } catch (error) {
      printErrorTips({ name, platform: 'ios', options, error })
    }
  }
}