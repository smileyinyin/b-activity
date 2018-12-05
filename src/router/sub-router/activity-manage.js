/**
 * @desc activity-manage router.
 * @author pkeros
 * @date 28/01/2018
 * @mail pkeros@vip.qq.com
 */
// @flow

export default [
  // 活动列表
  {
    path: 'activity-list',
    name: 'ActivityList',
    meta: {
      title: '活动列表'
    },
    component: () => import('@/views/activity-manage/activity-list')
  },

  // 活动检查
  {
    path: 'activity-check',
    name: 'ActivityCheck',
    meta: {
      title: '活动检查'
    },
    component: () => import('@/views/activity-manage/activity-check')
  }
]
