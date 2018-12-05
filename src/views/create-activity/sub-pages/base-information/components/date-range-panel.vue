<template>
  <div class="noname-wrap">
    <div class="date-range-panel" @click.capture="refreshDatePanelView">
      <div class="dateRangePanel" :class="[prefixCls + '-body']">
        <div class="dateRangePanel__left" :class="[prefixCls + '-content', prefixCls + '-content-left']">
          <div :class="[datePrefixCls + '-header']">
          <span :class="iconBtnCls('prev', '-double')" @click="prevYear('left')">
            <Icon type="ios-arrow-back"> </Icon>
          </span>
            <span :class="iconBtnCls('prev')" @click="prevMonth">
            <Icon type="ios-arrow-back"> </Icon>
          </span>

            <span class="dateRangePanel__year">{{leftYearText}}</span>
          </div>
          <date-table
            ref="leftDateTable"
            :year="leftYear"
            :month="leftMonth"
            :date="date"
            :min-date="startTime"
            :max-date="endTime"
            :range-state="rangeState"
            selection-mode="range"
            :disabled-date="cellHasDisabled"
            @on-pick="handleRangePick"
            @click.native.capture.stop="dateTableClickHandler('left', $event)">
          </date-table>
        </div>

        <div class="dateRangePanel__right" :class="[prefixCls + '-content', prefixCls + '-content-right']">
          <div :class="[datePrefixCls + '-header']">
          <span :class="iconBtnCls('next', '-double')" @click="nextYear('right')">
            <Icon type="ios-arrow-forward"> </Icon>
          </span>
            <span :class="iconBtnCls('next')" @click="nextMonth">
            <Icon type="ios-arrow-forward"> </Icon>
          </span>

            <span class="dateRangePanel__year">{{rightYearText}}</span>
          </div>
          <date-table
            ref="rightDateTable"
            :year="rightYear"
            :month="rightMonth"
            :date="rightDate"
            :min-date="startTime"
            :max-date="endTime"
            :range-state="rangeState"
            selection-mode="range"
            :disabled-date="cellHasDisabled"
            @on-pick="handleRangePick"
            @click.native.capture.stop="dateTableClickHandler('right', $event)"
          >
          </date-table>
        </div>
      </div>
    </div>
    <p style="color: red; line-height: 14px">
      Tip: 对活动开始时间, 活动结束时间, 可选时间段的操作都会导致删选时间面板重置!!! <br>
      <span class="p20">请注意操作顺序, 谨慎操作!!!</span>
    </p>
  </div>
</template>

<script>
import { Icon } from 'iview'
import DateTable from './date-table'
import {
  prevMonth, nextMonth, initTimeDate
} from '@/common/util/util'
import moment from 'moment'
// import cloneDeep from 'lodash/cloneDeep';
// import debounce from 'lodash/debounce';

const prefixCls = 'ivu-picker-panel'
const datePrefixCls = 'ivu-date-picker'
const selectedDateArray = new Set()

export default {
  data() {
    return {
      prefixCls,
      datePrefixCls,

      date: initTimeDate(),
      rangeState: {
        endDate: null,
        selecting: false
      },
      selectionMode: 'range'
    }
  },

  props: {
    value: { type: Array },
    excludeTimesList: { type: Array, default () { return [] } },
    canSelectedDay: { type: Array, default () { return [0, 1, 2, 3, 4, 5, 6] } },
    startTime: { required: true },
    endTime: { required: true },
    disabled: { type: Boolean, default: false }
  },

  computed: {
    leftYearText () {
      return moment(this.date).format('YYYY-MM')
    },

    rightYearText () {
      return moment(this.rightDate).format('YYYY-MM')
    },

    leftYear () {
      return this.date.getFullYear()
    },

    rightYear () {
      return this.rightDate.getFullYear()
    },

    leftMonth () {
      return this.date.getMonth()
    },

    rightMonth () {
      return this.rightDate.getMonth()
    },

    rightDate () {
      const newDate = new Date(this.date)
      const month = newDate.getMonth()
      newDate.setDate(1)

      if (month === 11) {
        newDate.setFullYear(newDate.getFullYear() + 1)
        newDate.setMonth(0)
      } else {
        newDate.setMonth(month + 1)
      }
      return newDate
    }
  },

  watch: {
    excludeTimesList (val) {
      setTimeout(() => {
        val.map(d => new Date(`${d} 12:00:00 AM`)).forEach(d => {
          // selectedDateArray.delete(d.getTime());
          this.addDateToSelectedArray(d, false)
          this.refreshDatePanelView()
        })
      }, 300)
    },

    canSelectedDay (val) {
      selectedDateArray.clear()
      this.watchCanSelectedDayHandler(val)
    },

    startTime () {
      selectedDateArray.clear()
      this.watchCanSelectedDayHandler(this.canSelectedDay)
      this.refreshDatePanelView()
    },

    endTime () {
      selectedDateArray.clear()
      this.watchCanSelectedDayHandler(this.canSelectedDay)
      this.refreshDatePanelView()
    }
  },

  methods: {
    /**
       * @desc date has can selected.
       */
    cellHasDisabled (date) {
      return !this.canSelectedDay.includes(date.getDay())
    },

    /**
       * @desc watch canSelectedDay handler.
       * @param val {array}
       */
    watchCanSelectedDayHandler (val) {
      const oneDay = 24 * 60 * 60 * 1000
      let countStartTimeAndTimeDays = moment(this.endTime).diff(moment(this.startTime), 'days')

      for (let i = 1; i < countStartTimeAndTimeDays; i++) {
        let d = new Date(this.startTime.getTime() + oneDay * i)

        this.addDateToSelectedArray(d, val.includes(d.getDay()))
      }

      this.refreshDatePanelView()
    },

    /**
       * @desc 进行日期取消选择操作
       */
    refreshDatePanelView () {
      setTimeout(() => {
        let leftTable = this.$refs['leftDateTable']
        let rightTable = this.$refs['rightDateTable']
        let readCells = leftTable.readCells.concat(rightTable.readCells)
        let readCellsSize = readCells.length

        // 进行日期选取操作
        for (let i = 0; i < readCellsSize; i++) {
          let cell = readCells[i]
          let { date = null } = cell

          // TODO: 陈年老垢的 BUG.
          // cell.range = true;
          this.$nextTick(() => {
            cell.range = selectedDateArray.has(date.getTime())
          })
        }
      }, 77)
    },

    /**
       * @desc add date to cancelSelectedCell array.
       * @param date {Date}
       * @param add {boolean}
       */
    addDateToSelectedArray (date, add = true) {
      let ut = date.getTime()

      // if greater endTime, or less startTime, return it.
      if (!this.startTime || !this.endTime) return
      let stut = this.startTime.getTime()
      let etut = this.endTime.getTime()
      if (ut < stut || ut > etut) return

      if (add) {
        selectedDateArray.add(ut)
      } else {
        selectedDateArray.delete(ut)
      }

      // update v model.
      let selectedTimes = Array.from(selectedDateArray).map(d => moment(d).format('YYYY-MM-DD'))
      selectedTimes.unshift(moment(this.startTime).format('YYYY-MM-DD'))
      selectedTimes.push(moment(this.endTime).format('YYYY-MM-DD'))
      this.$emit('input', selectedTimes)
    },

    /**
       * @desc date table click handler.
       * @param direction {string}
       * @param event {Event}
       */
    dateTableClickHandler (direction, event) {
      let currentTable = this.$refs[`${direction}DateTable`]
      let readCells = currentTable.readCells
      let readCellsSize = readCells.length
      let targetN = Number(event.target.innerText)

      // if disabled that component.
      if (this.disabled) { return }

      for (let i = 0; i < readCellsSize; i++) {
        let cell = readCells[i]
        let {
          start = false, end = false, disabled = false,
          range = false, text = null, type = 'normal',
          date = null
        } = cell

        // if current cell not equal clicked cell, break it.
        if (text !== targetN) continue
        // if cell is disabled, break it.
        if (disabled) continue
        // if cell type is not normal or today, break it.
        if (type !== 'normal' && type !== 'today') continue
        // TODO: disabled modify start or end cell.
        if (start || end) continue

        // cell.range = !range;
        this.addDateToSelectedArray(date, !range)

        return
      }
    },

    prevYear (direction) {
      if (this[`${direction}CurrentView`] === 'year') {
        this.$refs[`${direction}YearTable`].prevTenYear()
      } else if (this[`${direction}CurrentView`] === 'month') {
        this[`${direction}TableYear`]--
      } else {
        const date = this.date
        date.setFullYear(date.getFullYear() - 1)
        this.resetDate()
      }
    },

    nextYear (direction) {
      if (this[`${direction}CurrentView`] === 'year') {
        this.$refs[`${direction}YearTable`].nextTenYear()
      } else if (this[`${direction}CurrentView`] === 'month') {
        this[`${direction}TableYear`]++
      } else {
        const date = this.date
        date.setFullYear(date.getFullYear() + 1)
        this.resetDate()
      }
    },

    resetDate () {
      this.date = new Date(this.date)
    },

    handleRangePick (val, close = true) {

    },

    iconBtnCls (direction, type = '') {
      return [
        `${prefixCls}-icon-btn`,
        `${datePrefixCls}-${direction}-btn`,
        `${datePrefixCls}-${direction}-btn-arrow${type}`
      ]
    },

    prevMonth () {
      this.date = prevMonth(this.date)
    },

    nextMonth () {
      this.date = nextMonth(this.date)
    }
  },

  created () {
  },

  components: {
    DateTable, Icon
  }
}
</script>

<style lang="scss">
  .dateRangePanel > div {
    display: inline-block;
  }
  .date-range-panel {
    border-radius: 4px; border: 1px solid #dddee1;
    overflow: hidden; display: inline-block;

    .ivu-date-picker-cells {
      margin: 6px;
    }
  }
</style>
