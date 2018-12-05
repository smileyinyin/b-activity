export default [
  // 分公司管理
  {
    path: 'company-list',
    name: 'CompanyList',
    meta: {
      title: '分公司管理'
    },
    component: () => import('@/views/basic-data/company-management')
  }
]
