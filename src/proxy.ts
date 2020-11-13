import { printRegistTips, defaultAdapter, printFunctionTips, isFunction } from './shared';

export default (runner) => {
  return new Proxy(runner, {
    get(target, prop): Function {

      // target不支持 prop 方法
      if (!target.support(prop)) {
        return function (options): void {
          let platform = 'unknown';
          try {
            platform = window.navigator.userAgent;
          } catch(err) {}
          
          if (!(target instanceof defaultAdapter)) {
            printRegistTips({ name: prop, platform, options, error: {} });
          }
        };
      }

      return target.run.bind(target, prop);
    }
  });
}