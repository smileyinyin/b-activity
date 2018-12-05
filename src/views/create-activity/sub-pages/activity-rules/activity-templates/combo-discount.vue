<template>
  <div class="combo-discount">
    <!-- 连环折扣 -->
    <!-- <h4>连环折扣规则</h4> -->

    <Form class="pt20" :model="formModel" ref="form" :rules="validRules" inline>
      <FormItem>
        <span>用户刷卡</span>
      </FormItem>
      <FormItem prop="belowMoney">
        <XInput v-model="formModel.belowMoney" placeholder="多少"
                :maxlenght="11" :disabled="disabled"
        > </XInput>
      </FormItem>
      <FormItem>
        <span>元, 以内</span>
      </FormItem>
    </Form>

    <rule-list class="pt20" v-model="model" :schema="{time: null, discount: null, belowMoney: null}" :size="8" :disabled="disabled">
      <div slot-scope="props">
        <combo-discount-rule :pos="props.i" :model="props.model" :below-money="formModel.belowMoney"
                             :disabled="disabled"
        > </combo-discount-rule>
      </div>
    </rule-list>
  </div>
</template>

<script>
import { Input, Form, FormItem } from 'iview'
import RuleList from '@/views/create-activity/components/rule-list/index'
import ComboDiscountRule from '../templates-r/combo-discount-rule'
import ValidBus from '../utils/ValidBus'
import * as validator from '@/common/util/validator'

const validRules = {
  belowMoney: [
    { type: 'string', required: true, message: '不可为空', trigger: 'blur' },
    { validator: validator.amount }
  ]
}

export default {
  data () {
    return {
      validRules,

      model: [],

      formModel: {
        belowMoney: ''
      }
    }
  },

  props: {
    value: { type: Array, default () { return [{ time: null, discount: null, belowMoney: null }] } },
    disabled: { type: Boolean, default: false }
  },

  watch: {
    model (val) {
      this.$emit('input', val)
    },

    value (val) {
      this.model = val

      this.formModel.belowMoney = val[0].belowMoney || ''
    }
  },

  mounted () {
    this.$nextTick(() => {
      ValidBus.addValid(`combo-discount-${this.pos}`, this.$refs.form)
    })
  },

  destroyed () {
    ValidBus.removeValid(`combo-discount-${this.pos}`)
  },

  components: {
    RuleList,
    ComboDiscountRule,
    XInput: Input,
    Form,
    FormItem
  }
}
</script>

<style lang="scss">
  .combo-discount {
    .ivu-form {
      display: flex; align-items: center;
    }

    .ivu-form-item {
      margin-bottom: 0;
    }
  }
</style>
