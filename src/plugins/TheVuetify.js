/**
 * @Author: Firmiana
 * @Date: 2019-10-20 13:56:25
 * @Desc: Vuetify引入及配置
 */

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader

Vue.use(Vuetify)

const opts = {
  icons: {
    iconfont: 'md' || 'mdi' // default - only for display purposes
  }
}

export default new Vuetify(opts)
