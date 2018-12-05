
import * as clients from '@/common/util/clients'
import * as global from '@/config/global'

export const fetchActivityList = ({ id = null,
  name = null,
  storeId = null,
  storeName = null,
  creater = null,
  ruleType = null,
  statuses = null,
  page = null,
  bankId = null,
  companyId = null,
  size = global.LIST_SIZE
}) => {
  return clients.default.post(
    '/activity/v1/list',
    {
      id,
      name,
      creater,
      storeId,
      storeName,
      ruleType,
      statuses,
      page,
      size,
      bankId,
      companyId
    }
  )
}

export const submitToCheck = (id) => {
  return clients.default.get(
    '/activity/v1/check',
    { params: { id } }
  )
}

export const deleteActivity = (id) => {
  return clients.default.delete(
    '/activity/v1/delete',
    { params: { id } }
  )
}

export const offlineActivity = (id) => {
  return clients.default.post(
    `/activity/v1/revoke/?id=${id}`,
    '我要下线活动, 你管我!'
  )
}
