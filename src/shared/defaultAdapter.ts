import { printDefaultAdapterTips, printRegistTips } from './tooltips';
import { Options, AdapterBase } from './util';

export default class defaultAdapter implements AdapterBase {
  platform(): boolean {
    printDefaultAdapterTips();
    return true;
  }

  support(name: string): boolean {
    return false;
  }

  run(name: string, options: Options = {}): void {
    printRegistTips({ name, platrform: 'unrecognized', options, error: {} });
  }
}