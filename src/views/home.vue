<template>
  <div
    class="home"
    v-if="category"
  >
    <Nav-bar></Nav-bar>
    <van-tabs
      v-model="active"
      sticky
      swipeable
      animated
    >
      <van-tab
        v-for="item in category"
        :key="item._id"
        :title="item.title"
      >
        <van-list
          v-model="item.loading"
          :finished="item.finished"
          finished-text="已经到底部了"
          @load="onLoad"
          :immediate-check="false"
        >
          <div class="detailparent">
            <Detail
              class="detailItem"
              :detailItem="categoryitem"
              v-for="(categoryitem,categoryindex) in item.list"
              :key="categoryindex"
            />
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import NavBar from '../components/common/NavBar'
import Detail from './Detail'
export default {
  data() {
    return {
      category: [],
      active: 0
    }
  },
  components: {
    NavBar,
    Detail
  },
  methods: {
    async categoryList() {
      const res = await this.$http.get('/category')
      this.changeCategory(res.data)
    },
    changeCategory(data) {
      const newCategory = data.map((item, index) => {
        item.list = []
        item.finished = false
        item.loading = false
        item.page = 0
        item.pageSize = 10
        return item
      })
      this.category = newCategory
      this.selectArticle()
    },
    async selectArticle() {
      const categoryitems = this.category[this.active]
      const res = await this.$http.get('/detail/' + categoryitems._id, { params: { page: categoryitems.page, pagesize: categoryitems.pageSize } })
      categoryitems.list.push(...res.data)
      categoryitems.loading = false
      if (res.data.length < categoryitems.pagesize) {
        categoryitems.finished = true
      }
    },
    onLoad() {
      const categoryitems = this.category[this.active]
      console.log(categoryitems)
      setTimeout(() => {
        categoryitems.page += 1
        this.selectArticle()
      }, 1000)
    }
  },
  watch: {
    active() {
      this.selectArticle()
    }
  },
  created() {
    this.categoryList()
  }
}
</script>

<style lang='stylus' scoped>
.home {
  background-color: white;
}

.detailparent {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  .detailItem {
    margin: 1.389vw 0;
    width: 45%;
  }
}
</style>
