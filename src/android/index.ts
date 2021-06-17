import { isFunction, register, printErrorTips, Options, AdapterBase } from '../shared';

declare const window: Window & { jsBridgeMethods: any };

export default class Android implements AdapterBase {

  platform (): boolean {
    if (typeof window !== 'object') {
      return false;
    }
    
    const userAgent: string = window.navigator.userAgent;
    return userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1;
  }

  support (name: string): boolean {
    const apis: any = window.jsBridgeMethods || {};
    const support = isFunction(apis[name]);

    return support;
  }

  run (name: string, options: Options) {
    try {
      window.jsBridgeMethods[name](JSON.stringify(options));
    } catch (error) {
      printErrorTips({ name, platform: 'android', options, error });
    }
  }
}