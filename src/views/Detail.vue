<template>
  <div
    @click="pathPush"
    v-if="detailItem"
  >
    <div class="detailItem">
      <div class="imgparent">
        <img
          :src="detailItem.img"
          alt=""
          style="width:100%;height:27.778vw;"
        >
        <div class="bottom">
          <div class="icon-play2"><span class="video">1233</span></div>
          <div class="icon-file-text"> <span class="comment">{{!detailItem.commentlen ? 66 : detailItem.commentlen}}</span> </div>
        </div>
      </div>
      <p>{{detailItem.name}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['detailItem'],
  methods: {
    pathPush() {
      if (this.$route.path !== `/article/${this.detailItem.id}`) {
        this.$router.push(`/article/${this.detailItem.id}`)
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.detailItem {
  p {
    font-size: 3.333vw;
    padding: 0.833vw 0;
  }

  .imgparent {
    position: relative;

    .bottom {
      padding: 0 2.778vw;
      margin-bottom: 1.389vw;
      position: absolute;
      bottom: 0.556vw;
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.85), transparent);
      justify-content: space-between;
      color: white;
      display: flex;
      left: 0;
      right: 0;
    }
  }
}
</style>
