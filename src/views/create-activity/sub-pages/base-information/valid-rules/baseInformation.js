
import * as validator from '@/common/util/validator'

export default {
  name: [
    {
      required: true,
      message: '活动名称不能为空',
      trigger: 'blur',
      transform (value) {
        return String(value).trim()
      }
    }
  ],
  // province: [
  //   { required: true, message: '请选择省份', trigger: 'change' }
  // ],
  // city: [
  //   { required: true, message: '请选择城市', trigger: 'change' }
  // ],
  // bankId: [
  //   { type: 'number', required: true, message: '请选择活动主办方', trigger: 'change' }
  // ],
  // companyId: [
  //   { type: 'number', required: true, message: '请选择活动协办方', trigger: 'change' }
  // ],
  budget: [
    { required: false },
    { validator: validator.amount }
  ],
  actType: [
    { required: true, message: '请选择活动类型', trigger: 'change' }
  ],
  weeksList: [
    {
      validator (rule, value, callback, source, options) {
        if (!value.length) {
          callback(new TypeError('时间段 周一至周日必须选择一天!'))
        } else {
          callback()
        }
      }
    }
  ],
  startTime: [
    { type: 'date', required: true, message: '请选择活动开始时间', trigger: 'change' }
  ],
  endTime: [
    { type: 'date', required: true, message: '请选择活动结束时间', trigger: 'change' }
  ]
}
