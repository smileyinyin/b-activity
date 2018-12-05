<template>
  <div class="week-discount">
    <!-- 周几几折 -->
    <!-- <h4>周几几折规则</h4> -->

    <rule-list class="pt20" v-model="model" :schema="{weekday: null, discount: null}" :size="6"
               :disabled="disabled"
    >
      <div slot-scope="props">
        <week-discount-rule :pos="props.i" :model="props.model" :disabled="disabled"> </week-discount-rule>
      </div>
    </rule-list>
  </div>
</template>

<script>
import RuleList from '@/views/create-activity/components/rule-list/index'
import WeekDiscountRule from '../templates-r/week-discount-rule'

export default {
  data () {
    return {
      model: []
    }
  },

  props: {
    value: { type: Array, default () { return [{ weekday: null, discount: null }] } },
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
    RuleList, WeekDiscountRule
  }
}
</script>

<style scoped>

</style>
