<template>
  <ul class="rule-list__ul">
    <li class="rule-list__li" v-for="(v, i) in myValue" :key="i">
      <section class="rule-list__l">
        <slot :i="i" :model="myValue[i]"> this is slot part. </slot>
      </section>
      <section class="rule-list__r">
        <XButton class="mr10" type="success"
                 icon="md-add" @click="plus" :disabled="disabled"
        > </XButton>
        <XButton type="error" icon="md-remove"
                 @click="minus(i)" v-if="i !== start" :disabled="disabled"
        > </XButton>
      </section>
    </li>
  </ul>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { Button } from 'iview'

export default {
  data () {
    return {
      myValue: []
    }
  },

  props: {
    value: { type: Array, default () { return [] } },
    start: { type: Number, default: 0 },
    size: { type: Number, default: 8 },
    schema: { type: Object, required: true },
    valid: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  },

  watch: {
    value (val) {
      this.myValue = val
    }
  },

  methods: {
    plus () {
      this.$emit('plus')

      if (this.myValue.length > this.size) { return }

      this.myValue.push(cloneDeep(this.schema))
      this.$emit('input', this.myValue)
    },

    minus (i) {
      this.$emit('minus')

      this.myValue = this.myValue.filter((o, _i) => _i !== i)
      this.$emit('input', this.myValue)
    }
  },

  created () {
    this.myValue = this.value
    // init value.
    if (this.value.length === 0) {
      let initContainer = []
      for (let i = 0; i <= this.start; i++) {
        initContainer.push(cloneDeep(this.schema))
      }
      this.myValue = initContainer
      this.$emit('input', this.myValue)
    }
  },

  components: {
    XButton: Button
  }
}
</script>

<style lang="scss">
  @import "~SassMagic/src/mixins/BEM";

  @include b (rule-list) {
    @include e (ul) {
      // display: inline-block;
    }
    @include e (li) {
      display: flex; padding: 3px 6px 3px 0;
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }
    @include e (l) {
      padding: 0 12px 0 0;
    }
    @include e (r) {
      display: flex; justify-content: flex-start;
      align-items: center;
    }
  }
</style>
