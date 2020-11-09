import { isFunction, printRegistTips } from './shared';
interface JsBridgr {
  run(options: object): void;
}
const jsBridgr: JsBridgr = {
  run(options: object): any {}
}

export default new Proxy(jsBridgr, {
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