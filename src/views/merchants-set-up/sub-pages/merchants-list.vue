<style>
    @import '../../../styles/table.css';
</style>

<template>
  <div>
    <Card>
      <!--步骤组件-->
      <activityStep :curStep="2"></activityStep>

      <Row type="flex" class="mb20">
        <i-col class="pr10">
          <Button type="success" @click="getCurrentData">添加门店</Button>
        </i-col>
        <i-col>
          <Input class="mr10 w180" v-model="storeId" placeholder="门店ID" clearable />
          <Input class="mr10 w180" v-model="storeName" placeholder="门店名称" clearable />
        </i-col>
        <i-col>
          <Button type="primary" @click="getListActStore(true)">筛选</Button>
        </i-col>
      </Row>

      <Row :gutter="10">
        <i-col>
          <div class="edittable-table-height-con" v-show="ruleType == 'Ticket'">
            <can-edit-table v-model="editInlineAndCellData" :editIncell="true" :columns-list="ticketActTh" @on-cell-change="handleCellChange" @on-delete="deleData" @on-checked="checkedItem"></can-edit-table>
          </div>
          <div class="edittable-table-height-con" v-show="ruleType != 'Ticket'">
            <can-edit-table
                v-model="editInlineAndCellData"
                :editIncell="true"
                :columns-list="editInlineAndCellColumn"
                @on-cell-change="handleCellChange"
                @on-delete="deleData"
                @on-checked="checkedItem"
            ></can-edit-table>
          </div>
        </i-col>

        <!-- 添加门店弹框-->
        <Modal :width="900" v-model="showStoreListModal" ok-text="添加选中门店" @on-ok="storageData" @on-cancel="handleSelectAll(false)">
            <Row type="flex" class="mb20">
                <i-col>
                    <Input class="mr10 w140" v-model="id" placeholder="门店ID" clearable />
                    <Input class="mr10 w140" v-model="name" placeholder="门店名称" clearable />
                </i-col>
                <!-- <i-col>
                  <Select class="mr10 w140" v-model="province" placeholder="请选择省份" clearable @on-change="getCityList(province)">
                    <Option v-for="p in provinceList" :value="String(p.provinceCode)" :label="p.provinceName" :key="p.id"></Option>
                  </Select>
                </i-col>
                <i-col>&nbsp;</i-col>
                <i-col>
                  <Select class="mr10 w140" v-model="city" placeholder="请选择城市" clearable @on-change="getDistrictList(city)">
                    <Option v-for="p in cityList" :value="String(p.cityCode)" :label="p.cityName" :key="p.id"></Option>
                  </Select>
                </i-col>
                <i-col>
                  <Select class="mr10 w140" v-model="district" placeholder="请选择区域" clearable>
                    <Option v-for="p in districtList" :value="String(p.id)" :label="p.districtName" :key="p.id"></Option>
                  </Select>
                </i-col> -->
                <i-col>
                    <Button type="primary" @click="addGetData(true,id,name)">查询</Button>
                </i-col>
            </Row>
            <Row>
                <Table border ref="selection" height="520" :columns="storeListH" :data="storeList" @on-selection-change="selectionChange"></Table>
            </Row>
            <!-- 分页器 -->
            <Row class="mt10" type="flex" justify="end" align="middle">
              <Page :total="pager.total" :page-size="pager.size" :current.sync="pager.page" @on-change="changePage"></Page>
            </Row>
        </Modal>
      </Row>

      <Row type="flex" justify="end" class="p20">
        <i-col class-name="flex-left-button">
          <router-link :to="{name:'ActivityRules', query: { activityId }}"><Button>上一步</Button></router-link>
        </i-col>
        <i-col class="plr10">
          <Button type="primary" @click="saveListActStore">保存草稿</Button>
        </i-col>
        <i-col>
          <Button @click="saveListActStore (true)">下一步并测试</Button>
        </i-col>
      </Row>

      <!-- 审核 -->
      <Card class="check_mode" v-if="activityStatus == 'wait_check'">
          <div class="tc mt5 mb5">
              <Button class="mr10" type="success" style="width: 120px;" @click="$router.push({name:'ActivityRules', query: { activityId }})"> 上一步 </Button>
              <Button class="ml10" type="primary" style="width: 120px;" @click="$router.push({name:'simulationTest', query: { activityId ,activityStatus}})"> 下一步 </Button>
          </div>

          <div class="tc">
              <h1 style="color: red; font-weight: normal"> 审核模式 </h1>
          </div>
      </Card>
    </Card>
  </div>
</template>

<script>
import canEditTable from '@/components/canEditTable.vue'
import tableData from '../data/table-data.js'
import * as ApiMerchantsSetUp from '@/api/merchants-set-up'
import * as ApiPublic from '@/api/public'
import activityStep from '../../create-activity/components/activity-step'
import { getShopsList } from '@/api/basic-data'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      pager: {
        total: 0,
        page: 1,
        size: 10
      },
      ruleType: '',
      activityStatus: 'draft', // 当前活动的审核状态
      editInlineAndCellColumn: [], //
      ticketActTh: [],
      editInlineAndCellData: [],
      showCurrentColumns: [],
      showStoreListModal: false,
      // 整列操作
      batch: [{
        _disabled: true
      }],

      value: '',
      storeListH: [],
      storeList: [],
      checkedStore: [],
      tableData: [],
      id: '', // 门店id
      name: '', // 门店名称
      province: '', // 省
      city: '', // 市
      district: '', // 区
      provinceList: [],
      cityList: [],
      districtList: [],
      current: 0,
      storeId: '',
      storeName: '',
      list: [],
      activityId: '',
      isNumber: true
    }
  },
  computed: {
    ...mapGetters([
      'bank_id'
      // 'province_id',
      // 'city_id',
      // 'district_id'
    ])
  },
  methods: {
    async changePage (page) {
      this.pager.page = page
      this.getStoreList({ page })
    },
    // 获取当前活动的审核状态
    async getUpdateBase () {
      let { data = [] } = await ApiMerchantsSetUp.getUpdateBase(this.activityId)
      this.activityStatus = data.status
      this.ruleType = data.ruleType
    },

    // 获取门店数据
    async getData () {
      this.editInlineAndCellColumn = tableData.editInlineAndCellColumn
      this.ticketActTh = tableData.ticketActTh
      this.showCurrentColumns = tableData.showCurrentColumns
      this.storeListH = tableData.storeListH
    },

    // 获取门店设置列表 及 查询
    async getListActStore (inquire) {
      // 初次加载
      if (inquire === false) {
        let { data = [] } = await ApiMerchantsSetUp.getListActStore(this.activityId)
        if (Object.prototype.toString.call(data) === '[object Array]') {
          this.tableData = data
        }
        this.editInlineAndCellData = this.customDataSort(this.tableData)
      }
      // 查询
      if (inquire === true) {
        let tmp = this.editInlineAndCellData.length > 1 ? this.editInlineAndCellData.slice(1) : this.editInlineAndCellData
        tmp.forEach(v => {
          for (let index = 0; index < this.tableData.length; index++) {
            const element = this.tableData[index]
            if (element.storeId === v.storeId) {
              this.tableData[index] = v
              break
            }
          }
        })

        // 根据筛选条件过滤 tableData
        let arr = this.tableData.filter(item => {
          let storeId = String(item.storeId)
          return item.storeName.indexOf(this.storeName) > -1 && (storeId === this.storeId || this.storeId === '')
        })
        this.editInlineAndCellData = this.customDataSort(arr)
      }
    },

    // 获取添加门店列表
    async getStoreList ({ page = this.pager.page, size = this.pager.size, storeId = this.id, name = this.name } = {}) {
      let a = await getShopsList({
        pageNo: page,
        pageSize: size,
        storeId,
        name,
        bankId: this.bank_id
        // proCode: this.province, // '', // this.province_id, // TODO 暂时查全部
        // cityCode: this.city, // '', // this.city_id,
        // areaCode: this.district // '' // this.district_id
      })
      this.storeList = a.data.data.list || []
      this.pager.total = a.data.data.total

      let tmp = this.editInlineAndCellData.length > 1 ? this.editInlineAndCellData.slice(1, this.editInlineAndCellData.length) : this.editInlineAndCellData
      for (var i in tmp) {
        for (var j in this.tableData) {
          if (tmp[i].storeId === this.tableData[j].storeId) {
            this.tableData[j] = tmp[i]
          }
        }
      }

      // 去除已经添加过的门店
      if (this.tableData.length > 0) {
        this.storeList = this.storeList.filter(item => {
          return !this.tableData.some(elem => {
            return elem.storeId === item.storeId && elem.merchantId === item.merchantId
          })
        })
      }
    },

    // 显示门店列表弹框
    getCurrentData () {
      this.showStoreListModal = true
      this.getStoreList()
      this.id = ''
      this.name = ''
      this.storeId = ''
      this.storeName = ''
    },

    // 添加门店弹框中的条件查询
    async addGetData (inquire, id, n) {
      this.pager.page = 1
      await this.getStoreList({
        storeId: id,
        name: n
      })
    },

    // 获取选中的数据
    selectionChange () {
      let obj = JSON.parse(JSON.stringify(this.$refs.selection.objData))
      this.checkedStore = []

      for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
          let item = obj[i]
          item._isChecked && this.checkedStore.push({
            merchantId: item.merchantId,
            merchantName: item.merchantName,
            storeId: item.storeId, // item.businessId, // item.id,
            storeName: item.storeName,
            userSettlement: 'all', // 用户结算写死  全单结算
            storeSettlement: 'subsidy', // 门店结算方式（默认 补贴）！！
            storeDiscount: 0, // 门店折扣（默认0）！！
            thirdPartySettlement: 'subsidy', // 银行结算方式 写死 补贴!!
            thirdPartyDiscountRate: 100,
            brokerFee: 0, // 是否收取佣金 否  /佣金/佣金上限隐藏
            brokerFeeRate: null,
            brokerFeeUpLimit: null,
            storeSubsidy: null,
            bankSubsidy: null
          })
        }
      }
    },

    // 添加选中门店
    storageData () {
      this.tableData = this.tableData.concat(this.checkedStore)
      this.editInlineAndCellData = this.customDataSort(this.tableData)

      this.getStoreList()
    },

    // 弹框取消
    handleSelectAll (status) {
      this.$refs.selection.selectAll(status)
    },

    // 列表中删除数据后的代码
    deleData (dele, index, storeId) {
      console.log(storeId)
      this.editInlineAndCellData = dele
      this.tableData = this.tableData.filter(item => item.storeId !== storeId)
    },

    // 监听值改变时，进行数字类型验证
    handleCellChange (val, index, key, v) {
      // this.$Message.success('修改了第 ' + (index + 1) + ' 行列名为 ' + key + ' 的数据' + v);

      // 表格里的input字段添加验证
      // let reg=/(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{2}$)/
      if (v === '') return
      this.isNumber = true
      let reg = /(^[1-9]{1}[0-9]{0,1}$)|(^[0-9]{1,2}[.]{1}[0-9]{1,2}$)/
      if (!reg.test(v)) {
        if (parseInt(v) === 100) {
          this.isNumber = true
        } else {
          this.$Message.error({
            content: '请输入大于0的整数或者保留两位小数!',
            duration: 3
          })
          this.isNumber = false
        }
      } else {
        console.log('输入正确')
        this.isNumber = true
      }
    },

    // 监听选中的值
    checkedItem (n) {
      if (n === 'none') {
        this.$Notice.error({
          title: '错误提示',
          desc: '请选择门店!',
          duration: 3
        })
      }
    },

    // 保存草稿
    async saveListActStore (inquire) {
      debugger
      let tmp = this.editInlineAndCellData.length > 1 ? this.editInlineAndCellData.slice(1, this.editInlineAndCellData.length) : this.editInlineAndCellData
      for (var i in tmp) {
        for (var j in this.tableData) {
          if (tmp[i].storeId === this.tableData[j].storeId) {
            this.tableData[j] = tmp[i]
          }
        }
      }
      let saveList = this.tableData

      for (var t = 0; t < saveList.length; t++) {
        if (this.ruleType !== 'Ticket') {
          if (saveList[t].userSettlement == null || saveList[t].userSettlement === 0 || saveList[t].storeSettlement == null || saveList[t].storeSettlement === 0 || saveList[t].storeDiscount == null || saveList[t].thirdPartySettlement == null || saveList[t].thirdPartySettlement === 0 || saveList[t].thirdPartyDiscountRate == null || saveList[t].brokerFee == null) {
            // this.$Notice.error('列表中门店信息不能为空，请检查并填写!');
            this.$Notice.error({
              title: '错误提示',
              desc: '列表中门店信息不能为空，请检查并填写!',
              duration: 3
            })
            return
          } else {
            if (saveList[t].brokerFee === '1' && (saveList[t].brokerFeeRate == null || saveList[t].brokerFeeUpLimit == null)) {
              this.$Notice.error({
                title: '错误提示',
                desc: '列表中门店信息不能为空，请检查并填写!',
                duration: 3
              })
              return
            }
          }
        } else {
          if (saveList[t].storeSubsidy == null || saveList[t].storeSubsidy === '' || saveList[t].bankSubsidy == null || saveList[t].bankSubsidy === '' || saveList[t].brokerFee == null) {
            this.$Notice.error({
              title: '错误提示',
              desc: '列表中门店信息不能为空，请检查并填写!',
              duration: 3
            })
            return
          } else {
            if (saveList[t].brokerFee === '1' && (saveList[t].brokerFeeRate == null || saveList[t].brokerFeeUpLimit == null)) {
              this.$Notice.error({
                title: '错误提示',
                desc: '列表中门店信息不能为空，请检查并填写!',
                duration: 3
              })
              return
            }
          }
        }
      }

      if (!this.isNumber) {
        this.$Message.error({
          content: '请检查表格输入框中的值是否按要求填写!',
          duration: 3
        })
        return
      }

      if (inquire === true) { // 下一步并测试
        if (saveList.length <= 0) {
          this.$Message.error('请添加门店!')
          return
        }
        await ApiMerchantsSetUp.saveStoreTest({ 'actMarketingStores': saveList, 'activityId': this.activityId })
        this.$router.push({ name: 'simulationTest', query: { activityId: this.activityId, ruleType: this.ruleType } })
      } else { // 保存草稿
        await ApiMerchantsSetUp.saveListActStore({ 'actMarketingStores': saveList, 'activityId': this.activityId })
      }
    },
    // 按照id排序
    customDataSort (list) {
      if (list.length === 0 || list.length === 1) {
        return list
      }
      return this.batch.concat(list.sort((a, b) => a.storeId - b.storeId))
    },

    async getProvinceList () {
      let { data = [] } = await ApiPublic.getProvinceList()

      this.provinceList = data
    },

    async getCityList (provinceId) {
      if (!provinceId) {
        this.city = ''
        this.district = ''
        return
      }

      let { data = [] } = await ApiPublic.getCityListOnProvince(provinceId)

      this.cityList = data
    },

    async getDistrictList (cityId) {
      if (!cityId) {
        this.district = ''
        return
      }

      let { data = [] } = await ApiPublic.getDistrictListOnCity(cityId)

      this.districtList = data
    }

  },
  created () {
    this.activityId = this.$route.query.activityId
    this.getUpdateBase()
    this.getListActStore(false)
    this.getData()
    this.getProvinceList()
  },
  components: {
    canEditTable,
    activityStep
  }
}
</script>

<style lang="scss" scoped>
    .check_mode {
        position: absolute; top: 0; left: 0; bottom: 0; right: 0;
        background: rgba(0, 0, 0, .4); z-index: 9;

        .ivu-card-head {
            border-bottom: none;
        }
    }
    .p20{
        padding:20px;
    }

    .plr10 {
        padding: 0 10px;
    }
    .flex-left-button {
      flex: 1
    }
</style>
