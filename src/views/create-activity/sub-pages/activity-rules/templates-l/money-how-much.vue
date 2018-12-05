<template>
  <div class="money-how-much">
    <!-- 多少元内参与打折 -->
    <h4 class="">多少元内参与打折</h4>

    <Form class="" :model="formModel" ref="form" :rules="validRules" inline>
      <FormItem class="w180" prop="amount">
        <XInput v-model="formModel.amount" placeholder="多少"
                :maxlength="11" @on-change="inputChangeHandler"
                :disabled="disabled"
        > </XInput>
      </FormItem>
      <FormItem>
        <span>元内，参与打折</span>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { Input, Form, FormItem } from 'iview'
import ValidBus from '../utils/ValidBus'
import * as validator from '@/common/util/validator'

const validRules = {
  amount: [
    { type: 'string', required: true, message: '不可为空', trigger: 'blur' },
    { validator: validator.amount }
  ]
}

export default {
  data () {
    return {
      validRules,

      formModel: {
        amount: null
      }
    }
  },

  props: {
    value: { type: Object, default () { return { amount: '' } } },
    disabled: { type: Boolean, default: false }
  },

  watch: {
    value (val) {
      let { amount = '' } = val

      this.formModel.amount = amount === null ? '' : String(amount)
    }
  },

  methods: {
    inputChangeHandler (e) {
      this.$emit('input', this.formModel)
    }
  },

  created () {
    // init model.
    this.formModel.amount = this.value.amount === null ? '' : String(this.value.amount)

    this.$emit('input', this.formModel)
  },

  mounted () {
    this.$nextTick(() => {
      ValidBus.addValid(`money-how-much`, this.$refs.form)
    })
  },

  destroyed () {
    ValidBus.removeValid(`money-how-much`)
    this.$emit('destroy')
  },

  components: { XInput: Input, Form, FormItem }
}
</script>

<style lang="scss">
  .money-how-much {
    .ivu-form {
      display: flex; align-items: center;
    }

    .ivu-form-item {
      margin-bottom: 0;
    }
  }
</style>
