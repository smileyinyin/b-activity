<template>
  <div class="immediately-discount">
    <!-- 立折规则 -->
    <!-- <h4>立折规则</h4> -->

    <div class="rule-wrap mt20">
      <Form class="ml20" :model="formModel" ref="form" :rules="validRules" inline>
        <FormItem>
          <span><em style="color:red">*</em>立折</span>
        </FormItem>
        <FormItem prop="discount">
          <XInput v-model="formModel.discount" placeholder="几" :maxlength="3"
                  @on-change="inputChangeHandler"
                  :disabled="disabled"
          > </XInput>
        </FormItem>
        <FormItem>
          <span>折</span>
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
  discount: [
    { type: 'string', required: true, message: '不可为空', trigger: 'blur' },
    { validator: validator.discount }
  ]
}

export default {
  data () {
    return {
      validRules,

      formModel: {
        discount: ''
      }
    }
  },

  props: {
    value: { type: Object, default () { return { discount: '' } } },
    disabled: { type: Boolean, default: false }
  },

  watch: {
    value (val) {
      let { discount = '' } = val

      this.formModel.discount = String(discount)
    }
  },

  methods: {
    inputChangeHandler (e) {
      this.$emit('input', this.formModel)
    }
  },

  mounted () {
    this.$nextTick(() => {
      ValidBus.addValid('immediately-discount', this.$refs.form)
    })
  },

  destroyed () {
    ValidBus.removeValid('immediately-discount')
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
