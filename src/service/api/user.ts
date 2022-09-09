import http from '../httpUtil';
const isDev = import.meta.env.DEV;
const apiUrl = isDev ? 'http://localhost:7345/api' : '/api';

/**
 * 分页获取用户
 * @param verifyToken
 */
export function getUserByPage(params) {
  return http.request(
    {
      url: '/user/page',
      method: 'POST',
      params,
    },
    {
      apiUrl,
      isTransformRequestResult: true,
    }
  );
}

/**
 * 更新用户
 * @param params
 * @returns
 */
export function updateUser(params) {
  return http.request(
    {
      url: '/user/update',
      method: 'PUT',
      params,
    },
    {
      apiUrl,
      isTransformRequestResult: true,
    }
  );
}

/**
 * 插入新用户
 * @param params
 * @returns
 */
export function insertUser(params) {
  return http.request(
    {
      url: '/user/insert',
      method: 'POST',
      params,
    },
    {
      apiUrl,
      isTransformRequestResult: false,
      successMessageText: '操作成功',
    }
  );
}

/**
 * 删除用户
 * @param params
 * @returns
 */
export function deleteUser(id) {
  return http.request(
    {
      url: `/user/delete/${id}`,
      method: 'DELETE',
    },
    {
      apiUrl,
      isTransformRequestResult: false,
      successMessageText: '操作成功',
    }
  );
}

export function downloadUser() {
  return http.request(
    {
      url: `/user/download`,
      method: 'POST',
    },
    {
      apiUrl,
      isTransformRequestResult: false,
      isDownload: true,
      successMessageText: '下载成功',
    }
  );
}
