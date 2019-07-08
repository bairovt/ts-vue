import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import jwtDecode from 'jwt-decode'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: null,
    loading: false,
    error: null,
    rightDrawer: false,
    rules: {
      required: (v) => !!v || 'Обязательное поле',
      email: (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,5})+$/.test(v) || 'E-mail must be valid'
    }
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
      const defaultErrorMsgs = { 500: 'Ошибка сервера', 403: 'Запрещено', 401: 'Ошибка авторизации', 400: 'bad request' }
      state.error = appError
      if (!state.error.message) {
        Vue.set(state.error, 'message', defaultErrorMsgs[appError.status])
      }
      // when 401 there is no need to open error dialog due to alert is already  shown
      if (appError.status !== 401) Vue.set(state.error, 'dialog', true)
    },
    clearError(state) {
      state.error = null
    },
    setRightDrawer(state, payload) {
      state.rightDrawer = payload
    }
  },
  actions: {
    autoSingIn({
      commit,
      dispatch
    }) {
      const authToken = window.localStorage.getItem('authToken')
      if (authToken) {
        commit('setUser', jwtDecode(authToken)); // todo: разлогинивание конкретного юзера с сервера
      } else {
        router.push('/signin')
      }
    },
    logOut({
      commit
    }) {
      commit('setUser', null)
      window.localStorage.removeItem('authToken')
      router.push('/login')
    }
  }
})