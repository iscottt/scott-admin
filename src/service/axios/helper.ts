import type { AxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store';
import { getRefreshToken, setToken, setRefreshToken } from '@/utils';
import { fetchUpdateToken } from '../api';

/**
 * 刷新token
 * @param axiosConfig - token失效时的请求配置
 */
export async function handleRefreshToken(axiosConfig: AxiosRequestConfig) {
  const { resetAuthStore } = useAuthStore();
  const refreshToken = getRefreshToken();
  const { retData } = await fetchUpdateToken(refreshToken);
  if (retData) {
    setToken(retData.token);
    setRefreshToken(retData.refreshToken);
    const config = { ...axiosConfig };
    if (config.headers) {
      config.headers.Authorization = 'Bearer ' + retData.token;
      config.url! += '?timestamps=' + new Date().getTime();
    }
    return config;
  }

  resetAuthStore();
  return null;
}
