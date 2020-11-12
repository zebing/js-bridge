import { AdapterBase } from './util';

interface Tips {
  name: string,
  platrform: string,
  options: object,
  error?: object
};

export const printRegistTips: Function = ({ name, platrform, options, error = {} }: Tips): void => {
  console.warn(`[Not registered] 方法 "${name}" 未注册; 详情请查看: `, { api: name, platrform, options, error });
};

export const printErrorTips = ({ name, platrform, options, error = {} }: Tips): void => {
  console.warn(`[call Error] 方法 "${name}" 执行出错; 详情请查看: `, { api: name, platrform, options, error });
};

export const printDefaultAdapterTips = (): void => {
  console.warn(`[Invalid Adapter] 该平台没有Adapter可用, 请通过 create 方法进行配置。`);
}

export const printDefinedTips = (name: string, adapter: AdapterBase): void => {
  console.warn(`[Uncaught ReferenceError] ${name} 未定义，create 传入的 adapter 应满足如下格式： { platform: function() {}, support: function() {}, run: function() {} }, 当前参数为： `, adapter);
}