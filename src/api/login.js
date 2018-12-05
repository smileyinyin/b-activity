
import * as clients from '@/common/util/clients'

/* eslint-disable */
export const login = (login_name, password) => {
  return clients.default.post('/auth/login', { login_name, password })
}

export const logout = () => {
  return clients.default.post('/activity/v1/user/logout')
}

export const addUser = (params) => {
  return clients.default.post('/auth/user/add', params)
}

export const delUser = (userId) => {
  return clients.default.delete('/auth/user/delete/' + userId )
}

export const getUserList = (params) => {
  return clients.default.get('/auth/user/list', { params })
}

export const updatePassword = (data) => {
  return clients.default.put('/auth/user/update-password', data)
}