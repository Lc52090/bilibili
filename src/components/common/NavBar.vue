<template>
  <div class="navbar">
    <div class="logo">
      <img
        src="../../assets/logo.png"
        @click="$router.push('/')"
      >
    </div>
    <div>
      <input placeholder="请输入搜索内容">
      <van-icon
        name="search"
        class="ipticon"
      />
    </div>
    <div>
      <div>
        <img
          :src="imgUrl"
          alt=""
          @click="$router.push('/userinfo')"
          v-if="imgUrl"
        >
        <img
          src="../../assets/default_img.jpg"
          @click="routerPush"
          v-else
        >
      </div>
      <p>下载APP</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgUrl: ''
    }
  },
  methods: {
    async UserinfoData() {
      const res = await this.$http.get('/user/' + localStorage.getItem('id'))
      this.imgUrl = res.data[0].user_img
    },
    routerPush() {
      if (localStorage.getItem('id') || localStorage.getItem('token')) {
        this.$router.push('/edit')
      } else {
        this.$router.push('/login')
      }
    }
  },
  mounted() {
    if (localStorage.getItem('token')) {
      this.UserinfoData()
    }
  }
}
</script>

<style lang='stylus' scoped>
.navbar {
  height: 12.5vw;
  background-color: white;
  display: flex;

  .logo {
    width: 25vw;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 80%;
    }
  }

  div:nth-child(2) {
    flex: 1;
    display: flex;
    align-items: center;
    margin: 0 1.389vw;
    position: relative;

    >input {
      font-size: 3.333vw;
      line-height: 7.222vw;
      height: 7.222vw;
      background-color: #f4f4f4;
      padding-left: 6.944vw;
      width: 90%;
      border-radius: 3.611vw;
      color: #aaa;
    }

    .ipticon {
      position: absolute;
      left: 2.778vw;
      top: 50%;
      transform: translateY(-50%);
      color: #aaa;
    }
  }

  div:nth-child(3) {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 6.667vw;
      height: 6.667vw;
      border-radius: 50%;
    }

    p {
      padding: 1.389vw 2.778vw;
      margin: 0 2.222vw;
      background-color: #fb7299;
      color: white;
      border-radius: 0.833vw;
      font-size: 3.611vw;
    }
  }
}
</style>
