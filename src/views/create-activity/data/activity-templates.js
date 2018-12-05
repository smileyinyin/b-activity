
export default {
  /**
   * @desc 1. 几号几折
   */
  DateDiscount: {
    memberName: 'dateDiscounts', // memberName: 后端使用的模范对应的规则字段
    cardType: 'day-discount', // cardType: 规则卡片类型
    name: '几号几折', // name: 规则名称
    icon: '&#xe6cb;'
  },

  /**
   * @desc 2. 折上减
   */
  DiscountMinus: {
    memberName: 'discountMinus',
    cardType: 'discount-reduce',
    name: '折上减'
  },

  /**
   * @desc 3. 每满多少减多少
   */
  EveryMeetMinus: {
    memberName: 'everyMeetMinus',
    cardType: 'threshold-reduces',
    name: '每满多少减多少'
  },

  /**
   * @desc 4. 立折规则
   */
  ImmediatelyDiscount: {
    memberName: 'immediatelyDiscount',
    cardType: 'immediate-discount',
    name: '立折规则',
    icon: '&#xe50e;' // &#xe600;
  },

  /**
   * @desc 5. 立减规则
   */
  ImmediatelyMinus: {
    memberName: 'immediatelyMinus',
    cardType: 'immediate-reduce',
    name: '立减规则',
    icon: '&#xe61f;'
  },

  /**
   * @desc 6. 满多少打几折
   */
  MeetDiscount: {
    memberName: 'meetDiscounts',
    cardType: 'threshold-discount',
    name: '满多少打几折',
    icon: '&#xe782;'
  },

  /**
   * @desc 7. 满多少减多少
   */
  MeetMinus: {
    memberName: 'meetMinuses',
    cardType: 'threshold-reduce',
    name: '满多少减多少',
    icon: '&#xe60d;'
  },

  /**
   * @desc 8. 随机折扣
   */
  RandomDiscount: {
    memberName: 'randomDiscounts',
    cardType: 'random-discount',
    name: '随机折扣',
    icon: '&#xe63d;'
  },

  /**
   * @desc 9. 随机立减
   */
  RandomMinus: {
    memberName: 'randomMinuses',
    cardType: 'random-reduce',
    name: '随机立减',
    icon: '&#xe62f;'
  },

  /**
   * @desc 10. 连环折扣
   */
  SerialDiscount: {
    memberName: 'serialDiscounts',
    cardType: 'combo-discount',
    name: '连环折扣',
    icon: '&#xe669;'
  },

  /**
   * @desc 11. 票务规则
   */
  Ticket: {
    memberName: 'tickets',
    cardType: 'ticket-rule',
    name: '票务规则'
  },

  /**
   * @desc 12. 周几几折
   */
  WeekdayDiscount: {
    memberName: 'weekdayDiscounts',
    cardType: 'weekday-discount',
    name: '周几几折',
    icon: '&#xe642;' // &#xe641;
  },

  /**
   * @desc 13. 优惠金额券
   */
  CouponMinus: {
    memberName: 'couponMinus',
    cardType: 'money-ticket',
    name: '优惠金额券'
  },

  /**
   * @desc 14. 优惠打折券
   */
  CouponDiscount: {
    memberName: 'couponDiscounts',
    cardType: 'discount-ticket',
    name: '优惠打折券'
  }
}
