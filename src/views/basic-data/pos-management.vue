<template>
    <!--POS管理-->
    <div class="activity-list-page">
        <Card>
            <p slot="title">POS管理</p>
            <Row class="pl10 pr10">
                <i-col span="24" align="right">
                    <Input class="mr10 w180" v-model="posSn" placeholder="SN号" clearable />
                    <Input class="mr10 w180" v-model="acquirerPosCode" placeholder="收单方终端编码" clearable />
                    <Button type="primary" @click="getStorePosList">查询</Button>
                </i-col>
            </Row>
            <Row class="mt20 pl10 pr10">
                <Table border :columns="merchantListTh" :data="tableList"></Table>
            </Row>
            <Row class="tr pt20 pb20">
                <Page :total="total" :current="page" show-sizer @on-change="changePage" @on-page-size-change="pageSize"></Page>
            </Row>
        </Card>

        <!-- 新增POS / 编辑POS 弹框-->
        <!-- <Modal :width="700" v-model="showAdd" ok-text="保存" @on-ok="addSubmit('formValidate')"
               @on-cancel="handleSelectAll()" :loading="loading">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="180" class="p20 pt40">
                <FormItem label="POS所属门店">
                    <Select
                        placeholder="请输入门店id或名称查询门店"
                        v-model="formValidate.storeId"
                        :label="formValidate.storeId"
                        filterable
                        remote
                        :remote-method="remoteMethod1"
                        :loading="loading1">
                        <Option v-for="(option, index) in options1" :value="option.value" :key="option.value">{{option.label}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="POS的SN" prop="posSn">
                  <Input v-model="formValidate.posSn" placeholder="请填写POS的SN"></Input>
                </FormItem>
                <FormItem label="POS的收单方终端编码" prop="acquirerPosCode">
                    <Input v-model="formValidate.acquirerPosCode" placeholder="请填写POS的收单方终端编码"></Input>
                </FormItem>
            </Form>
        </Modal> -->

    </div>
</template>

<script>
import * as ApiBasicData from '@/api/basic-data'
import { formatDate } from '@/common/util/util.js'

export default {
  data () {
    return {
      showAdd: false,
      saveEdit: false,

      posSn: '', // pos的SN
      acquirerPosCode: '', // 收单方终端编码
      // 表格
      merchantListTh: [
        {
          title: '门店id',
          key: 'businessId'
        },
        {
          title: 'POS的SN',
          key: 'csn'
        },
        {
          title: 'POS的收单方终端编码',
          key: 'posTerminalId'
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
        // {
        //     title: '操作',
        //     key: 'action',
        //     width: 150,
        //     align: 'center',
        //     render: (h, params) => {
        //         return h('div', [
        //             h('Button', {
        //                 props: {
        //                     type: 'primary',
        //                     size: 'small'
        //                 },
        //                 style: {
        //                     marginRight: '5px'
        //                 },
        //                 on: {
        //                     click: () => {
        //                         this.show(params.index)
        //                     }
        //                 }
        //             }, '编辑'),
        //             h('Button', {
        //                 props: {
        //                     type: 'error',
        //                     size: 'small'
        //                 },
        //                 on: {
        //                     click: () => {
        //                         this.deleteStorePosDelete(params.index)
        //                     }
        //                 }
        //             }, '删除')
        //         ]);
        //     }
        // }
      ],
      tableList: [],
      page: 1,
      size: 10,
      // current:1,
      total: 0,

      // 表单 -- 新增
      // loading: true, // 一定要设置为true，否则第一次提交表单，modal还是会被隐藏
      // formValidate: {
      //     storeId: '',
      //     posSn: '',
      //     acquirerPosCode: '',
      //     id:'',
      //     province:'',
      //     city:''
      // },
      // // 表单验证规则
      // ruleValidate: {
      //     posSn: [
      //         {required: true, message: 'SN不能为空', trigger: 'blur'}
      //     ],
      //     acquirerPosCode: [
      //         {required: true, message: 'POS编码不能为空', trigger: 'blur'},
      //     ]
      // },
      // loading1: false,
      options1: [],
      list: []
    }
  },
  methods: {
    // async getStoreQuery(query){
    //     let { data = [] } = await ApiBasicData.getStoreQuery(query);
    //     this.list = data
    // },
    // 下拉远程搜索
    // async remoteMethod1 (query) {
    //   if (query !== '') {
    //     this.loading1 = true;
    //     await this.getStoreQuery(query)
    //     let list = this.list.map(item => {
    //       return {
    //         value: item.id,
    //         label: item.id + ":" + item.name
    //       };
    //     });
    //     this.options1 = list
    //     this.loading1 = false;
    //   } else {
    //     this.options1 = [];
    //   }
    // },

    // 分页
    changePage (page) {
      this.page = page
      this.getStorePosList()
    },
    pageSize (size) {
      this.size = size
      this.page = 1
      this.getStorePosList()
    },

    // 获取列表数据
    async getStorePosList () {
      // let { data = [] } = await ApiBasicData.getStorePosList(this.name, this.code, this.page, this.size);
      let a = await ApiBasicData.getPosList({
        csn: this.posSn,
        posTerminalId: this.acquirerPosCode,
        page: this.page,
        size: this.size
      })
      this.tableList = a.data || []
      this.total = a._rawData.objectotalNumber
      console.log(this.total)
    }
    // 新增保存
    // async postStorePosAdd (){
    //     let { data = [] } = await ApiBasicData.postStorePosAdd(this.formValidate);
    //     this.tableList = data
    //     this.getStorePosList ()
    // },
    // // 编辑保存
    // async postStorePosEdit (){
    //     let { data = [] } = await ApiBasicData.postStorePosEdit(this.formValidate);
    //     this.tableList = data
    //     this.getStorePosList ()
    // },
    // 编辑
    // show(index) {
    //     this.showAdd = true;
    //     this.saveEdit = true
    //     this.formValidate.id = this.tableList[index].id
    //     this.formValidate.storeId = this.tableList[index].storeId
    //     this.formValidate.posSn = this.tableList[index].posSn
    //     this.formValidate.acquirerPosCode = this.tableList[index].acquirerPosCode
    // },
    // 删除
    // async deleteStorePosDelete(index) {
    //     let d = this.tableList[index].id
    //     let { data = [] } = await ApiBasicData.deleteStorePosDelete(d);
    //     this.getStorePosList ()
    // },
    // 显示弹框
    // getCurrentData() {
    //     this.showAdd = true;
    //     this.formValidate.id = ''
    //     this.formValidate.storeId = ''
    //     this.formValidate.posSn = ''
    //     this.formValidate.acquirerPosCode = ''
    // },
    // 弹框取消
    // handleSelectAll() {
    //     this.showAdd = false;
    // },
    // 新增POS点击保存
    // addSubmit(name) {
    //     this.$refs[name].validate((valid) => {
    //         if (valid) {
    //             this.$Message.success('保存成功!');
    //             this.loading = false;
    //             this.handleSelectAll()
    //             if (this.saveEdit) {
    //                 // alert('edit')
    //                 this.saveEdit = false
    //                 this.postStorePosEdit()  //调用编辑保存接口
    //             } else {
    //                 this.postStorePosAdd()  // 调取新增POS接口
    //             }
    //         } else {
    //             this.$Message.error('请检查报红部分字段!');
    //             setTimeout(() => {
    //                 this.loading = false;
    //                 this.$nextTick(() => {
    //                     this.loading = true;
    //                 });
    //             }, 1000);
    //         }
    //     })
    // }
  },
  created () {
    this.getStorePosList() // 调用POS管理列表接口
  }
}
</script>
