<template>
  <div v-if="model">
    <Nav-bar></Nav-bar>
    <div class="detailinfo">
      <div class="video">
        <video
          :src="model.content"
          controls="controls"
        ></video>
      </div>
      <!-- 视频信息介绍 -->
      <div
        class="detailinfoText"
        v-if="model.category"
      >
        <div>
          <span>{{model.category.title}}</span>
          <span>{{model.name}}</span>
        </div>
        <div>
          <span>{{model.userinfo.name}}</span>
          <span>141.4万次观看</span>
          <span>5218弹幕</span>
          <span>{{model.date}}</span>
        </div>
        <div>
          <p
            @click="collectionClick"
            :class="{activeColor:collectionActive}"
          >
            <span class="icon-star-full"></span>
            <span>收藏</span>
          </p>
          <p
            @click="subscriptClick"
            :class="{activeColor:subscriptActive}"
          >
            <span class="icon-box-add"></span>
            <span>缓存</span>
          </p>
          <p>
            <span class="icon-redo2"></span>
            <span>分享</span>
          </p>
        </div>
      </div>
      <!-- 随机视频信息 -->
      <div class="detailparent">
        <Detail
          v-for="(item, index) in commendlist"
          :key="index"
          :detailItem="item"
          class="detailitem"
        />
      </div>
      <!-- 评论块 -->
      <Comment-title
        :datelength="lens"
        @Postcomment="PostSuccess"
        ref="commentipt"
      ></Comment-title>
      <Comment
        @lengthselect="len => lens = len"
        @publishClick="PostChildClick"
        ref="commentPublish"
      />
    </div>
  </div>
</template>

<script>
import NavBar from '../components/common/NavBar'
import Detail from './Detail'
import CommentTitle from '../components/acticle/CommentTitle'
import Comment from '../components/acticle/comment'

export default {
  name: 'Article',
  data() {
    return {
      model: {},
      commendlist: [],
      myUser: [],
      lens: '',
      Postcom: {
        comment_content: '',
        comment_date: '',
        parent_id: null,
        article_id: null
      },
      collectionActive: false,
      subscriptActive: false
    }
  },
  components: {
    NavBar,
    Detail,
    CommentTitle,
    Comment
  },
  methods: {
    async getArticleList() {
      const res = await this.$http.get('/article/' + this.$route.params.id)
      this.model = res.data[0]
    },
    async commend() {
      const res = await this.$http.get('/commend')
      this.commendlist = res.data
    },
    // 发送评论
    async PostSuccess(res) {
      // 时间过滤
      const date = new Date()
      let m = date.getMonth() + 1
      let d = date.getDate()
      if (m < 10) {
        m = '0' + m
      }
      if (d < 10) {
        d = '0' + d
      }
      const str = `${m}-${d}`
      this.Postcom.comment_content = res
      this.Postcom.comment_date = str
      this.Postcom.article_id = this.$route.params.id
      const result = await this.$http.post('/comment_post/' + localStorage.getItem('id'), this.Postcom)
      this.$refs.commentPublish.CommentData()
      this.Postcom.parent_id = null
      if (result.status === 200) {
        this.$msg.fail('评论发表成功')
      }
    },
    // 接收id
    PostChildClick(id) {
      this.Postcom.parent_id = id
      this.$refs.commentipt.foucsipt()
    },
    // 收藏
    async collectionClick() {
      if (localStorage.getItem('token')) {
        const res = await this.$http.post('/collection/' + localStorage.getItem('id'), { article_id: this.$route.params.id })
        if (res.data.msg === '收藏成功') {
          this.collectionActive = true
        } else {
          this.collectionActive = false
        }
        this.$msg.fail(res.data.msg)
      }
    },
    // 进入页面获取是否收藏
    async collectionInit() {
      if (localStorage.getItem('token')) {
        const res = await this.$http.get('/collection/' + localStorage.getItem('id'), { params: { article_id: this.$route.params.id } })
        this.collectionActive = res.data.success
      }
    },
    // 点击关注发帖用户
    async subscriptClick() {
      if (localStorage.getItem('token')) {
        const res = await this.$http.post('/sub_scription/' + localStorage.getItem('id'), { sub_id: this.model.userid })
        if (res.data.msg === '关注成功') {
          this.subscriptActive = true
        } else {
          this.subscriptActive = false
        }
        this.$msg.fail(res.data.msg)
      }
    }
  },
  created() {
    this.getArticleList()
    this.commend()
    this.collectionInit()
  },
  watch: {
    $route() {
      this.getArticleList()
      this.commend()
      this.collectionInit()
    }
  }
}
</script>

<style lang='stylus' scoped>
.detailinfo {
  .video {
    width: 100%;

    video {
      width: 100%;
    }
  }
}

.detailinfoText {
  padding: 4.167vw;
  background-color: white;

  div:nth-of-type(1) {
    span:nth-of-type(1) {
      padding-right: 3vw;
      color: #fb7299;
      background-color: #f4f4f4;
      border-radius: 2.778vw;
    }

    span:nth-of-type(2  ) {
      padding: 0 2.778vw;
      background-color: #f4f4f4;
      border-radius: 2.778vw;
    }
  }

  div:nth-of-type(2) {
    padding: 2.778vw 2.778vw;
    padding-left: 0;

    span {
      color: #aaa;
      font-size: 3.333vw;
      margin-right: 2.778vw;
    }

    span:nth-of-type(1) {
      color: black;
      font-size: 4vw;
      padding-right: 2.778vw;
    }
  }

  div:nth-of-type(3) {
    padding: 0 2.778vw;
    display: flex;

    p {
      margin-right: 2.778vw;
      display: flex;
      align-items: center;
      color: #757575;

      span:nth-of-type(1) {
        margin-right: 0.833vw;
        font-size: 5.833vw;
      }

      span:nth-of-type(2) {
        font-size: 3.611vw;
      }
    }

    .activeColor {
      color: #fb7299;
    }
  }
}

.detailparent {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  .detailitem {
    margin: 1.389vw 0;
    width: 45%;
  }
}
</style>
