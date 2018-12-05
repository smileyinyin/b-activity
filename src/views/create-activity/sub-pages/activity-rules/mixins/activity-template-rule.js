/**
 * @desc activity-template-rule
 * @author pkeros
 * @date 20/02/2018
 * @mail pkeros@vip.qq.com
 */

export default {
  data () {
    return {
      // 活动规则
      templateRule: {
        // 满多少减多少
        MeetMinus: [],
        // 立折规则
        ImmediatelyDiscount: {
          discount: ''
        },
        // 立减规则
        ImmediatelyMinus: {
          money: ''
        },
        // 随机折扣
        RandomDiscount: [],
        // 随机立减
        RandomMinus: [],
        // 几号几折
        DateDiscount: [],
        // 满多少打几折
        MeetDiscount: [],
        // 折上减
        DiscountMinus: {
          blowMoney: '',
          discount: '',
          minusMoney: '',
          afterDiscountMoney: ''
        },
        // 优惠金额券
        CouponMinus: [],
        // 优惠打折券
        CouponDiscount: [],
        // 连环折扣
        SerialDiscount: [],
        // 周几几折
        WeekdayDiscount: [],
        // 票务折扣
        Ticket: []
      }
    }
  }
}
