import Vue from 'vue'
import login from './views/index.vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import '../public/css/reset.css'
import 'element-ui/lib/theme-chalk/index.css' 

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import  BootstrapVueIcons  from 'bootstrap-vue'
import axios from 'axios';
Vue.prototype.$axios = axios;

import qs from 'qs'
Vue.prototype.$qs = qs;



//自动生成头像组件

import Avatar from 'vue-avatar'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
