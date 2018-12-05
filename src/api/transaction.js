import * as clients from '@/common/util/clients'

export const getTransactionList = (bankId, keyword, startDate, endDate, pageNum, pageSize) => {
  return clients.default.get(
    '/activity/v1/transaction/query',
    { params: { bankId, keyword, startDate, endDate, pageNum, pageSize } }
  )
}
