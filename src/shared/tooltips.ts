interface Tips {
  name: string,
  platrform: string,
  options: object,
  error?: object
};

export const printRegistTips: Function = ({ name, platrform, options, error = {} }: Tips) => {
  console.warn(`[Not registered] 方法 "${name}" 未注册; 详情请查看: `, { api: name, platrform, options, error });
};

export const printErrorTips = ({ name, platrform, options, error = {} }: Tips) => {
  console.warn(`[call Error] 方法 "${name}" 执行出错; 详情请查看: `, { api: name, platrform, options, error });
};