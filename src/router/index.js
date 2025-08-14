import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFind from '@/views/common/NotFind.vue'
import details from '@/views/common/commodity/details.vue'
import home from '@/views/home'
import order from '@/views/order'
import pay from '@/views/pay'
import search from '@/views/search'
import login from '@/views/user/login.vue'
import main from '@/views/home/main.vue'
import classification from '@/views/home/classification.vue'
import shoppingCart from '@/views/home/shoppingCart.vue'
import mine from '@/views/home/mine.vue'
import { getUserInfo } from '@/utils/cache/local-cache'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: home,
      redirect: '/main',
      children: [
        { path: '/main', component: main },
        { path: '/classification', component: classification },
        { path: '/shoppingCart', component: shoppingCart },
        { path: '/mine', component: mine }
        // { path: '*', component: NotFind }
      ]
    },
    { path: '/login', component: login },
    { path: '/details/:id', component: details },
    { path: '/order', component: order },
    { path: '/pay', component: pay },
    { path: '/search', component: search },
    { path: '*', component: NotFind }
  ],
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    // 如果有保存的滚动位置（比如浏览器前进后退），则恢复到该位置
    if (savedPosition) {
      return savedPosition
    } else {
      // 否则滚动到页面顶部
      return { x: 0, y: 0 }
    }
  }
})

const whiteList = ['/login', '/register']

router.beforeEach((to, from, next) => {
  if (getUserInfo() != null) {
    if (whiteList.indexOf(to.path) !== -1) {
      console.log(to.path)
      next('/main')
    } else {
      next()
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      // 否则全部重定向到登录页
      next(`/login?redirect=${encodeURIComponent(to.fullPath)}`)
    }
  }
})

export default router
