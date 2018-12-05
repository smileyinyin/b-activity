<template>
  <div class="update-password">
    <h3 style="padding-bottom: 10px">修改密码</h3>
    <Card>
      <Row>
        <Col span="24" style="margin-top: 200px" align="center">
           <Form :label-width="120" class="form" style="width:520px;" ref="form" :model="params" :rules="rules">
             <FormItem label="登录手机号：" prop="mobile">
              <Input style="width: 400px;" v-model="params.mobile" disabled />
            </FormItem>
            <FormItem label="原密码：" prop="old_password">
              <Input placeholder="请输入原密码" clearable style="width: 400px;" v-model="params.old_password" type="password" />
            </FormItem>
            <FormItem label="新密码：" prop="password">
              <Input placeholder="请输入新密码" clearable style="width: 400px;" v-model="params.password" type="password" />
            </FormItem>
            <FormItem label="确认新密码：" prop="againNewPassword">
              <Input placeholder="确认新密码" clearable style="width: 400px;" v-model="params.againNewPassword" type="password" />
            </FormItem>
            <FormItem label="">
              <Button type="primary" style="width: 400px; margin-bottom: 300px;" @click="update">确认修改</Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
import { updatePassword } from '@/api/login'

export default {
  name: 'updatePassword',
  data() {
    return {
      params: {
        mobile: '',
        old_password: null,
        password: null,
        againNewPassword: null
      },
      rules: {
        old_password: [
          { required: true, message: '请填写原密码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写新密码', trigger: 'blur' }
        ],
        againNewPassword: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value !== this.params.password) {
                callback(new Error())
              } else {
                callback()
              }
            },
            message: '两次填写密码不一致',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.params.mobile = this.$store.getters.login_name
  },
  methods: {
    update() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          updatePassword({
            login_name: this.params.mobile,
            old_password: this.params.old_password,
            password: this.params.password
          }).then(res => {
            this.$Notice.success({
              title: '成功',
              desc: '修改成功！'
            })
            let loginInfo = JSON.parse(
              localStorage.getItem('_bank_activity_loginInfo')
            )
            if (loginInfo) {
              loginInfo.password = this.params.password
              localStorage.setItem(
                '_bank_activity_loginInfo',
                JSON.stringify(loginInfo)
              )
            }
            this.params.old_password = ''
            this.params.password = ''
            this.params.againNewPassword = ''
          })
        }
      })
    }
  }
}
</script>
