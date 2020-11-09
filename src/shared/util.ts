const call: Function = (value: String) => Object.prototype.toString.call(value);

export const isArray: Function = (value: string) => call(value) === '[object Array]';

export const isObject: Function = (value: string) => call(value) === '[object Object]';

export const isFunction: Function = (value: string) => call(value) === '[object Function]';

export const omit: Function = (data: object, property) => {
  if (!property) {
    return data;
  }

  const prop: string[] = isArray(property) ? property : [property];

  return Object.keys(data).reduce((newData: object, value: string) => {
    if (!prop.includes(value)) {
      newData[value] = data[value];
    }

    return newData;
  }, {})
}

export interface Options {
  callback?: unknown
}

export interface Adapter {
  support(name: string): boolean;
  run(name: string, options: Options): void;
}