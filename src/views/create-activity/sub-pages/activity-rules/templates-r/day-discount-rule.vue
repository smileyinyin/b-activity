<template>
  <div class="day-discount-rule">
    <Form :model="formModel" ref="form" :rules="validRules" inline>
      <FormItem prop="date">
        <em style="color:red">*</em>
        <day-select v-model="formModel.date" @on-change="inputChangeHandler"
                    :disabled="disabled"
        > </day-select>
      </FormItem>
      <FormItem>
        <span>打</span>
      </FormItem>
      <FormItem prop="discount">
        <XInput v-model="formModel.discount" placeholder="几"
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
import DaySelect from '../components/day-select'
import ValidBus from '../utils/ValidBus'
import * as validator from '@/common/util/validator'

const validRules = {
  date: [
    { type: 'string', required: true, message: '不可为空', trigger: 'change' }
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
        date: '',
        discount: null
      }
    }
  },

  props: {
    pos: { type: Number, default: 0 },
    model: { type: Object, default () { return { date: '', discount: null } } },
    disabled: { type: Boolean, default: false }
  },

  watch: {
    model ({ date = '', discount = null }) {
      this.formModel.date = date === null ? '' : String(date)
      this.formModel.discount = discount === null ? null : String(discount)
    }
  },

  methods: {
    inputChangeHandler (e) {
      let m = this.$parent.myValue && this.$parent.myValue[this.pos]

      m.date = this.formModel.date
      m.discount = this.formModel.discount
    }
  },

  created () {
    // init model.
    this.formModel.date = this.model.date === null ? '' : String(this.model.date)
    this.formModel.discount = this.model.discount === null ? null : String(this.model.discount)
  },

  mounted () {
    this.$nextTick(() => {
      ValidBus.addValid(`day-discount-${this.pos}`, this.$refs.form)
    })
  },

  destroyed () {
    ValidBus.removeValid(`day-discount-${this.pos}`)
  },

  components: {
    Select,
    Option,
    XInput: Input,
    Form,
    FormItem,
    DaySelect
  }
}
</script>

<style lang="scss">
  .day-discount-rule {
    .ivu-form {
      display: flex; align-items: center;
    }

    .ivu-form-item {
      margin-bottom: 0;
    }

    .ivu-form-item-error .day-select input {
      border: 1px solid #ed3f14;
    }
  }
</style>
