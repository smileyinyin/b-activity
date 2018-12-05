
import * as global from '@/config/global'

// 测试 0.01 ~ MAX_NUMBER 小数点后最多不超过两位.
export const amount = function (rule, value, callback, source, options) {
  let val = Number(value)
  let valStr = String(val)

  if (Number.isNaN(val)) {
    callback(new TypeError('请输入正确字符!'))
  } else if (value === '') {
    callback()
  } else if (valStr.includes('.') && valStr.split('.')[1].length > 2) {
    callback(new TypeError('小数位数不允许超过两位'))
  } else if (val < 0.01 || global.MAX_NUMBER < val) {
    callback(new TypeError(`可输入范围 0.01 ~ ${global.MAX_NUMBER}`))
  } else {
    callback()
  }
}

// 测试 0.1 ~ 9.9 折扣范围.
export const discount = function (rule, value, callback, source, options) {
  let val = Number.parseFloat(value)

  if (Number.isNaN(val)) {
    callback(new TypeError('请输入正确字符!'))
  } else if (value === '') {
    callback()
  } else if (val < 0.1 || val > 9.9) {
    callback(new TypeError('可输入范围 0.1 ~ 9.9'))
  } else {
    callback()
  }
}

// 测试 1 ~ MAX_NUMBER
export const quantity = function (rule, value, callback, source, options) {
  let val = Number(value)
  let valStr = String(value)

  if (Number.isNaN(val)) {
    callback(new TypeError('请输入正确字符!'))
  } else if (value === '') {
    callback()
  } else if (valStr.includes('.')) {
    callback(new TypeError('不能够输入小数'))
  } else if (val < 1 || global.MAX_NUMBER < val) {
    callback(new TypeError(`可输入范围 1 ~ ${global.MAX_NUMBER}`))
  } else {
    callback()
  }
}
