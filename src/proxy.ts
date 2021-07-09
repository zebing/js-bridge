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
      const callback: boolean | Function = options.callback;
      if (callback) {
        const callbackFN = function (body: object) {
          if (typeof callback === 'function') {
            callback(body);
          }
          resolve(body);
        }
        options.callback = register(name, callbackFN);
      }
      

      // 检查name 是否支持
      if (!runner.support(name)) {
        let platform = 'unknown';
        try {
          platform = window.navigator.userAgent;
        } catch(err) {}
        printRegistTips({ name, platform, options, error: {} });
        resolve({});
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

      // 用户自定义方法执行
      return runner.run.bind(target, prop);
    }
  });
}