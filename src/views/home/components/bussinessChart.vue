<template>
    <div ref="dom"></div>
</template>

<script>
import echarts from 'echarts'

const lineOption = {
  title: {
    text: '',
    x: 'center',
    textStyle: {
      fontWeight: 'normal'
    }
  },
  tooltip: {
    trigger: 'axis'
  },
  color: ['rgb(24, 144, 255)', '#00cc00'],
  legend: {
    orient: 'vertical',
    left: 0,
    data: ['交易金额', '分润金额']
  },
  toolbox: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      axisLabel: {
        rotate: -45
      },
      data: [
        // '1月',
        // '2月',
        // '3月',
        // '4月',
        // '5月',
        // '6月',
        // '7月',
        // '8月',
        // '9月',
        // '10月',
        // '11月',
        // '12月'
      ]
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '交易金额',
      type: 'line',
      stack: '总量',
      smooth: true,
      data: [
        // 100000,
        // 110000,
        // 120000,
        // 120000,
        // 130000,
        // 130000,
        // 130000,
        // 130000,
        // 130000,
        // 130000,
        // 120000,
        // 120000
      ],
      itemStyle: {
        normal: {
          color: 'rgb(24, 144, 255)',
          lineStyle: {
            color: 'rgb(24, 144, 255)'
          }
        }
      }
    }
  ]
}
const barOption = {
  title: {
    text: '',
    x: 'center',
    textStyle: {
      fontWeight: 'normal'
    }
  },
  tooltip: {},
  legend: {
    // orient: 'vertical',
    // left: 0,
    data: ['交易金额']
  },
  xAxis: [
    {
      type: 'category',
      axisLabel: {
        rotate: -45
      },
      data: []
    }
  ],
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [],
      type: 'bar'
    }
  ]
}

export default {
  name: 'serviceRequests',
  props: {
    activityId: {
      type: Number,
      required: true
    },
    data: {
      type: Array
    }
  },
  data() {
    return {
      dom: null,
      option: null
    }
  },
  watch: {
    data(arr) {
      // debugger
      let xArr = []
      let yArr = []
      if (this.activityId === 0) {
        // 0 则是全部有效活动
        this.option = barOption
        debugger
        this.option.title.text = '各活动交易额'
        arr.forEach(item => {
          xArr.push(item.activityName)
          yArr.push(item.totalAmount)
        })
      } else {
        this.option = lineOption
        debugger
        this.option.title.text = '近两周交易额'
        arr.forEach(item => {
          xArr.push(item.transDate.slice(5, 10))
          yArr.push(item.totalAmount)
        })
      }
      this.option.xAxis[0].data = xArr
      this.option.series[0].data = yArr
      this.dom && this.dom.setOption(this.option, true)
    }
  },
  methods: {
    resize() {
      this.dom.resize()
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.activityId === 0) {
        this.option = barOption
      } else {
        this.option = lineOption
      }
      this.dom = echarts.init(this.$refs.dom)
      this.dom.setOption(this.option)
      window.addEventListener('resize', this.resize)
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
  }
}
</script>
