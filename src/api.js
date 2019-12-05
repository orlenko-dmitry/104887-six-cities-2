import axios from 'axios';

import aData from './store/data/actions.js';
import {AXIOS_CONFIG} from './consts/index.js';

const {
  BASE_URL,
  TIME_OUT,
  WITH_CREDENTIAL,
} = AXIOS_CONFIG;

export const createApi = (dispatch) => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    withCredentials: WITH_CREDENTIAL,
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    if (err.response.status === 401) {
      dispatch(aData.signIn());
    }
    return Promise.reject(err);
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
