
export default {
  /**
   * @desc 1. 几号几折
   */
  DateDiscount: {
    name: '几号几折', // name: 规则名称
    cardType: 'date-discount', // cardType: 规则卡片类型
    limit: [ // limit: 该模板拥有的限制规则
      'cardBinLimit',
      'activityTotalCountLimit',
      'merchantACardTakeCountLimit',
      'aMerchantTakeCountLimit',
      'aCardTakeCountLimit',
      'moneysLowSaleMoneyLimit',
      'moneysMaxDiscountLimit',
      'moneysHowMuchInLimit'
    ]
  },

  /**
   * @desc 2. 折上减
   */
  DiscountMinus: {
    name: '折上减',
    cardType: 'discount-minus',
    limit: [
      'cardBinLimit',
      'activityTotalCountLimit',
      'merchantACardTakeCountLimit',
      'aMerchantTakeCountLimit',
      'aCardTakeCountLimit',
      'moneysLowSaleMoneyLimit',
      'moneysMaxDiscountLimit'
    ]
  },

  /**
   * @desc 3. 每满多少减多少
   */
  EveryMeetMinus: {
    name: '每满多少减多少',
    cardType: 'every-meet-minus',
    limit: [
      'cardBinLimit',
      'activityTotalCountLimit',
      'merchantACardTakeCountLimit',
      'aMerchantTakeCountLimit',
      'aCardTakeCountLimit'
    ]
  },

  /**
   * @desc 4. 立折规则
   */
  ImmediatelyDiscount: {
    name: '立折规则',
    cardType: 'immediately-discount',
    limit: [
      'cardBinLimit',
      'activityTotalCountLimit',
      'merchantACardTakeCountLimit',
      'aMerchantTakeCountLimit',
      'aCardTakeCountLimit',
      'moneysLowSaleMoneyLimit',
      'moneysMaxDiscountLimit',
      'moneysHowMuchInLimit'
    ]
  },

  /**
   * @desc 5. 立减规则
   */
  ImmediatelyMinus: {
    name: '立减规则',
    cardType: 'immediately-minus',
    limit: [
      'cardBinLimit',
      'activityTotalCountLimit',
      'merchantACardTakeCountLimit',
      'aMerchantTakeCountLimit',
      'aCardTakeCountLimit',
      'moneysLowSaleMoneyLimit'
    ]
  },

  /**
   * @desc 6. 满多少打几折
   */
  MeetDiscount: {
    name: '满多少打几折',
    cardType: 'meet-discount',
    limit: [
      'cardBinLimit',
      'activityTotalCountLimit',
      'merchantACardTakeCountLimit',
      'aMerchantTakeCountLimit',
      'aCardTakeCountLimit',
      'moneysMaxDiscountLimit'
    ]
  },

  /**
   * @desc 7. 满多少减多少
   */
  MeetMinus: {
    name: '满多少减多少',
    cardType: 'meet-minus',
    limit: [
      'cardBinLimit',
      'activityTotalCountLimit',
      'merchantACardTakeCountLimit',
      'aMerchantTakeCountLimit',
      'aCardTakeCountLimit'
    ]
  },

  /**
   * @desc 8. 随机折扣
   */
  RandomDiscount: {
    name: '随机折扣',
    cardType: 'random-discount',
    limit: [
      'cardBinLimit',
      'activityTotalCountLimit',
      'merchantACardTakeCountLimit',
      'aMerchantTakeCountLimit',
      'aCardTakeCountLimit',
      'moneysLowSaleMoneyLimit',
      'moneysMaxDiscountLimit',
      'moneysHowMuchInLimit'
    ]
  },

  /**
   * @desc 9. 随机立减
   */
  RandomMinus: {
    name: '随机立减',
    cardType: 'random-minus',
    limit: [
      'cardBinLimit',
      'activityTotalCountLimit',
      'merchantACardTakeCountLimit',
      'aMerchantTakeCountLimit',
      'aCardTakeCountLimit',
      'moneysLowSaleMoneyLimit'
    ]
  },

  /**
   * @desc 10. 连环折扣
   */
  SerialDiscount: {
    name: '连环折扣',
    cardType: 'serial-discount',
    limit: [
      'cardBinLimit',
      'activityTotalCountLimit',
      'merchantACardTakeCountLimit',
      'aMerchantTakeCountLimit',
      'aCardTakeCountLimit',
      'moneysLowSaleMoneyLimit',
      'moneysMaxDiscountLimit'
    ]
  },

  /**
   * @desc 11. 票务规则
   */
  Ticket: {
    name: '票务规则',
    cardType: 'ticket',
    limit: [
      'cardBinLimit',
      'activityTotalCountLimit',
      'merchantACardTakeCountLimit',
      'aMerchantTakeCountLimit',
      'aCardTakeCountLimit',
      'moneysLowSaleMoneyLimit',
      'moneysMaxDiscountLimit',
      'ticketCountLimit'
    ]
  },

  /**
   * @desc 12. 周几几折
   */
  WeekdayDiscount: {
    name: '周几几折',
    cardType: 'weekday-discount',
    limit: [
      'cardBinLimit',
      'activityTotalCountLimit',
      'merchantACardTakeCountLimit',
      'aMerchantTakeCountLimit',
      'aCardTakeCountLimit',
      'moneysLowSaleMoneyLimit',
      'moneysMaxDiscountLimit',
      'moneysHowMuchInLimit'
    ]
  },

  /**
   * @desc 13. 优惠金额券
   */
  CouponMinus: {
    name: '优惠金额券',
    cardType: 'coupon-minus',
    limit: [
      'cardBinLimit',
      'activityTotalCountLimit',
      'merchantACardTakeCountLimit',
      'aMerchantTakeCountLimit',
      'aCardTakeCountLimit',
      'moneysLowSaleMoneyLimit'
    ]
  },

  /**
   * @desc 14. 优惠打折券
   */
  CouponDiscount: {
    name: '优惠打折券',
    cardType: 'coupon-discount',
    limit: [
      'cardBinLimit',
      'activityTotalCountLimit',
      'merchantACardTakeCountLimit',
      'aMerchantTakeCountLimit',
      'aCardTakeCountLimit',
      'moneysLowSaleMoneyLimit',
      'moneysMaxDiscountLimit'
    ]
  }
}
