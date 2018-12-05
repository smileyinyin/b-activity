<template>
    <!--卡bin管理-->
    <div class="activity-list-page">
        <Card>
            <p slot="title">卡bin管理</p>

            <!-- 查询条件 1 -->
            <Row class="pl10 pr10" type="flex" justify="space-between">
                <i-col>
                    <Button type="success" @click="getCurrentData" class="w120 btn-add" icon="md-add" size="large">新增卡bin</Button>
                </i-col>
                <i-col>
                    <!-- 发卡银行 -->
                    <Input class="mr10 w180" v-model="name" placeholder="请输入发卡银行" />
                    <!-- 机构代码 -->
                    <Input class="mr10 w180" v-model="code" placeholder="请输入机构代码" clearable />
                    <!-- 卡bin -->
                    <Input class="mr10 w180" v-model="bin" placeholder="请输入卡bin" clearable />
                    <Select v-model="cardType" placeholder="请选择卡种" class="w180 tl" clearable>
                        <Option v-for="item in cards" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Button type="primary" @click="getCardBinList" class="ml10">查询</Button>
                    <Button class="ml10" @click="downloadTemplate">下载模板</Button>
                    <Upload class="dib ml10"
                      action="/activity/v1/cardBin/import"
                      :show-upload-list="false"
                      :data="{ bankId: $store.getters.bank_id }"
                      :on-success="onSuccess"
                    >
                      <Button icon="ios-cloud-upload-outline">批量导入</Button>
                    </Upload>
                </i-col>
            </Row>
            <Row class="mt20 pl10 pr10">
                <Table border :columns="merchantListTh" :data="tableList"></Table>
            </Row>
            <Row class="tr pt20 pb20">
                <Page :total="total" :current="page" show-sizer @on-change="changePage" @on-page-size-change="pageSize"></Page>
            </Row>
        </Card>

        <!-- 新增卡bin 弹框-->
        <Modal :width="700" v-model="showAdd" ok-text="保存" @on-ok="addSubmit('formValidate')" @on-cancel="handleSelectAll()" :loading="loading">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" class="p20 pt40">
                <FormItem label="发卡行" prop="name">
                    <Input v-model="formValidate.name" placeholder="请填写发卡行" />
                </FormItem>
                <FormItem label="机构代码" prop="code">
                    <Input v-model="formValidate.code" placeholder="请填写机构代码" />
                </FormItem>
                <FormItem label="卡bin" prop="bin">
                    <Input v-model="formValidate.bin" placeholder="请填写卡bin" />
                </FormItem>
                <FormItem label="卡种" prop="cardType">
                    <Select v-model="formValidate.cardType" style="width:150px" placeholder="请选择卡种">
                        <Option v-for="item in cards" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="卡名">
                    <Input v-model="formValidate.cardName" placeholder="请填写卡名" />
                </FormItem>
                <FormItem label="分支机构名">
                    <Input v-model="formValidate.branchName" placeholder="请填写分支机构名" />
                </FormItem>
            </Form>
        </Modal>

    </div>
</template>
<script>
import * as ApiBasicData from '@/api/basic-data'
// import { downloadUrl } from '@/common/util/util'

export default {
  data () {
    return {
      showAdd: false,
      saveEdit: false,
      cards: [{ value: '借记卡', label: '借记卡' }, { value: '贷记卡', label: '贷记卡' }, { value: '准贷记卡', label: '准贷记卡' }, { value: '预付费卡', label: '预付费卡' }],
      name: '', // 发卡行
      code: '', // 机构代码
      cardType: '', // 卡种
      bin: '', // 卡bin
      // 表格
      merchantListTh: [
        {
          title: 'ID',
          key: 'id',
          width: 60
        },
        {
          title: '发卡行',
          key: 'name'
        },
        {
          title: '机构代码',
          key: 'code'
        },
        {
          title: '卡bin',
          key: 'bin'
        },
        {
          title: '卡种',
          key: 'cardType'
        },
        {
          title: '卡名',
          key: 'cardName'
        },
        {
          title: '分支机构名',
          key: 'branchName'
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
                    this.deleteCardBinDelete(params.index)
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
      total: 0,
      // 表单 -- 新增
      loading: true, // 一定要设置为true，否则第一次提交表单，modal还是会被隐藏
      formValidate: {
        bankId: this.$store.getters.bank_id,
        name: '',
        code: '',
        bin: '',
        cardType: '',
        branchName: '',
        cardName: '',
        id: ''
      },
      // 表单验证规则
      ruleValidate: {
        name: [
          { required: true, message: '发卡行不能为空', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '机构代码不能为空', trigger: 'blur' }
        ],
        bin: [
          { required: true, message: '卡bin不能为空', trigger: 'blur' }
        ],
        cardType: [
          { required: true, message: '卡种不能为空', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    // 分页
    changePage (page) {
      this.page = page
      this.getCardBinList()
    },
    pageSize (size) {
      this.size = size
      this.getCardBinList()
    },

    // 获取列表数据
    async getCardBinList () {
      let a = await ApiBasicData.getCardBinList(this.formValidate.bankId, this.name, this.code, this.cardType, this.bin, this.page, this.size)
      this.tableList = a.data
      this.total = a._rawData.objectotalNumber
    },
    // 新增保存
    async postCardBinAdd () {
      await ApiBasicData.postCardBinAdd(this.formValidate)
      // this.tableList = data
      this.getCardBinList()
    },
    // 编辑保存
    async postCardBinEdit () {
      await ApiBasicData.postCardBinEdit(this.formValidate)
      this.getCardBinList()
    },
    // 编辑
    show (index) {
      this.showAdd = true
      this.saveEdit = true
      this.formValidate.id = this.tableList[index].id
      this.formValidate.name = this.tableList[index].name
      this.formValidate.code = this.tableList[index].code
      this.formValidate.bin = this.tableList[index].bin
      this.formValidate.cardType = this.tableList[index].cardType
      this.formValidate.branchName = this.tableList[index].branchName
    },
    // 删除
    async deleteCardBinDelete (index) {
      this.$Modal.confirm({
        title: '确认删除',
        content: '<p>删除后不可恢复哦，确认要删除么？</p>',
        onOk: async () => {
          let d = this.tableList[index].id
          await ApiBasicData.deleteCardBinDelete(d)
          this.getCardBinList()
        }
      })
    },
    // 显示弹框
    getCurrentData () {
      this.showAdd = true
      this.formValidate.name = ''
      this.formValidate.code = ''
      this.formValidate.bin = ''
      this.formValidate.cardType = ''
      this.formValidate.branchName = ''
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
            this.postCardBinEdit() // 调用编辑保存接口
          } else {
            this.postCardBinAdd() // 调取新增商户接口
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
    },
    downloadTemplate() {
      // downloadUrl('/activity/v1/cardBin/example')
      // firefox 不兼容 iframe 下载，改为 form 提交下载
      var form = document.createElement('form')
      form.action = '/activity/v1/cardBin/example'
      form.method = 'get'
      document.body.appendChild(form)
      form.submit()
      document.body.removeChild(form)
    },
    onSuccess(response, file, fileList) {
      this.$Notice.success({
        title: '上传成功',
        desc: '模板上传成功！'
      })
      this.getCardBinList()
      console.log(response, file, fileList)
    }
  },
  created () {
    this.getCardBinList() // 调用商户管理列表接口
  }
}
</script>
