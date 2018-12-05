/**
 * @desc activity-list-columns
 * @author pkeros
 * @date 30/01/2018
 * @mail pkeros@vip.qq.com
 */
import activityTemplates from './activity-templates'

const activityOperation = {
  edit: (cxt, h, params) => h('Button', {
    props: { type: 'default', size: 'small' },
    style: { margin: '0 5px' },

    on: {
      click: () => { cxt.editorActivity(params.row) }
    }
  }, '编辑'),

  del: (cxt, h, params) => h('Button', {
    props: { type: 'error', size: 'small' },
    style: { margin: '0 5px' },

    on: {
      click: () => { cxt.deleteActivity(params.row) }
    }
  }, '删除'),

  offline: (cxt, h, params) => h('Button', {
    props: { type: 'warning', size: 'small' },
    style: { margin: '0 5px' },

    on: {
      click: () => { cxt.offlineActivity(params.row) }
    }
  }, '提前下线'),

  test: (cxt, h, params) => h('Button', {
    props: { type: 'dashed', size: 'small' },
    style: { margin: '0 5px' },

    on: {
      click: () => {
        cxt.$router.push({
          name: 'simulationTest',
          query: { activityId: params.row.id }
        })
      }
    }
  }, '测试'),

  check: (cxt, h, params) => h('Button', {
    props: { type: 'info', size: 'small' },
    style: { margin: '0 5px' },

    on: {
      click: () => { cxt.checkActivity(params.row) }
    }
  }, '审核'),

  look: (cxt, h, params) => h('Button', {
    props: { type: 'success', size: 'small' },
    style: { margin: '5px' },

    on: {
      click: () => { cxt.checkActivity(params.row) }
    }
  }, '查看')
}

// 活动状态对应拥有的操作
const activityStatus2Operation = {
  'draft': ['edit', 'del'],
  'wait_check': ['check'],
  'in_progress': ['offline', 'look'],
  'online': ['offline', 'look'],
  'early_offline': ['look'],
  'finish': ['look']
}

// user 角色不可拥有 check审核/offline下面 功能
const userBlackList = ['check', 'offline']

export default function () {
  return [
    { title: '活动ID', key: 'id', sortable: true },
    { title: '活动名称', key: 'name' },
    {
      title: '活动类型',
      key: 'ruleType',
      render: (h, params) => {
        let type = activityTemplates.find(item => item.value === params.row.ruleType)
        return h('span', null, type ? type.des : '暂未选择')
      }
    },
    { title: '开始时间', key: 'startTime', sortable: true },
    { title: '结束时间', key: 'endTime', sortable: true },
    { title: '创建时间', key: 'createdAt', sortable: true },
    { title: '创建人', key: 'createdBy' },
    { title: '最后操作人', key: 'updatedBy' },
    { title: '状态', key: 'statusStr' },
    {
      title: '操作',
      key: 'action',
      width: 164,
      render: (h, params) => {
        let { status = 'draft' } = params.row
        let operationArr = []

        operationArr = activityStatus2Operation[status]
          .filter(oper => {
            if (this.$store.getters.level === 'user') {
              return userBlackList.indexOf(oper) < 0
            }
            return true
          })
          .map(oper => activityOperation[oper](this, h, params))

        return h('div', operationArr)
      }
    }
  ]
}
