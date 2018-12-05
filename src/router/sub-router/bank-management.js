export default [
  // 银行管理
  {
    path: 'bank-list',
    name: 'BankList',
    meta: {
      title: '银行管理'
    },
    component: () => import('@/views/basic-data/bank-management')
  }
]
