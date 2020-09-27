<template>
  <div>
    <Login-top middleTop="登录bilibili">
      <div
        slot="right"
        style="font-size:3.611vw"
        @click="$router.push('/register')"
      >切换到注册</div>
    </Login-top>
    <login-text
      label="帐号"
      placeholder="请输入帐号"
      rule="^.{6,16}$"
      @inputChange="res => model.username = res"
      style="margin:4.167vw 0"
    />
    <login-text
      label="密码"
      placeholder="请输入密码"
      type="password"
      rule="^.{6,16}$"
      @inputChange="res => model.password = res"
    />
    <Login-btn
      btntext="登录"
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
      if (rulg.test(this.model.username) && rulg.test(this.model.password)) {
        const res = await this.$http.post('/login', this.model)
        this.$msg.fail(res.data.msg)
        if (res.data.code === 301 || res.data.code === 302) return false
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('id', res.data.id)
        console.log(res)
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
