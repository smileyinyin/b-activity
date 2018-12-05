export const ticketTh = [
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
  // {
  //   title: '用户结算',
  //   align: 'center',
  //   width: 200,
  //   key: 'userSettlementStr'
  // },
  // {
  //   title: '门店结算方式',
  //   align: 'center',
  //   width: 200,
  //   key: 'storeSettlementStr'
  // },
  // {
  //   title: '门店折扣（%）',
  //   align: 'center',
  //   width: 200,
  //   key: 'storeDiscount'
  // },
  {
    title: '银行结算方式',
    align: 'center',
    width: 200,
    key: 'thirdPartySettlementStr'
  },
  {
    title: '银行折扣（%）',
    align: 'center',
    width: 200,
    key: 'thirdPartyDiscountRate'
  },
  // {
  //   title: '是否收取佣金',
  //   align: 'center',
  //   width: 200,
  //   key: 'brokerFee',
  //   render: (h, params) => {
  //     return h('span', params.row.brokerFee === 1 ? '是' : '否')
  //   }
  // },
  {
    title: '佣金（%）',
    width: 200,
    align: 'center',
    key: 'brokerFeeRate'
  },
  {
    title: '佣金上限（元）',
    width: 200,
    align: 'center',
    key: 'brokerFeeUpLimit'
  }
]

export const ticketActTh = [
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
    title: '是否收取佣金',
    align: 'center',
    width: 200,
    key: 'brokerFee',
    render: (h, params) => {
      return h('span', params.row.brokerFee === 1 ? '是' : '否')
    }
  },
  {
    title: '佣金（%）',
    width: 200,
    align: 'center',
    key: 'brokerFeeRate'
  },
  {
    title: '佣金上限（元）',
    width: 200,
    align: 'center',
    key: 'brokerFeeUpLimit'
  }
]

export const consequenceTh = [
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
    width: 200
  },
  {
    title: '银行账号',
    align: 'center',
    key: 'card',
    width: 200
  },
  {
    title: '测试时间',
    align: 'center',
    key: 'createdAt',
    width: 200
  },
  {
    title: '交易时间',
    align: 'center',
    key: 'dealTime',
    width: 200
  },
  {
    title: '消费金额（元）',
    align: 'center',
    key: 'amount',
    width: 150
  },
  {
    title: '可打折金额（元）',
    align: 'center',
    key: 'disAmount',
    width: 150
  },
  {
    title: '实付金额（元）',
    align: 'center',
    key: 'payAmount',
    width: 150
  },
  // {
  //   title: '门店折扣（%）',
  //   align: 'center',
  //   key: 'storeDiscount',
  //   width: 150
  // },
  // {
  //   title: '门店应补（元）',
  //   align: 'center',
  //   key: 'storeSubsidy',
  //   width: 150
  // },
  {
    title: '银行折扣（%）',
    align: 'center',
    key: 'bankDiscount',
    width: 150
  },
  {
    title: '银行应补（元）',
    align: 'center',
    key: 'bankSubsidy',
    width: 150
  }
  // {
  //   title: '折扣差金额（元）',
  //   align: 'center',
  //   key: 'discountDiff',
  //   width: 150
  // },
  // {
  //   title: '佣金（%）',
  //   align: 'center',
  //   key: 'brokerFeeRate',
  //   width: 100
  // }
]

export const actConsequenceTh = [
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
    width: 200
  },
  {
    title: '银行账号',
    align: 'center',
    key: 'card',
    width: 200
  },
  {
    title: '测试时间',
    align: 'center',
    key: 'createdAt',
    width: 200
  },
  {
    title: '交易时间',
    align: 'center',
    key: 'dealTime',
    width: 200
  },
  {
    title: '消费金额（元）',
    align: 'center',
    key: 'amount',
    width: 150
  },
  {
    title: '可打折金额（元）',
    align: 'center',
    key: 'disAmount',
    width: 150
  },
  {
    title: '实付金额（元）',
    align: 'center',
    key: 'payAmount',
    width: 150
  },
  {
    title: '门店应补（元）',
    align: 'center',
    key: 'storeSubsidy',
    width: 150
  },
  {
    title: '银行应补（元）',
    align: 'center',
    key: 'bankSubsidy',
    width: 150
  },
  {
    title: '折扣差金额（元）',
    align: 'center',
    key: 'discountDiff',
    width: 150
  },
  {
    title: '佣金（%）',
    align: 'center',
    key: 'brokerFeeRate',
    width: 100
  }
]

export const errorTh = [
  {
    title: '门店ID',
    align: 'center',
    key: 'storeId',
    width: 200
  },
  {
    title: '门店名称',
    align: 'center',
    key: 'storeName',
    width: 300
  },
  {
    title: '报错原因',
    align: 'center',
    key: 'remark'
  }
]

const tableData = {
  ticketTh: ticketTh,
  ticketActTh: ticketActTh,
  consequenceTh: consequenceTh,
  actConsequenceTh: actConsequenceTh,
  errorTh: errorTh
}

export default tableData
