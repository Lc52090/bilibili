<template>
  <!-- 编辑个人资料 -->
  <div
    v-if="model"
    class="editViews"
  >
    <div style="margin-bottom:2.778vw">
      <Nav-bar></Nav-bar>
    </div>
    <!-- 头像设置 -->
    <div class="uploadfile">
      <!-- 点击更换头像 -->
      <van-uploader
        :after-read="afterRead"
        class="uploadimg"
        preview-size="100vw"
      />
      <!-- 头像设置 -->
      <Edit-name left="头像">
        <img
          :src="model.user_img"
          alt=""
          slot="right"
          v-if="model.user_img"
        >
        <img
          src="../assets/default_img.jpg"
          alt=""
          slot="right"
          v-else
        >
      </Edit-name>
    </div>
    <!-- 昵称设置 -->
    <Edit-name
      left="昵称"
      @bannerClick="show = true"
    >
      <a
        href="javascript:;"
        slot="right"
      >{{model.name}}</a>
    </Edit-name>
    <!-- 帐号设置 -->
    <Edit-name left="帐号">
      <a
        href="javascript:;"
        slot="right"
      >{{model.username}}</a>
    </Edit-name>
    <!-- 性别设置 -->
    <Edit-name
      left="性别"
      @bannerClick="sexshow = true"
    >
      <a
        href="javascript:;"
        slot="right"
      >
        {{model.gender == 1 ? '男' : '女'}}
      </a>
    </Edit-name>
    <!-- 个性签名设置 -->
    <Edit-name
      left="个签"
      @bannerClick="textshow = true"
    >
      <a
        href="javascript:;"
        slot="right"
      >{{model.user_desc}}</a>
    </Edit-name>
    <!-- 昵称弹出框设置 -->
    <van-dialog
      v-model="show"
      title="昵称"
      show-cancel-button
      @confirm="confirmClick"
      @cancel="content = '' "
    >
      <van-field
        v-model="content"
        placeholder="请输入用户名"
        autofocus
      />
    </van-dialog>
    <!-- 个性签名设置 -->
    <van-dialog
      v-model="textshow"
      title="个性签名"
      show-cancel-button
      @confirm="confirmtextClick"
      @cancel="content = '' "
    >
      <van-field
        v-model="content"
        type="textarea"
        placeholder="编辑个性签名"
        autofocus
      />
    </van-dialog>
    <!-- 性别设置动作面板 -->
    <van-action-sheet
      v-model="sexshow"
      :actions="actions"
      @select="onSelect"
      cancel-text="取消"
    />
    <!-- 返回个人中心 -->
    <div
      class="editback"
      @click="$router.back()"
    >返回个人中心</div>
  </div>
</template>

<script>
import NavBar from '../components/common/NavBar'
import EditName from '../components/common/editName'

export default {
  data() {
    return {
      model: {},
      show: false,
      content: '',
      textshow: false,
      sexshow: false,
      actions: [
        { name: '男', value: 1 },
        { name: '女', value: 0 }
      ]
    }
  },
  components: {
    NavBar,
    EditName
  },
  methods: {
    async getUserlist() {
      const res = await this.$http.get('/user/' + localStorage.getItem('id'))
      this.model = res.data[0]
    },
    async afterRead(val) {
      const formData = new FormData()
      formData.append('file', val.file)
      const res = await this.$http.post('/upload', formData)
      console.log(res)
      this.model.user_img = res.data.url
      this.Userupdata()
    },
    async Userupdata() {
      const res = await this.$http.post('/update/' + localStorage.getItem('id'), this.model)
    },
    confirmClick() {
      this.model.name = this.content
      this.Userupdata()
      this.content = ''
    },
    confirmtextClick() {
      this.model.user_desc = this.content
      this.Userupdata()
      this.content = ''
    },
    onSelect(sex) {
      console.log(sex)
      this.model.gender = sex.value
      this.Userupdata()
      this.sexshow = false
    }
  },
  created() {
    this.getUserlist()
  }
}
</script>

<style lang='stylus' scoped>
a {
  color: #000;
}

img {
  height: 12.778vw;
  width: 12.778vw;
  border-radius: 50%;
}

.uploadfile {
  position: relative;
  overflow: hidden;

  .uploadimg {
    opacity: 0;
    position: absolute;
  }
}

.editback {
  margin-top: 5.556vw;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  color: #999;
  padding: 4.167vw 0;
  font-size: 4vw;
}
</style>
