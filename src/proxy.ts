import { printRegistTips, defaultAdapter, printAdapterTips } from './shared';

export default (runner) => {
  const _run = runner.run;
  const run  = function (name, options) {
    if (!runner.support(name)) {
      let platform = 'unknown';
      try {
        platform = window.navigator.userAgent;
      } catch(err) {}
      printRegistTips({ name, platform, options, error: {} });
      return;
    }
  
    _run.apply(runner, arguments);
  }

  if (typeof Proxy !== "function") {
    runner.run = run;
    return runner;
  }

  return new Proxy(runner, {
    get(target, prop): Function {
      if (target instanceof defaultAdapter) {
        printAdapterTips();
        return function (): void {} 
      }

      if (prop === 'run') {
        return run;
      }

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