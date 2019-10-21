/**
 * @Author: Firmiana
 * @Date: 2019-09-16 15:57:55
 * @Desc: 路由统一输出
 */
import Vue from 'vue'
import Router from 'vue-router'
// import store from '../store/index.js'
// import * as types from '../store/mutation-types'
import { getItem } from '@/tools/utils/sessionStorage'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 引入各个路由
import home from './home' // 首页

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@views/login.vue'),
      meta: {
        whitePath: true
      }
    },
    home
  ]
})

router.beforeEach((to, from, next) => {
  console.log(from)
  console.log(to)
  // 路由进入前的一些处理
  if (to.meta.whitePath) {
    next()
    return
  }

  if (getItem('i-token') === null) {
    next({
      path: '/login'
    })
    return
  }

  next()
})

export default router
