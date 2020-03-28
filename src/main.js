import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import querystring from 'querystring'
import router from './router'
//导入全局样式表
import './assets/css/global.css'

import axios from 'axios'
//配置请求根路径
Vue.prototype.$http=axios.create({
  baseURL:'http://localhost:8000/',
  timeout:10000,
  transformRequest:[data => {
    return querystring.stringify(data);
  }]
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
