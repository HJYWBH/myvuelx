import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router/router.js'
import '@/styles/index.less'
import store from '@/store.js'
import axios from '@/api/commont.js'

Vue.prototype.$axios = axios

Vue.config.productionTip = false
Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  var token = localStorage.getItem('getToken')
  if (token || to.path === '/login') {
    next()
  } else if (!token || to.path !== '/login') {
    next({ path: '/login' })
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
