
let _def = {}
let _defStatus = {}

/*******************************************************
 *                        预测                          *
 *******************************************************/

//
// 预测 - 接口配置
//

_def.serverRemoteAddress = ''

//
// 预测 - 接口状态码
//

// 请求成功
_defStatus.SUCCESS = { code: 0, des: '请求成功' }
// 请求失败
_defStatus.FAILD = { code: -1, des: '请求失败' }
// 异常
_defStatus.ALEART = { code: 1, des: '警告' }

/*******************************************************
 *                        预测                          *
 *******************************************************/

export const def = _def
export const defStatus = _defStatus
