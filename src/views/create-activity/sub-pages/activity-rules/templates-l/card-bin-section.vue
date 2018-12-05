<template>
  <div class="card-bin-section">
    <Form :model="formModel" ref="form" :rules="validRules" inline>
      <FormItem>
        <span>卡BIN</span>
      </FormItem>
      <FormItem prop="data">
        <Select v-model="formModel.data" class="mr10" style="width: 280px" clearable
                placeholder="请选择卡片种类" @on-change="inputChangeHandler"
                :disabled="disabled"
        >
          <Option v-for="type in cardTypeList"
                  :value="type.bin" :key="type.bin"
          >
            {{type.name}} - {{type.bin}}
          </Option>
        </Select>

        <!--<select v-model="formModel.cardType">-->
          <!--<option v-for="(type, i) in cardTypeList"-->
                  <!--:value="type.bin" :key="type.id"-->
          <!--&gt;-->
            <!--{{type.name}} - {{type.cardName}} - {{type.bin}}-->
          <!--</option>-->
        <!--</select>-->
      </FormItem>
      <FormItem prop="extData">
        <XInput v-model="formModel.extData" placeholder="备注说明银行卡要求, 如以62开头"
                clearable @on-change="inputChangeHandler" style="width: 300px"
                :disabled="disabled"
        > </XInput>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { Select, Option, Input, Form, FormItem } from 'iview'
import ValidBus from '../utils/ValidBus'

let instance = null
const validRules = {
  data: [
    {
      validator (rule, value, callback, source, options) {
        if (!instance.formModel.extData && !instance.formModel.data) {
          callback(new TypeError('请选择卡BIN'))
        } else {
          callback()
        }
      }
    }
  ]
}

export default {
  data () {
    return {
      validRules,

      formModel: {
        data: null,
        extData: null
      }
    }
  },

  props: {
    pos: { type: Number, default: 0 },
    model: { type: Object, default () { return { data: null, extData: null } } },
    cardTypeList: { type: Array, default () { return [{ value: 'def', des: 'def' }] } },
    disabled: { type: Boolean, default: false }
  },

  watch: {
    model ({ data = null, extData = null }) {
      this.formModel.data = data === null ? null : data
      this.formModel.extData = extData === null ? null : extData
    }
  },

  methods: {
    inputChangeHandler (e) {
      let m = this.$parent.myValue && this.$parent.myValue[this.pos]

      m.data = this.formModel.data
      m.extData = this.formModel.extData
    }
  },

  created () {
    // init model.
    this.formModel.data = this.model.data === null ? null : String(this.model.data)
    this.formModel.extData = this.model.extData === null ? null : String(this.model.extData)
  },

  mounted () {
    this.$nextTick(() => {
      instance = this
      ValidBus.addValid(`card-bin-${this.pos}`, this.$refs.form)
    })
  },

  destroyed () {
    ValidBus.removeValid(`card-bin-${this.pos}`)
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
  .card-bin-section {
    .ivu-form {
      display: flex; align-items: center;
    }

    .ivu-form-item {
      margin-bottom: 0;
    }
  }
</style>
