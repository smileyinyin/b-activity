<template>
  <div id="x-header" class="pl10 pr10">
    <Row>
      <i-col span="12">
        <div style="display: flex; align-items: center">
          <h3 class="pl20 f18 header-title" style="width: 230px">银行智能营销平台</h3>
          <!-- <Dropdown trigger="click" placement="right-end"> -->
            <h3 class="tr poi pl10 pr10" @click="toggleMenu">
              <Icon type="md-menu" :size="20"></Icon>
            </h3>
            <!-- <DropdownMenu slot="list" style="left:10px; top: 40px;">
              <Card style="width:350px;" :bordered="false" dis-hover>
                  <p slot="title">
                      银行智能营销平台
                  </p>
                  <ul class="sys-list">
                    <li v-for="item in haveSystemList" :key="item.id" @click="systemJump(item)" style="display:flex;flex-direction:column;">
                      <i class="icon iconfont" v-html="getSysIcon(item.sys_id)[0]" :style="{color: getSysIcon(item.sys_id)[1]}" style="font-size: 40px;"></i>
                      <span>
                        {{ item.name }}
                      </span>
                    </li>
                  </ul>
              </Card>
            </DropdownMenu> -->
          <!-- </Dropdown> -->
        </div>
      </i-col>
      <i-col span="12" width="80px">
        <Dropdown class="r" trigger="click">
          <h3 class="tr poi n">
            你好, {{nickName}}
            <Icon type="arrow-down-b"> </Icon>
          </h3>
          <DropdownMenu slot="list">
            <DropdownItem @click.native="login">
              <Icon type="log-out"> </Icon>
              登出
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </i-col>
    </Row>
  </div>
</template>

<script>
// import * as Cookie from 'js-cookie'
// import * as global from '@/config/global'
//   import '@/styles/font/iconfont.css'

const sysIcon = {
  '1': ['&#xe671;', 'blue'],
  '2': ['&#xe6ca;', 'red'],
  '3': ['&#xe606;', 'orange'],
  '4': ['&#xe602;', 'green']
}

export default {
  name: 'XHeader',
  data () {
    return {
      showMenu: false,
      nickName: this.$store.getters.name,
      systemName: 'sxwAdmin',
      authSystemUrl: location.href,
      haveSystemList: []
    }
  },

  methods: {

    toggleMenu() {
      this.$emit('toggleMenu')
    },

    getSysIcon (sysid) {
      return sysIcon[sysid] || ''
    },

    login () {
      this.$store.dispatch('handleFELogout')
      // this.$router.push({ name: 'login' })
      /** global KSAuthKit */
      // KSAuthKit.destroy()

      // location.href = global.AUTH_SYSTEM_ADDRESS
    },

    systemJump (system) {
      location.href = system.url
    }

    //   mounted () {
    //     // 判断是否登录开启权限
    //     /* global KSAuthKit */
    //     if (Cookie.get('KSAuthUserToken')) {
    //       this.nickName = Cookie.get('KSAuthUserName');

    //       KSAuthKit.config({
    //         systemId: global.SYSTEM_ID,
    //         userToken: KSAuthKit.getUserToken(),
    //         apiURL: KSAuthKit.getApiURL()
    //       });

    //       KSAuthKit.ready(() => {
    //         let userSystemList = KSAuthKit.getSystemList();
    //         this.systemName = [].concat(KSAuthKit.getAllSystemList())
    //           .filter(({sys_id}) => sys_id === global.SYSTEM_ID)[0]['name'];

    //         if (userSystemList.length)
    //           this.haveSystemList = userSystemList;
    //       });

    //       KSAuthKit.on();
    //     } else {
    //       location.href = global.AUTH_SYSTEM_ADDRESS;
    //     }
    //   }
  }

  // mounted () {
  //   this.$nextTick(this.mounted)
  // }

  // components: {
  //   Row, RCol: Col, Icon,
  //   Dropdown, DropdownMenu, DropdownItem
  // }
}
</script>

<style scoped>
  #x-header {
    height: 50px;
    line-height: 50px;
    color: #fff;
    background: #272c33;
    box-shadow: 0 0 6px rgba(65, 71, 85, 0.3);
    position: relative;
    z-index: 3;
  }

  .sys-list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    text-align: center;
  }

  .sys-list li {
    list-style: none;
    flex: 0 0 50%;
    cursor: pointer;
  }

  #x-header >>> .ivu-select-dropdown {
    top: 30px!important;
  }
</style>
