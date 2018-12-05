<template>
    <!--商户管理-->
    <div class="activity-list-page">
        <Card>
            <p slot="title">商户管理</p>

            <!-- 查询条件 1 -->
            <Row type="flex" class="plr-10">
                <i-col class="mr10">
                <Button type="success" @click="getCurrentData">新增商户</Button>
                </i-col>
                <i-col>
                <Input class="mr10" v-model="name" placeholder="商户名称" clearable style="width: 160px" />
                <Input class="mr10" v-model="code" placeholder="商户编码" clearable style="width: 160px" />
                </i-col>
                <i-col>
                <Button type="primary" @click="getMerchantList">查询</Button>
                </i-col>
            </Row>
            <Row class="mt20 plr-10">
                <Table border :columns="merchantListTh" :data="tableList"></Table>
            </Row>
            <Row class="ptb-20 tr">
                <Page :total=total :current=this.page show-sizer @on-change="changePage" @on-page-size-change="pageSize"></Page>
            </Row>
        </Card>

        <!-- 新增商户 / 编辑商户 弹框-->
        <Modal :width="700" v-model="showAdd" ok-text="保存" @on-ok="addSubmit('formValidate')"
               @on-cancel="handleSelectAll()" :loading="loading">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" class="p20 pt40">
                <FormItem label="商户名称" prop="name">
                    <Input v-model="formValidate.name" placeholder="请填写商户名称" />
                </FormItem>
                <FormItem label="商户编码" prop="code">
                    <Input v-model="formValidate.code" placeholder="请填写商户编码" />
                </FormItem>
                <FormItem label="地址" prop="address">
                    <Input v-model="formValidate.address" placeholder="请填写地址" />
                </FormItem>
            </Form>
        </Modal>

    </div>
</template>

<script>
import * as ApiBasicData from '@/api/basic-data'

export default {
  data () {
    return {
      showAdd: false,
      saveEdit: false,

      name: '', // 商户名称
      code: '', // 商户编码

      // 表格
      merchantListTh: [
        {
          title: 'ID',
          key: 'id',
          width: 60
        },
        {
          title: '商户名称',
          key: 'name'
        },
        {
          title: '商户编码',
          key: 'code'
        },
        {
          title: '地址',
          key: 'address'
        },
        {
          title: '创建日期',
          key: 'createdAt'
        },
        {
          title: '更新日期',
          key: 'updatedAt'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.deleteMerchantDelete(params.index)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      tableList: [],
      page: 1,
      size: 10,
      // current:1,
      total: 0,

      // 表单 -- 新增
      loading: true, // 一定要设置为true，否则第一次提交表单，modal还是会被隐藏
      formValidate: {
        name: '',
        code: '',
        address: '',
        // status: '',
        id: ''
      },
      // 表单验证规则
      ruleValidate: {
        name: [
          { required: true, message: '商户名称不能为空', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '商户编码不能为空', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '地址不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 分页
    changePage (page) {
      this.page = page
      this.getMerchantList()
    },
    pageSize (size) {
      this.size = size
      this.getMerchantList()
    },

    // 获取列表数据
    async getMerchantList () {
      // let { data = [] } = await ApiBasicData.getMerchantList(this.name, this.code, this.page, this.size);
      let a = await ApiBasicData.getMerchantList(this.name, this.code, this.page, this.size)
      this.tableList = a.data
      this.total = a._rawData.objectotalNumber
      console.log(this.total)
    },
    // 新增保存
    async postMerchantAdd () {
      let { data = [] } = await ApiBasicData.postMerchantAdd(this.formValidate)
      this.tableList = data
      this.getMerchantList()
    },
    // 编辑保存
    async postMerchantEdit () {
      let { data = [] } = await ApiBasicData.postMerchantEdit(this.formValidate)
      this.tableList = data
      this.getMerchantList()
    },
    // 编辑
    show (index) {
      this.showAdd = true
      this.saveEdit = true
      this.formValidate.id = this.tableList[index].id
      this.formValidate.name = this.tableList[index].name
      this.formValidate.code = this.tableList[index].code
      this.formValidate.address = this.tableList[index].address
    },
    // 删除
    async deleteMerchantDelete (index) {
      let d = this.tableList[index].id
      await ApiBasicData.deleteMerchantDelete(d)
      this.getMerchantList()
    },
    // 显示弹框
    getCurrentData () {
      this.showAdd = true
      this.formValidate.name = ''
      this.formValidate.code = ''
      this.formValidate.address = ''
      this.formValidate.id = ''
    },
    // 弹框取消
    handleSelectAll () {
      this.showAdd = false
    },
    // 新增商户点击保存
    addSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('保存成功!')
          this.loading = false
          this.handleSelectAll()
          if (this.saveEdit) {
            // alert('edit')
            this.saveEdit = false
            this.postMerchantEdit() // 调用编辑保存接口
          } else {
            this.postMerchantAdd() // 调取新增商户接口
          }
        } else {
          this.$Message.error('请检查报红部分字段!')
          setTimeout(() => {
            this.loading = false
            this.$nextTick(() => {
              this.loading = true
            })
          }, 1000)
        }
      })
    }
  },
  created () {
    this.getMerchantList() // 调用商户管理列表接口
  }
}
</script>

<style scoped>
    .mt20 {
        margin-top: 20px;
    }
    .mr10{
        margin-right: 10px;
    }

    .ptb-20 {
        padding: 20px 0;
    }

    .plr-10 {
        padding: 0 10px;
    }

    .tr {
        text-align: right;
    }

    .p20 {
        padding: 20px;
    }
    .pt40{
        padding-top: 40px;
    }

</style>
