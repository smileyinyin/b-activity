<template>
    <!--门店管理-->
    <div class="activity-list-page">
        <Card>
            <p slot="title">门店管理</p>
            <Row class="pl10 pr10">
                <i-col span="24" align="right">
                    <Input class="mr10 w180" v-model="name" placeholder="门店名称" clearable />
                    <Input class="mr10 w180" v-model="code" placeholder="门店编码" clearable />
                    <Button type="primary" @click="getStoreList">查询</Button>
                </i-col>
            </Row>
            <Row class="mt20 pl10 pr10">
                <Table border :columns="merchantListTh" :data="tableList"></Table>
            </Row>
            <Row class="tr pt20 pb20">
                <Page :total="total" :current="page" show-sizer @on-change="changePage" @on-page-size-change="pageSize"></Page>
            </Row>
        </Card>

    </div>
</template>

<script>
import * as ApiBasicData from '@/api/basic-data'
import { formatDate } from '@/common/util/util.js'

export default {
  data () {
    return {
      province: '',
      city: '',
      provinceList: [],
      cityList: [],
      showAdd: false,
      saveEdit: false,
      isEdit: false,
      showImport: false,
      name: '', // 门店名称
      code: '', // 门店编码
      // 表格
      merchantListTh: [
        {
          title: '门店id',
          key: 'businessId',
          width: 100
        },
        {
          title: '商户编号',
          key: 'mercId',
          width: 120
        },
        {
          title: '门店名称',
          key: 'name'
        },
        {
          title: '门店编码',
          key: 'stoeId'
        },
        {
          title: '地址',
          key: 'address'
        },
        {
          title: '创建日期',
          key: 'createTime',
          render: (h, params) => {
            return h('span', null, formatDate(new Date(params.row.createTime * 1000), 'yyyy-MM-dd hh:mm:ss'))
          }
        },
        {
          title: '更新日期',
          key: 'updateTime',
          render: (h, params) => {
            return h('span', null, formatDate(new Date(params.row.updateTime * 1000), 'yyyy-MM-dd hh:mm:ss'))
          }
        }
      ],
      tableList: [],
      page: 1,
      size: 10,
      total: 0,
      loading1: false,
      options1: [],
      list: [],
      companyList: []

    }
  },
  methods: {
    // 分页
    changePage (page) {
      this.page = page
      this.getStoreList()
    },
    pageSize (size) {
      this.size = size
      this.getStoreList()
    },
    // 获取列表数据
    async getStoreList () {
      let a = await ApiBasicData.getShopsList({
        name: this.name,
        stoeId: this.code,
        page: this.page,
        size: this.size
      })
      this.tableList = a.data || []
      this.total = a._rawData.objectotalNumber
    }
  },
  created () {
    this.getStoreList() // 调用门店管理列表接口
  }
}
</script>

<style scoped>
  .selectInline /deep/ .ivu-form-item-content {
    display: flex;
    justify-content: space-between;

  }
  .selectInline /deep/ .ivu-form-item-content .ivu-form-item {
    flex: 0 0 48%;
  }

</style>
