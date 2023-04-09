import Vue from 'vue'
import VueRouter from 'vue-router'

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
//加上这段代码就解决了
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', name: 'Home', component: () => import('@/views/Home/Home') },
  { path: '/submitFrontFile', name: 'submitFrontFile', component: () => import('@/views/submitFrontFile') },
  { path: '/personCenter', name: 'personCenter', component: () => import('@/views/personCenter') },
  { path: '/blogShow/:id', name: 'blogShow', component: () => import('@/views/blogShow') },
  { path: '/allBlogs', name: 'allblogs', component: () => import('@/views/allBlog') },
  { path: '/searchBlogs', name: 'searchblogs', component: () => import('@/views/allBlog/searchBlog') },
  { path: '/allUsers', name: 'allUsers', component: () => import('@/views/allUser') },
  { path: '/UpbateBlog/:id', name: 'upbateBlog', component: () => import('@/views/upbateBlog') },
  { path: '/msgBoard/:id', name: 'msgBoard', component: () => import('@/views/msgBoard') },
  { path: '/msgBoard', name: 'myMsgBoard', component: () => import('@/views/msgBoard/myMsgCard') },
  { path: '/user/:id', name: 'oneUser', component: () => import('@/views/user') },
]

const router = new VueRouter({
  routes
})

// 路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/home') {
    next()
  } else if (localStorage.getItem('token')) {
    next()
  } else {
    next()
  }
})

export default router
