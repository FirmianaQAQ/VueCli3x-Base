/**
 * @Author: Firmiana
 * @Date: 2019-09-16 15:57:28
 * @Desc: vuex状态管理
 */

import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
// import createLogger from 'vuex/dist/logger'

// 引入各个模块
import index from './modules/index'

Vue.use(Vuex)

const mode = process.env.mode || process.env.NODE_ENV
const debug = mode !== 'production'

export default new Vuex.Store({
  state: {
    env: mode
  },
  actions,
  mutations,
  getters,
  modules: {
    index
  },
  strict: debug,
  plugins: debug ? [] : []// createLogger()
})

