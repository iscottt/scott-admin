/** 获取登录页面模块的动态路由的正则 */
export function getLoginModuleRegExp() {
  const modules: EnumType.LoginModuleKey[] = ['pwd-login', 'reset-pwd'];
  return modules.join('|');
}
