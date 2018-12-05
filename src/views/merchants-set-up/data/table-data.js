export const editInlineAndCellColumn = [
  {
    type: 'selection',
    width: 60,
    align: 'center'
  },
  {
    title: '门店ID',
    align: 'center',
    key: 'storeId',
    width: 100
  },
  {
    title: '门店名称',
    align: 'center',
    key: 'storeName',
    width: 300
  },
  {
    title: '用户结算',
    align: 'center',
    width: 200,
    key: 'userSettlement',
    // option: [{ k: 0, txt: '请选择' }, { k: 'all', txt: '全单结算' }, { k: 'caijin', txt: '菜金结算' }], // all:全单结算, caijin:菜金结算
    // editable: true,
    // editselect: true
    render: h => h('span', null, '全单结算')
  },
  // {
  //   title: '门店结算方式',
  //   align: 'center',
  //   width: 200,
  //   key: 'storeSettlement',
  //   option: [{ k: 0, txt: '请选择' }, { k: 'total', txt: '全单结算' }, { k: 'food_pay', txt: '菜金结算' }, { k: 'pref_part', txt: '活动部分' }, { k: 'subsidy', txt: '补贴部分' }],
  //   editable: true,
  //   editselect: true
  // },
  // {
  //   title: '门店折扣（%）',
  //   align: 'center',
  //   width: 200,
  //   key: 'storeDiscount',
  //   editable: true
  // },
  {
    title: '银行结算方式',
    align: 'center',
    width: 200,
    key: 'thirdPartySettlement',
    // option: [{ k: 0, txt: '请选择' }, { k: 'pref_part', txt: '活动部分' }, { k: 'subsidy', txt: '补贴部分' }],
    // editable: true,
    // editselect: true
    render: (h) => {
      return h('span', null, '补贴部分')
    }
  },
  {
    title: '银行折扣（%）',
    align: 'center',
    width: 200,
    key: 'thirdPartyDiscountRate',
    // editable: true
    render: h => h('span', null, '100')
  },
  {
    title: '是否收取佣金', //
    align: 'center',
    width: 200,
    key: 'brokerFee',
    // option: [{ k: 0, txt: '否' }, { k: 1, txt: '是' }],
    // editable: true,
    // editselect: true
    render: h => h('span', null, '否')
  },
  // {
  //   title: '佣金（%）',
  //   width: 200,
  //   align: 'center',
  //   key: 'brokerFeeRate', /// /////
  //   editable: true
  // },
  // {
  //   title: '佣金上限（元）',
  //   width: 200,
  //   align: 'center',
  //   key: 'brokerFeeUpLimit', /// /
  //   editable: true
  // },
  {
    title: '操作',
    align: 'center',
    width: 180,
    key: 'handle',
    handle: ['edit', 'delete']
  }
]

export const ticketActTh = [
  {
    type: 'selection',
    width: 60,
    align: 'center'
  },
  {
    title: '门店ID',
    align: 'center',
    key: 'storeId',
    width: 100
  },
  {
    title: '门店名称',
    align: 'center',
    key: 'storeName',
    width: 300
  },
  {
    title: '门店应补（元）',
    align: 'center',
    width: 200,
    key: 'storeSubsidy',
    editable: true
  },
  {
    title: '银行应补（元）',
    align: 'center',
    width: 200,
    key: 'bankSubsidy',
    editable: true
  },
  {
    title: '是否收取佣金', //
    align: 'center',
    width: 200,
    key: 'brokerFee',
    option: [{ k: 0, txt: '否' }, { k: 1, txt: '是' }],
    editable: true,
    editselect: true
  },
  {
    title: '佣金（%）',
    width: 200,
    align: 'center',
    key: 'brokerFeeRate', /// /////
    editable: true
  },
  {
    title: '佣金上限（元）',
    width: 200,
    align: 'center',
    key: 'brokerFeeUpLimit', /// /
    editable: true
  },
  {
    title: '操作',
    align: 'center',
    width: 180,
    key: 'handle',
    handle: ['edit', 'delete']
  }
]

export const showCurrentColumns = [
  {
    title: '门店ID',
    align: 'center',
    key: 'storeId',
    width: 100
  },
  {
    title: '门店名称',
    align: 'center',
    key: 'storeName',
    width: 300
  },
  {
    title: '用户结算',
    align: 'center',
    width: 200,
    key: 'userSettlement',
    option: [{ k: 0, txt: '请选择' }, { k: 'all', txt: '全单结算' }, { k: 'caijin', txt: '菜金结算' }], // all:全单结算, caijin:菜金结算
    editable: true,
    editselect: true
  },
  {
    title: '门店结算方式',
    align: 'center',
    width: 200,
    key: 'storeSettlement',
    option: [{ k: 0, txt: '请选择' }, { k: 'total', txt: '全单结算' }, { k: 'food_pay', txt: '菜金结算' }, { k: 'pref_part', txt: '活动部分' }, { k: 'subsidy', txt: '补贴部分' }],
    editable: true,
    editselect: true
  },
  {
    title: '门店折扣（%）',
    align: 'center',
    width: 200,
    key: 'storeDiscount',
    editable: true
  },
  {
    title: '银行结算方式',
    align: 'center',
    width: 200,
    key: 'thirdPartySettlement',
    option: [{ k: 0, txt: '请选择' }, { k: 'pref_part', txt: '活动部分' }, { k: 'subsidy', txt: '补贴部分' }],
    editable: true,
    editselect: true
  },
  {
    title: '银行折扣（%）',
    align: 'center',
    width: 200,
    key: 'thirdPartyDiscountRate',
    editable: true
  },
  {
    title: '是否收取佣金', //
    align: 'center',
    width: 200,
    key: 'brokerFee',
    option: [{ k: 0, txt: '否' }, { k: 1, txt: '是' }],
    editable: true,
    editselect: true
  },
  {
    title: '佣金（%）',
    width: 200,
    align: 'center',
    key: 'brokerFeeRate', /// /////
    editable: true
  },
  {
    title: '佣金上限（元）',
    width: 200,
    align: 'center',
    key: 'brokerFeeUpLimit', /// /
    editable: true
  }
]

export const storeListH = [
  {
    type: 'selection',
    width: 60,
    align: 'center'
  },
  {
    title: '门店ID',
    key: 'storeId' // 'businessId'
  },
  {
    title: '门店名称',
    key: 'storeName'
  },
  {
    title: '商户名称',
    key: 'merchantName'
  }
]

const tableData = {
  editInlineAndCellColumn: editInlineAndCellColumn,
  ticketActTh: ticketActTh,
  showCurrentColumns: showCurrentColumns,
  storeListH: storeListH
}

export default tableData
