/**
 * @Author: Firmiana
 * @Date: 2019-09-04 16:37:00
 * @Desc: 登陆页
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
                  <v-toolbar-title>登陆</v-toolbar-title>
                  <v-spacer />
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      v-model="account"
                      label="账号"
                      name="login"
                      prepend-icon="person"
                      type="text"
                    />

                    <v-text-field
                      id="password"
                      v-model="password"
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
                    @click="login"
                  >
                    <span>登陆</span>
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
      password: ''
    }
  },
  watch: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
    async login() {
      const res = await api.auth.login({
        account: this.account,
        pwd: this.password
      })
      if (res !== -1) {
        this.$G.Token = res.data
        this.getUserInfo()
      }
    },
    async getUserInfo() {
      const res = await api.auth.getUserInfo()
      if (res !== -1) {
        this.$G.User = res.data
        // TODO: 页面跳转
      }
      console.log('userInfo:', this.$G.User)
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
