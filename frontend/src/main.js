import Vue from 'vue'
import './components'
import App from './App'
import i18n from '@/i18n'
import router from '@/router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import axios from 'axios'
Vue.prototype.$http = axios
axios.defaults.baseURL = process.env.VUE_APP_API_URL || 'https://y1sn7zzg5h.execute-api.us-east-1.amazonaws.com/dev/api/'

axios.defaults.headers.get['Accept'] = 'application/json'

Vue.use(Vuetify, {
  iconfont: 'mdi'
})

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  render: h => h(App)
}).$mount('#app')
