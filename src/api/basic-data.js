import * as clients from '@/common/util/clients'
import axios from 'axios'
import { STORE_LIST_URL } from '@/config/global'

// 商户管理 --- 列表
export const getMerchantList = (name, code, page, size) => {
  return clients.default.get(
    '/activity/v1/merchant/list',
    { params: { name, code, page, size } }
  )
}

// 商户管理 --- 新增
export const postMerchantAdd = (params) => {
  return clients.default.post(
    '/activity/v1/merchant/add',
    params
  )
}

// 商户管理 --- 编辑
export const postMerchantEdit = (params) => {
  return clients.default.post(
    '/activity/v1/merchant/edit',
    params
  )
}

// 商户管理 --- 删除
export const deleteMerchantDelete = (id) => {
  return clients.default.delete(
    '/activity/v1/merchant/delete/' + id
  )
}

// 门店管理 --- 列表
export const getStoreList = (name, code, page, size) => {
  return clients.default.get(
    '/activity/v1/store/list2',
    { params: { name, code, page, size } }
  )
}

// 门店管理 --- 新增
export const postStoreAdd = (params) => {
  return clients.default.post(
    '/activity/v1/store/add',
    params
  )
}

// 门店管理 --- 编辑
export const postStoreEdit = (params) => {
  return clients.default.post(
    '/activity/v1/store/edit',
    params
  )
}

// 门店管理 --- 删除
export const deleteStoreDelete = (id) => {
  return clients.default.delete(
    '/activity/v1/store/delete/' + id
  )
}

// 门店管理 --- 商户id下拉
export const getMerchantQuery = (keyWord) => {
  return clients.default.get(
    '/activity/v1/merchant/query?keyWord=' + keyWord
  )
}

// POS管理 --- 列表
export const getStorePosList = (posSn, acquirerPosCode, page, size) => {
  return clients.default.get(
    '/activity/v1/store/pos/list',
    { params: { posSn, acquirerPosCode, page, size } }
  )
}

// POS管理 --- 新增
export const postStorePosAdd = (params) => {
  return clients.default.post(
    '/activity/v1/store/pos/add',
    params
  )
}

// POS管理 --- 编辑
export const postStorePosEdit = (params) => {
  return clients.default.post(
    '/activity/v1/store/pos/edit',
    params
  )
}

// POS管理 --- 删除
export const deleteStorePosDelete = (id) => {
  return clients.default.delete(
    '/activity/v1/store/pos/delete/' + id
  )
}

// POS管理 --- 门店id下拉
export const getStoreQuery = (keyWord) => {
  return clients.default.get(
    '/activity/v1/store/query?keyWord=' + keyWord
  )
}

// 银行管理 --- 列表
export const getBankList = (name, page, size) => {
  return clients.default.get(
    '/activity/v1/bank/list',
    { params: { name, page, size } }
  )
}

// 银行管理 --- 新增
export const postBankAdd = (params) => {
  return clients.default.post(
    '/activity/v1/bank/add',
    params
  )
}

// 银行管理 --- 编辑
export const postBankEdit = (params) => {
  return clients.default.post(
    '/activity/v1/bank/edit',
    params
  )
}

// 银行管理 --- 删除
export const deleteBankDelete = (id) => {
  return clients.default.delete(
    '/activity/v1/bank/delete/' + id
  )
}

// 分公司管理 --- 列表
export const getCompanyList = (name, page, size) => {
  return clients.default.get(
    '/activity/v1/company/list',
    { params: { name, page, size } }
  )
}

// 分公司管理 --- 新增
export const postCompanyAdd = (params) => {
  return clients.default.post(
    '/activity/v1/company/add',
    params
  )
}

// 分公司管理 --- 编辑
export const postCompanyEdit = (params) => {
  return clients.default.post(
    '/activity/v1/company/edit',
    params
  )
}

// 分公司管理 --- 删除
export const deleteCompanyDelete = (id) => {
  return clients.default.delete(
    '/activity/v1/company/delete/' + id
  )
}

// 卡bin管理 --- 列表
export const getCardBinList = (bankId, name, code, cardType, bin, page, size) => {
  return clients.default.get(
    '/activity/v1/cardBin/list',
    { params: { bankId, name, code, cardType, bin, page, size } }
  )
}

// 卡bin管理 --- 新增
export const postCardBinAdd = (params) => {
  return clients.default.post(
    '/activity/v1/cardBin/add',
    params
  )
}

// 卡bin管理 --- 编辑
export const postCardBinEdit = (params) => {
  return clients.default.post(
    '/activity/v1/cardBin/edit',
    params
  )
}

// 卡bin管理 --- 删除
export const deleteCardBinDelete = (id) => {
  return clients.default.delete(
    '/activity/v1/cardBin/delete/' + id
  )
}

export const getActivityQuery = (keyWord) => {
  return clients.default.get(
    '/activity/v1/query?keyWord=' + keyWord
  )
}

// 门店列表  新接口
// export const getShopsList = (params) => {
//   return clients.default.get(
//     '/shops/pos/getShopsX',
//     { params }
//   )
// }

// pos 列表 新接口
export const getPosList = (params) => {
  return clients.default.get(
    '/shops/pos/getPosList',
    { params }
  )
}

// TODO 门店列表新接口 待调试
export const getShopsList = (params) => {
  return axios.get(
    `${STORE_LIST_URL}/bankpos/getBankstoreList`,
    { params }
  )
}

// TODO 门店详情接口 好像没用到？
export const getShopsInfo = (marketId) => {
  return clients.default.get(
    '/shop/getStoresInfo',
    { params: { marketId } }
  )
}
