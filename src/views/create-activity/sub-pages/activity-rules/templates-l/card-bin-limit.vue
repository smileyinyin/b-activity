<template>
  <div class="card-bin-limit">
    <!-- 卡BIN限制 -->
    <h4>卡BIN限制</h4>

    <rule-list class="" v-model="model" :schema="{data: null, extData: null}" :disabled="disabled">
      <div slot-scope="props">
        <card-bin-section :pos="props.i" :model="props.model" :cardTypeList="cardTypeList" :disabled="disabled"> </card-bin-section>
      </div>
    </rule-list>
  </div>
</template>

<script>
import RuleList from '@/views/create-activity/components/rule-list/index'
import CardBinSection from './card-bin-section'
import * as ApiPublic from '@/api/public'

export default {
  data () {
    return {
      bankId: this.$store.getters.bank_id,
      model: [],
      cardTypeList: []
    }
  },
  props: {
    value: { type: Array, default () { return [{ data: null, extData: null }] } },
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

  methods: {
    async getCardBinType () {
      // let { data = [] } = await ApiPublic.getCardBinList();
      let activityId = String(this.$route.query.activityId)
      let { data = [] } = await ApiPublic.getCardBinListOnActivitySelectedBank(this.bankId, activityId)

      this.cardTypeList = data.slice(0, 512)
    }
  },

  created () {
    this.getCardBinType()

    this.model = this.value
  },
  destroyed () {
    this.$emit('destroy')
  },
  components: {
    CardBinSection, RuleList
  }
}
</script>
