import { printRegistTips, defaultAdapter, printAdapterTips, AdapterBase } from './shared';

export default (runner: AdapterBase) => {
  const _run = runner.run;
  runner.run  = function (name: string, options: any) {
    if (!runner.support(name)) {
      let platform = 'unknown';
      try {
        platform = window.navigator.userAgent;
      } catch(err) {}
      printRegistTips({ name, platform, options, error: {} });
      return;
    }
  
    _run.call(runner, name, options);
  }

  // 不支持 Proxy
  if (typeof Proxy !== "function") {
    return runner;
  }

  return new Proxy(runner, {
    get(target: any, prop: string): Function {
      // 没有 Adapter 可用
      if (target instanceof defaultAdapter) {
        printAdapterTips();
        return function (): void {} 
      }

      if (['support', 'platform', 'run'].includes(prop)) {
        return runner[prop];
      }

      // target不支持 prop 方法
      if (!target.support(prop)) {
        return function (options: any): void {
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