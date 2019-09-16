import Vue from 'vue'
import App from './App.vue'
import router from '@router/router'
import store from '@store/store'
import method from '@tools/method'
import VueLazyload from 'vue-lazyload'

const FastClick = require('fastclick')

// 通用方法
Vue.use(method)
// 图片懒加载
Vue.use(VueLazyload)

// 结合vuex和路由
// sync(store, router)
export const Root = new Vue({
  router,
  store,
  ...App
})
// window.Root = Root
document.addEventListener(
  'DOMContentLoaded',
  function() {
    FastClick.attach(document.body)
    Root.$mount('#app')
  },
  false
)

// 禁止在浏览器抛出环境信息
Vue.config.productionTip = false

// 显示当前环境
const mode = process.env.mode || process.env.NODE_ENV
// if (mode === 'development')
console.log(`%c ${mode} `, 'background:#aaa;color:#bada55')

console.log(process.env)
