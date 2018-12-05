<template>
  <div class="random-discount-rule">
    <Form :model="formModel" ref="form" :rules="validRules" inline>
      <FormItem class="w50">
        <span><em style="color:red">*</em>随机</span>
      </FormItem>
      <FormItem prop="discount">
        <XInput v-model="formModel.discount" placeholder="几"
                :maxlength="3" @on-change="inputChangeHandler"
                :disabled="disabled"
        > </XInput>
      </FormItem>
      <FormItem>
        <span>折, </span>
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
  discount: [
    { type: 'string', required: true, message: '不可为空', trigger: 'blur' },
    { validator: validator.discount }
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
        discount: null,
        number: null
      }
    }
  },

  props: {
    pos: { type: Number, default: 0 },
    model: { type: Object, default () { return { discount: null, number: null } } },
    disabled: { type: Boolean, default: false }
  },

  watch: {
    model ({ discount = null, number = null }) {
      this.formModel.discount = discount === null ? null : String(discount)
      this.formModel.number = number === null ? null : String(number)
    }
  },

  methods: {
    inputChangeHandler (e) {
      let m = this.$parent.myValue && this.$parent.myValue[this.pos]

      m.discount = this.formModel.discount
      m.number = this.formModel.number
    }
  },

  created () {
    // init model.
    this.formModel.discount = this.model.discount === null ? null : String(this.model.discount)
    this.formModel.number = this.model.number === null ? null : String(this.model.number)
  },

  mounted () {
    this.$nextTick(() => {
      ValidBus.addValid(`random-discount-${this.pos}`, this.$refs.form)
    })
  },

  destroyed () {
    ValidBus.removeValid(`random-discount-${this.pos}`)
  },

  components: { XInput: Input, Form, FormItem }
}
</script>

<style lang="scss">
  .random-discount-rule {
    .ivu-form {
      display: flex; align-items: center;
    }

    .ivu-form-item {
      margin-bottom: 0;
    }
  }
</style>
