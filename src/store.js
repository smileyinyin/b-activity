import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

import { login } from '@/api/login'
import Cookie from 'js-cookie'
import Config from '@/config/index'

Vue.use(Vuex)

const Store = new Vuex.Store({
  state: {
    app: {
      user_id: '',
      login_name: '',
      name: '',
      level: '',
      bank_id: '',
      province_id: '',
      city_id: '',
      district_id: '',
      company_id: '',
      system_infos: [],

      collapsed: false
    }
  },
  getters: {
    user_id: state => state.app.user_id,
    login_name: state => state.app.login_name,
    name: state => state.app.name,
    level: state => state.app.level,
    bank_id: state => state.app.bank_id,
    province_id: state => state.app.province_id,
    city_id: state => state.app.city_id,
    district_id: state => state.app.district_id,
    company_id: state => state.app.company_id,
    system_infos: state => state.app.system_infos,

    collapsed: state => state.app.collapsed
  },
  mutations: {
    /* eslint-disable */
    SET_USER_ID(state, user_id) {
      state.app.user_id = user_id
    },
    SET_LOGIN_NAME(state, login_name) {
      state.app.login_name = login_name
    },
    SET_NAME(state, name) {
      state.app.name = name
    },
    SET_LEVEL(state, level) {
      state.app.level = level
    },
    SET_BANK_ID(state, bank_id) {
      state.app.bank_id = bank_id
    },
    SET_PROVINCE_ID(state, province_id) {
      state.app.province_id = province_id
    },
    SET_CITY_ID(state, city_id) {
      state.app.city_id = city_id
    },
    SET_DISTRICT_ID(state, district_id) {
      state.app.district_id = district_id
    },
    SET_COMPANY_ID(state, company_id) {
      state.app.company_id = company_id
    },
    SET_SYSTEM_INFOS(state, infos) {
      state.app.system_infos = infos
    },
    SET_COLLAPSED(state, collapsed) {
      state.app.collapsed = collapsed
    }
  },
  actions: {
    setState({ commit }, {  user_id, login_name, name, level, bank_id, province_id, city_id, district_id, company_id, system_infos }) {
        commit('SET_USER_ID', user_id)
        commit('SET_LOGIN_NAME', login_name)
        commit('SET_NAME', name)
        commit('SET_LEVEL', level)
        commit('SET_BANK_ID', bank_id)
        commit('SET_PROVINCE_ID', province_id)
        commit('SET_CITY_ID', city_id)
        commit('SET_DISTRICT_ID', district_id)
        commit('SET_COMPANY_ID', company_id)
        commit('SET_SYSTEM_INFOS', system_infos)
    },
    toggleMenu({ commit, state }) {
      commit('SET_COLLAPSED', !state.app.collapsed)
    },
    handleLogin({ commit, dispatch }, { userName, password }) {
      return login(userName, password).then(res => {
        dispatch('setState', res.data)

        Cookie.set('JSESSTOKEN', res.data.tok, { expires: Config.cookieExpires })
        // Cookie.set('KSAuthUserToken', user_token, { expires: Config.cookieExpires })
        // Cookie.set('KSAuthUserName', 'admin', { expires: Config.cookieExpires })
        // Cookie.set('KSAuthLoginName', 'admin', { expires: Config.cookieExpires })
      })
    },
    // 前端登出
    handleFELogout({ dispatch }) {  // TODO 设置了 domain 在测试环境没法保存
      Cookie.remove('JSESSTOKEN') // { domain: '.sxwhome.com' }
      // Cookie.remove('KSAuthUserToken')
      dispatch('setState', {})
      localStorage.removeItem('_bank_activity_appInfo')
      router.push({ name: 'login' })
    }
  }
})

// 页面卸载时保存 vuex 数据
window.addEventListener('beforeunload', function() {
  // 在未登录状态 刷新页面不保存 vuex 信息
  if (Store.getters.user_id) {
    localStorage.setItem('_bank_activity_appInfo', JSON.stringify(Store.state))
  }
})

export default Store