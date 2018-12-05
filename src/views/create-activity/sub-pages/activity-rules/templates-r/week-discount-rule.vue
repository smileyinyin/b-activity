<template>
  <div class="week-discount-rule">
    <Form :model="formModel" ref="form" :rules="validRules" inline>
      <FormItem>
        <span><em style="color:red">*</em>周几</span>
      </FormItem>
      <FormItem prop="weekday">
        <Select v-model="formModel.weekday" class="mr10" clearable style="width: 100px"
                placeholder="请选择周几" @on-change="inputChangeHandler" :disabled="disabled"
        >
          <Option v-for="i in 7" :value="String(i-1)" :key="i-1">
            周{{number2week[i]}}
          </Option>
        </Select>
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
import ValidBus from '../utils/ValidBus'
import * as validator from '@/common/util/validator'

const validRules = {
  weekday: [
    { type: 'string', required: true, message: '不可为空', trigger: 'change' }
  ],
  discount: [
    { type: 'string', required: true, message: '不可为空', trigger: 'blur' },
    { validator: validator.discount }
  ]
}

const number2week = ['异常', '日', '一', '二', '三', '四', '五', '六']

export default {
  data () {
    return {
      validRules,
      number2week,

      formModel: {
        weekday: null,
        discount: null
      }
    }
  },

  props: {
    pos: { type: Number, default: 0 },
    model: { type: Object, default () { return { weekday: null, discount: null } } },
    disabled: { type: Boolean, default: false }
  },

  watch: {
    model ({ weekday = null, discount = null }) {
      this.formModel.weekday = weekday === null ? null : String(weekday)
      this.formModel.discount = discount === null ? null : String(discount)
    }
  },

  methods: {
    inputChangeHandler (e) {
      let m = this.$parent.myValue && this.$parent.myValue[this.pos]

      m.weekday = this.formModel.weekday
      m.discount = this.formModel.discount
    }
  },

  created () {
    // init model.
    this.formModel.weekday = this.model.weekday === null ? null : String(this.model.weekday)
    this.formModel.discount = this.model.discount === null ? null : String(this.model.discount)
  },

  mounted () {
    this.$nextTick(() => {
      ValidBus.addValid(`week-discount-${this.pos}`, this.$refs.form)
    })
  },

  destroyed () {
    ValidBus.removeValid(`week-discount-${this.pos}`)
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
  .week-discount-rule {
    .ivu-form {
      display: flex; align-items: center;
    }

    .ivu-form-item {
      margin-bottom: 0;
    }
  }
</style>
