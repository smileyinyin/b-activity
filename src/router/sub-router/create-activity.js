/**
 * @desc createActivity router.
 * @author pkeros
 * @date 28/01/2018
 * @mail pkeros@vip.qq.com
 */
// @flow

export default [
  // activity base information.
  {
    path: 'base-information',
    name: 'BaseInformation',
    meta: {
      title: '活动列表'
    },
    component: () => import('@/views/create-activity/sub-pages/base-information')
  },

  // activity rules.
  {
    path: 'activity-rules',
    name: 'ActivityRules',
    meta: {
      title: '活动规则'
    },
    component: () => import('@/views/create-activity/sub-pages/activity-rules')
  }
]
