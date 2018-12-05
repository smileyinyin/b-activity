<template>
  <div class="ticket">
    <!-- 票务规则 -->
    <!-- <h4>票务规则</h4> -->

    <rule-list class="pt20" v-model="model" :disabled="disabled"
               :schema="{name: null, originalPrice: null, actualPayment: null, numberLimit: null}"
    >
      <div slot-scope="props">
        <ticket-rule :pos="props.i" :model="props.model" :disabled="disabled"> </ticket-rule>
      </div>
    </rule-list>
  </div>
</template>

<script>
import RuleList from '@/views/create-activity/components/rule-list/index'
import TicketRule from '../templates-r/ticket-rule'

export default {
  data () {
    return {
      model: []
    }
  },

  props: {
    value: { type: Array,
      default () {
        return [{
          name: null, originalPrice: null, actualPayment: null, numberLimit: null
        }]
      } },
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
    RuleList, TicketRule
  }
}
</script>

<style scoped>

</style>
