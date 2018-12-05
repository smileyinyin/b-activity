
export default {
  BaseInformation: {
    step: 0, // 第几步
    name: '基本信息', // 当前步骤名
    router: 'BaseInformation', // BaseInformation                            // 步骤路由
    prev: { h: false, router: null },
    next: { h: true, router: 'ActivityRules' }
  },

  ActivityRules: {
    step: 1,
    name: '规则设置',
    router: 'ActivityRules',
    prev: { h: true, router: 'BaseInformation' },
    next: { h: true, router: 'merchantsList' }
  }
}
