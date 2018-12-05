export default [
  {
    path: 'merchant-list',
    name: 'MerchantList',
    meta: {
      title: '商户列表'
    },
    component: () => import('@/views/basic-data/merchant-management')
  }
]
