
import axios from 'axios'
import store from '@/store'
// import { Notice } from 'iview'
import * as global from '@/config/global'
import * as ApiConfig from '@/config/api'
import iNotice from 'iview/src/components/notice'
import authMapper from './data'

const instance = axios.create()

axios.defaults.baseURL = global.API_ROOT
axios.defaults.timeout = global.TIME_OUT

instance.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

instance.interceptors.response.use(function (response) {
  let _response = {}
  let {
    config: { showAlert = true },
    data: {
      code = ApiConfig.defStatus.FAILD.code,
      dataList = [],
      data = {},
      message = '服务器内部错误!'
    }
  } = response

  // for login
  if (code === 88888 || authMapper[code]) {
    iNotice.error({
      title: '用户信息错误',
      desc: authMapper[code] || '用户未登录或登录失效'
    })
    debugger
    store.dispatch('handleFELogout')
    return Promise.reject(response)
  }

  if (showAlert && (code === ApiConfig.defStatus.ALEART.code || code === ApiConfig.defStatus.FAILD.code)) {
    let errorTypeMapper = {
      [ApiConfig.defStatus.ALEART.code]: { fun: 'warning', title: '警告' },
      [ApiConfig.defStatus.FAILD.code]: { fun: 'error', title: '错误' }
    }

    iNotice[errorTypeMapper[code].fun]({
      title: errorTypeMapper[code].title,
      desc: message
    })

    return Promise.reject(response)
  }

  _response.code = code
  _response.message = message
  _response.data = (response.data && response.data.dataList) ? dataList : data
  _response._rawData = response.data
  // message && iNotice.success({ title: '成功', desc: message })
  return _response
}, function (error) {
  iNotice.error({ title: '内部错误', desc: '服务器内部错误!' })
  return Promise.reject(error)
})

export default instance
