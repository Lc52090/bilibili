<template>
  <div>
    <Login-top middleTop="注册bilibili">
      <div
        slot="right"
        style="font-size:3.611vw"
        @click="$router.push('/login')"
      >切换到登录</div>
    </Login-top>
    <login-text
      label="姓名"
      style="margin:4.167vw 0"
      placeholder="请输入姓名"
      rule="^.{6,16}$"
      @inputChange="res => model.name = res"
    />
    <login-text
      label="帐号"
      placeholder="请输入帐号"
      rule="^.{6,16}$"
      @inputChange="res => model. username = res"
    />
    <login-text
      label="密码"
      placeholder="请输入密码"
      type="password"
      rule="^.{6,16}$"
      @inputChange="res => model.password = res"
    />
    <Login-btn
      btntext="注册"
      @registerSubmit="registerSubmit"
    ></Login-btn>
  </div>
</template>

<script>
import LoginTop from '../components/common/LoginTop'
import loginText from '../components/common/LoginText'
import LoginBtn from '../components/common/LoginBtn'

export default {
  data() {
    return {
      model: {
        name: '',
        username: '',
        password: ''
      }
    }
  },
  components: {
    LoginTop,
    loginText,
    LoginBtn
  },
  methods: {
    async registerSubmit() {
      const rulg = /^.{6,16}$/
      if (rulg.test(this.model.name) && rulg.test(this.model.username) && rulg.test(this.model.password)) {
        const res = await this.$http.post('/register', this.model)
        this.$msg.fail(res.data.msg)
        localStorage.setItem('token', res.data.objtoken)
        localStorage.setItem('id', res.data.id)
        setTimeout(() => {
          this.$router.push('/userinfo')
        }, 2000)
      } else {
        this.$msg.fail('格式不正确，请重新输入')
      }
    }
  }
}
</script>

<style lang='stylus' scoped></style>
