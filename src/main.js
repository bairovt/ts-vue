import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Alert from './components/Shared/Alert.vue'
import ErrorDialog from './components/Shared/ErrorDialog.vue'


Vue.config.productionTip = false

Vue.component('app-alert', Alert)
Vue.component('error-dialog', ErrorDialog)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
