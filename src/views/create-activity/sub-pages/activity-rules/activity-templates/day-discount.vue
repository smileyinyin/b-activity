<template>
  <div class="week-discount">
    <!-- 几号几折 -->
    <!-- <h4>几号几折规则</h4> -->

    <rule-list class="pt20" v-model="model" :schema="{date: null, discount: null}" :size="8"
               :disabled="disabled"
    >
      <div slot-scope="props">
        <day-discount-rule :pos="props.i" :model="props.model" :disabled="disabled"> </day-discount-rule>
      </div>
    </rule-list>
  </div>
</template>

<script>
import RuleList from '@/views/create-activity/components/rule-list/index'
import DayDiscountRule from '../templates-r/day-discount-rule'

export default {
  data () {
    return {
      model: []
    }
  },

  props: {
    value: { type: Array, default () { return [{ date: null, discount: null }] } },
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
    RuleList, DayDiscountRule
  }
}
</script>

<style scoped>

</style>
