/**
 * @Author: Firmiana
 * @Date: 2019-10-16 20:33:12
 * @Desc: 通用信息组件（for global）
 */
<template>
  <transition name="msg-fade">
    <div
      v-show="visible"
      class="message"
      :class="type"
    >
      <span class="icon" />
      <p class="content">
        {{ text }}
      </p>
      <span
        class="delete-icon"
        @click="onCancle"
      >
        <v-icon class="delete-icon-color">mdi-cancel</v-icon>
      </span>
    </div>
  </transition>
</template>

<script>
const Msg = {
  name: 'message',
  data() {
    return {
      visible: false,
      type: '',
      text: ''
    }
  },
  install(Vue) {
    Vue.prototype.$msg = (config) => { // 通过原型注册一个方法
      const MessageConstructor = Vue.extend(Msg) // 生成一个Vue子类，子类就是这个组件
      const instance = new MessageConstructor({ data: config }) // 生成该子类的实例
      instance.vm = instance.$mount() // 将该实例手动挂载
      document.body.appendChild(instance.vm.$el) // 将实例挂载到body上
      instance.vm.visible = true
    }
  },
  watch: {
    visible(v) {
      if (v) {
        setTimeout(() => {
          this.onClose()
        }, 3000000)
      }
    }
  },
  methods: {
    onClose() {
      this.visible = false
      this.$el.parentNode.removeChild(this.$el)
    },
    show() {
      this.visible = true
    },
    onCancle() {
      if (this.cancelBtn) {
        this.cancelBtn.apply(this.text)
      }
      this.onClose()
    }
  }

}

export default Msg

</script>

<style lang="stylus" scoped>
.message {
  position fixed
  left 50%
  top 5%
  transform translate3d(-50%, -50%, 0)
  background rgba(0, 0, 0, 0.6)
  z-index 1000
  min-width 344px
  height 48px
  padding 8px 16px
  box-sizing border-box
  justify-content space-between
  border-radius 4px
  box-shadow 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)
  .icon {
    display inline-block
    width 16px
    height 16px
    background url('../assets/svg/default.svg') no-repeat
    background-size 16px 16px
    vertical-align middle
  }
  &.success {
    background #4caf50
    border 1px solid #4caf50
    .icon {
      background url('../assets/svg/success.svg') no-repeat
      background-size 16px 16px
    }
  }
  &.info {
    background #2196f3
    border 1px solid #2196f3
    .icon {
      background url('../assets/svg/info.svg') no-repeat
      background-size 16px 16px
    }
  }
  &.warning {
    background #F57C00
    border 1px solid #F57C00
    .icon {
      background url('../assets/svg/warning.svg') no-repeat
      background-size 16px 16px
    }
  }
  &.error {
    background #ff5252
    border 1px solid #ff5252
    .icon {
      background url('../assets/svg/error.svg') no-repeat
      background-size 14px 14px
    }
  }
  &.cyan {
    background #0097a7
    border 1px solid #0097a7
    .icon {
      background url('../assets/svg/cyan.svg') no-repeat
      background-size 16px 16px
    }
  }
  .content {
    display inline-block
    font-size 14px
    font-family PingFangSC-Medium
    color #FFFFFF
    letter-spacing 0
    line-height 30px
    margin-left 8px
    min-width 345px
    word-wrap break-word
  }
  .delete-icon {
    display block
    width 10px
    height 10px
    position absolute
    top 9px
    right 24px
    font-size 18px
    cursor pointer
    .delete-icon-color {
      color #FFFFFF !important
    }
  }
  .msg-fade-enter-active {
    animation alert-fade-in 0.3s
  }
  .msg-fade-leave-active {
    animation alert-fade-out 0.3s
  }
  @keyframes alert-fade-in {
    0% {
      opacity 0
    }
    100% {
      opacity 1
    }
  }
  @keyframes alert-fade-out {
    0% {
      opacity 1
    }
    100% {
      opacity 0
    }
  }
}
</style>

