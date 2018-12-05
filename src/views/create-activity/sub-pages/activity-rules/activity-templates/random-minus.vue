<template>
  <div class="random-minus">
    <!-- 随机立减 -->
    <!-- <h4>随机立减规则</h4> -->

    <rule-list class="pt20" v-model="model" :schema="{amount: null, number: null}"
               :disabled="disabled"
    >
      <div slot-scope="props">
        <random-minus-rule :pos="props.i" :model="props.model" :disabled="disabled"> </random-minus-rule>
      </div>
    </rule-list>
  </div>
</template>

<script>
import RuleList from '@/views/create-activity/components/rule-list/index'
import RandomMinusRule from '../templates-r/random-minus-rule'

export default {
  data () {
    return {
      model: []
    }
  },

  props: {
    value: { type: Array, default () { return [{ amount: null, number: null }] } },
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
    RuleList, RandomMinusRule
  }
}
</script>

<style scoped>

</style>
