import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
import store from '@/store'
import iView from 'iview'
// import Cookies from 'js-cookie'

Vue.use(Router)
const router = new Router({
  routes
})
const LOGIN_PAGE_NAME = 'login'

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()

  // 刷新页面时，vuex 丢失，从 localStorage 加载. 这里使用登录时获取的 user_id 作为判断标准
  let loginState = !!store.state.app.user_id

  if (!loginState) {
    let data = JSON.parse(localStorage.getItem('_bank_activity_appInfo'))
    if (data && data.app) {
      // 存在本地存储，波若波罗密~~回到五百年前
      store.dispatch('setState', data.app)
      loginState = true
    }
  }

  if (!loginState && to.name === LOGIN_PAGE_NAME) {
    next()
  } else if (!loginState && to.name !== LOGIN_PAGE_NAME) {
    next({ name: LOGIN_PAGE_NAME }) // 未登录跳转到登录页
    if (from.name === LOGIN_PAGE_NAME) {
      iView.LoadingBar.finish()
    }
  } else if (loginState && to.name === LOGIN_PAGE_NAME) {
    next({ name: 'ActivityList' }) // 已登录且要跳转的页面是登录页, ActivityList
  } else {
    next()
  }
})

router.afterEach(to => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
