
export default [
  {
    name: '首页',
    icon: 'ios-home',
    router: 'home'
  },
  {
    name: '活动管理',
    icon: 'ios-pricetags',
    children: [
      { name: '活动列表', router: 'ActivityList', icon: 'md-list' }
    ]
  },
  {
    name: '交易管理',
    icon: 'ios-cube',
    children: [
      { name: '交易列表', router: 'TransactionList', icon: 'md-list-box' },
      { name: '活动对账', router: 'ReconciliationList', icon: 'logo-yen' }
    ]
  },
  {
    name: '基础数据管理',
    icon: 'ios-cube',
    children: [
      { name: '卡BIN管理', router: 'CardBinList', icon: 'ios-card' }
      // { name: '商户管理', router: 'MerchantList', icon: 'ios-box-outline' },
      // { name: '门店管理', router: 'StoreList', icon: 'ios-home-outline' },
      // { name: 'POS管理', router: 'PosList', icon: 'ios-print' },
      // { name: '银行管理', router: 'BankList', icon: 'ios-archive' }
      // { name: '分公司管理', router: 'CompanyList', icon: 'grid' },
    ]
  },
  {
    name: '个人中心',
    icon: 'md-person',
    children: [
      { name: '用户管理', router: 'userCenter', icon: 'md-person-add', access: ['super_admin'] },
      // { name: '修改绑定手机', router: 'updateMobile', icon: 'ios-phone-portrait' },
      { name: '修改密码', router: 'updatePassword', icon: 'ios-apps' }
    ]
  }
]
