<template>
  <Layout style="height: 100%" class="layout" :class="{mobile: isMobile, opened: isOpened}">
      <header style="position: relative; height:50px; z-index: 999">
          <XHeader @toggleMenu="toggleMenu"> </XHeader>
      </header>
      <Layout>
          <Sider collapsible hide-trigger :width="220" :collapsed-width="64" v-model="collapsed" class="sider" :class="{collapsed: collapsed}">
              <!-- <h3 class="title f18 pl30" style="border-bottom: 1px solid #6d6d6d;">银行智能营销平台</h3> -->
              <XMenu :menus="menuList" @selectMenu="closeLayer"></XMenu>
          </Sider>
          <div class="layer" @click="closeLayer"></div>
          <Layout>
              <Content class="content-container p15 ova">
                  <transition name="fade-transform" mode="out-in">
                      <router-view> </router-view>
                  </transition>
              </Content>
          </Layout>
      </Layout>
  </Layout>
</template>

<script>
import XMenu from '@/views/home/side-menu'
import XHeader from '@/views/home/header'
import MenuData from '@/config/menu'
import { mapGetters } from 'vuex'

const WIDTH = 1024
const RATIO = 3

export default {
  name: 'Main',
  components: {
    XMenu,
    XHeader
  },
  data() {
    return {
      isMobile: false,
      isOpened: false,
      MenuData
    }
  },
  computed: {
    ...mapGetters([
      'collapsed'
    ]),
    menuList() {
      let level = this.$store.getters.level
      let list = this.filterHasAccess(this.MenuData, level)
      return list
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  },
  mounted() {
    const isMobile = this.isNowMobile()
    this.isMobile = isMobile
  },
  methods: {

    // 判断是否手机屏幕
    isNowMobile() {
      const rect = document.body.getBoundingClientRect()
      return rect.width - RATIO < WIDTH
    },

    // 处理手机屏幕菜单折叠
    resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.isNowMobile()
        this.isMobile = isMobile
        if (isMobile && this.collapsed) {
          this.$store.dispatch('toggleMenu')
        }
      }
    },

    // 点击遮罩层关闭
    closeLayer() {
      this.isOpened = !this.isOpened
    },

    // 过滤菜单权限
    filterHasAccess(arr, level) {
      let menuArr = JSON.parse(JSON.stringify(arr))
      menuArr = menuArr.map(item => {
        if (!item.children) {
          return item
        }
        item.children = item.children.filter(item => {
          return !item.access || item.access.indexOf(level) > -1
        })
        return item
      })
      return menuArr
    },

    // 折叠菜单， 在手机端则是拉出/隐藏菜单
    toggleMenu() {
      if (this.isMobile) {
        this.isOpened = !this.isOpened
      } else {
        this.$store.dispatch('toggleMenu')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/*fade-transform*/
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.4s !important;
}
.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.layout {
  .sider {
    position: relative;
    background-color: #fff;
    box-shadow: rgba(7, 17, 27, 0.1) 0px 2px 10px 0px;
  }

  &.mobile {
    /deep/ .header-title {
      display: none;
    }

    .sider {
      position: fixed;
      top: 50px;
      bottom: 0px;
      left: -220px;
      z-index: 9;

      &.collapsed {
        left: 0px;
      }
    }

    &.opened {
      .layer {
        background: #000;
        height: 100%;
        opacity: .3;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 8;
      }
      .sider {
        left: 0px;
      }
    }
  }
}

.title {
  height: 50px;
  line-height: 50px;
  color: #fff;
}
</style>
