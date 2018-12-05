<template>
  <div class="random-minus-rule">
    <Form :model="formModel" ref="form" :rules="validRules" inline>
      <FormItem>
        <span><em style="color:red">*</em>随机立减</span>
      </FormItem>
      <FormItem prop="amount">
        <XInput v-model="formModel.amount" placeholder="多少"
                :maxlength="11" @on-change="inputChangeHandler"
                :disabled="disabled"
        > </XInput>
      </FormItem>
      <FormItem>
        <span>元, </span>
      </FormItem>
      <FormItem prop="number">
        <XInput v-model="formModel.number" placeholder="多少"
                :maxlenght="11" @on-change="inputChangeHandler"
                :disabled="disabled"
        > </XInput>
      </FormItem>
      <FormItem>
        <span>名</span>
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
  ],

  number: [
    { type: 'string', required: true, message: '不可为空', trigger: 'blur' },
    { validator: validator.quantity }
  ]
}

export default {
  data () {
    return {
      validRules,

      formModel: {
        amount: null,
        number: null
      }
    }
  },

  props: {
    pos: { type: Number, default: 0 },
    model: { type: Object, default () { return { amount: null, number: null } } },
    disabled: { type: Boolean, default: false }
  },

  watch: {
    model ({ amount = null, number = null }) {
      this.formModel.amount = amount === null ? null : String(amount)
      this.formModel.number = number === null ? null : String(number)
    }
  },

  methods: {
    inputChangeHandler (e) {
      let m = this.$parent.myValue && this.$parent.myValue[this.pos]

      m.amount = this.formModel.amount
      m.number = this.formModel.number
    }
  },

  created () {
    // init model.
    this.formModel.amount = this.model.amount === null ? null : String(this.model.amount)
    this.formModel.number = this.model.number === null ? null : String(this.model.number)
  },

  mounted () {
    this.$nextTick(() => {
      ValidBus.addValid(`random-minus-${this.pos}`, this.$refs.form)
    })
  },

  destroyed () {
    ValidBus.removeValid(`random-minus-${this.pos}`)
  },

  components: { XInput: Input, Form, FormItem }
}
</script>

<style lang="scss">
  .random-minus-rule {
    .ivu-form {
      display: flex; align-items: center;
    }

    .ivu-form-item {
      margin-bottom: 0;
    }
  }
</style>
