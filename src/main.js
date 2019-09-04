import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 显示当前环境
const mode = process.env.mode || process.env.NODE_ENV
if (mode === 'development') console.log(`%c ${mode} `, 'background:#aaa;color:#bada55')

// 禁止在浏览器抛出环境信息
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
