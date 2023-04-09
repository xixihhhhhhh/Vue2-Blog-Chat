<template>
  <div class="content-area">
    <main class="site-main">
      <searchBlogsCard v-for="(item, index) in arr" :key="item.id" :id="item.id" :title="item.title"
        :time="item.created_at" />
      <Pagination :current-page.sync="currentPage" :page-size="PAGE_SIZE" :total="total" @current-change="onPageChange"
        class="pagination" />
    </main>
  </div>
</template>

<script>
import { selecttZipDownload } from '@/api/search'
import searchBlogsCard from './searchBlogCard.vue'
const PAGE_SIZE = 10
export default {
  async created() {
    this.PAGE_SIZE = PAGE_SIZE
    const res = await selecttZipDownload(this.$route.query.keywords)
    this.arrs = res.data.zipfiles
    this.total = res.data.total
    this.arr = this.arrs.slice(0, 10)
  },
  data() {
    return {
      arrs: [],
      arr: [],
      currentPage: 0,
      total: 100,
      scrollTop: 0,
    }
  },
  methods: {
    onPageChange(index) {
      this.arr = this.arrs.slice((index - 1) * 10, (index - 1) * 10 + 10)
      let timer = setInterval(() => {
        let ispeed = Math.floor(-this.scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop =
          this.scrollTop + ispeed
        if (this.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 160)
    }
  },
  components: { searchBlogsCard },
}
</script>

<style lang="scss" scoped>
.content-area {
  padding: 64px 10rem;
  min-height: 1000px;
  background-color: #f5f9f8;

  .site-main {
    width: 90%;
    min-height: 1000px;
    display: block;
    margin: 0 auto;
    background-color: #fff;
    padding-bottom: 100px;
  }

  .pagination {
    margin-top: 40px;
    text-align: center;
  }
}
</style>
