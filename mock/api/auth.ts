import type { MockMethod } from 'vite-plugin-mock';

const token: ApiAuth.Token = {
  token: '__TEMP_TOKEN__',
  refreshToken: '__TEMP_REFRESH_TOKEN__',
};

const apis: MockMethod[] = [
  // 获取验证码
  {
    url: '/mock/getSmsCode',
    method: 'post',
    response: (): Service.MockServiceResult<boolean> => {
      return {
        retCode: 200,
        retMessage: 'ok',
        retData: true,
      };
    },
  },
  // 密码登录
  {
    url: '/mock/loginByPwd',
    method: 'post',
    response: (): Service.MockServiceResult<ApiAuth.Token> => {
      return {
        retCode: 200,
        retMessage: 'ok',
        retData: token,
      };
    },
  },
  // 验证码登录
  {
    url: '/mock/loginByCode',
    method: 'post',
    response: (): Service.MockServiceResult<ApiAuth.Token> => {
      return {
        retCode: 200,
        retMessage: 'ok',
        retData: token,
      };
    },
  },
  // 获取用户信息(请求头携带token)
  {
    url: '/mock/getUserInfo',
    method: 'get',
    response: (): Service.MockServiceResult<ApiAuth.UserInfo> => {
      return {
        retCode: 200,
        retMessage: 'ok',
        retData: {
          userId: '0',
          userName: 'Soybean',
          userPhone: '15170283876',
          userRole: 'super',
        },
      };
    },
  },
  {
    url: '/mock/testToken',
    method: 'post',
    response: (option: any): Service.MockServiceResult<true | null> => {
      if (option.headers?.authorization !== token.token) {
        return {
          retCode: 66666,
          retMessage: 'token 失效',
          retData: null,
        };
      }
      return {
        retCode: 200,
        retMessage: 'ok',
        retData: true,
      };
    },
  },
  {
    url: '/mock/updateToken',
    method: 'post',
    response: (): Service.MockServiceResult<ApiAuth.Token> => {
      return {
        retCode: 200,
        retMessage: 'ok',
        retData: token,
      };
    },
  },
];

export default apis;
