/** 用户相关模块 */
declare namespace Auth {
  /**
   * 用户角色类型
   * - super: 超级管理员
   * - admin: 管理员
   * - test: 测试
   * - visitor: 游客
   */
  type RoleType = 'super' | 'admin' | 'test' | 'visitor';

  /** 用户信息 */
  interface UserInfo {
    /** 用户id */
    id: string;
    /** 用户名 */
    username: string;
    /** 用户角色类型 */
    userRole: RoleType;
    /** 用户邮箱 */
    email: string;
  }
}
