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
                      label="账号"
                      name="login"
                      prepend-icon="person"
                      type="text"
                    />

                    <v-text-field
                      id="password"
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
                    登陆
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
      <!-- <v-snackbar
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
          dark
          text
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </v-snackbar> -->
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
    }
  },
  created() {
  },
  mounted() {

  },
  methods: {
    async login() {
      const params = {}
      const res = await api.auth.login(params)
      if (res.code === 0) {
        alert(res.message)
      }
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
