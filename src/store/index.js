import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import jwtDecode from 'jwt-decode'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    loading: false,
    error: null,
    rules: {
      required: (v) => !!v || 'Обязательное поле',
      email: (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,5})+$/.test(v) || 'E-mail must be valid',
      min: (min) => {
        return (v) => {
          if (v && v.length >= min) {
            return true
          } else {
            return `Мин. длина: ${min}`
          }
        }
      },
      numeric: (v) => Number.isFinite(+v) || 'Числовое поле'
    },
    statuses: [
      { text: "Создан", value: "CREATED" },
      { text: "Привез", value: "DELIVERED" },
      { text: "Не привез", value: "FAILED" }
    ],
    meats: [
      { text: "Говядина", value: "BEEF" },
      { text: "Свинина", value: "PORK" },
      { text: "Баранина", value: "MUTTON" },
      { text: "Конина", value: "HORSE" }
    ],
    createOrderDialog: false,
    newOrder: {}
  },
  getters: {
    errorDialog(state) {
      return !!(state.error && state.error.dialog);
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    setLoading(state, payload) {
      state.loading = payload // boolean
    },
    setError(state, appError) {
      const defaultErrorMsgs = { 500: 'Ошибка сервера', 404: 'Не найдено', 403: 'Запрещено', 401: 'Ошибка авторизации', 400: 'bad request' }
      state.error = appError
      if (!state.error.message) {
        Vue.set(state.error, 'message', defaultErrorMsgs[appError.status])
      }
      // when 401 there is no need to open error dialog due to alert is already shown
      if (appError.status !== 401) Vue.set(state.error, 'dialog', true)
    },
    clearError(state) {
      state.error = null
    },
    setCreateOrderDialog(state, payload) {
      state.createOrderDialog = payload;
    },
    newOrderSetDate(state, payload) {
      state.newOrder.date = payload;
    },
    clearNewOrder(state) {
      state.newOrder = {};
    }
  },
  actions: {
    autoLogin({
      commit
    }) {
      const authToken = window.localStorage.getItem('authToken')
      if (authToken) {
        commit('setUser', jwtDecode(authToken)); // todo: разлогинивание конкретного юзера с сервера
      } else {
        router.push('/login')
      }
    },
    logout({
      commit
    }) {
      commit('setUser', null)
      window.localStorage.removeItem('authToken')
      router.push('/login')
    }
  }
})