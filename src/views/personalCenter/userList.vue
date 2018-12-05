<template>
<div>
    <p class="pr10 pb10 f14">用户管理</p>
    <Card>
        <Row class="mb20" type="flex" justify="space-between">
            <i-col>
                <Button type="success" @click="modal = true" icon="md-add">添加用户</Button>
            </i-col>
            <i-col>
                <Input class="mr10 w180" v-model="keyword" placeholder="用户名" clearable />
                <Button type="primary" icon="ios-search" @click="getUserList">查询</Button>
            </i-col>
        </Row>
        <Table border :columns="columns" :data="tableList"></Table>
        <Row class="tr pt20 pb20">
            <Page :total="total" :page-size="pageSize" :current.sync="pageNum" show-sizer @on-change="getUserList" @on-page-size-change="changePageSize"></Page>
        </Row>
    </Card>
    <Modal
        v-model="modal"
        title="新增用户">
        <Form :label-width="100" ref="form" :model="userForm" :rules="validRules">
            <formItem label="登录账号" prop="login_name">
                <Input v-model="userForm.login_name" placeholder="请输入手机号"></Input>
            </formItem>
            <formItem label="用户名" prop="name">
                <Input v-model="userForm.name" placeholder="请输入用户名称"></Input>
            </formItem>
            <formItem label="用户名">
                <RadioGroup v-model="userForm.level">
                    <Radio label="user">活动创建员</Radio>
                    <Radio label="admin">活动管理员</Radio>
                </RadioGroup>
            </formItem>
        </Form>
        <div slot="footer">
            <Button type="text" size="large" @click="modal = false">取消</Button>
            <Button type="primary" size="large" @click="addUser">确定</Button>
        </div>
    </Modal>
</div>
</template>

<script>
import { addUser, getUserList, delUser } from '@/api/login'
import { formatDate } from '@/common/util/util.js'

export default {
  name: 'userList',
  data() {
    return {
      modal: false,

      userForm: {
        // TODO 登录时获取的 各种ID
        district_id: this.$store.getters.district_id, // '330108',
        city_id: this.$store.getters.city_id, // '330100',
        province_id: this.$store.getters.province_id, // '330000',
        bank_id: this.$store.getters.bank_id, // '785110',
        company_id: this.$store.getters.company_id, // '68',

        login_name: '', // 登录账号，只能是手机号！
        name: '', // 名称
        level: 'user' // 角色
      },
      validRules: {
        login_name: [
          { required: true, message: '请填写手机号', trigger: 'blur' },
          {
            pattern: /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/,
            message: '请填写合法手机号',
            trigger: 'blur'
          }
        ],
        name: [{ required: true, message: '请填写用户名', trigger: 'blur' }]
      },

      keyword: '',
      pageNum: 1,
      pageSize: 20,
      total: 0,

      columns: [
        {
          title: '用户名',
          key: 'name',
          align: 'center'
        },
        {
          title: '登录账号',
          key: 'login_name',
          align: 'center'
        },
        {
          title: '角色',
          key: 'level_text',
          align: 'center'
        },
        {
          title: '创建时间',
          key: 'create_at',
          align: 'center',
          render: (h, params) => h('span', null, formatDate(params.row.create_at))
        },
        {
          title: '操作',
          key: 'name',
          width: 200,
          align: 'center',
          render: (h, params) => {
            return h('Button', {
              props: { type: 'error', size: 'small' },
              on: { click: () => this.delUser(params.row.id) }
            }, '删除')
          }
        }
      ],
      tableList: []
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    delUser(id) {
      if (id === this.$store.getters.user_id) {
        this.$Notice.error({
          title: '不可删除',
          desc: '不可以删除自己哦！'
        })
        return
      }
      this.$Modal.confirm({
        title: '确认删除',
        content: '删除后不可恢复，确认要删除么？',
        onOk: () => {
          delUser(id).then(res => this.getUserList())
        }
      })
    },
    addUser() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          addUser(this.userForm).then(res => {
            this.getUserList()
            this.modal = false
          })
        }
      })
    },
    getUserList() {
      getUserList({
        district_id: this.userForm.district_id,
        city_id: this.userForm.city_id,
        province_id: this.userForm.province_id,
        bankId: this.userForm.bank_id,
        company_id: this.userForm.company_id,

        name: this.keyword,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        this.tableList = res.data
        this.total = res._rawData.total
      })
    },
    changePageSize(size) {
      this.pageSize = size
      this.getUserList()
    }
  }
}
</script>
