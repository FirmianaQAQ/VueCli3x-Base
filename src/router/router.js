/**
 * @Author: Firmiana
 * @Date: 2019-09-16 15:57:55
 * @Desc: 路由统一输出
 */
import Vue from 'vue'
import Router from 'vue-router'
import Info from '@views/Info.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@views/Home.vue')
    },
    {
      path: '/info',
      name: 'info',
      component: Info
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@views/About.vue')
    }
  ]
})
