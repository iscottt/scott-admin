import http from '../axios';
const isDev = import.meta.env.DEV;
const apiUrl = isDev ? 'http://localhost:7345/api' : '/api';
/**
 * 获取验证码
 * @param phone - 手机号
 * @returns - 返回boolean值表示是否发送成功
 */
export function fetchSmsCode(phone: string) {
  return http.request(
    {
      url: '/getSmsCode',
      method: 'POST',
      params: { phone },
    },
    {
      apiUrl: '/mock',
      isTransformRequestResult: false,
    }
  );
}

/**
 * 登录
 * @param phone - 手机号
 * @param pwdOrCode - 密码或验证码
 * @param type - 登录方式: pwd - 密码登录; sms - 验证码登录
 */
export function fetchLogin(username: string, password: string) {
  return http.request(
    {
      url: '/auth/login',
      method: 'POST',
      params: { username, password },
    },
    {
      apiUrl,
      isTransformRequestResult: false,
    }
  );
}

/** 获取用户信息 */
export function fetchUserInfo() {
  return http.request(
    {
      url: '/auth/getLoginUser',
      method: 'GET',
    },
    {
      apiUrl,
      isTransformRequestResult: false,
    }
  );
}

/**
 * 获取用户路由数据
 * @param userId - 用户id
 * @description 后端根据用户id查询到对应的角色类型，并将路由筛选出对应角色的路由数据返回前端
 */
export function fetchUserRoutes(userId: string) {
  return http.request(
    {
      url: '/menu/getRoutes',
      method: 'POST',
      params: { userId },
    },
    {
      apiUrl,
      isTransformRequestResult: false,
    }
  );
}

/**
 * 注册
 * @param params
 */
export function register(params) {
  return http.request(
    {
      url: '/auth/register',
      method: 'POST',
      params,
    },
    {
      apiUrl,
      isTransformRequestResult: false,
    }
  );
}

/**
 * 刷新token
 * @param verifyToken
 */
export function fetchUpdateToken(verifyToken: string) {
  return http.request(
    {
      url: '/auth/refreshToken',
      method: 'POST',
      params: { verifyToken },
    },
    {
      apiUrl,
      isTransformRequestResult: false,
    }
  );
}
