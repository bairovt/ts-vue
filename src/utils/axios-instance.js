'use strict';
const axios = require('axios');
import store from '@/store'

const axiosInst = axios.create({
  // baseURL: process.env.VUE_APP_API_URL,
  baseURL: 'http://localhost:7000',
  // baseURL: 'http://ts.helped.me',
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
    store.commit('setLoading', false);
    let message;
    if (!error.request) {
      // Something happened in setting up the request that triggered an Error (when cancel too)
      // console.error('Something happened in setting up the request: ' + error);
      message = 'Something happened in setting up the request: ' + error;
    }
    store.commit('setError', {
      status: -1,
      message: message || error.message || 'something wrong happened with request'
    });
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
    store.commit('setLoading', false)
    if (error.response) {
      const status = error.response.status
      if (
        status === 401 // when jwt changed etc
        // router.history.current.path !== '/login'
      ) {
        store.dispatch('logout')
      } else {
        store.commit('setError', {
          status,
          message: error.response.data.message
        })
      }
    } else {
      store.commit('setError', {
        status: 0,
        message: error.message || 'something wrong happened'
      });
    }
    return Promise.reject(error);
  });

export default axiosInst;