// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)//全局引用ElementUI
import $ from 'jquery'
import store from './store/index'//引入store
import Mint from 'mint-ui'
import axios from 'axios'
import 'mint-ui/lib/style.css' //样式文件需要单独加载
//axios.defaults.headers.post['Content-Type']= 'application/x-www-form-urlencoded;charset=UTF-8'  //'text/plain' application/json
Vue.prototype.axios = axios
Vue.config.productionTip = false

Date.prototype.format = function(fmt) { 
  var o = { 
     "M+" : this.getMonth()+1,                 //月份 
     "d+" : this.getDate(),                    //日 
     "h+" : this.getHours(),                   //小时 
     "m+" : this.getMinutes(),                 //分 
     "s+" : this.getSeconds(),                 //秒 
     "q+" : Math.floor((this.getMonth()+3)/3), //季度 
     "S"  : this.getMilliseconds()             //毫秒 
 }; 
 if(/(y+)/.test(fmt)) {
         fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
 }
  for(var k in o) {
     if(new RegExp("("+ k +")").test(fmt)){
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      }
  }
 return fmt; 
}        




Vue.use(Mint);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  $,  store,
  components: { App },
  template: '<App/>'
})
