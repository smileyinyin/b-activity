<template>
  <div class="day-select" v-click-outside="panelClickOutside">
    <input class="input-entity input" type="text" readonly="readonly" placeholder="活动时间" @click="panelShow = !panelShow" :value="value">
    <ul class="day-select-container" v-if="panelShow">
      <li class="day-select-item" v-for="i in 30" :key="i" :class="{active: dayIsSelected('' + (i))}" v-text="'' + (i)" @click="daySelectToggle('' + (i))"></li>
    </ul>
  </div>
</template>

<script>
import clickOutside from 'iview/src/directives/clickoutside'

export default{
  data () {
    return {
      panelShow: false
    }
  },

  props: {
    value: { type: String, required: true },
    disabled: { type: Boolean, default: false }
  },

  computed: {
    myValue: {
      get () {
        return ''.concat(this.value).split(',')
      },

      set (val) {
        // 最好不在这里修改 value，因为value是从prop传进来的
        this.value = val.join(',')
      }
    }
  },

  methods: {
    /**
       * @description 点击 panel 之外的处理函数
       */
    panelClickOutside () { this.panelShow = false },

    /**
       * @description 当前日期是否被选中
       * @param i 索引
       * @returns {boolean} 是否被选中
       */
    dayIsSelected (i) {
      return !!~this.myValue.indexOf(i)
    },

    /**
       * @description 日期选中处理函数
       * @param i 索引
       */
    daySelectToggle (i) {
      let isHit = this.dayIsSelected(i)
      let selectDay = this.myValue
      let myValue = ''

      // process disabled logic.
      if (this.disabled) { return }

      if (isHit) {
        myValue = selectDay.filter(_i => _i !== i)
      } else {
        myValue = [i].concat(selectDay)
      }

      this.$emit('input', myValue.join(','))
      this.$emit('on-change')
    }
  },

  directives: { clickOutside }
}
</script>

<style lang="scss">

  $panelWidth: 300px;                            // 组件的宽度
  $cellSize: 28px;                               // cell 的大小
  $inputWidth: 220px;                            // input 宽度

  .day-select {
    position: relative;
    display: inline-block;
  }

  // input 输入框
  .input-entity {
    width: $inputWidth;
    user-select: none;
    border: 1px solid #dddee1;
    border-radius: 4px;
    cursor: text; padding: 4px 7px; height: 32px;
    transition: border .2s ease-in-out,background .2s ease-in-out, box-shadow .2s ease-in-out;
  }

  // 日期选择 panel
  .day-select-container {
    position: absolute; margin-top: 3px;
    padding: 10px; width: $panelWidth;
    border-radius: 3px;
    box-shadow: 0 0 7px rgba(0, 0, 0, 0.2);
    background: white; z-index: 1;
  }
  .day-select-item {
    width: $cellSize; height: $cellSize; margin: 1px;
    border-radius: 3px; line-height: $cellSize;
    text-align: center;
    display: inline-block;
    cursor: pointer;

    &.active { background: #2d8cf0; color: white }
    &:hover { background: #2d8cf0; color: white }
  }
</style>
