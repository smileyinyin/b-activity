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
        <span>元, 打</span>
      </FormItem>
      <FormItem prop="discount">
        <XInput v-model="formModel.discount" placeholder="几"
                :maxlenght="3" @on-change="inputChangeHandler"
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
import { Input, Form, FormItem } from 'iview'
import ValidBus from '../utils/ValidBus'
import * as validator from '@/common/util/validator'

const validRules = {
  meetMoney: [
    { type: 'string', required: true, message: '不可为空', trigger: 'blur' },
    { validator: validator.amount }
  ],

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
        meetMoney: null,
        discount: null
      }
    }
  },

  props: {
    pos: { type: Number, default: 0 },
    model: { type: Object, default () { return { meetMoney: null, discount: null } } },
    disabled: { type: Boolean, default: false }
  },

  watch: {
    model ({ meetMoney = null, discount = null }) {
      this.formModel.meetMoney = meetMoney === null ? null : String(meetMoney)
      this.formModel.discount = discount === null ? null : String(discount)
    }
  },

  methods: {
    inputChangeHandler (e) {
      let m = this.$parent.myValue && this.$parent.myValue[this.pos]

      m.meetMoney = this.formModel.meetMoney
      m.discount = this.formModel.discount
    }
  },

  created () {
    // init model.
    this.formModel.meetMoney = this.model.meetMoney === null ? null : String(this.model.meetMoney)
    this.formModel.discount = this.model.discount === null ? null : String(this.model.discount)
  },

  mounted () {
    this.$nextTick(() => {
      ValidBus.addValid(`meet-discount-${this.pos}`, this.$refs.form)
    })
  },

  destroyed () {
    ValidBus.removeValid(`meet-discount-${this.pos}`)
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
