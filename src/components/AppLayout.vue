/**
 * @Author: Firmiana
 * @Date: 2019-09-23 21:28:10
 * @Desc: 主页布局
 */
<template>
  <div class="app-layout-index">
    <v-app id="sandbox">
      <v-navigation-drawer
        v-model="primaryDrawer.model"
        :clipped="primaryDrawer.clipped"
        :floating="primaryDrawer.floating"
        :mini-variant="primaryDrawer.mini"
        :permanent="primaryDrawer.type === 'permanent'"
        :temporary="primaryDrawer.type === 'temporary'"
        app
        overflow
      >
        <v-list flat>
          <v-list-item @blur="onOpenMenu">
            <v-list-item-avatar>
              <img
                v-if="userAvatar"
                :src="userAvatar"
              >
              <img
                v-else
                src="../assets/images/zhizi.jpg"
              >
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ tipMsg + "，" + userName }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider />
          <template v-for="item in items">
            <v-list-group
              v-if="!item.children"
              :key="item.text"
              v-model="item.model"
              :prepend-icon="item.model ? item.icon : item['icon-alt']"
              :append-icon="!item.children?'':'$vuetify.icons.expand'"
              @click="onChangePage(item.page)"
            >
              <template v-slot:activator>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ item.text }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list-group>
            <v-list-group
              v-else-if="item.children"
              :key="item.text"
              v-model="item.model"
              :prepend-icon="item.model ? item.icon : item['icon-alt']"
              :append-icon="!item.children?'':'$vuetify.icons.expand'"
            >
              <template v-slot:activator>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ item.text }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <v-list-item
                v-for="(child, i) in item.children"
                v-show="!primaryDrawer.mini"
                :key="i"
                ripple
                @click="onChangePage(child.page)"
              >
                <v-list-item-action style="margin:24px;">
                  <v-icon>{{ child.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ child.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </template>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar
        :clipped-left="primaryDrawer.clipped"
        app
      >
        <v-app-bar-nav-icon
          v-if="primaryDrawer.type !== 'permanent'"
          @click.stop="primaryDrawer.model = !primaryDrawer.model"
        />
        <v-toolbar-title>
          {{ systemName }}
        </v-toolbar-title>
      </v-app-bar>
      <v-content>
        <!-- 路由显示 -->
        <router-view class="layout-router-padding" />
      </v-content>
      <v-footer
        :inset="footer.inset"
        app
      >
        <span class="px-4">&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import layout from '@/assets/layout/tree.js'
import { getItem } from '@/tools/utils/sessionStorage'
import { getNowDateShow } from '@/tools/utils/date'

export default {
  name: 'AppLayout',
  data() {
    return {
      drawers: ['Default (no property)', 'Permanent', 'Temporary'],
      primaryDrawer: {
        model: null,
        type: 'default (no property)',
        clipped: false,
        floating: false,
        mini: false
      },
      footer: {
        inset: true
      },
      items: layout.menuTree,
      systemName: '',
      userName: JSON.parse(getItem('i-info')).nickname || '',
      userAvatar: JSON.parse(getItem('i-info')).avatar || '',
      tipMsg: getNowDateShow() || '',
      nowPage: ''
    }
  },
  mounted() {
    this.nowPage = this.$route.name

    if (this.nowPage !== '') this.checkNowPage()

    // const userInfo = JSON.parse(getItem('i-info'))
  },
  methods: {
    // 页面跳转
    onChangePage(val) {
      this.$_APPJumpToPage({ name: val })
      this.onOpenMenu()
    },
    onOpenMenu() {
      this.primaryDrawer.mini = false
    },
    checkNowPage() {
      this.items.map(item => {
        if (!item.children) {
          item.page === this.nowPage ? item.model = true : item.model = false
          return
        }
        item.children.map(itemChild => {
          itemChild.page === this.nowPage ? item.model = true : item.model = false
        })
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.app-layout-index {
  width 100vw
  .layout-router-padding {
    padding 10px
  }
}
</style>
