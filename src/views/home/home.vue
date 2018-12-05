<template>
  <div class="home">
    <select-activity :activityList="activityList" @on-change="activityChange"></select-activity>
    <Row :gutter="20" class-name="infor-card">
      <i-col v-for="(infor, i) in inforCardData" :key="`infor-${i}`" v-if="hasActivityCount(infor)" :md="6" :xs="12" style="height: 120px; margin-bottom: 20px;">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36" :lastTime="infor.lastTime" @click.native="$router.push({ name: infor.router })">
          <count-to :end="infor.count" count-class="count-style" :decimals="infor.decimals"><span v-if="infor.prefix" slot="prefix" class="count-style">￥</span></count-to>
          <p class="title">{{ infor.title }}</p>
          <!-- <span v-if="infor.tip" slot="tip">{{ infor.tip }}</span> -->
        </infor-card>
      </i-col>
    </Row>
    <Row :gutter="20" class-name="center-number">
      <i-col :md="16" :xs="24">
        <Card class="mb20">
          <Row :gutter="10">
            <i-col :md="6" :xs="12" v-for="(record, i) in records" :key="i" class-name="center-content">
              <div class="left">
                <count-to :end="record.count" count-class="number-style" />
                <p class="title">{{ record.title }}</p>
              </div>
              <div class="right">
                <i class="icon iconfont" :class="i % 2 === 0 ? 'icon-chart' : 'icon-shangsheng2'"
                  :style="{ color: i % 2 === 0 ? '#2d8cf0' : '#f39182', fontSize: '24px' }"
                ></i>
              </div>
            </i-col>
          </Row>
        </Card>
        <Card style="height: 480px;" class="mb30">
            <h4 slot="title" >流水总额</h4>
            <!-- <RadioGroup v-model="billLabel" type="button" >
                <Radio label="商户交易额"></Radio>
                <Radio label="卡bin交易额"></Radio>
            </RadioGroup> -->
            <bussiness-chart :activityId="activityId" :data="transactionList" style="height: 320px;margin-top: 20px;"></bussiness-chart>
          <!-- <example style="height: 320px;margin-top: 20px;"/> -->
        </Card>
      </i-col>
      <i-col :md="8" :xs="24">
        <Card style="height: 626px;">
            <h4 slot="title" >业务排行榜</h4>
            <!-- <RadioGroup v-model="rankLabel" type="button" >
                <Radio label="商户交易笔数"></Radio>
                <Radio label="卡bin刷卡笔数"></Radio>
            </RadioGroup> -->
            <rank-list :data="rankList" v-if="rankLabel === '商户交易笔数'"></rank-list>
            <!-- <rank-list :data="rankData" v-else-if="rankLabel === '卡bin刷卡笔数'" :title="['排名', '卡bin', '笔数']"></rank-list> -->
          <!-- <rank-chart style="height: 320px;margin-top: 20px;"></rank-chart> -->
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import InforCard from '@/components/info-card'
import CountTo from '@/components/count-to'
import rankList from './components/rankList'
import bussinessChart from './components/bussinessChart'
import selectActivity from './components/selectActivity'
import * as ApiHome from '@/api/home'

/**
 *  "activityCount": 4,         活动数
    "cardCount": 2,             参与用户（个
    "cardBinCount": 1,          参与卡bin
    "merchantCount": 1,         参与商户
    "storeCount": 1,            参与门店
    "transactionCount": 33,     交易总笔数
    "totalAmount": 920.18,      交易总金额
    "totalBankSubsidy": 103.85  补贴
 */

export default {
  name: 'home',
  data() {
    return {
      activityId: 0, // 当前选择的活动 ID，0表示全部有效活动
      activityList: [], // 活动列表
      // billLabel: '商户交易额',
      rankLabel: '商户交易笔数',
      inforCardData: [
        {
          prop: 'totalAmount', // 取接口哪个字段
          title: '交易总金额（元）',
          icon: 'icon-jinbitixian-copy',
          count: 0,
          color: '#ef7bad',
          decimals: 2,
          // lastTime: '2018-07-30 12:32:20',
          // tip: '最近一次提现：',
          router: 'TransactionList',
          prefix: true
        },
        {
          prop: 'transactionCount',
          title: '交易总笔数',
          icon: 'icon-count',
          count: 0,
          color: '#f29485',
          // decimals: 2,
          // tip: '最近一笔分润：',
          // lastTime: '2018-07-30 12:32:20',
          router: 'TransactionList',
          prefix: true
        },
        {
          prop: 'totalBankSubsidy',
          title: '补贴金额',
          icon: 'icon-coin',
          count: 0,
          color: '#53a69c',
          decimals: 2,
          // tip: '最近新增商户：',
          // lastTime: '2018-07-30 12:32:20',
          router: 'ReconciliationList',
          prefix: true
        },
        {
          prop: 'activityCount',
          title: '活动数（个）',
          icon: 'icon-shuju',
          count: 0,
          color: '#52c8e6',
          // tip: '最近激活终端：',
          // lastTime: '2018-07-30 12:32:20',
          router: 'ActivityList',
          prefix: false
        }
      ],
      records: [
        { prop: 'merchantCount', title: '参与商户（个）', count: 0 },
        { prop: 'storeCount', title: '参与门店（个）', count: 0 },
        { prop: 'cardCount', title: '参与用户（个）', count: 0 },
        { prop: 'cardBinCount', title: '参与卡bin', count: 0 }
      ],
      rankList: [], // 业务排行
      transactionList: [] // 流水
    }
  },
  created() {
    this.getInfos()
  },
  computed: {
    ...mapGetters([
      'bank_id'
    ])
  },
  methods: {
    getInfos() {
      this._getActivityList()
      this._getCollection()
      this._getMerchantAndStoreInfo()
      this._getRank()
      this._getTransaction()
    },

    activityChange(id) {
      this.activityId = id
      this.getInfos()
    },

    hasActivityCount(item) { // 非全部活动 没有活动数
      return this.activityId === 0 || (this.activityId !== 0 && item.prop !== 'activityCount')
    },

    handleCollection([ data ]) {
      this.inforCardData.forEach(item => {
        if (data[item.prop] || data[item.prop] === 0) {
          item.count = data[item.prop]
        }
      })
      this.records.forEach(item => {
        if (data[item.prop] || data[item.prop] === 0) {
          item.count = data[item.prop]
        }
      })
    },

    handleMerchantAndStoreInfo([ data ]) {
      this.records.forEach(item => {
        if (data[item.prop] || data[item.prop] === 0) {
          item.count = data[item.prop]
        }
      })
    },

    // 获取活动列表
    async _getActivityList() {
      try {
        let { data } = await ApiHome.getActivityList(this.bank_id)
        this.activityList = data
      } catch (e) {
        this.activityList = []
      }
    },

    // 获取首页 card 上数据(不含商户数/门店数)
    async _getCollection() {
      let { data } = await ApiHome.getCollection(this.bank_id, this.activityId)
      this.handleCollection(data)
    },

    // 获取商户数/门店数
    async _getMerchantAndStoreInfo() {
      let { data } = await ApiHome.getMerchantAndStoreInfo(this.bank_id, this.activityId)
      this.handleMerchantAndStoreInfo(data)
    },

    // 获取右侧排行数据
    async _getRank() {
      let { data } = await ApiHome.getRank(this.bank_id, this.activityId)
      this.rankList = data
    },

    // 获取下方流水折线图数据
    async _getTransaction() {
      let { data } = await ApiHome.getTransaction(this.bank_id, this.activityId)
      this.transactionList = data
    }
  },
  components: { CountTo, InforCard, rankList, bussinessChart, selectActivity }
}
</script>

<style lang="scss" scoped>
.home {
  .ivu-card {
    box-shadow: 0 2px 10px 0 rgba(7, 17, 27, 0.1);
    &:hover {
      box-shadow: 0 14px 30px 0 rgba(0, 0, 0, 0.1) !important;
    }
  }
  .infor-card {
    .title {
      color: #fff;
      font-size: 12px;
    }
    /deep/ .count-style {
      //   color: #fff;
      font-size: 20px;
    }
  }
  .center-number {
    // margin-top: 20px;
    /deep/ .number-style {
      font-weight: bold;
      font-size: 20px;
    }
  }
  .center-content {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 26px;
    .left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
    }
    .right {
      font-size: 30px;
      color: #2d8cf0;
    }
  }

  .bottom-card {
    margin-top: 20px;
    .card-title {
      padding: 20px 10px;
      font-size: 18px;
      font-weight: bold;
    }
  }
}
</style>
