<template>
  <div class="every-meet-minus">
    <!-- 每满多少减多少 -->
    <!-- <h4>每满多少减多少</h4> -->

    <div class="rule-wrap mt20">
      <Form class="ml20" :model="formModel" ref="form" :rules="validRules" inline>
        <FormItem>
          <span>每满</span>
        </FormItem>
        <FormItem prop="meetMoney">
          <XInput v-model="formModel.meetMoney" placeholder="多少"
                  @on-change="inputChangeHandler"
                  :disabled="disabled"
          > </XInput>
        </FormItem>
        <FormItem>
          <span>元, 减</span>
        </FormItem>
        <FormItem prop="minusMoney">
          <XInput v-model="formModel.minusMoney" placeholder="多少"
                  @on-change="inputChangeHandler"
                  :disabled="disabled"
          > </XInput>
        </FormItem>
        <FormItem>
          <span>元, 最高减</span>
        </FormItem>
        <FormItem prop="maxMinusMoney">
          <XInput v-model="formModel.maxMinusMoney" placeholder="多少"
                  @on-change="inputChangeHandler"
                  :disabled="disabled"
          > </XInput>
        </FormItem>
        <FormItem>
          <span>元</span>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import { Input, Form, FormItem } from 'iview'
import RuleList from '@/views/create-activity/components/rule-list/index'
import ValidBus from '../utils/ValidBus'
import * as validator from '@/common/util/validator'

const validRules = {
  meetMoney: [
    { type: 'string', required: true, message: '不可为空', trigger: 'blur' },
    { validator: validator.amount }
  ],

  minusMoney: [
    { type: 'string', required: true, message: '不可为空', trigger: 'blur' },
    { validator: validator.amount }
  ],

  maxMinusMoney: [
    { type: 'string', required: true, message: '不可为空', trigger: 'blur' },
    { validator: validator.amount }
  ]
}

export default {
  data () {
    return {
      validRules,

      formModel: {
        meetMoney: '',
        minusMoney: '',
        maxMinusMoney: ''
      }
    }
  },

  props: {
    value: { type: Object,
      default () {
        return {
          discount: '', minusMoney: '', maxMinusMoney: ''
        }
      } },
    disabled: { type: Boolean, default: false }
  },

  watch: {
    value (val) {
      let { discount = '', minusMoney = '', maxMinusMoney = '' } = val

      this.formModel.discount = discount
      this.formModel.minusMoney = minusMoney
      this.formModel.maxMinusMoney = maxMinusMoney
    }
  },

  methods: {
    inputChangeHandler (e) {
      this.$emit('input', this.formModel)
    }
  },

  mounted () {
    this.$nextTick(() => {
      ValidBus.addValid('every-meet-minus', this.$refs.form)
    })
  },

  destroyed () {
    ValidBus.removeValid('every-meet-minus')
  },

  components: {
    RuleList, XInput: Input, Form, FormItem
  }
}
</script>

<style lang="scss">
  .immediately-discount {
    .rule-wrap {
      display: flex; align-items: center;
    }
  }
</style>
