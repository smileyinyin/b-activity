import * as clients from '@/common/util/clients'

export const getReconciliationList = (bankId, keyword, startDate, endDate, pageNum, pageSize) => {
  return clients.default.get(
    '/activity/v1/transaction/check/query',
    { params: { bankId, keyword, pageNum, pageSize } }
  )
}
