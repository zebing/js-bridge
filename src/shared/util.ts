import defaultAdapter from './defaultAdapter';
import { printFunctionTips } from './tooltips';

const call: Function = (value: String) => Object.prototype.toString.call(value);

export const isArray: Function = (value: string) => call(value) === '[object Array]';

export const isObject: Function = (value: string) => call(value) === '[object Object]';

export const isFunction: Function = (value: string) => call(value) === '[object Function]';

export const omit: Function = (data: any, property: any) => {
  if (!property) {
    return data;
  }

  const prop: string[] = isArray(property) ? property : [property];

  return Object.keys(data).reduce((newData: any, value: string) => {
    if (!prop.includes(value)) {
      newData[value] = data[value];
    }

    return newData;
  }, {})
}

export interface Options {
  callback?: unknown
}

export interface AdapterBase {
  platform (): boolean;
  support(name: string): boolean;
  run(name: string, options: Options): Promise<any> | void;
}

export function getAdapter(adapters: AdapterBase[]) {
  const adapter: AdapterBase | undefined = adapters.find((adapter: AdapterBase, index: number) => {
    if (!isFunction(adapter.platform)) {
      return false;
    }
    
    return adapter.platform();
  });

  // adapter 是否存在
  if (!adapter) {
    return new defaultAdapter();
  }

  // support 方法是否存在
  if (!isFunction(adapter.support)) {
    printFunctionTips('support', adapter);
    return new defaultAdapter();
  }

  // run 方法是否存在
  if (!isFunction(adapter.run)) {
    printFunctionTips('run', adapter);
    return new defaultAdapter();
  }

  return adapter;
}