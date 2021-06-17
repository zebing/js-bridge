let uuid: number = 0;

export const register: Function = (callback: Function) => {
  const randString: string = Math.random().toString(32).slice(2);
  const name: string = `__JSBRIDGE_CALLBACK_${++uuid}_${randString}`;
  (window as any)[name] = (body: any) => {
    callback(body);
    delete (window as any)[name]; // 解绑回调函数，释放内存
  };

  return name;
}