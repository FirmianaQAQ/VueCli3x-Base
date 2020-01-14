/**
 * @Author: Firmiana
 * @Date: 2019-09-23 21:29:11
 * @Desc: 首页
 */
<template>
  <div class="home-summary-index">
    这是首页
  </div>
</template>
<script>
import api from '@/api/api'

export default {
  name: 'Summary',
  mounted() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      // const res =
      await api.auth.getUserInfo()
      // console.log(res)
    }
  }
}
</script>
<style lang="stylus" scoped>
.home-summary-index {
  width 100vw
}
</style>
