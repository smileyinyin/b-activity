export default [
  {
    path: 'store-list',
    name: 'StoreList',
    meta: {
      title: '门店列表'
    },
    component: () => import('@/views/basic-data/store-management')
  }
]
