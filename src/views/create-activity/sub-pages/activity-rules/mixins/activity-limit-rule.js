/**
 * @desc activity-limit-rule
 * @author pkeros
 * @date 20/02/2018
 * @mail pkeros@vip.qq.com
 */

export default {
  data () {
    return {
      // 活动限制规则
      limitRule: {
        // 已经选择的限制条件
        selectedRule: [],
        // 卡 BIN 限制规则
        cardBinLimit: [],
        // 活动总次数限制
        activityTotalCount: {
          total: '',
          totalDay: '',
          totalMonth: '',
          totalWeek: ''
        },
        // 商户每卡参与次数
        merchantCardCount: {
          total: '',
          totalDay: '',
          totalMonth: '',
          totalWeek: ''
        },
        // 每商户参与次数
        merchantTakeCount: {
          total: '',
          totalDay: '',
          totalMonth: '',
          totalWeek: ''
        },
        // 每卡参与次数
        cardTakeCount: {
          total: '',
          totalDay: '',
          totalMonth: '',
          totalWeek: ''
        },
        // 用户参与次数
        userTakeCount: {
          total: '',
          totalDay: '',
          totalMonth: '',
          totalWeek: ''
        },
        // 票数限制
        ticketCount: {
          total: '',
          totalDay: '',
          totalMonth: '',
          totalWeek: ''
        },
        // 最低消费金额
        moneyLowSale: {
          amount: ''
        },
        // 最高优惠金额
        moneyMaxDiscount: {
          amount: ''
        },
        // 多少元内参与打折
        moneyHowMuch: {
          amount: ''
        }
      }
    }
  }
}
