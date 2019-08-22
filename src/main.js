import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Alert from './components/Shared/Alert.vue'
import ErrorDialog from './components/Shared/ErrorDialog.vue'
import ProvidersList from './components/Providers/ProvidersList.vue'
import ProviderFields from './components/Providers/ProviderFields.vue'
import UsersList from './components/Users/UsersList.vue'

Vue.config.productionTip = false

Vue.component('app-alert', Alert)
Vue.component('error-dialog', ErrorDialog)
Vue.component('providers-list', ProvidersList)
Vue.component('provider-fields', ProviderFields)
Vue.component('users-list', UsersList)

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    this.$store.dispatch('autoLogin')
  }
}).$mount('#app')
