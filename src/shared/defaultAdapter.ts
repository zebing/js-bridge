import { Options, AdapterBase } from './util';

export default class defaultAdapter implements AdapterBase {
  platform(): boolean {
    return true;
  }

  support(name: string): boolean {
    return false;
  }

  run(name: string, options: Options = {}): void {}
}