// store index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 初始化时用sessionStore.getItem('token'),这样子刷新页面就无需重新登录
const state = {
  user_name: window.localStorage.getItem('user_name'),
  user_id: window.localStorage.getItem('user_id'),
 // password: window.localStorage.getItem('password'),
}
const mutations = {
  //将userId保存到sessionStorage里，userId表示登陆状态
  SET_user_id: (state, data) => {
    state.user_id = data
    window.localStorage.setItem('user_id', data) 
  },
  //获取用户名
  GET_user_name: (state, data) => {
    // 把用户名存起来
    state.user_name = data
    window.localStorage.setItem('user_name', data)
  },
  
  //登出
  LOGOUT: (state) => {
    // 登出的时候要清除token
    state.user_id = null
    state.user_name = null
    window.localStorage.removeItem('user_id')
    window.localStorage.removeItem('user_name')
  }
}

const actions = {
}
export default new Vuex.Store({
  state,
  mutations,
  actions
})