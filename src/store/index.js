import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //判断登录状态
    isLogin: false,
    //判断页面滚动条是否触顶
    isTouchTop: true,
    //当前用户id
    id: 0,
    // 头像前缀
    baseurl: 'http://icon.mgaronya.com/',
    user: {}
  },
  mutations: {
    changeLogin(state,flag) {
      state.isLogin = flag
    },
    changeTouchTop(state, flag) {
      state.isTouchTop = flag
    },
    changeId(state, id) {
      state.id = id
    },
    changeUser(state, user) {
      state.user = user
    }
  },
  actions: {
  },
  modules: {
  }
})
