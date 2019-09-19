/**
 * @Author: Firmiana
 * @Date: 2019-09-04 16:37:00
 * @Desc: Home
 */
<template>
  <div class="home-index">
    {{ motto }}
  </div>
</template>

<script>
import api from '@/api/api'

export default {
  name: 'Home',
  components: {

  },
  data() {
    return {
      motto: 'This is my demo about Vue-Cli（ 3.x ）'
    }
  },
  created() {
    this.getUserList()
  },
  mounted() {

  },
  methods: {
    async getUserList() {
      const res = await api.user.getUserList()
      console.log(res)
    }
  }
}
</script>

<style lang="stylus" scoped>
.home-index {
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
}
</style>
