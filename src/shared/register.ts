let uuid: number = 0;
let cache = new Map();

export const register: Function = (methodName: string, callback: Function) => {
  const oldName = cache.get(methodName);
  if (oldName && (window as any)[oldName]) {
    return oldName;
  }

  const randString: string = Math.random().toString(32).slice(2);
  const name: string = `__JSBRIDGE_CALLBACK_${methodName}_${++uuid}_${randString}`;
  cache.set(methodName, name);

  (window as any)[name] = (body: any) => {
    callback(body);
    delete (window as any)[name]; // 解绑回调函数，释放内存
    cache.delete(methodName);
  };

  return name;
}