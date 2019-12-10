import axios from 'axios';

import {
  AXIOS_CONFIG,
  ROUTES,
} from './consts/index.js';
import history from './history.js';

const {
  BASE_URL,
  TIME_OUT,
  WITH_CREDENTIAL,
} = AXIOS_CONFIG;

export const createApi = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    withCredentials: WITH_CREDENTIAL,
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    const {config: {url}, data: {error}} = err.response;
    if (err.response.status === 401 && url.includes(ROUTES.FAVORITE)) {
      history.push(ROUTES.AUTH);
    }
    return Promise.reject(error);
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
