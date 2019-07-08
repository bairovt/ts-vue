'use strict';
const axios = require('axios');
import {
  store
} from '@/store'
const axiosInst = axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT,
  timeout: process.env.NODE_ENV === 'development' ? 60000 : 10000 // todo: error dialog when canceled by timeout
});

axiosInst.interceptors.request.use(
  function (config) {
    const authToken = window.localStorage.getItem('authToken'); // token or null
    if (authToken) config.headers.Authorization = 'Bearer ' + authToken;
    store.commit('setLoading', true)
    return config;
  },
  function (error) {
    store.commit('setLoading', false)
    if (!error.request) {
      // Something happened in setting up the request that triggered an Error (when cancel too)
      console.error('Something happened in setting up the request: ' + error);
    }
    return Promise.reject(error);
  }
);

axiosInst.interceptors.response.use(
  function (response) {
    store.commit('setLoading', false);
    return response;
  },
  function (error) {
    // The request was made, but the server responded with a status code that falls out of the range of 2xx
    console.error(error.response)
    const status = error.response.status
    store.commit('setLoading', false)
    let appError = {
      status,
      message: error.response.data.message
    }
    if (status === 404) { return router.replace('/404') }
    if (
      status === 401 &&
      router.history.current.path !== '/signin'
    ) {
      console.error('auth error: redirect to login')
      return store.dispatch('logOut')
    }
    store.commit('setError', appError)
    // return Promise.reject(error);
  });

export default axiosInst;