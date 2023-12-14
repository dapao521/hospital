// src/utils/request.js
import axios from 'axios';
import { ElMessage } from 'element-plus';
import {useCounterStore} from '@/stores/counter';

const request = axios.create({
    method: 'get',
  baseURL: '/api',
  timeout: 5000
});

const handleResponseError = (error) => {
  const errorMessages = {
    400: '请求错误',
    401: '未授权,请登录',
    403: '拒绝访问',
    404: `请求地址出错`,
    408: '请求超时',
    500: '服务器内部错误',
  };

  const message = errorMessages[error.response?.status];
  if (message) {
    ElMessage.error(message);
  }

  console.log(error.message);
  return Promise.reject(error.message);
};

// 请求拦截器
request.interceptors.request.use(
  config => {
    const counterStore = useCounterStore();
    if (counterStore.token.token) {
      // console.log(counterStore.token.token)
      config.headers.token = counterStore.token.token;
    }
    return config;
  },
  error => Promise.reject(error),
);

// 响应拦截器
request.interceptors.response.use(
  res => {
    if (res.data.code === 0) {
      return res;
    }
    ElMessage.error(res.data.message || '服务异常');
    return res.data;
  },
  handleResponseError,
);

export default request;