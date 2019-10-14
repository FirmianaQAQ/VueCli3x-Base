/**
 * @Author: Firmiana
 * @Date: 2019-09-04 16:37:00
 * @Desc: 登陆页
 */
<template>
  <div class="login-index">
    login
  </div>
</template>

<script>
import api from '@/api/api'

export default {
  name: 'Login',
  components: {

  },
  data() {
    return {
    }
  },
  created() {
    this.getUserInfo()
  },
  mounted() {

  },
  methods: {
    async getUserInfo() {
      const res = await api.auth.getUserInfo()
      console.log(1, res)
    }
  }
}
</script>

<style lang="stylus" scoped>
.login-index {
  width 100vw
}
</style>
