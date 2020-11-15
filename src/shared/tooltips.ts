import { AdapterBase } from './util';

interface Tips {
  name: string,
  platform: string,
  options: object,
  error?: object
};

export const printRegistTips: Function = ({ name, platform, options, error = {} }: Tips): void => {
  console.warn(`[Not registered] 方法 "${name}" 未注册; 详情请查看: `, { api: name, platform, options, error });
};

export const printErrorTips = ({ name, platform, options, error = {} }: Tips): void => {
  console.warn(`[call Error] 方法 "${name}" 执行出错; 详情请查看: `, { api: name, platform, options, error });
};

export const printAdapterTips = (): void => {
  console.warn(`[Invalid Adapter] 没有可用Adapter, 请通过 create 方法进行配置，或检查是否满足以下格式。{ platrform: [Function], support: [Function], run: [Function]}`);
}

export const printFunctionTips = (name: string, adapter: AdapterBase): void => {
  console.warn(`[Uncaught ReferenceError] adapter ${name} 方法未定义, adapter详情： `, adapter);
}