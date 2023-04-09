import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import global from './utils/global'

import './style/reset.css'

//element-ui样式引入
import 'element-ui/lib/theme-chalk/index.css'
//element-ui文件夹下
import element from './element-ui/index'
Vue.use(element)

Vue.config.productionTip = false
Vue.use(global)
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload, {
  preLoad: 1.3, // 预加载的宽高比
  error: 'https://placehold.it/100x100', // 加载失败的图片
  loading: 'https://placehold.it/100x100', // 加载中的图片
  attempt: 1 // 尝试加载图片的次数
});

new Vue({
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this //安装全局事件总线,$bus就是当前应用的vm
  },
  render: h => h(App)
}).$mount('#app')
