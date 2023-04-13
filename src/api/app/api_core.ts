import { getToken, signOut } from '@app/utils/redux.util';
import axios from 'axios';

export const apiInstance = axios.create();

apiInstance.interceptors.request.use(
  function (config) {
    const token = getToken();
    config.headers = {
      ...config.headers,
      Authorization: `${token}`,
    };
    config.paramsSerializer = (params) => {
      return params;
    };
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

apiInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.data.message.toLowerCase() === 'phiên đăng nhập hết hạn') {
      signOut();
    } else {
      return response.data;
    }
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if ((error.response.data.message || '').includes('Phiên đăng nhập hết hạn')) {
      console.log('duy nè');
      signOut();
      return Promise.reject({
        message: 'Phiên đăng nhập hết hạn vui lòng đăng nhập lại',
      });
    }
    return Promise.reject(error.response.data);
  },
);
