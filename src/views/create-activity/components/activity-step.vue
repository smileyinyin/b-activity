<template>
  <div class="activity-step">
    <Steps :current="curStep">
      <Step title="基础信息"></Step>
      <Step title="活动规则"></Step>
      <Step title="门店设置"></Step>
      <Step title="活动测试"></Step>
    </Steps>
  </div>
</template>

<script>
export default {
  name: 'activityStep',
  props: {
    curStep: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
.activity-step {
  margin: 20px 0 60px;
  text-align: center;
}

.activity-step >>> .ivu-steps-main {
  top: 30px;
  left: -50px;
}

.ivu-steps-item {
  text-align: left;
}

.ivu-steps-item:last-of-type {
  width: auto!important;
}
</style>
