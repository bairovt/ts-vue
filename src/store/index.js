import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import jwtDecode from 'jwt-decode'
import axiosInst from '@/utils/axios-instance'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    loading: false,
    error: null,
    rules: {
      required: (v) => !!v || 'Обязательное поле',
      email: (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,5})+$/.test(v) || 'E-mail must be valid'
    },
    statuses: [
      { text: "СОЗДАН", value: "CREATED" },
      { text: "ЗАВЕРШЕН", value: "DONE" }
    ],
    meats: [
      { text: "Говядина", value: "BEEF" },
      { text: "Свинина", value: "PORK" },
      { text: "Баранина", value: "MUTTON" }
    ],
    allProviders: [],
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
    setAllProviders(state, payload) {
      state.allProviders = payload
    },
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
    },
    loadAllProviders({ commit }) {
      axiosInst.get('/api/providers', {
        params: {
          search: ''
        }
      }) // загрузка всех поставщиков при создании App (временное решение)
        .then(resp => {
          commit('setAllProviders', resp.data.providers);
        })
        .catch(console.error);
    },
  }
})