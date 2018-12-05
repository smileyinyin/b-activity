<template>
  <div class="activity-check">

    <div class="mt20">
      <Button class="mr10" style="width: 120px;" v-if="activityStatus === 'online'"
              @click="$router.push({name: 'ActivityList', query: $route.query})"
      > 上一步 </Button>
    </div>

    <!-- 活动检查 -->
    <!-- 活动基础信息信息 -->
    <Card class="activity-base-info mt20">
      <base-information :disabled="true" @status="statusHandler"></base-information>
    </Card>

    <!-- 活动规则信息 -->
    <Card class="activity-rule-info mt20">
      <activity-rule :disabled="true"> </activity-rule>
    </Card>

    <!-- 测试门店列表 -->
    <Card class="activity-store-info mt20 table-card" :bordered="false" :padding="0">
        <h4 slot="title">测试门店列表</h4>
        <Table :columns="ticketTh" :data="commercialList" v-show="ruleType !== 'Ticket'"></Table>
        <Table :columns="ticketActTh" :data="commercialList" v-show="ruleType === 'Ticket'"></Table>
    </Card>

      <!-- 测试结果列表 -->
      <Card class="activity-store-info mt20 table-card" :bordered="false" :padding="0">
          <h4 slot="title">测试结果列表</h4>
          <Table :columns="consequenceTh" :data="consequenceLIst" v-show="ruleType !== 'Ticket'"></Table>
          <Table :columns="actConsequenceTh" :data="consequenceLIst" v-show="ruleType === 'Ticket'"></Table>
      </Card>

      <!-- 测试报错列表 -->
      <Card class="activity-store-info mt20 table-card" :bordered="false" :padding="0">
          <h4 slot="title">测试报错列表</h4>
          <Table :columns="errorTh" :data="errorList"></Table>
      </Card>

      <!-- 审核 -->
      <Row class="mt20" type="flex" justify="center" v-if="activityStatus == 'wait_check'">
          <Button type="success" :loading="auditTrueLoading" @click="postAudit (1)" class="mr10">通过</Button>
          <Button type="error" :loading="auditFalseLoading" @click="postAudit (0)">拒绝</Button>
      </Row>

      <!-- 审核 -->
      <!--<div class="check_part mt20 tc" v-if="activityStatus === 'wait_check'">-->
        <!--<Button class="mr10" type="success" style="width: 120px;"-->
                <!--@click="rejectClickHandler"-->
        <!--&gt; 拒绝 </Button>-->
        <!--<Button class="ml10" type="primary" style="width: 120px;"-->
                <!--@click="passClickHandler"-->
        <!--&gt; 通过 </Button>-->
      <!--</div>-->
  </div>
</template>

<script>
import {
  Icon, Card, Button
} from 'iview'
import BaseInformation from '@/views/create-activity/sub-pages/base-information'
import ActivityRule from '@/views/create-activity/sub-pages/activity-rules'
import tableData from './data/table-data.js'
import * as ApiMerchantsSetUp from '@/api/merchants-set-up'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      activityStatus: 'draft',
      auditTrueLoading: false,
      auditFalseLoading: false,

      ticketTh: [],
      ticketActTh: [],
      commercialList: [],

      consequenceTh: [],
      actConsequenceTh: [],
      consequenceLIst: [],

      errorTh: [],
      errorList: [],

      activityId: '',
      ruleType: ''
    }
  },

  computed: {
    ...mapGetters([
      'bank_id'
    ])
  },

  methods: {
    // 获取活动类型
    async getUpdateBase () {
      let { data = [] } = await ApiMerchantsSetUp.getUpdateBase(this.activityId)
      // this.activityStatus = data.status;
      this.ruleType = data.ruleType
    },

    getTableTh () {
      this.ticketTh = tableData.ticketTh // 测试门店列表--常规
      this.ticketActTh = tableData.ticketActTh // 测试门店列表--票务

      this.consequenceTh = tableData.consequenceTh // 测试结果列表--常规
      this.actConsequenceTh = tableData.actConsequenceTh // 测试结果列表--票务

      this.errorTh = tableData.errorTh
    },

    // 获取门店设置列表 及 查询
    async getListActStore () {
      let { data = [] } = await ApiMerchantsSetUp.getListActStore(this.activityId)
      // this.commercialList = data;
      if (Object.prototype.toString.call(data) === '[object Array]') {
        this.commercialList = data
      } else {
        this.commercialList = []
      }
    },

    // 获取测试结果列表
    async getListTest (inquire) {
      if (inquire === true) { // 测试结果列表
        let { data = [] } = await ApiMerchantsSetUp.getListTest(this.activityId) //  1 是活动id  this.activityId
        if (Object.prototype.toString.call(data) === '[object Array]') {
          this.consequenceLIst = data
        } else {
          this.consequenceLIst = []
        }
      } else { // 错误结果列表
        let { data = [] } = await ApiMerchantsSetUp.getListTest(this.activityId, 'fail') //  1 是活动id  this.activityId
        if (Object.prototype.toString.call(data) === '[object Array]') {
          this.errorList = data
        } else {
          this.errorList = []
        }
      }
    },

    // 审核通过与拒绝
    async postAudit (isAgree) {
      this[isAgree ? 'auditTrueLoading' : 'auditFalseLoading'] = true
      debugger
      if (isAgree === 1) {
        await ApiMerchantsSetUp.deleteStoreByBankId(this.bank_id)
      }
      await ApiMerchantsSetUp.postAudit({ 'id': this.activityId, 'isAgree': isAgree })
      this.$router.push({ name: 'ActivityList' })
    },

    statusHandler (s) {
      this.activityStatus = s
    },

    rejectClickHandler () {

    },

    passClickHandler () {

    }
  },
  created () {
    this.activityId = this.$route.query.activityId
    this.getTableTh()
    this.getListActStore()
    this.getListTest(true)
    this.getListTest(false)
    this.getUpdateBase()
  },

  components: {
    Icon,
    Card,
    Button,
    BaseInformation,
    ActivityRule
  }
}
</script>

<style scoped>
.table-card /deep/ .ivu-card-head {
  border: 1px solid #e9eaec;
  border-bottom: none;
}
</style>
