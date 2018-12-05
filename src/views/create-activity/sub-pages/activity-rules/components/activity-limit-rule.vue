<template>
  <div class="activity-limit-rule pb20">
    <!-- 限制条件设置 -->
    <div class="limit-rule-wrap">
      <h4>限制条件设置</h4>

      <div class="limit-rule-container">
        <CheckboxGroup v-model="selectedLimitRule">
          <Checkbox v-for="limit in limitRules"
                    :key="limit" :value="limit" :label="limit"
                    :disabled="disabled || limit === 'cardBinLimit'"
          >
            <span v-text="activityRuleLimit[limit].name"></span>
          </Checkbox>
        </CheckboxGroup>
      </div>
    </div>

    <div class="limit-rule-input">
      <!-- 卡BIN限制 -->
      <card-bin-limit class="mt20" v-if="hasLimit('cardBinLimit')"
                      v-model="limitRule.cardBinLimit"
                      @input="$emit('update:cardBins', limitRule.cardBinLimit)"
                      @destroy="limitDestroyHandler('card_bins')"
                      :disabled="disabled"
      > </card-bin-limit>

      <!-- 活动总数限制 -->
      <div class="activity-total-count-limit mt20" v-if="hasLimit('activityTotalCountLimit')">
        <h4 class="">活动总数限制</h4>

        <quantity-limit v-model="limitRule.activityTotalCount" type="act_total"
                        v-if="hasLimit('activityTotalCountLimit')"
                        @input="quantitiesInputHandler('act_total', $event)"
                        @destroy="limitDestroyHandler('act_total')"
                        :disabled="disabled"
        > </quantity-limit>
      </div>

      <!-- 商户每卡参与次数 -->
      <div class="merchant-each-card-count-limit mt20" v-if="hasLimit('merchantACardTakeCountLimit')">
        <h4 class="">商户每卡参与次数</h4>

        <quantity-limit v-model="limitRule.merchantCardCount" type="store_card"
                        v-if="hasLimit('merchantACardTakeCountLimit')"
                        @input="quantitiesInputHandler('store_card', $event)"
                        @destroy="limitDestroyHandler('store_card')"
                        :disabled="disabled"
        > </quantity-limit>
      </div>

      <!-- 每商户参与次数 -->
      <div class="each-merchant-count0limi mt20" v-if="hasLimit('aMerchantTakeCountLimit')">
        <h4 class="">每商户参与次数</h4>

        <quantity-limit v-model="limitRule.merchantTakeCount" type="store"
                        v-if="hasLimit('aMerchantTakeCountLimit')"
                        @input="quantitiesInputHandler('store', $event)"
                        @destroy="limitDestroyHandler('store')"
                        :disabled="disabled"
        > </quantity-limit>
      </div>

      <!-- 每卡参与次数 -->
      <div class="each-card-count-limit mt20" v-if="hasLimit('aCardTakeCountLimit')">
        <h4 class="">每卡参与次数</h4>

        <quantity-limit v-model="limitRule.cardTakeCount" type="card"
                        v-if="hasLimit('aCardTakeCountLimit')"
                        @input="quantitiesInputHandler('card', $event)"
                        @destroy="limitDestroyHandler('card')"
                        :disabled="disabled"
        > </quantity-limit>
      </div>

      <!-- 票数限制次数 -->
      <div class="each-card-count-limit mt20" v-if="hasLimit('ticketCountLimit')">
        <h4 class="">票数限制张数</h4>

        <ticket-quantity-limit v-model="limitRule.ticketCount" type="ticket_total"
                        v-if="hasLimit('ticketCountLimit')"
                        @input="quantitiesInputHandler('ticket_total', $event)"
                        @destroy="limitDestroyHandler('ticket_total')"
                       :disabled="disabled"
        > </ticket-quantity-limit>
      </div>

      <!-- 多少元内参与打折 -->
      <money-how-much class="mt20" v-if="hasLimit('moneysHowMuchInLimit')"
                      v-model="limitRule.moneyHowMuch"
                      @input="moneyInputHandler('less_than', $event)"
                      @destroy="limitDestroyHandler('less_than')"
                      :disabled="disabled"
      > </money-how-much>

      <!-- 最低消费 -->
      <money-low-sale class="mt20" v-if="hasLimit('moneysLowSaleMoneyLimit')"
                      v-model="limitRule.moneyLowSale"
                      @input="moneyInputHandler('min_consume', $event)"
                      @destroy="limitDestroyHandler('min_consume')"
                      :disabled="disabled"
      > </money-low-sale>

      <!-- 最高优惠金额 -->
      <money-max-discount class="mt20" v-if="hasLimit('moneysMaxDiscountLimit')"
                          v-model="limitRule.moneyMaxDiscount"
                          @input="moneyInputHandler('max_preferential', $event)"
                          @destroy="limitDestroyHandler('max_preferential')"
                          :disabled="disabled"
      > </money-max-discount>
    </div>
  </div>
</template>

<script>
import { CheckboxGroup, Checkbox } from 'iview'
import mixinActivityLimitRule from '../mixins/activity-limit-rule'
import activityTemplateInfos from '../../../data/activity-template-infos'
import activityRuleLimit from '../../../data/activity-rule-limit'
import CardBinLimit from '../templates-l/card-bin-limit'
import MoneyHowMuch from '../templates-l/money-how-much'
import MoneyLowSale from '../templates-l/money-low-sale'
import MoneyMaxDiscount from '../templates-l/money-max-discount'
import QuantityLimit from '../templates-l/quantity-limit'
import TicketQuantityLimit from '../templates-l/ticket-quantity-limit'
import activityRuleLimitAlias from '../../../data/activity-rule-limit-alias'

export default {
  mixins: [mixinActivityLimitRule],

  data () {
    return {
      activityRuleLimit,

      selectedLimitRule: []
    }
  },

  props: {
    activityTemplateType: { type: String, default: 'MeetDiscount' },
    selectedLimit: { type: Array, default () { return [] } },
    cardBins: { type: Array, default () { return [] } },
    moneys: { type: Array, default () { return [] } },
    quantities: { type: Array, default () { return [] } },
    disabled: { type: Boolean, default: false }
  },

  computed: {
    limitRules () {
      return activityTemplateInfos[this.activityTemplateType].limit
    }
  },

  watch: {
    activityTemplateType (val) {
      // this.selectedLimitRule = []
      this.selectedLimitRule = activityTemplateInfos[val].limit
    },

    selectedLimit (val) {
      this.selectedLimitRule = val
    },

    selectedLimitRule (val) {
      this.$emit('update:selectedLimit', val)
    },

    cardBins (val) {
      this.limitRule.cardBinLimit = val
    },

    moneys (val) {
      for (let moneys of val) {
        let o = activityRuleLimitAlias[moneys.type]

        this.limitRule[o.short] = moneys
      }
    },

    quantities (val) {
      for (let quantity of val) {
        let o = activityRuleLimitAlias[quantity.type]

        this.limitRule[o.short] = quantity
      }
    }
  },

  methods: {
    /**
       * @desc check selectedLimitRule has specific limit rule.
       * @param limitName {string} limit name.
       * @return {boolean}
       */
    hasLimit (limitName) {
      return this.selectedLimitRule.includes(limitName)
    },

    /**
       * @desc limit rule destroy handler.
       * @param type {string} limit rule type.
       */
    limitDestroyHandler (type) {
      // cardBins limit process part.
      if (type === 'card_bins') {
        this.limitRule.cardBinLimit = []
        this.$emit(`update:${'cardBins'}`, [])

        return
      }

      // moneys and quantity class process part.
      let limitClass = activityRuleLimitAlias[type].classes
      let limitClassArr = this[activityRuleLimitAlias[type].classes]
      let targetI = limitClassArr.findIndex(({ type: _type = null }) => _type === type)

      if (!~targetI) { return }
      limitClassArr.splice(targetI, 1)
      this.$emit(`update:${limitClass}`, limitClassArr)
    },

    /**
       * @desc quantities class limit rule input event handler.
       * @param type {string} limit rule type.
       * @param amount {string} amount.
       */
    quantitiesInputHandler (type, {
      total = '0', totalMonth = '0', totalWeek = '0', totalDay = '0'
    }) {
      let target = this.quantities.filter(({ type: _type }) => _type === type)

      if (target.length) {
        target[0].total = total
        target[0].totalMonth = totalMonth
        target[0].totalWeek = totalWeek
        target[0].totalDay = totalDay
      } else {
        this.quantities.push({ total, totalMonth, totalDay, totalWeek, type })
      }

      this.$emit('update:quantities', this.quantities)
    },

    /**
       * @desc money class limit rule input event handler.
       * @param type {string} limit rule type.
       * @param amount {string} amount.
       */
    moneyInputHandler (type, { amount = '0' }) {
      let target = this.moneys.filter(({ type: _type }) => _type === type)

      if (target.length) {
        target[0].amount = amount
      } else {
        this.moneys.push({ amount, type })
      }

      this.$emit('update:moneys', this.moneys)
    }
  },

  created () {
    // this.selectedLimitRule = this.limitRules;
    // this.limitRule.cardBinLimit = this.cardBins;
  },

  components: {
    Checkbox,
    CheckboxGroup,
    CardBinLimit,
    MoneyHowMuch,
    MoneyLowSale,
    MoneyMaxDiscount,
    QuantityLimit,
    TicketQuantityLimit
  }
}
</script>

<style lang="scss">
  .limit-rule-container {
    padding: 12px 24px 12px 0;
    border-radius: 6px;
  }
</style>
