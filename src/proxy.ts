import { 
  printRegistTips, 
  defaultAdapter, 
  printAdapterTips, 
  AdapterBase, 
  register,
  isFunction
} from './shared';

export default (runner: AdapterBase) => {
  const _run = runner.run;
  runner.run  = function (name: string, options: any = {}) {
    return new Promise((resolve, reject) => {
      // 处理callback 方法
      const callback = options.callback;
      const callbackFN = function (body: object) {
        if (isFunction(callback)) {
          callback(body);
        }
        resolve(body);
      }
      options.callback = register(callbackFN);

      // 检查name 是否支持
      if (!runner.support(name)) {
        let platform = 'unknown';
        try {
          platform = window.navigator.userAgent;
        } catch(err) {}
        printRegistTips({ name, platform, options, error: {} });
        return;
      }
    
      _run.call(runner, name, options);
    })
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
      
      // runner方法名拦截，若用户定义方法名与之相同，将被覆盖
      if (['support', 'platform', 'run'].includes(prop)) {
        return (runner as any)[prop];
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

      // 用户自定义方法执行
      return runner.run.bind(target, prop);
    }
  });
}