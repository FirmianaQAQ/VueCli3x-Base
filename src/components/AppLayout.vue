/**
 * @Author: Firmiana
 * @Date: 2019-09-23 21:28:10
 * @Desc: 主页布局
 */
<template>
  <div class="app-layout-index">
    <v-app>
      <v-btn color="primary">
        主页布局
      </v-btn>
      <router-view />
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'AppLayout'
}
</script>
<style lang="stylus" scoped>
.app-layout-index {
  width 100vw
}
</style>
