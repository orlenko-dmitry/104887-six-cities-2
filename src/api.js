import axios from 'axios';
import {toast} from 'react-toastify';

import {
  AxiosConfig,
  AppRoute,
  ResponseStatus,
} from './consts/consts.js';
import history from './history.js';

const {
  BASE_URL,
  TIME_OUT,
  WITH_CREDENTIAL,
} = AxiosConfig;

export const createApi = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    withCredentials: WITH_CREDENTIAL,
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    const {config: {url}, data: {error}} = err.response;
    if (err.response.status === ResponseStatus.UNAUTHORIZED && url.includes(AppRoute.FAVORITE)) {
      history.push(AppRoute.AUTH);
    }
    if (err.response.status === ResponseStatus.NOT_FOUND) {
      toast.error(error);
    }

    return Promise.reject(error);
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
