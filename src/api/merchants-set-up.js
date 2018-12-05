import * as clients from '@/common/util/clients'

// 获取门店设置的列表
export const getListActStore = (activityId) => {
  return clients.default.get(
    '/activity/v1/list-act-store',
    { params: { activityId } }
  )
}

// 获取添加门店的列表
export const getStoreList = () => {
  return clients.default.get(
    '/activity/v1/store/list'
  )
}

// 保存草稿
export const saveListActStore = (params) => {
  return clients.default.post(
    '/activity/v1/store-save',
    params
  )
}
// 保存并测试
export const saveStoreTest = (params) => {
  return clients.default.post(
    '/activity/v1/store-test',
    params
  )
}

// 模拟测试---测试结果列表
export const getListTest = (id, status) => {
  return clients.default.get(
    '/activity/v1/test/list-test',
    { params: { id, status } }
  )
}

// 模拟测试
export const postStartTest = (params) => {
  return clients.default.post(
    '/activity/v1/test/start-test',
    params
  )
}

// 测试报错修改报错原因保存
export const postTestRemark = (params) => {
  return clients.default.post(
    '/activity/v1/test/remark',
    params
  )
}

// 提交审核
export const getCheck = (id) => {
  return clients.default.get(
    '/activity/v1/check',
    { params: { id } }
  )
}

// 审核通过与拒绝
export const postAudit = (params) => {
  return clients.default.post(
    '/activity/v1/audit',
    params
  )
}

// 获取当前活动的审核状态
export const getUpdateBase = (id) => {
  return clients.default.get(
    '/activity/v1/update-base',
    { params: { id } }
  )
}

// 审核通过上线时删除银行对应的门店
export const deleteStoreByBankId = (bankId) => {
  return clients.default.delete(
    '/activity/v1/deleteStoreByBankId',
    { params: { bankId } }
  )
}
