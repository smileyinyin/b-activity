<template>
  <Card :shadow="shadow" class="info-card-wrapper" :padding="0">
    <div class="content-con" :style="{background: color}">
      <div class="left-area" :style="{width: leftWidth, paddingBottom: leftWidth, left: leftDistance}">
        <!-- <Icon class="icon" :type="icon" :size="iconSize" color="#fff"/> -->
        <i class="icon iconfont" :class="icon" :style="{ 'fontSize': iconSize + 'px' }" style="color: #fff"></i>
      </div>
      <div class="right-area" :style="{width: rightWidth}">
        <div>
          <slot></slot>
        </div>
      </div>
    </div>
    <!-- <div class="bttom-area">
      <Icon class="icon" type="android-alarm-clock" :size="10" color="#fff"/>
      <slot name="tip">最近一笔金额：</slot>
      {{ lastTime }}
    </div> -->
  </Card>
</template>

<script>
export default {
  name: 'InforCard',
  props: {
    left: {
      type: Number,
      default: 34
    },
    color: {
      type: String,
      default: '#2d8cf0'
    },
    icon: {
      type: String,
      default: ''
    },
    iconSize: {
      type: Number,
      default: 20
    },
    shadow: {
      type: Boolean,
      default: false
    },
    lastTime: {
      type: String
    }
  },
  computed: {
    leftWidth () {
      return `${this.left}%`
    },
    rightWidth () {
      return `${100 - this.left}%`
    },
    leftDistance () {
      return `${this.left * 2 / 3}%`
    }
  }
}
</script>

<style lang="scss" scoped>
.info-card-wrapper{
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-shadow: 0 2px 10px 0 rgba(7, 17, 27, 0.1);
  cursor: pointer;
  &:hover {
    box-shadow: 0 14px 30px 0 rgba(0,0,0,.1)!important;
  }
  /deep/ .ivu-card-body{
    width: 100%;
    height: 100%;
  }
  .content-con{
    width: 100%;
    height: 100%;
    color: #fff;
    position: relative;
    .left-area{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%,-50%,0);
      top: 42%;
      border-radius: 50%;
      & > .icon{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%,-50%,0);
        left: 40%;
        margin: 0;
      }
    }
    .right-area{
      position: absolute;
      top: 0px;
      height: 100%;
      display: table;
      text-align: left;
      right: 0px;
      & > div{
        margin-top: 30px;
      }
    }
  }
  .bttom-area {
    position: absolute;
    bottom: 0;
    padding-left: 10px;
    height: 40px;
    line-height: 40px;
    text-align: left;
    width: 100%;
    color: #fff;
    font-size: 10px;
    background-color: rgba(0,0,0,.1)
  }
}
</style>
