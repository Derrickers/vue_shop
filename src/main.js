import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
//导入全局样式表
import './assets/css/global.css'
import router from './router'

import axios from 'axios'
import querystring from 'querystring'

axios.defaults.baseURL = 'http://localhost:8000/';
axios.defaults.timeout = 10000;
axios.defaults.transformRequest = [data => {
  return querystring.stringify(data);
}];
axios.interceptors.request.use(config =>{
    console.log("拦截器已执行");
    console.log(config.headers);
  config.headers['Authorization']=window.sessionStorage.getItem("token");
  return config;
});
Vue.prototype.$http = axios;
Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
