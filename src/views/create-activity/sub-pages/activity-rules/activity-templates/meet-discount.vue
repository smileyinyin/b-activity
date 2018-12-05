<template>
  <div class="random-discount">
    <!-- 满多少打几折规则 -->
    <!-- <h4>满多少打几折规则</h4> -->

    <rule-list class="pt20" v-model="model" :schema="{meetMoney: null, discount: null}"
               :disabled="disabled"
    >
      <div slot-scope="props">
        <meet-discount-rule :pos="props.i" :model="props.model" :disabled="disabled"> </meet-discount-rule>
      </div>
    </rule-list>
  </div>
</template>

<script>
import RuleList from '@/views/create-activity/components/rule-list/index'
import MeetDiscountRule from '../templates-r/meet-discount-rule'

export default {
  data () {
    return {
      model: []
    }
  },

  props: {
    value: { type: Array, default () { return [{ meetMoney: null, discount: null }] } },
    disabled: { type: Boolean, default: false }
  },

  watch: {
    model (val) {
      this.$emit('input', val)
    },

    value (val) {
      this.model = val
    }
  },

  components: {
    RuleList, MeetDiscountRule
  }
}
</script>
