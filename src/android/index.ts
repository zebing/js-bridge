import { isFunction, register, printErrorTips, Options, Adapter } from '../shared';

declare const window: Window & { AppMethods: any };

export default class Android implements Adapter {

  support (name: string): boolean {
    const apis: object = window['AppMethods'] || {};
    return isFunction(apis[name]);
  }

  run (name: string, options: Options): void {
    const callback = options.callback;
    let data: Options = options;
    
    try {
      if (callback) {
        data.callback = register(callback);
      }
      
      window.AppMethods[name](JSON.stringify(data));
    } catch (error) {
      printErrorTips({ name, platrform: 'android', options, error })
    }
  }
}