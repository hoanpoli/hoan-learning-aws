import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import type { ApiParams } from '@/interface/api.interface';
const API_URL = import.meta.env.VITE_BASE_URL;

interface MyAxiosRequestConfig extends AxiosRequestConfig {
  multipart?: boolean;
}

export const methodService = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

const config: AxiosRequestConfig = {
  baseURL: API_URL,
  timeout: 10000
};

const getHeaders = (isMultipart: boolean, token: string | null) => {
  return {
    Accept: 'application/json',
    Authorization: token ? `Bearer ${token}` : '',
    'Content-Type': isMultipart ? 'multipart/form-data' : 'application/json'
  };
};

const instance: AxiosInstance = axios.create(config);

instance.interceptors.request.use((request) => {
  const myRequest = request as MyAxiosRequestConfig;
  const token = localStorage.getItem('token');
  if (request.headers) {
    myRequest.headers = {
      ...request.headers,
      ...getHeaders(!!myRequest.multipart, token || '')
    };
  } else {
    myRequest.headers = getHeaders(!!myRequest.multipart, token || '');
  }
  return request;
});

export const apiService = async <T>(
  params: ApiParams<T>
): Promise<AxiosResponse<T>> => {
  const { data, method, params: queryParams, url } = params;
  const response = await instance({
    url,
    method,
    data,
    params: queryParams,
    timeout: 60000
  });
  return response;
};
