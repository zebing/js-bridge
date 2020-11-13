import { AdapterBase, getAdapter, register } from './shared';
import IOS from './ios';
import Android from './android';
import proxy from './proxy';

export default proxy(getAdapter([new IOS(), new Android()]));

export const create = (adapters: AdapterBase[]) => {
  const adapter: AdapterBase = getAdapter([...adapters, new IOS(), new Android()]);
  return proxy(adapter);
}

export { register };