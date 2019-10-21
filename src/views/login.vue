/**
 * @Author: Firmiana
 * @Date: 2019-09-04 16:37:00
 * @Desc: 登录页
 */
<template>
  <div class="login-index">
    <v-app id="inspire">
      <v-content>
        <v-container
          class="fill-height"
          fluid
        >
          <v-row
            align="center"
            justify="center"
          >
            <v-col
              cols="12"
              sm="8"
              md="4"
            >
              <v-card class="elevation-12">
                <v-toolbar
                  color="primary"
                  dark
                  flat
                >
                  <v-toolbar-title>登录</v-toolbar-title>
                  <v-spacer />
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      v-model.trim="account"
                      label="账号"
                      name="login"
                      prepend-icon="person"
                      type="text"
                    />

                    <v-text-field
                      id="password"
                      v-model.trim="pwd"
                      label="密码"
                      name="password"
                      prepend-icon="lock"
                      type="password"
                    />
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="primary"
                    :disabled="loading"
                    @click="login"
                  >
                    <span>{{ loading ? '登录中...' : '登录' }}</span>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import api from '@/api/api'
import { setItem, getItem } from '@/tools/utils/sessionStorage'

export default {
  name: 'Login',
  components: {
  },
  props: {
    source: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      account: '',
      pwd: ''
    }
  },
  watch: {

  },
  // 进入登录页面之前检查,如果已经登录,进入之前的页面
  beforeRouteEnter(to, from, next) {
    if (getItem('i-token') !== null) {
      next({
        path: from.path === '/' ? '/home/summary' : from.path
      })
    } else {
      next()
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    async login() {
      this.loading = true
      const params = {
        account: this.account,
        pwd: this.pwd
      }
      const res = await api.auth.login(params)
      if (res !== -1) {
        this.$G.Token = res.data
        setItem('i-token', res.data)
        this.getUserInfo()
      }
      this.loading = false
    },
    async getUserInfo() {
      const res = await api.auth.getUserInfo()
      if (res !== -1) {
        this.$G.User = res.data
        setItem('i-info', JSON.stringify(res.data))
        this.loading = false
        this.$msg({ type: 'success', text: '登录成功' })
        // TODO: 页面跳转
        this.$_APPJumpToPage({ name: 'summary' })
      }
      this.loading = false
    },
    // 获取背景图
    async fetchBingImage() {
      const imgUrl = await api.auth.getBingImage()
      const app = document.getElementById('app')
      app.setAttribute('style', `background-image: url(${imgUrl});`)
    }
  }
}
</script>

<style lang="stylus" scoped>
.login-index {
  width 100vw
}
</style>
