<template>
  <div class="activity-list-page">
    <Card>
      <p slot="title">交易查询</p>
      <Row class="pl10 pr10">
        <i-col span="24" align="right">
          <Input class="mr10 w180" v-model="keyword" placeholder="活动名称" clearable />
          <DatePicker v-model="date" type="daterange" placement="bottom-end" placeholder="交易时间" class="w180 mr10"></DatePicker>
          <!-- <Input class="mr10 w180" v-model="transNo" placeholder="交易流水号" clearable />
          <Input class="mr10 w180" v-model="userMobile" placeholder="权益码" clearable />
          <Select class="mr10 w180" placeholder="活动id或名称" v-model="activityId" filterable clearable remote :remote-method="remoteMethod3" :loading="loading3">
            <Option v-for="option in options3" :value="option.value" :key="option.value">{{option.label}}</Option>
          </Select>
          <Select class="mr10 w180" placeholder="门店id或名称" v-model="storeId" filterable clearable remote :remote-method="remoteMethod1" :loading="loading1">
            <Option v-for="option in options1" :value="option.value" :key="option.value">{{option.label}}</Option>
          </Select> -->
          <Button type="primary" @click="getTransactionList" class="mr10">查询</Button>
          <Button type="primary" @click="exportExcel">导出</Button>
        </i-col>
      </Row>
      <Row class="mt20 pl10 pr10">
        <Table height="550" border :columns="merchantListTh" :data="tableList"></Table>
      </Row>
      <Row class="tr pt20 pb20">
        <Page :total=total :current=this.page show-sizer @on-change="changePage" @on-page-size-change="pageSize"></Page>
      </Row>
    </Card>

  </div>
</template>

<script>
import * as TransactionData from '@/api/transaction'
// import * as ApiBasicData from '@/api/basic-data'
// import activityTemplates from '@/views/create-activity/data/activity-templates'
import moment from 'moment/moment'

export default {
  data () {
    return {
      // loading1: false,
      // options1: [],
      // loading2: false,
      // options2: [],
      // loading3: false,
      // options3: [],
      // activityId: '',
      // storeId: '',
      // merchantId: '',
      // transNo: '',

      // TODO bank ID 从登陆来
      bankId: this.$store.getters.bank_id, // '785110',
      keyword: '',
      date: [],
      // 表格
      merchantListTh: [
        {
          title: '活动id',
          key: 'activityId',
          width: 200,
          fixed: 'left',
          align: 'center'
        },
        {
          title: '流水号',
          key: 'transNoStr',
          width: 200,
          align: 'center'
        },
        {
          title: '卡号',
          key: 'cardNumber',
          width: 200,
          align: 'center'
        },
        {
          title: '活动名称',
          key: 'activityTitle',
          width: 200,
          align: 'center'
        },
        {
          title: '活动类型',
          key: 'actType',
          width: 200,
          align: 'center'
          // render: (h, params) => {
          //   return h('span', null, activityTemplates[params.row.ruleType].name)
          // }
        },
        {
          title: '终端号',
          key: 'acquirerTerminalNumber',
          width: 200,
          align: 'center'
        },
        {
          title: '门店id',
          key: 'storeId',
          width: 200,
          align: 'center'
        },
        {
          title: '门店名称',
          key: 'storeName',
          width: 200,
          align: 'center'
        },
        {
          title: '交易时间',
          key: 'transDateTime',
          width: 200,
          align: 'center'
        },
        {
          title: '支付金额',
          key: 'payAmount',
          width: 100,
          align: 'center'
        },
        {
          title: '补贴',
          key: 'bankSubsidyMoney',
          width: 100,
          align: 'center'
        },
        {
          title: '总金额',
          key: 'totalAmount',
          width: 100,
          align: 'center'
        }
      ],
      tableList: [],
      page: 1,
      size: 10,
      total: 0
    }
  },
  computed: {
    startDate() {
      if (this.date[0]) {
        return moment(this.date[0]).format('YYYY-MM-DD HH:mm:ss')
      }
      return ''
    },
    endDate() {
      if (this.date[1]) {
        return moment(this.date[1]).format('YYYY-MM-DD HH:mm:ss')
      }
      return ''
    }
  },
  methods: {
    // 分页
    changePage (page) {
      this.page = page
      this.getTransactionList()
    },
    pageSize (size) {
      this.size = size
      this.getTransactionList()
    },

    // 获取列表数据
    async getTransactionList () {
      try {
        let a = await TransactionData.getTransactionList(this.bankId, this.keyword, this.startDate, this.endDate, this.page, this.size)
        this.tableList = a.data
        this.total = a._rawData.objectotalNumber
      } catch (error) {
        this.tableList = []
        this.total = 0
      }
    },
    exportExcel () {
      window.open('/activity/v1/transaction/export?bankId=' + this.bankId + '&keyword=' + this.keyword + '&startDate=' + this.startDate + '&endDate=' + this.endDate)
    }
    // async getStoreQuery (query) {
    //   let { data = [] } = await ApiBasicData.getStoreQuery(query)
    //   this.list = data
    // }
    // 下拉远程搜索
    // async remoteMethod1 (query) {
    //   if (query !== '') {
    //     this.loading1 = true
    //     await this.getStoreQuery(query)
    //     let list = this.list.map(item => {
    //       return {
    //         value: item.id,
    //         label: item.id + ':' + item.name
    //       }
    //     })
    //     this.options1 = list
    //     this.loading1 = false
    //   } else {
    //     this.options1 = []
    //   }
    // },
    // async getMerchantQuery (query) {
    //   let { data = [] } = await ApiBasicData.getMerchantQuery(query)
    //   this.list = data
    // },
    // async remoteMethod2 (query) {
    //   if (query !== '') {
    //     this.loading2 = true
    //     await this.getMerchantQuery(query)
    //     let list = this.list.map(item => {
    //       return {
    //         value: item.id,
    //         label: item.id + ':' + item.name
    //       }
    //     })
    //     this.options2 = list
    //     this.loading2 = false
    //   } else {
    //     this.options2 = []
    //   }
    // },
    // async getActivityQuery (query) {
    //   let { data = [] } = await ApiBasicData.getActivityQuery(query)
    //   this.list = data
    // },
    // async remoteMethod3 (query) {
    //   if (query !== '') {
    //     this.loading3 = true
    //     await this.getActivityQuery(query)
    //     let list = this.list.map(item => {
    //       return {
    //         value: item.id,
    //         label: item.id + ':' + item.name
    //       }
    //     })
    //     this.options3 = list
    //     this.loading3 = false
    //   } else {
    //     this.options3 = []
    //   }
    // }
  },
  created () {
    this.getTransactionList()
  }
}
</script>
