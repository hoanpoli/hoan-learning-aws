import type { AxiosInstance } from 'axios';
import axios from 'axios';

type DemoAPIParams = {
    cookie?: string;
}

let API: AxiosInstance;

const setupAPIClient = () => {
  API = axios.create({
    baseURL: import.meta.env.VITE_SP_CONFIG,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });

  API.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if(error.response) {
        // eslint-disable-next-line no-console
        console.error(
          JSON.stringify({
            name: '[singpass-api][error]',
            detail: error.response?.data
          })
        );
      } else {
        // eslint-disable-next-line no-console
        console.error('[error]', error);
      }

      return Promise.reject(error);
    }
  )
}

export const initialize = (
  params?: DemoAPIParams,
  anonymous?: boolean
): AxiosInstance => {
  if(params?.cookie || !API || anonymous) {
    setupAPIClient()
  }

  return API;
}

export default initialize;