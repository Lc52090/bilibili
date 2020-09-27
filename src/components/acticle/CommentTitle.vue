<template>
  <div class="comment">
    <p class="comment-title">
      <span>评论</span>
      <span>({{datelength}})</span>
    </p>
    <div class="commentMyinfo">
      <img
        :src="myUser.user_img"
        alt=""
        v-if="myUser"
      >
      <img
        src="../../assets/default_img.jpg"
        alt=""
        v-else
      >
      <input
        type="text"
        placeholder="想说点什么"
        ref="postipt"
        v-model="commentContent"
      >
      <button @click="comemntPublish">发表</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'commentTitle',
  data() {
    return {
      myUser: {},
      commentContent: ''
    }
  },
  props: ['datelength'],
  created() {
    if (localStorage.getItem('token')) {
      this.myUserinfo()
    }
  },
  methods: {
    async myUserinfo() {
      const res = await this.$http.get('/user/' + localStorage.getItem('id'))
      this.myUser = res.data[0]
    },
    comemntPublish() {
      if (this.myUser && !localStorage.getItem('token') && localStorage.getItem('id')) {
        this.msg.fail('请先登录')
        return false
      }
      this.$emit('Postcomment', this.commentContent)
      this.commentContent = ''
    },
    foucsipt() {
      this.$refs.postipt.focus()
    }
  }
}
</script>

<style lang='stylus' scoped>
.comment {
  padding: 8.333vw 2.778vw 0 2.778vw;

  .comment-title {
    >span {
      &:nth-of-type(2) {
        color: #aaa;
        padding-left: 2.778vw;
      }
    }
  }

  .commentMyinfo {
    padding: 2.778vw 0;
    display: flex;

    img {
      height: 8.333vw;
      width: 8.333vw;
      border-radius: 50%;
    }

    input {
      background-color: #f4f4f4;
      border-radius: 3.611vw;
      font-size: 3.333vw;
      padding: 0 5.556vw 0 4.167vw;
      margin-left: 2.778vw;
    }

    button {
      border-radius: 3.333vw;
      background: #fb7299;
      color: #ffffff;
      font-size: 3.333vw;
      padding: 0 2.778vw;
      margin-left: 4.167vw;
    }
  }
}
</style>
