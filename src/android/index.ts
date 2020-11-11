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
    const apis: object = window['jsBridgeMethods'] || {};
    return isFunction(apis[name]);
  }

  run (name: string, options: Options): void {
    const callback = options.callback;
    let data: Options = options;
    
    try {
      if (callback) {
        data.callback = register(callback);
      }
      
      window.jsBridgeMethods[name](JSON.stringify(data));
    } catch (error) {
      printErrorTips({ name, platrform: 'android', options, error });
    }
  }
}