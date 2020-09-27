<template>
  <div class="userinfo" v-if="model">
    <Nav-bar />
    <img
      src="../assets/bannerTop_new.png"
      class="bckImg"
    >
    <User-detail :userInfo="model" />
    <User-article />
  </div>
</template>

<script>
import NavBar from '../components/common/NavBar'
import UserDetail from '../components/userComponent/userDetail'
import UserArticle from '../components/userComponent/userArticle'

export default {
  data() {
    return {
      model: {}
    }
  },
  components: {
    NavBar,
    UserDetail,
    UserArticle
  },
  methods: {
    async UserinfoData() {
      const res = await this.$http.get('/user/' + localStorage.getItem('id'))
      this.model = res.data[0]
    }
  },
  created() {
    this.UserinfoData()
  }
}
</script>

<style lang='stylus'>
.userinfo {
  .bckImg {
    height: 91px;
    width: 100%;
  }
}
</style>
