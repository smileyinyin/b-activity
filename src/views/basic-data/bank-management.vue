<template>
    <div class="activity-list-page">
        <Card>
            <p slot="title">银行管理</p>
            <Row class="pl10 pr10">
                <i-col span="2">
                    <Button type="success" @click="getCurrentData" icon="md-add" size="large" class="w120 btn-add">新增银行</Button>
                </i-col>
                <i-col span="22" align="right">
                    <Input class="mr10 w180" v-model="name" placeholder="银行名称" clearable />
                    <Button type="primary" @click="getBankList">查询</Button>
                </i-col>
            </Row>
            <Row class="mt20 pl10 pr10">
                <Table border :columns="merchantListTh" :data="tableList"></Table>
            </Row>
            <Row class="tr pt20 pb20">
                <Page :total="total" :current="page" show-sizer @on-change="changePage" @on-page-size-change="pageSize"></Page>
            </Row>
        </Card>

        <!-- 新增银行 / 编辑银行 弹框-->
        <Modal :width="700" v-model="showAdd" ok-text="保存" @on-ok="addSubmit('formValidate')" @on-cancel="showAdd = false;" :loading="loading">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" class="p20 pt40">
                <FormItem label="银行名称" prop="name">
                    <Input v-model="formValidate.name" placeholder="请填写银行名称" />
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
      name: '', // 银行名称
      // 表格
      merchantListTh: [
        {
          title: '名称',
          key: 'name'
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
              }, '编辑')
            ])
          }
        }
      ],
      tableList: [],
      page: 1,
      size: 10,
      total: 0,
      // 表单 -- 新增
      loading: true, // 一定要设置为true，否则第一次提交表单，modal还是会被隐藏
      formValidate: {
        name: '',
        id: ''
      },
      // 表单验证规则
      ruleValidate: {
        name: [
          { required: true, message: '银行名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 分页
    changePage (page) {
      this.page = page
      this.getBankList()
    },
    // 一页显示的条数变化
    pageSize (size) {
      this.size = size
      this.getBankList()
    },
    // 获取列表数据
    async getBankList () {
      let a = await ApiBasicData.getBankList(this.name, this.page, this.size)
      this.tableList = a.data
      this.total = a._rawData.objectotalNumber
    },
    // 新增保存
    async postBankAdd () {
      let { data = [] } = await ApiBasicData.postBankAdd(this.formValidate)
      this.tableList = data
      this.getBankList()
    },
    // 编辑保存
    async postBankEdit () {
      let { data = [] } = await ApiBasicData.postBankEdit(this.formValidate)
      this.tableList = data
      this.getBankList()
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
    // 显示弹框
    getCurrentData () {
      this.showAdd = true
      this.formValidate.name = ''
      this.formValidate.code = ''
      this.formValidate.address = ''
      this.formValidate.id = ''
    },
    // 新增银行点击保存
    addSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.loading = false
          this.showAdd = false
          if (this.saveEdit) {
            this.saveEdit = false
            this.postBankEdit() // 调用编辑保存接口
          } else {
            this.postBankAdd() // 调取新增商户接口
          }
        } else {
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
    this.getBankList() // 调用商户管理列表接口
  }
}
</script>
