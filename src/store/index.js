// store index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 初始化时用sessionStore.getItem('token'),这样刷新页面就无需重新登录
const state = {
  user_name: localStorage.getItem('user_name'),
  user_id: localStorage.getItem('user_id'),
}
const mutations = {
  //获取userId
  SET_user_id: (state, data) => {
    state.user_id = data
    localStorage.setItem('user_id', data) 
  },
  //获取用户名
  GET_user_name: (state, data) => {
    state.user_name = data
    localStorage.setItem('user_name', data)
  },
  //登出
  LOGOUT: (state) => {
    // 登出的时候要清除token
    state.user_id = null
    state.user_name = null
    localStorage.removeItem('user_id')
    localStorage.removeItem('user_name')
  }
}

const actions = {
}
export default new Vuex.Store({
  state,
  mutations,
  actions
})