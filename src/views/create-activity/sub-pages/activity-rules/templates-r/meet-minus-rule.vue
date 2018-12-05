<template>
  <div class="meet-discount-rule">
    <Form :model="formModel" ref="form" :rules="validRules" inline>
      <FormItem>
        <span><em style="color:red">*</em>满</span>
      </FormItem>
      <FormItem prop="meetMoney">
        <XInput v-model="formModel.meetMoney" placeholder="多少"
                :maxlength="11" @on-change="inputChangeHandler"
                :disabled="disabled"
        > </XInput>
      </FormItem>
      <FormItem>
        <span>元, 减</span>
      </FormItem>
      <FormItem prop="minusMoney">
        <XInput v-model="formModel.minusMoney" placeholder="多少"
                :maxlenght="11" @on-change="inputChangeHandler"
                :disabled="disabled"
        > </XInput>
      </FormItem>
      <FormItem>
        <span>元</span>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { Input, Form, FormItem } from 'iview'
import ValidBus from '../utils/ValidBus'
import * as validator from '@/common/util/validator'

let instance = null
const validRules = {
  meetMoney: [
    { type: 'string', required: true, message: '不可为空', trigger: 'blur' },
    { validator: validator.amount },
    {
      validator (rule, value, callback, source, options) {
        let meetMoney = Number(instance.formModel.meetMoney)
        let minusMoney = Number(instance.formModel.minusMoney)

        if (meetMoney < minusMoney) {
          callback(new TypeError('满多少的值应该大于减多少的值!'))
        } else {
          callback()
        }
      }
    }
  ],

  minusMoney: [
    { type: 'string', required: true, message: '不可为空', trigger: 'blur' },
    { validator: validator.amount }
  ]
}

export default {
  data () {
    return {
      validRules,

      formModel: {
        meetMoney: null,
        minusMoney: null
      }
    }
  },

  props: {
    pos: { type: Number, default: 0 },
    model: { type: Object, default () { return { meetMoney: null, minusMoney: null } } },
    disabled: { type: Boolean, default: false }
  },

  watch: {
    model ({ meetMoney = null, minusMoney = null }) {
      this.formModel.meetMoney = meetMoney === null ? null : String(meetMoney)
      this.formModel.minusMoney = minusMoney === null ? null : String(minusMoney)
    }
  },

  methods: {
    inputChangeHandler (e) {
      let m = this.$parent.myValue && this.$parent.myValue[this.pos]

      m.meetMoney = this.formModel.meetMoney
      m.minusMoney = this.formModel.minusMoney
    }
  },

  created () {
    // init model.
    this.formModel.meetMoney = this.model.meetMoney === null ? null : String(this.model.meetMoney)
    this.formModel.minusMoney = this.model.minusMoney === null ? null : String(this.model.minusMoney)
  },

  mounted () {
    this.$nextTick(() => {
      instance = this

      ValidBus.addValid(`meet-minus-${this.pos}`, this.$refs.form)
    })
  },

  destroyed () {
    ValidBus.removeValid(`meet-minus-${this.pos}`)
  },

  components: { XInput: Input, Form, FormItem }
}
</script>

<style lang="scss">
  .meet-discount-rule {
    .ivu-form {
      display: flex; align-items: center;
    }

    .ivu-form-item {
      margin-bottom: 0;
    }
  }
</style>
