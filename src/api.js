import axios from 'axios';
import {createBrowserHistory} from 'history';

import {AXIOS_CONFIG, ROUTES} from './consts/index.js';

const history = createBrowserHistory();

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
    if (err.response.status === 401) {
      history.push(ROUTES.AUTH);
    }
    return Promise.reject(err);
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
