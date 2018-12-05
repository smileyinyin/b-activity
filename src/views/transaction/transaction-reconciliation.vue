<template>
  <div class="activity-list-page">
    <Card>
      <p slot="title">活动对账单</p>
      <Row class="pl10 pr10">
        <i-col span="24" align="right">
          <Input v-model="keyword" placeholder="活动id或名称" class="w180 mr20"></Input>
          <!-- <DatePicker v-model="date" type="daterange" placement="bottom-end" placeholder="活动日期" class="w180 mr10"></DatePicker> -->
          <!-- <Select class="mr10 w180" placeholder="活动id或名称" v-model="activityId" filterable clearable remote :remote-method="remoteMethod3" :loading="loading3">
            <Option v-for="option in options3" :value="option.value" :key="option.value">{{option.label}}</Option>
          </Select>
          <Select class="mr10 w180" placeholder="门店id或名称" v-model="storeId" filterable clearable remote :remote-method="remoteMethod1" :loading="loading1">
            <Option v-for="option in options1" :value="option.value" :key="option.value">{{option.label}}</Option>
          </Select> -->
          <Button type="primary" @click="getReconciliationList" class="mr10">查询</Button>
          <!-- <Button type="primary" @click="exportExcel">导出</Button> -->
        </i-col>
      </Row>
      <Row class="mt20 pl10 pr10">
        <Table height="550" border :columns="merchantListTh" :data="tableList"></Table>
      </Row>
      <Row class="pt20 tr">
        <Page :total=total :current=this.page show-sizer @on-change="changePage" @on-page-size-change="pageSize"></Page>
      </Row>
    </Card>

  </div>
</template>

<script>
import * as ReconciliationData from '@/api/reconciliation'
// import * as ApiBasicData from '@/api/basic-data'
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

      // TODO bank ID 从登陆来，条件查询有问题！！
      bankId: this.$store.getters.bank_id, // '785110',
      keyword: '',
      date: [],

      // 表格
      merchantListTh: [
        {
          title: '账单号',
          key: 'billNo',
          width: 100,
          fixed: 'left',
          align: 'center'
        },
        {
          title: '账单日期',
          key: 'billDate',
          width: 200,
          fixed: 'left',
          align: 'center'
        },
        {
          title: '生成日期',
          key: 'billCreateDate',
          width: 100,
          fixed: 'left',
          align: 'center'
        },
        {
          title: '活动ID',
          key: 'activityId',
          width: 100,
          fixed: 'left',
          align: 'center'
        },
        {
          title: '活动名称',
          key: 'activityName',
          width: 100,
          fixed: 'left',
          align: 'center'
        },
        {
          title: '交易门店数',
          key: 'storeCount',
          width: 200,
          fixed: 'left',
          align: 'center'
        },
        {
          title: '交易笔数',
          key: 'transactionCount',
          width: 100,
          align: 'center'
        },
        {
          title: '支付总额',
          key: 'payTotalAmount',
          width: 100,
          align: 'center'
        },
        {
          title: '补贴总额',
          key: 'bankSubsidyTotalAmount',
          width: 100,
          align: 'center'
        },
        {
          title: '交易总额',
          key: 'transactionTotalAmount',
          width: 100,
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          width: 100,
          align: 'center',
          render: (h, params) => {
            return h('Button', {
              props: { type: 'primary', size: 'small' },
              on: { click: () => this.downLoad(params.row.downloadUrl) }
            }, '下载')
          }
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
      this.getReconciliationList()
    },
    pageSize (size) {
      this.size = size
      this.getReconciliationList()
    },

    // 获取列表数据
    async getReconciliationList () {
      let a = await ReconciliationData.getReconciliationList(this.bankId, this.keyword, this.startDate, this.endDate, this.page, this.size)
      this.tableList = a.data
      this.total = a._rawData.objectotalNumber
    },
    downLoad(url) {
      const funDownload = function (url, filename) {
        // 创建隐藏的可下载链接
        var eleLink = document.createElement('a')
        eleLink.download = filename
        eleLink.style.display = 'none'
        // 字符内容转变成blob地址
        // var blob = new Blob([content])
        eleLink.href = url // URL.createObjectURL(blob)
        // 触发点击
        document.body.appendChild(eleLink)
        eleLink.click()
        // 然后移除
        document.body.removeChild(eleLink)
      }
      funDownload(url, '对账单详情')
    }
    // exportExcel () {
    //   window.open('/activity/v1/transaction/reconciliation/export?bankId=' + this.bankId + '&keyword=' + this.keyword + '&startDate=' + this.startDate + '&endDate=' + this.endDate)
    // }
    // async getStoreQuery (query) {
    //   let { data = [] } = await ApiBasicData.getStoreQuery(query)
    //   this.list = data
    // },
    // // 下拉远程搜索
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
    this.getReconciliationList()
  }
}
</script>
