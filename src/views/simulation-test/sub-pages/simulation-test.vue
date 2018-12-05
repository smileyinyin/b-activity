<style>
    .ivu-table .error-row td { color: red; }
    .ivu-table .warning-row td{ color: orange; }
    .mb20{ margin-bottom: 20px; }
    .simulationTest .tit{
        font-size: 14px;
        line-height: 40px;
        border-bottom: 1px solid #dddee1;
        margin-bottom: 20px;
    }
</style>

<template>
    <div class="simulationTest">
        <Row class="margin-top-10">
            <i-col span="24">
                <Card>
                    <!--步骤组件-->
                    <activityStep :curStep="3"></activityStep>

                    <!--测试门店列表-->
                    <Card class="mb20 table-card" :bordered="false" dis-hover :padding="0">
                        <h4 class="" slot="title">测试门店列表</h4>
                        <Table border :columns="actCommercialTh" :data="commercialList" :test-data="testData" v-show="ruleType == 'Ticket'"></Table>
                        <Table border :columns="commercialTh" :data="commercialList" :test-data="testData" v-show="ruleType != 'Ticket'"></Table>
                    </Card>

                    <!--测试参数设置-->
                    <Form ref="formValidate" inline :model="formValidate" :rules="ruleValidate" :label-width="120" label-position="left" class="test-form">
                        <FormItem label="门店ID">
                            <Input v-model="formValidate.storeId" disabled />
                        </FormItem>
                        <FormItem label="门店名称">
                            <Input v-model="formValidate.storeName" disabled />
                        </FormItem>
                        <FormItem label="消费金额" prop="money">
                            <Input v-model="formValidate.money" placeholder="请输入消费金额" />
                        </FormItem>
                        <FormItem label="可打折金额" prop="disMoney">
                            <Input v-model="formValidate.disMoney" placeholder="请输入可打折金额" />
                        </FormItem>
                        <FormItem label="测试银行卡号" prop="card">
                            <Input v-model="formValidate.card" placeholder="请输入测试银行卡号" />
                        </FormItem>
                        <FormItem label="交易时间" prop="dateTime">
                            <DatePicker type="datetime" placeholder="请选择交易时间" style="width: 200px" :value="formValidate.dateTime"  @on-change="formValidate.dateTime=$event"></DatePicker>
                        </FormItem>
                        <!--<FormItem label="活动ID">-->
                            <!--<Input v-model="formValidate.id" disabled></Input>-->
                        <!--</FormItem>-->
                        <!--<FormItem label="活动内容" prop="desc">-->
                            <!--<Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>-->
                        <!--</FormItem>-->
                    </Form>

                    <Row type="flex" justify="space-between" class-name="pt30 bte pb20">
                      <i-col span="12">
                        <router-link :to="{name:'merchantsList', query: { activityId }}">
                            <Button style="margin-left: 8px">上一步</Button>
                        </router-link>
                      </i-col>
                      <i-col span="12" style="display:flex; justify-content:flex-end">
                        <Button type="primary" :loading="testLoading" @click="handleSubmit ('formValidate')">开始测试</Button>
                      </i-col>
                    </Row>

                    <!--测试结果列表-->
                    <Card class="mb20 table-card" :bordered="false" dis-hover :padding="0">
                        <h4 class="" slot="title">测试结果列表</h4>
                        <Table border :columns="consequenceTh" :data="consequenceLIst" :row-class-name="rowClassName" v-show="ruleType != 'Ticket'"></Table>
                        <Table border :columns="actConsequenceTh" :data="consequenceLIst" :row-class-name="rowClassName" v-show="ruleType == 'Ticket'"></Table>
                    </Card>

                    <!--测试报错列表-->
                    <Card class="mb20 table-card" :bordered="false" dis-hover :padding="0">
                        <h4 class="" slot="title">测试报错列表</h4>
                        <Table border :columns="errorTh" :data="errorList"></Table>
                    </Card>

                    <Row type="flex" justify="center" v-if="consequenceLIst.length > 0 && activityStatus != 'wait_check'">
                        <Button type="success" :loading="getCheckLoading" @click="getCheck">提交审核</Button>
                    </Row>

                    <Row type="flex" justify="center" v-if="activityStatus == 'wait_check'">
                        <Button type="success" @click="postAudit (1)" class="mr10">通过</Button>
                        <Button type="error" @click="postAudit (0)">拒绝</Button>
                    </Row>

                    <!-- 审核 -->
                    <Card class="check_mode"  v-if="activityStatus == 'wait_check'">
                        <div class="tc mt5 mb5">
                            <Button class="mr10" type="success" style="width: 120px;"
                                    @click="$router.push({name:'ActivityRules', query: { activityId }})"
                            > 上一步 </Button>
                        </div>

                        <div class="tc">
                            <h1 style="color: red; font-weight: normal"> 审核模式 </h1>
                        </div>
                    </Card>

                </Card>
            </i-col>
        </Row>
    </div>
</template>

<script>
// import canEditTable from '@/components/canEditTable.vue'
import * as ApiMerchantsSetUp from '@/api/merchants-set-up'
import data from '../data/data.js'
import activityStep from '../../create-activity/components/activity-step'

export default {
  data () {
    // 自定义的表单数字验证
    const validateMobile = (rule, value, callback) => {
      value.trim()
      let reg = new RegExp('^-?[0-9]*.?[0-9]*$')
      if (reg.test(value)) {
        let absVal = Math.abs(value)
        if (+value === +absVal) {
          callback()
        } else {
          callback(new Error('请输入正数'))
        }
      } else {
        callback(new Error('请输入数字值'))
      }
    }

    return {
      activityStatus: 'draft',
      testLoading: false,
      getCheckLoading: false,
      // 表格
      consequenceTh: [], // 测试结果列表表头
      actConsequenceTh: [], // 测试结果列表表头---票务
      commercialList: [], // 测试门店列表数据
      consequenceLIst: [], // 测试结果列表数据
      // 测试门店列表表头
      commercialTh: [
        {
          title: '操作',
          key: 'action',
          width: 100,
          render: (h, params) => {
            return h('div', [
              h('a', {
                on: {
                  click: () => {
                    this.testData(params)
                  }
                }
              }, '模拟测试')
            ])
          }
        },
        {
          title: '门店ID',
          align: 'center',
          key: 'storeId',
          width: 80
        },
        {
          title: '门店名称',
          align: 'center',
          key: 'storeName',
          width: 200
        },
        {
          title: '用户结算',
          align: 'center',
          key: 'userSettlementStr',
          width: 100
        },
        {
          title: '门店结算方式',
          align: 'center',
          key: 'storeSettlementStr',
          width: 120
        },
        {
          title: '门店折扣（%）',
          align: 'center',
          key: 'storeDiscount',
          width: 120
        },
        {
          title: '银行结算方式',
          align: 'center',
          key: 'thirdPartySettlementStr',
          width: 120
        },
        {
          title: '银行折扣（%）',
          align: 'center',
          key: 'thirdPartyDiscountRate',
          width: 120
        },
        {
          title: '是否收取佣金',
          align: 'center',
          key: 'brokerFee',
          width: 120,
          render: (h, params) => {
            return h('span', params.row.brokerFee === 1 ? '是' : '否')
          }
        },
        {
          title: '佣金（%）',
          align: 'center',
          key: 'brokerFeeRate',
          width: 100
        },
        {
          title: '佣金上限（元）',
          align: 'center',
          key: 'brokerFeeUpLimit',
          width: 100
        }
      ],
      actCommercialTh: [
        {
          title: '操作',
          key: 'action',
          width: 80,
          render: (h, params) => {
            return h('div', [
              h('a', {
                on: {
                  click: () => {
                    this.testData(params)
                  }
                }
              }, '模拟测试')
            ])
          }
        },
        {
          title: '门店ID',
          align: 'center',
          key: 'storeId',
          width: 80
        },
        {
          title: '门店名称',
          align: 'center',
          key: 'storeName',
          width: 200
        },
        {
          title: '门店应补（元）',
          align: 'center',
          key: 'storeSubsidy'
        },
        {
          title: '银行应补（元）',
          align: 'center',
          key: 'bankSubsidy'
        },
        {
          title: '是否收取佣金',
          align: 'center',
          key: 'brokerFee',
          render: (h, params) => {
            return h('span', params.row.brokerFee === 1 ? '是' : '否')
          }
        },
        {
          title: '佣金（%）',
          align: 'center',
          key: 'brokerFeeRate'
        },
        {
          title: '佣金上限（元）',
          align: 'center',
          key: 'brokerFeeUpLimit'
        }
      ],
      activityId: '', // 活动id
      // 测试报错列表表头
      errorTh: [
        {
          title: '门店ID',
          align: 'center',
          key: 'storeId',
          width: 200
        },
        {
          title: '门店名称',
          align: 'center',
          key: 'storeName',
          width: 300
        },
        {
          title: '报错原因',
          align: 'center',
          key: 'remark',
          render: (h, params) => {
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  value: params.row.remark
                },
                on: {
                  'on-blur': (event) => {
                    this.postTestRemark(params, event.target.value)
                  }
                }
              })
            ])
          }
        }
      ],
      errorList: [], // 报错列表
      // 表单
      formValidate: {
        id: '',
        storeId: '', // 门店ID
        storeName: '', // 门店名称
        money: '', // 消费金额
        disMoney: '', // 可打折金额
        card: '', // 测试银行卡号
        dateTime: '' // 交易时间
        // activityId:'',      // 活动ID
        // desc: ''            // 活动内容
      },
      // 表单验证
      ruleValidate: {
        money: [
          { required: true, message: '消费金额不能为空', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' }
        ],
        disMoney: [
          { required: true, message: '可打折金额不能为空', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' }
        ],
        card: [
          { required: true, message: '测试银行卡号不能为空', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' }
        ],
        dateTime: [
          { required: true, type: 'string', message: '请选择交易时间', trigger: 'change' }
        ]
      },

      // 报错原因 保存接口参数
      testRemark: {
        id: '',
        remark: '' // 报错原因
      }
    }
  },
  methods: {
    // 审核通过与拒绝
    async postAudit (isAgree) {
      await ApiMerchantsSetUp.postAudit({ 'id': this.activityId, 'isAgree': isAgree })
      this.$router.push({ name: 'ActivityList' })
    },
    // 提交审核
    async getCheck () {
      this.getCheckLoading = true
      await ApiMerchantsSetUp.getCheck(this.activityId)
      this.getCheckLoading = false
      // this.commercialList = data
      // if(data.code == 0){
      this.$router.push({ name: 'ActivityList' })
      // }
    },

    // 保存修改报错原因
    async postTestRemark (params) {
      if (this.errorList[params.index].remark !== event.target.value) {
        this.$Message.success('您修改了第' + (params.index + 1) + '行报错原因!')
        this.errorList[params.index].remark = event.target.value
        this.testRemark.id = this.errorList[params.index].id
        this.testRemark.remark = this.errorList[params.index].remark
      } else {
        return
      }
      await ApiMerchantsSetUp.postTestRemark(this.testRemark)
    },
    // 开始测试
    async postStartTest () {
      try {
        this.testLoading = true
        let a = await ApiMerchantsSetUp.postStartTest(this.formValidate)
        console.log(a)
        if (a.code === 0) {
          this.getListTest(false)
          this.getListTest(true)
        }
      } catch (error) {
      } finally {
        this.testLoading = false
      }
    },
    // 表单验证
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (this.formValidate.storeId === '' || this.formValidate.storeName === '') {
          this.$Notice.error({
            title: '错误提示',
            desc: '请选择门店!',
            duration: 3
          })
          return
        }
        if (parseFloat(this.formValidate.money) < parseFloat(this.formValidate.disMoney)) {
          this.$Notice.error({
            title: '错误提示',
            desc: '可打折金额不能大于消费金额!',
            duration: 3
          })
          return
        }
        if (valid) {
          this.postStartTest()
        } else {
          this.$Message.error('请检查报红部分字段!')
        }
      })
    },

    // 点击列表中模拟测试获取整行数据
    testData (params) {
      this.formValidate.storeId = this.commercialList[params.index].storeId
      this.formValidate.storeName = this.commercialList[params.index].storeName
      this.formValidate.activityId = this.commercialList[params.index].activityId
      this.formValidate.id = this.commercialList[params.index].id
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

    // 测试结果列表添加行样式
    rowClassName (row) {
      // console.log(row)
      if (row.backgroundcolor === 'RED') {
        return 'error-row'
      } else if (row.backgroundcolor === 'YELLOW') {
        return 'warning-row'
      }
      return ''
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

    // 获取门店数据表头
    getData () {
      this.consequenceTh = data.consequenceTh
      this.actConsequenceTh = data.actConsequenceTh
    }
  },
  created () {
    this.activityId = this.$route.query.activityId
    this.activityStatus = this.$route.query.activityStatus
    this.ruleType = this.$route.query.ruleType

    this.getData()
    this.getListActStore()
    this.getListTest(true)
    this.getListTest(false)
  },
  components: {
    activityStep
  }
}
</script>

<style lang="scss" scoped>
    .check_mode {
        position: absolute; top: 0; left: 0; bottom :60px; right: 0;
        background: rgba(0, 0, 0, .4); z-index: 9;

        .ivu-card-head {
            border-bottom: none;
        }
    }
    .p20{
        padding:20px;
    }
    .mr10{
        margin-right: 10px;
    }
    .mb20{
        margin-bottom: 20px;
    }
    .pr10{
        padding-right: 10px;
    }

    .test-form {
      width:100%;
      min-width: 660px;
      font-size: 0;

      .ivu-form-item {
        margin-right: 0;
        width: 50%;

        /deep/ .ivu-form-item-label {
          padding-left: 10px;
        }
      }
    }

    .table-card /deep/ .ivu-card-head {
      border: 1px solid #e9eaec;
      border-bottom: none;
    }
</style>
