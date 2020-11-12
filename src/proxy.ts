import { printRegistTips } from './shared';

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
          printRegistTips({ name: prop, platform, options, error: {} });
        };
      }

      return target.run.bind(target, prop);
    }
  });
}