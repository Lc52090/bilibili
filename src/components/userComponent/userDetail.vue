<template>
  <div class="userdetail">
    <div>
      <div class="userimg">
        <img
          :src="userInfo.user_img"
          alt=""
          v-if="userInfo.user_img"
        >
        <img
          src="@/assets/default_img.jpg"
          alt
          v-else
        />
      </div>

      <div class="useredit">
        <div>
          <p>
            <span>0</span>
            <span class="usetext">粉丝</span>
          </p>
          <p>
            <span>54</span>
            <span class="usetext">关注</span>
          </p>
          <p>
            <span>0</span>
            <span class="usetext">获赞</span>
          </p>
        </div>
        <div @click="$router.push('/edit')">
          <div class="usereditBtn">编辑资料</div>
        </div>
      </div>
    </div>
    <div>
      <h2>小风__</h2>
      <p>这个人很神秘，什么也没有留下</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['userInfo']
}
</script>

<style lang='stylus' scoped>
.userdetail {
  background-color: white;
  padding: 0 12px;

  >div:nth-child(2) {
    h2 {
      margin: 10px 0 3px 0;
      font-weight: bold;
    }

    p {
      padding: 5px 0;
      margin: 10px 0;
      color: #999;
    }
  }

  >div:nth-child(1) {
    display: flex;
  }

  .userimg {
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      height: 85px;
      width: 85px;
      border-radius: 50%;
    }
  }

  .useredit {
    flex: 1;
    display: flex;
    flex-direction: column;

    >div:nth-child(1) {
      display: flex;

      p {
        display: flex;
        margin: 10px;
        flex: 1;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        font-size: 13px;

        .usetext {
          color: #ccc;
        }
      }

      p:nth-child(1), p:nth-child(2) {
        border-right: 1px solid #ccc;
      }
    }

    >div:nth-child(2) {
      width: 100%;
      flex: 1;

      .usereditBtn {
        box-sizing: border-box;
        border: 1px solid #fb7a9f;
        height: 85%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fb7a9f;
        border-radius: 8px;
      }
    }
  }
}
</style>
