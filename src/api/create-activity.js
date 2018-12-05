
import * as clients from '@/common/util/clients'

export const saveActivityBaseInformation = (abr) => {
  return clients.default.post(
    '/activity/v1/add-base',
    abr
  )
}

export const getActivityBaseInformation = activityId => {
  return clients.default.get(
    '/activity/v1/update-base',
    { params: { id: activityId } }
  )
}

export const getActivityTemplates = activityId => {
  return clients.default.get(
    '/activity/v1/list-rule',
    { params: { id: activityId } }
  )
}

export const saveActivityLimitRule = (activityId, arlc) => {
  return clients.default.post(
    '/activity/v1/rule-limit',
    arlc
  )
}

export const getActivityLimitRule = (activityId) => {
  return clients.default.get(
    '/activity/v1/list-rule-limit',
    { params: { id: activityId } }
  )
}

export const getParentActivityList = () => {
  return clients.default.get(
    '/activity/v1/list-parent-act'
  )
}

// 根据 bankId, companyId, provinceId, cityId, districtId 获取对应中文
export const getListNames = (bankId, companyId, provinceId, cityId, districtId) => {
  return clients.default.get(
    '/activity/v1/select-list-names',
    { params: { bankId, companyId, provinceId, cityId, districtId } }
  )
}
