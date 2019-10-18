/**
 * @Author: Firmiana
 * @Date: 2019-10-17 21:23:56
 * @Desc: 全局注册Message方法 $Msg
 */
import AppMessage from './AppMessage.vue'

// TODO:颜色未生效 因为vuetify:v-app在js文件中无法注册
const colors = ['success', 'info', 'warning', 'error']

function AppMsg(Vue, options) {
  const property = (options && options.property) || '$MsgV'

  function createMessageCmp(opts) {
    const cmp = new Vue(AppMessage)
    Object.assign(cmp, Vue.prototype[property].options || {}, opts)
    document.body.appendChild(cmp.$mount().$el)
    cmp.open()
    return cmp.$el
  }

  function show(opts = {}) {
    return createMessageCmp(opts)
  }
  colors.forEach((color) => {
    show[color] = (text, opts) => show({ text, ...opts })
  })
  Vue.prototype[property] = show

  Vue.prototype[property].options = options
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(AppMsg)
}

export default AppMsg
