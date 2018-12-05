import * as clients from '@/common/util/clients'

export const getActivityList = (bankId) => {
  return clients.default.get(
    '/activity/home/ids',
    { params: { bankId } }
  )
}

export const getCollection = (bankId, activityId) => {
  return clients.default.get(
    '/activity/home/collection',
    { params: { bankId, activityId } }
  )
}

export const getRank = (bankId, activityId) => {
  return clients.default.get(
    '/activity/home/rank',
    { params: { bankId, activityId } }
  )
}

export const getTransaction = (bankId, activityId) => {
  return clients.default.get(
    '/activity/home/trans',
    { params: { bankId, activityId } }
  )
}

export const getMerchantAndStoreInfo = (bankId, activityId) => {
  return clients.default.get(
    '/activity/home/merchantAndStoreInfo',
    { params: { bankId, activityId } }
  )
}
