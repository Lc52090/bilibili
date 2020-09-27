<template>
  <div class="commentParent">
    <div
      v-for="(item,index) in commentList"
      :key="index"
    >
      <div class="commentItem">
        <!-- 评论id头像 -->
        <div class="userimg">
          <img
            :src="item.userinfo.user_img"
            alt=""
            v-if="item.userinfo.user_img"
          >
          <img
            src="../../assets/default_img.jpg"
            alt=""
            v-else
          >
        </div>
        <div class="commentContent">
          <!-- 评论id信息 -->
          <p>
            <span v-if="item.userinfo">{{item.userinfo.name}}</span>
            <span v-else>游客</span>
            <span>{{item.comment_date}}</span>
          </p>
          <!-- 评论 -->
          <div>
            {{item.comment_content}}
            <span
              class="publishes"
              @click="publishClick(item.comment_id)"
            >回复</span>
          </div>
        </div>
      </div>
      <div style="padding-left:8.333vw;">
        <comment-item :commentChild="item.child" @PostPublish="publishClick"></comment-item>
      </div>
    </div>
  </div>
</template>

<script>
import CommentItem from './CommentItem'
export default {
  name: 'comment',
  data() {
    return {
      commentList: []
    }
  },
  created() {
    this.CommentData()
  },
  components: {
    CommentItem
  },
  methods: {
    async CommentData() {
      const res = await this.$http.get('/comment/' + this.$route.params.id)
      if (res.data) {
        this.$emit('lengthselect', res.data.length)
      }
      this.commentList = this.changeCommentData(res.data)
    },
    changeCommentData(data) {
      function fn(temp) {
        const arr1 = []
        for (var i = 0; i < data.length; i++) {
          if (data[i].parent_id === temp) {
            arr1.push(data[i])
            data[i].child = fn(data[i].comment_id)
          }
        }
        return arr1
      }
      return fn(null)
    },
    publishClick(id) {
      this.$emit('publishClick', id)
    }
  }
}
</script>

<style lang='stylus'>
.commentParent {
  padding: 2.778vw 2.778vw;

  >div {
    border-bottom: 0.278vw solid #e7e7e7;

    .commentItem {
      display: flex;
      padding: 2.778vw 2.778vw;

      .userimg {
        margin-right: 2.778vw;

        img {
          height: 9.722vw;
          width: 9.722vw;
          border-radius: 50%;
        }
      }

      .commentContent {
        flex: 1;
        position: relative;

        p {
          font-size: 3.611vw;
          color: #555;
          display: flex;
          justify-content: space-between;
          margin-bottom: 1.389vw;
        }

        >div {
          font-size: 3.611vw;
        }

        .publishes {
          position: absolute;
          right: 0;
          color: red;
        }
      }
    }
  }
}
</style>
