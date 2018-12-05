<template>
  <div class="random-discount">
    <!-- 随机折扣 -->
    <!-- <h4>随机折扣规则</h4> -->

    <rule-list class="pt20" v-model="model" :schema="{discount: null, number: null}"
               :disabled="disabled"
    >
      <div slot-scope="props">
        <random-discount-rule :pos="props.i" :model="props.model" :disabled="disabled"> </random-discount-rule>
      </div>
    </rule-list>
  </div>
</template>

<script>
import RuleList from '@/views/create-activity/components/rule-list/index'
import RandomDiscountRule from '../templates-r/random-discunt-rule'

export default {
  data () {
    return {
      model: []
    }
  },

  props: {
    value: { type: Array, default () { return [{ discount: null, number: null }] } },
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
    RuleList, RandomDiscountRule
  }
}
</script>

<style scoped>

</style>
