import { AdapterBase, getAdapter } from './shared';
import IOS from './ios';
import Android from './android';
import proxy from './proxy';

export const create = (adapters: AdapterBase[]) => {
  const adapter: AdapterBase = getAdapter(adapters);
  return proxy(adapter);
}

const adapter: AdapterBase = getAdapter([new IOS(), new Android()]);
export default proxy(adapter);