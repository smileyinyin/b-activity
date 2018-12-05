import Main from '@/views/main'
import EmptyRouter from '@/components/core/EmptyRouter'
import routerActivityManage from '@/router/sub-router/activity-manage'
import routerCreateActivity from '@/router/sub-router/create-activity'
import routerMerchantsSetUp from '@/router/sub-router/merchants-set-up'
import routerSimulationTest from '@/router/sub-router/simulation-test'
import routerCardBinManagement from '@/router/sub-router/card-bin-management'
import routerBankManagement from '@/router/sub-router/bank-management'
import routerCompanyManagement from '@/router/sub-router/company-management'
import routerMerchantManagement from '@/router/sub-router/merchant-management'
import routerStoreManagement from '@/router/sub-router/store-management'
import routerPosManagement from '@/router/sub-router/pos-management'
import routerTransactionManagement from '@/router/sub-router/transaction-management'
import routerTransactionReconciliation from '@/router/sub-router/transaction-reconciliation'

export default [
  {
    path: '/',
    redirect: { name: 'ActivityList' }
  },
  // 登录
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/app',
    name: 'App',
    children: [
      // 首页
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/home.vue')
      },
      // 活动管理
      {
        path: '/activity-manage',
        children: routerActivityManage,
        component: EmptyRouter
      },

      // 创建活动
      {
        path: '/create-activity',
        children: routerCreateActivity,
        component: () => import('@/views/create-activity/create-activity.vue')
      },

      // 商户设置
      {
        path: '/merchants-set-up',
        children: routerMerchantsSetUp,
        component: EmptyRouter
        // component: () => import('@/views/merchants-set-up/create-activity.vue')
      },
      // 模拟测试
      {
        path: '/simulation-test',
        children: routerSimulationTest,
        component: EmptyRouter
      },

      // 卡bin管理
      {
        path: '/card-bin-management',
        children: routerCardBinManagement,
        component: () => import('@/views/basic-data/card-bin-management.vue')
      },
      // 银行管理
      {
        path: '/bank-management',
        children: routerBankManagement,
        component: () => import('@/views/basic-data/bank-management.vue')
      },
      // 分公司管理
      {
        path: '/company-management',
        children: routerCompanyManagement,
        component: () => import('@/views/basic-data/company-management.vue')
      },
      // 商户管理
      {
        path: '/merchant-management',
        children: routerMerchantManagement,
        component: () => import('@/views/basic-data/merchant-management.vue')
      },
      // 门店管理
      {
        path: '/store-management',
        children: routerStoreManagement,
        component: () => import('@/views/basic-data/store-management.vue')
      },
      // POS机管理
      {
        path: '/pos-management',
        children: routerPosManagement,
        component: () => import('@/views/basic-data/pos-management.vue')
      },
      // 交易管理管理
      {
        path: '/transaction-management',
        children: routerTransactionManagement,
        component: () => import('@/views/transaction/transaction-management.vue')
      },
      {
        path: '/transaction-reconciliation',
        children: routerTransactionReconciliation,
        component: () => import('@/views/transaction/transaction-reconciliation.vue')
      },
      // 个人中心
      {
        path: '/person-center',
        name: 'userCenter',
        component: () => import('@/views/personalCenter/userList.vue')
      },
      {
        path: '/updatePassword',
        name: 'updatePassword',
        component: () => import('@/views/personalCenter/updatePassword.vue')
      }
    ],
    component: Main
  }
  // {
  //   path: '/',
  //   name: 'homehome',
  //   redirect: '/activity-list',
  //   component: Main,
  //   children: [
  //     // 活动列表
  //     {
  //       path: 'activity-list',
  //       name: 'ActivityList',
  //       component: () => import('@/views/activity-manage/activity-list/index.vue')
  //     },
  //     // 活动检查
  //     {
  //       path: 'activity-check',
  //       name: 'ActivityCheck',
  //       meta: {
  //         title: '活动检查'
  //       },
  //       component: () => import('@/views/activity-manage/activity-check')
  //     },
  //     // 创建活动
  //     {
  //       path: '/create-activity',
  //       name: 'create-activity',
  //       children: [
  //         {
  //           path: 'base-information',
  //           name: 'BaseInformation',
  //           component: () => import('@/views/create-activity/sub-pages/base-information')
  //         },
  //         {
  //           path: 'activity-rules',
  //           name: 'ActivityRules',
  //           component: () => import('@/views/create-activity/sub-pages/activity-rules')
  //         }
  //       ],
  //       component: () => import('@/views/create-activity/create-activity.vue')
  //     },
  //     // 商户设置
  //     {
  //       path: '/merchants-set-up',
  //       children: [
  //         // 商户设置
  //         {
  //           path: 'merchants-list',
  //           name: 'merchantsList',
  //           meta: {
  //             title: '商户设置'
  //           },
  //           component: () => import('@/views/merchants-set-up/sub-pages/merchants-list')
  //         }
  //       ],
  //       component: EmptyRouter
  //       // component: () => import('@/views/merchants-set-up/create-activity.vue')
  //     }
  //   ]
  // },
  // {
  //   path: 'transaction-manage',
  //   name: 'transaction-manage',
  //   component: Main,
  //   children: [
  //     {
  //       path: '/TransactionList',
  //       name: 'TransactionList',
  //       component: () => import('@/views/transaction/transaction-management.vue')
  //     },
  //     {
  //       path: '/ReconciliationList',
  //       name: 'ReconciliationList',
  //       component: () => import('@/views/transaction/transaction-reconciliation.vue')
  //     }
  //   ]
  // },
  // {
  //   path: 'basic-data',
  //   name: 'basic-data',
  //   component: Main,
  //   children: [
  //     // 卡bin管理
  //     {
  //       path: '/CardBinList',
  //       name: 'CardBinList',
  //       component: () => import('@/views/basic-data/card-bin-management.vue')
  //     },
  //     // 门店管理
  //     {
  //       path: '/StoreList',
  //       name: 'StoreList',
  //       component: () => import('@/views/basic-data/store-management.vue')
  //     },
  //     // POS机管理
  //     {
  //       path: '/PosList',
  //       name: 'PosList',
  //       component: () => import('@/views/basic-data/pos-management.vue')
  //     },
  //     // 银行管理
  //     {
  //       path: '/BankList',
  //       name: 'BankList',
  //       component: () => import('@/views/basic-data/bank-management.vue')
  //     }
  //   ]
  // }
]
