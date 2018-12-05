<template>
  <div class="random-discount">
    <!-- 满多少减多少规则 -->
    <!-- <h4>满多少减多少规则</h4> -->

    <rule-list class="pt20" v-model="model" :schema="{meetMoney: null, minusMoney: null}"
               :disabled="disabled"
    >
      <div slot-scope="props">
        <meet-minus-rule :pos="props.i" :model="props.model" :disabled="disabled"> </meet-minus-rule>
      </div>
    </rule-list>
  </div>
</template>

<script>
import RuleList from '@/views/create-activity/components/rule-list/index'
import MeetMinusRule from '../templates-r/meet-minus-rule'

export default {
  data () {
    return {
      model: []
    }
  },

  props: {
    value: { type: Array, default () { return [{ meetMoney: null, minusMoney: null }] } },
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
    RuleList, MeetMinusRule
  }
}
</script>

<style scoped>

</style>
