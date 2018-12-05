<template>
  <div id="x-menu" :style="{ width: collapsed ? '64px' : '' }">
    <transition name="collapse-in" >
      <Menu theme="light" :active-name="activeName" @on-select="selectMenu" v-show="!collapsed">
        <template v-for="(menu, i) in menus">
          <Submenu :title="menu.name" :key="i" :name="menu.name" v-if="menu.children">
            <template slot="title">
                <Icon type="ios-paper" />
                {{ menu.name }}
            </template>
            <menu-item v-for="(m, i) in menu.children" :key="i" :name="m.router">
              <Icon :type="m.icon"> </Icon>
              {{m.name}}
            </menu-item>
          </Submenu>
          <menu-item :key="i" v-else :name="menu.router">
            <Icon :type="menu.icon"> </Icon>
            {{menu.name}}
          </menu-item>
        </template>
      </Menu>
    </transition>
    <transition name="collapse-out" >
      <div class="menu-collapsed" v-show="collapsed">
        <template v-for="item in menus">
          <collapsed-menu
            v-if="item.children && item.children.length"
            @on-click="selectMenu"
            theme="dark"
            :parent-item="item"
            :key="`drop-menu-${item.name}`"
          ></collapsed-menu>
          <router-link v-else :key="`drop-menu-${item.name}`" class="drop-menu-a" :to="{name: item.router}">
            <Icon :type="item.icon" :size="20"></Icon>
          </router-link>
        </template>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import collapsedMenu from './menu/collapsed-menu'

export default {
  name: 'side-menu',
  computed: {
    ...mapGetters([
      'collapsed'
    ]),
    activeName () { return this.$route.name }
  },
  props: {
    menus: { type: Array, required: true }
  },
  methods: {
    selectMenu (name) {
      if (!name) { return }
      this.$router.push({ name })
      this.$emit('selectMenu')
    }
  },
  components: { collapsedMenu }
}
</script>

<style lang="scss">
#x-menu {
  overflow-x: hidden;
  height: 100%;
  // position: absolute;
  // top: 0px;
  // bottom: 0px;

  .menu-collapsed{
    overflow-y: scroll;
    width: 84px;
    padding-top: 20px;

    .ivu-dropdown{
      width: 100%;
      .ivu-dropdown-rel a{
        width: 100%;
      }
    }
    .ivu-tooltip{
      width: 100%;
      .ivu-tooltip-rel{
        width: 100%;
      }
      .ivu-tooltip-popper .ivu-tooltip-content{
        .ivu-tooltip-arrow{
          border-right-color: #fff;
        }
        .ivu-tooltip-inner{
          background: #fff;
          // color: #495060;
        }
      }
    }
    .menu-title{
      margin-left: 6px;
    }
    .ivu-select-dropdown{
      width: 160px;
      margin-left: 4px;
    }
  }

  a.drop-menu-a{
    display: inline-block;
    padding: 6px 15px;
    width: 100%;
    text-align: center;
    color: #495060;
  }

  .ivu-menu-light.ivu-menu-vertical::after {
    left: 0;
  }

  .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
    color: #f56b45;
    background: #fff;
  }
  .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):after {
    top: 10px;
    bottom: 10px;
    left: 0;
    background: #eb7252;
    width: 4px;
  }

  .ivu-menu-vertical .ivu-menu-item:hover, .ivu-menu-vertical .ivu-menu-submenu-title:hover {
    color: #eb7252!important;
  }

  /* menu collapse */
  .collapse-in-enter-active {
    // transition: 0.28s;
    animation: bounce-in 0.28s;
  }
  .collapse-in-leave-active {
    animation: bounce-out 0.28s;
  }
  .collapse-in-enter, .collapse-leave-to {
    opacity: 0;
  }

  .collapse-out-enter-active {
    transform: scale(0);
    animation: bounce-in 0.28s;
    animation-delay: 0.28s;
  }

  @keyframes bounce-in {
    0% {
      transform: translateX(-20px);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes bounce-out {
    0% {
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      transform: translateX(20px);
      opacity: 0;
    }
  }
}
</style>
