export default [
  {
    path: 'reconciliation-list',
    name: 'ReconciliationList',
    meta: {
      title: '活动对账'
    },
    component: () => import('@/views/transaction/transaction-reconciliation')
  }
]
