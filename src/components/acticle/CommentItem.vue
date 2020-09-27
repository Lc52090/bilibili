<template>
  <div class="commentItems">
    <div
      class="commentItem"
      v-for="(item,index) in commentChild"
      :key="index"
    >
      <!-- 评论id头像 -->
      <div class="userimg">
        <img
          :src="item.userinfo.user_img"
          alt=""
          v-if="item.userinfo"
        >
        <img
          src="../../assets/default_img.jpg"
          alt=""
          v-else
        >
        <!-- 评论id信息 -->
        <p>
          <span v-if="item.userinfo">{{item.userinfo.name}}</span>
          <span v-else>游客</span>
          <span>{{item.comment_date}}</span>
        </p>
      </div>
      <div class="commentContent">
        <!-- 评论 -->
        <div v-if="!temp">回复 {{item.comment_content}} <span
            class="publish"
            @click="PostItemcomment(item.comment_id)"
          >回复</span> :{{item.content}}</div>
        <!-- 评论 -->
        <div v-else>回复 <span style="color:#478ef0">{{item.parent_user_info.name}}</span> :{{item.comment_content}}
          <span
            class="publish"
            @click="PostItemcomment(item.comment_id)"
          >回复</span>
        </div>
      </div>
      <commentchild-item
        :commentChild="item.child"
        :temp="true"
        @postChild="postChild"
      ></commentchild-item>
    </div>
  </div>
</template>

<script>
export default {
  name: 'commentchildItem',
  props: ['commentChild', 'temp'],
  methods: {
    PostItemcomment(id) {
      this.$emit('postChild', id)
      this.$emit('PostPublish', id)
    },
    postChild(id) {
      this.PostItemcomment(id)
      this.$emit('PostPublish', id)
    }
  }
}
</script>

<style lang='stylus' scoped>
.commentItems {
  .commentItem {
    display: flex;
    flex-direction: column;

    .userimg {
      display: flex;

      img {
        margin: 0 1.389vw 2.778vw 0;
      }

      p {
        flex: 1;
        font-size: 3.611vw;
        color: #555;
        display: flex;
        justify-content: space-between;
        margin-bottom: 1.389vw;
      }
    }

    .commentContent {
      position: relative;
      margin-bottom: 2.778vw;

      .publish {
        position: absolute;
        right: 15px;
        color: red;
      }
    }
  }
}
</style>
