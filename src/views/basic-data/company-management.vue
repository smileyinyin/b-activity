<template>
    <!--商户管理-->
    <div class="activity-list-page">
        <Card>
            <p slot="title">分公司管理</p>
            <Row class="pl10 pr10">
                <i-col span="2">
                    <Button type="success" @click="getCurrentData" class="w120 btn-add" icon="md-add" size="large">新增分公司</Button>
                </i-col>
                <i-col span="22">
                    <Input class="mr10 w180" v-model="name" placeholder="分公司名称" clearable />
                    <Button type="primary" @click="getCompanyList">查询</Button>
                </i-col>
            </Row>
            <Row class="mt20 pl10 pr10">
                <Table border :columns="merchantListTh" :data="tableList"></Table>
            </Row>
            <Row class="tr pt20 pb20">
                <Page :total="total" :current="page" show-sizer @on-change="changePage" @on-page-size-change="pageSize"></Page>
            </Row>
        </Card>

        <!-- 新增商户 / 编辑商户 弹框-->
        <Modal :width="700" v-model="showAdd" ok-text="保存" @on-ok="addSubmit('formValidate')"
               @on-cancel="handleSelectAll()" :loading="loading">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="140" class="pt40">
                <FormItem label="分公司名称" prop="name">
                    <Input v-model="formValidate.name" placeholder="请填写分公司名称" />
                </FormItem>
                <FormItem label="地址">
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
      name: '', // 分公司名称
      // 表格
      merchantListTh: [
        {
          title: 'ID',
          key: 'id',
          width: 100
        },
        {
          title: '名称',
          key: 'name'
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
        address: '',
        id: ''
      },
      // 表单验证规则
      ruleValidate: {
        name: [
          { required: true, message: '分公司名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 分页
    changePage (page) {
      this.page = page
      this.getCompanyList()
    },
    pageSize (size) {
      this.size = size
      this.getCompanyList()
    },

    // 获取列表数据
    async getCompanyList () {
      // let { data = [] } = await ApiBasicData.getCompanyList(this.name, this.code, this.page, this.size);
      let a = await ApiBasicData.getCompanyList(this.name, this.page, this.size)
      this.tableList = a.data
      this.total = a._rawData.objectotalNumber
      console.log(this.total)
    },
    // 新增保存
    async postCompanyAdd () {
      let { data = [] } = await ApiBasicData.postCompanyAdd(this.formValidate)
      this.tableList = data
      this.getCompanyList()
    },
    // 编辑保存
    async postCompanyEdit () {
      let { data = [] } = await ApiBasicData.postCompanyEdit(this.formValidate)
      this.tableList = data
      this.getCompanyList()
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
    async deleteCompanyDelete (index) {
      let d = this.tableList[index].id
      await ApiBasicData.deleteCompanyDelete(d)
      this.getCompanyList()
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
            this.postCompanyEdit() // 调用编辑保存接口
          } else {
            this.postCompanyAdd() // 调取新增商户接口
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
    this.getCompanyList() // 调用商户管理列表接口
  }
}
</script>
