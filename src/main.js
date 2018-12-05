import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './styles/index.css'
import '@/common/font/iconfont.css'

Vue.config.productionTip = false

Vue.use(iView)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
