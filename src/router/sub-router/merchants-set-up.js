export default [
  // 商户设置
  {
    path: 'merchants-list',
    name: 'merchantsList',
    meta: {
      title: '商户设置'
    },
    component: () => import('@/views/merchants-set-up/sub-pages/merchants-list')
  }

]
