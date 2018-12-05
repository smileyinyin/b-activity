<template>
  <div class="immediately-discount">
    <!-- 立减规则 -->
    <!-- <h4>立减规则</h4> -->

    <div class="rule-wrap mt20">
      <Form class="ml20" :model="formModel" ref="form" :rules="validRules" inline>
        <FormItem>
          <span><em style="color:red">*</em>立减</span>
        </FormItem>
        <FormItem prop="money">
          <XInput v-model="formModel.money" placeholder="多少" :maxlength="8"
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
  money: [
    { type: 'string', required: true, message: '不可为空', trigger: 'blur' },
    { validator: validator.amount }
  ]
}

export default {
  data () {
    return {
      validRules,

      formModel: {
        money: ''
      }
    }
  },

  props: {
    value: { type: Object, default () { return { money: '' } } },
    disabled: { type: Boolean, default: false }
  },

  watch: {
    value (val) {
      let { money = '' } = val

      this.formModel.money = String(money)
    }
  },

  methods: {
    inputChangeHandler (e) {
      this.$emit('input', this.formModel)
    }
  },

  mounted () {
    this.$nextTick(() => {
      ValidBus.addValid('immediately-minus', this.$refs.form)
    })
  },

  destroyed () {
    ValidBus.removeValid('immediately-minus')
  },

  components: {
    RuleList, XInput: Input, Form, FormItem
  }
}
</script>

<style scoped>
.rule-wrap .ivu-form-item {
  margin-bottom: 0;
}
</style>
