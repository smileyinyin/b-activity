<template>
  <div class="combo-discount-rule">
    <Form :model="formModel" ref="form" :rules="validRules" inline>
      <FormItem>
        <span>第</span>
      </FormItem>
      <FormItem prop="time">
        <XInput :value="formModel.time" disabled> </XInput>
      </FormItem>
      <FormItem>
        <span>次, 打</span>
      </FormItem>
      <FormItem prop="discount">
        <XInput v-model="formModel.discount" placeholder="几" clearable
                :maxlength="3" @on-change="inputChangeHandler"
                :disabled="disabled"
        > </XInput>
      </FormItem>
      <FormItem>
        <span>折</span>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { Select, Option, Input, Form, FormItem } from 'iview'
import ValidBus from '../utils/ValidBus'
import * as validator from '@/common/util/validator'

const validRules = {
  time: [
    // {type: 'string', required: true, message: '不可为空', trigger: 'change'},
  ],
  discount: [
    { type: 'string', required: true, message: '不可为空', trigger: 'blur' },
    { validator: validator.amount }
  ]
}

export default {
  data () {
    return {
      validRules,

      formModel: {
        time: '',
        discount: null,
        belowMoney: null
      }
    }
  },

  props: {
    pos: { type: Number, default: 0 },
    belowMoney: { type: String, default: '' },
    model: { type: Object, default () { return { time: '', discount: null } } },
    disabled: { type: Boolean, default: false }
  },

  watch: {
    model ({ time = '', discount = null }) {
      this.formModel.time = String(this.pos + 1)
      this.formModel.discount = discount === null ? null : String(discount)
      this.formModel.belowMoney = this.belowMoney === null ? null : String(this.belowMoney)

      this.inputChangeHandler()
    },

    belowMoney (val) {
      this.inputChangeHandler()
    }
  },

  methods: {
    inputChangeHandler (e) {
      let m = this.$parent.myValue && this.$parent.myValue[this.pos]

      m.time = String(this.pos + 1)
      m.discount = this.formModel.discount
      m.belowMoney = this.belowMoney
    }
  },

  created () {
    // init model.
    this.formModel.time = String(this.pos + 1)
    this.formModel.discount = this.model.discount === null ? null : String(this.model.discount)
    this.formModel.belowMoney = this.belowMoney === null ? null : String(this.belowMoney)

    this.inputChangeHandler()
  },

  mounted () {
    this.$nextTick(() => {
      ValidBus.addValid(`combo-discount-rule-${this.pos}`, this.$refs.form)
    })
  },

  destroyed () {
    ValidBus.removeValid(`combo-discount-rule-${this.pos}`)
  },

  components: {
    Select,
    Option,
    XInput: Input,
    Form,
    FormItem
  }
}
</script>

<style lang="scss">
  .combo-discount-rule {
    .ivu-form {
      display: flex; align-items: center;
    }

    .ivu-form-item {
      margin-bottom: 0;
    }
  }
</style>
