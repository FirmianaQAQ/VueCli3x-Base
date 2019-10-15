<template>
  <div class="app-message-index">
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
  </div>
</template>
<script>
export default {
  name: 'AppMessage',
  props: {
    msgFlag: {
      type: Boolean,
      required: false,
      default: true
    },
    text: {
      type: String,
      required: false,
      default: 'Hello , This is a app message !'
    },
    timeout: {
      type: Number,
      required: false,
      default: 16000
    },
    color: {
      type: String,
      required: false,
      default: ''
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
  mounted() {

  },
  methods: {
    handleClose(flag) {
      this.snackbar = flag
    }
  }
}
</script>

<style lang="stylus" scoped></style>
