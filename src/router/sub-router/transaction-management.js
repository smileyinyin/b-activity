export default [
  {
    path: 'transaction-list',
    name: 'TransactionList',
    meta: {
      title: '交易查询'
    },
    component: () => import('@/views/transaction/transaction-management')
  }
]
