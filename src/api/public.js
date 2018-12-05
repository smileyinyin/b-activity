
import * as clients from '@/common/util/clients'

export const getCityList = () => {
  return clients.default.get(
    '/activity/v1/public/list-city'
  )
}

export const getProvinceList = () => {
  return clients.default.get(
    '/activity/v1/public/list-province'
  )
}

export const getCityListOnProvince = (provinceId) => {
  return clients.default.get(
    '/activity/v1/public/list-province-city',
    { params: { provinceId } }
  )
}

export const getDistrictListOnCity = (cityId) => {
  return clients.default.get(
    '/activity/v1/public/list-city-district',
    { params: { cityId } }
  )
}

export const getBankList = () => {
  return clients.default.get(
    '/activity/v1/public/list-bank'
  )
}

export const getCompanyList = () => {
  return clients.default.get(
    '/activity/v1/public/list-company'
  )
}

export const getCardBinList = () => {
  return clients.default.get(
    '/activity/v1/public/list-card-bin'
  )
}

export const getCardBinListOnActivitySelectedBank = (bankId, activityId) => {
  return clients.default.get(
    '/activity/v1/public/list-card',
    { params: { id: activityId, bankId } }
  )
}
