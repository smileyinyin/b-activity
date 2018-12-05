<template>
  <div class="ticket-rule">
    <Form :model="formModel" ref="form" :rules="validRules" inline>
      <FormItem>
        <span>票务名称</span>
      </FormItem>
      <FormItem prop="name">
        <XInput v-model="formModel.name" placeholder="票务名称"
                :maxlength="64" @on-change="inputChangeHandler"
                :disabled="disabled"
        > </XInput>
      </FormItem>
      <FormItem>
        <span>原价</span>
      </FormItem>
      <FormItem prop="originalPrice">
        <XInput v-model="formModel.originalPrice" placeholder="多少"
                :maxlenght="11" @on-change="inputChangeHandler"
                :disabled="disabled"
        > </XInput>
      </FormItem>
      <FormItem>
        <span>元, 实付</span>
      </FormItem>
      <FormItem prop="actualPayment">
        <XInput v-model="formModel.actualPayment" placeholder="多少"
                :maxlenght="11" @on-change="inputChangeHandler"
                :disabled="disabled"
        > </XInput>
      </FormItem>
      <FormItem>
        <span>元, 每卡可购</span>
      </FormItem>
      <FormItem prop="numberLimit">
        <XInput v-model="formModel.numberLimit" placeholder="多少"
                :maxlenght="11" @on-change="inputChangeHandler"
                :disabled="disabled"
        > </XInput>
      </FormItem>
      <FormItem>
        <span>张</span>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { Input, Form, FormItem } from 'iview'
import ValidBus from '../utils/ValidBus'
import * as validator from '@/common/util/validator'

const validRules = {
  name: [
    { type: 'string', required: true, message: '不可为空', trigger: 'blur' }
  ],

  originalPrice: [
    { type: 'string', required: true, message: '不可为空', trigger: 'blur' },
    { validator: validator.amount }
  ],

  actualPayment: [
    { type: 'string', required: true, message: '不可为空', trigger: 'blur' },
    { validator: validator.amount }
  ],

  numberLimit: [
    { type: 'string', required: true, message: '不可为空', trigger: 'blur' },
    { validator: validator.quantity }
  ]
}

export default {
  data () {
    return {
      validRules,

      formModel: {
        name: null,
        originalPrice: null,
        actualPayment: null,
        numberLimit: null
      }
    }
  },

  props: {
    pos: { type: Number, default: 0 },
    model: { type: Object,
      default () {
        return {
          name: null, originalPrice: null, actualPayment: null, numberLimit: null
        }
      } },
    disabled: { type: Boolean, default: false }
  },

  watch: {
    model ({ name = null, originalPrice = null, actualPayment = null, numberLimit = null }) {
      this.formModel.name = name === null ? null : String(name)
      this.formModel.originalPrice = originalPrice === null ? null : String(originalPrice)
      this.formModel.actualPayment = actualPayment === null ? null : String(actualPayment)
      this.formModel.numberLimit = numberLimit === null ? null : String(numberLimit)
    }
  },

  methods: {
    inputChangeHandler (e) {
      let m = this.$parent.myValue && this.$parent.myValue[this.pos]

      m.name = this.formModel.name
      m.originalPrice = this.formModel.originalPrice
      m.actualPayment = this.formModel.actualPayment
      m.numberLimit = this.formModel.numberLimit
    }
  },

  created () {
    // init model.
    this.formModel.name = this.model.name === null ? null : String(this.model.name)
    this.formModel.originalPrice = this.model.originalPrice === null ? null : String(this.model.originalPrice)
    this.formModel.actualPayment = this.model.actualPayment === null ? null : String(this.model.actualPayment)
    this.formModel.numberLimit = this.model.numberLimit === null ? null : String(this.model.numberLimit)
  },

  mounted () {
    this.$nextTick(() => {
      ValidBus.addValid(`ticket-${this.pos}`, this.$refs.form)
    })
  },

  destroyed () {
    ValidBus.removeValid(`ticket-${this.pos}`)
  },

  components: { XInput: Input, Form, FormItem }
}
</script>

<style lang="scss">
  .ticket-rule {
    .ivu-form {
      display: flex; align-items: center;
    }

    .ivu-form-item {
      margin-bottom: 0;
    }
  }
</style>
