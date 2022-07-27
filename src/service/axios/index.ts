import { router } from '@/router';
import { getToken, clearLocal } from '@/utils';
// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动

import { VAxios } from './Axios';
import { AxiosTransform } from './axiosTransform';
import axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import { checkStatus } from './checkStatus';
import { Modal, message } from 'ant-design-vue';
import { RequestEnum, ResultEnum } from '@/enum';

import { isString } from '../is';
import { setObjToUrlParams } from './urlUtils';

import { RequestOptions, Result } from './types';

const isDev = import.meta.env.DEV;
axios.defaults.withCredentials = true;
/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  /**
   * @description: 处理请求数据
   */
  transformRequestData: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const {
      isTransformRequestResult,
      isShowMessage = true,
      isShowErrorMessage,
      isShowSuccessMessage,
      successMessageText,
      errorMessageText,
      isDownload,
    } = options;

    const reject = Promise.reject;
    const { data } = res;
    //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    const { retCode, retData, retMessage } = data;
    // 请求成功
    const hasSuccess = retCode === ResultEnum.SUCCESS;
    // 是否显示提示信息
    if (isShowMessage) {
      // message.destroy()
      if (hasSuccess && (successMessageText || isShowSuccessMessage)) {
        // 是否显示自定义信息提示
        message.success(successMessageText || retMessage || '操作成功！');
      } else if (!hasSuccess && (errorMessageText || isShowErrorMessage)) {
        // 是否显示自定义信息提示
        message.error(retMessage || errorMessageText || '操作失败！');
      } else if (!hasSuccess && options.errorMessageMode === 'modal') {
        // errorMessageMode=‘custom-modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
        Modal.confirm({ title: '错误提示', content: retMessage });
      }
    }
    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformRequestResult && retCode === ResultEnum.SUCCESS) {
      return res.data;
    }

    if (!data) {
      // return '[HTTP] Request has no return value';
      return reject(data);
    }
    if (isDownload) {
      return res;
    }

    // 接口请求成功，直接返回结果
    if (retCode === ResultEnum.SUCCESS) {
      return retData;
    }
    if (retCode === ResultEnum.FAIL) {
      console.log('fail');
      const msg = '操作失败,系统异常!';
      message.error(msg);
      Promise.reject(new Error(msg));
    }
    // 登录超时
    if (retCode === ResultEnum.TIMEOUT) {
      if (router.currentRoute.value.name == 'login') return;
      // 到登录页
      const timeoutMsg = '登录身份已失效,请重新登录!';
      Modal.destroyAll();
      Modal.warning({
        title: '提示',
        content: timeoutMsg,
        onOk: () => {
          clearLocal();
          router.replace({
            name: 'login',
          });
        },
      });
      return reject(new Error(timeoutMsg));
    }
    // 接口请求错误，统一提示错误信息
    if (retCode > 0) {
      if (retMessage) {
        message.error(retMessage);
        Promise.reject(new Error(retMessage));
      } else {
        const msg = '操作失败,系统异常!';
        message.error(msg);
        Promise.reject(new Error(msg));
      }
      return res;
    }

    // 这里逻辑可以根据项目进行修改
    if (!hasSuccess) {
      return reject(new Error(retMessage));
    }

    return data;
  },

  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinParamsToUrl, isParseToJson } = options;
    config.url = isDev ? `${apiUrl || ''}${config.url}` : `${apiUrl || ''}${config.url}`;

    if (config.method === RequestEnum.GET) {
      const now = new Date().getTime();
      if (!isString(config.params)) {
        config.data = {
          // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
          params: Object.assign(config.params || {}, {
            _t: now,
          }),
        };
      } else {
        // 兼容restful风格
        config.url = config.url + config.params + `?_t=${now}`;
        config.params = {};
      }
    } else {
      if (!isString(config.params)) {
        config.data = config.params;
        config.params = {};
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(config.url as string, config.data);
        }
      } else {
        // 兼容restful风格
        config.url = config.url + config.params;
        config.params = {};
      }
      // 'a[]=b&a[]=c'
      if (!isParseToJson) {
        config.params = qs.stringify(config.params, { arrayFormat: 'brackets' });
        config.data = qs.stringify(config.data, { arrayFormat: 'brackets' });
      }
    }
    return config;
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config) => {
    // 请求之前处理config
    if (config.headers) {
      // 设置token
      config.headers.Authorization = 'Bearer ' + getToken();
    }
    return config;
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: async (error: any) => {
    const { response, code, message } = error || {};
    const msg: string = response && response.data && response.data.error ? response.data.error.message : '';
    const err: string = error.toString();
    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        message.error('接口请求超时,请刷新页面重试!');
        return;
      }
      if (err && err.includes('Network Error')) {
        Modal.confirm({
          title: '网络异常',
          content: '请检查您的网络连接是否正常!',
        });
        return;
      }
    } catch (error: any) {
      throw new Error(error);
    }
    // 请求是否被取消
    const isCancel = axios.isCancel(error);
    if (!isCancel) {
      checkStatus(error.response && error.response.status, msg);
    } else {
      console.warn(error, '请求被取消！');
    }
    return error;
  },
};

const Axios = new VAxios({
  timeout: 30 * 1000,
  withCredentials: true,
  // 基础接口地址
  // baseURL: globSetting.apiUrl,
  // 接口可能会有通用的地址部分，可以统一抽取出来
  // prefixUrl: prefix,
  // headers: {
  //   'Content-Type': ContentTypeEnum.JSON,
  //   'Access-Control-Allow-Credentials': 'true'
  // },
  // 数据处理方式
  transform,
  // 配置项，下面的选项都可以在独立的接口请求中覆盖
  requestOptions: {
    // 默认将prefix 添加到url
    joinPrefix: true,
    // 需要对返回数据进行处理
    isTransformRequestResult: true,
    // post请求的时候添加参数到url
    joinParamsToUrl: false,
    // 格式化提交参数时间
    formatDate: true,
    // 消息提示类型
    errorMessageMode: 'none',
    // 接口地址
    apiUrl: import.meta.env.VITE_APP_API_URL as string,
  },
});

export default Axios;
