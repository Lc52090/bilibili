import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/common/reset.styl'
import 'vant/lib/index.css'
import http from '../http'
import { Toast, Field, Icon, Uploader, Dialog, ActionSheet, Tab, Tabs, List } from 'vant'
import './assets/style.css'

Vue.prototype.$http = http
Vue.prototype.$msg = Toast

Vue.use(Toast)
Vue.use(Field)
Vue.use(Icon)
Vue.use(Uploader)
Vue.use(Dialog)
Vue.use(ActionSheet)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(List)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
