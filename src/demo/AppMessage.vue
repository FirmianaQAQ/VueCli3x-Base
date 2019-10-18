/**
 * @Author: Firmiana
 * @Date: 2019-10-16 20:33:12
 * @Desc: 通用信息组件（for global）
 */
<template>
  <v-app>
    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :color="color"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn
        v-show="close"
        dark
        text
        @click="handleClose(false)"
      >
        <v-icon>mdi-cancel</v-icon>
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  name: 'AppMessage',
  props: {
    msgFlag: {
      type: Boolean,
      required: false,
      default: false
    },
    text: {
      type: String,
      required: false,
      default: 'Hello , This is a app message !'
    },
    timeout: {
      type: Number,
      required: false,
      default: 1500
    },
    color: {
      type: String,
      required: false,
      default: 'success'
    },
    mode: {
      type: String,
      required: false,
      default: ''
    },
    x: {
      type: String,
      required: false,
      default: null
    },
    y: {
      type: String,
      required: false,
      default: 'top'
    },
    close: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      snackbar: this.msgFlag
    }
  },
  watch: {
    snackbar(newVal, oldVal) {
      if (!newVal && oldVal) {
        this.$el.addEventListener('transitionend', this.destroyElement)
      }
    }
  },
  mounted() {
    console.log('color:', this.color)
  },
  methods: {
    open() {
      this.snackbar = true
    },
    handleClose(flag) {
      this.snackbar = flag
    },
    destroyElement() {
      this.$el.removeEventListener('transitionend', this.destroyElement)
      this.$destroy()
    }
  }
}
</script>
