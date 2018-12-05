<template>
  <div class="login">
    <div class="header-bar">
      <img src="../../assets/LOGO1.png" alt="上下网">
      <div class="sxw">上下科技</div>
      <div class="title">卡活动</div>
    </div>
    <div class="login-con">
      <Card icon="log-in" :bordered="false">
        <p class="mt20 mb20 title">银行卡智能营销平台</p>
        <div class="form-con">
          <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
            <FormItem prop="userName">
              <Input v-model.trim="form.userName" placeholder="账号：" >
                <img src="../../assets/account.png" slot="prefix" class="input-icon"/>
              </Input>
            </FormItem>
            <FormItem prop="password" class="mb10">
              <Input type="password" v-model.trim="form.password" placeholder="密码：">
                <img src="../../assets/password.png" slot="prefix" class="input-icon"/>
              </Input>
            </FormItem>
            <FormItem class="mb10">
              <Checkbox v-model="isRemember">记住密码</Checkbox>
            </FormItem>
            <FormItem class="mb10">
              <Button @click="handleSubmit" type="primary" long>登录</Button>
            </FormItem>
          </Form>
          <!-- <p class="login-tip">
            <span style="color: #57a3f3;cursor: pointer;">忘记密码？</span>
          </p> -->
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
// import { login } from '@/api/login'

export default {
  data () {
    return {
      form: {
        userName: '',
        password: ''
      },
      isRemember: false,
      rules: {
        userName: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    var loginInfo = JSON.parse(localStorage.getItem('_bank_activity_loginInfo'))
    if (loginInfo) {
      this.isRemember = true
      this.form.userName = loginInfo.userName
      this.form.password = loginInfo.password
    }
  },
  methods: {
    handleSubmit () {
      if (this.isRemember) {
        localStorage.setItem('_bank_activity_loginInfo', JSON.stringify(this.form))
      } else {
        localStorage.removeItem('_bank_activity_loginInfo')
      }
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch('handleLogin', {
            userName: this.form.userName,
            password: this.form.password
          }).then(res => {
            // this.$router.push({ name: 'ActivityList' })
            this.$router.push({ name: 'home' })
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-roleModal .ivu-modal-body {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .header-bar {
    display: flex;
    align-items: center;
    height: 100px;
    padding-left: 200px;
    background: rgba(0, 0, 0, .7);
    user-select: none;
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 2px;
    color: #fff;

    .sxw {
      margin-left: 10px;
      font-size: 32px;
    }
    .title {
      position: relative;
      margin-left: 14px;
      padding-left: 16px;
      // position: absolute;

      &::before {
        content: '';
        position: absolute;
        width: 2px;
        top: 4px;
        bottom: 4px;
        left: 0;
        background: rgba(225, 225, 225, .8);
      }
    }
  }

  .login{
    width: 100%;
    height: 100%;
    background: #191f29;
    background-image: url('../../assets/login-bg.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: right;
    position: relative;
    &-con{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%,-50%,0);
        width: 340px;
        &-header{
            font-size: 16px;
            font-weight: 300;
            text-align: center;
            padding: 30px 0;
        }
        .form-con{
          margin-bottom: 30px;
          padding: 10px 0 0;
        }
        .login-tip{
            font-size: 10px;
            text-align: center;
            color: #c3c3c3;
        }

        .title {
          font-size: 24px;
          font-weight: bold;
          text-align: center;
          color: #bed8f0;
          letter-spacing: 2px;
        }

        /deep/ .ivu-card {
          background: rgba(0, 0, 0, .8);
          color: #fff;
          border-radius: 0;

          .ivu-card-body {
            padding: 16px 26px;
          }
          .ivu-input, .ivu-btn {
            border-radius: 0;
          }
        }

        .input-icon {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate3d(-50%,-50%,0);
        }
    }

    @media screen and (max-width: 750px){
      .header-bar {
        padding-left: 20px;
      }
    }
}
</style>
