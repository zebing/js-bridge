import { isFunction, printRegistTips } from './shared';

export default (runner) => {
  return new Proxy(runner, {
    get(target, prop, receiver): Function {
      console.log('run function')
      if (!isFunction(target[prop])) {
        printRegistTips({
          name: prop,
          platrform: 'web',
          options: {},
          error: {}
        });
        return function (): void {}
      }
  
      return target[prop];
    }
  });
}