import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Antd from 'ant-design-vue'
import router from './routes'
import 'ant-design-vue/dist/antd.css'
import {store} from '@/store/index.js'

Vue.use(Antd)
Vue.use(VueRouter)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
