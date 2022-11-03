import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import TaskManager from './TaskManager'
import UserManager from './UserManager'
Vue.component('app-task-manager', TaskManager)
Vue.component('app-user-manager', UserManager)

Vue.use(Antd)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
