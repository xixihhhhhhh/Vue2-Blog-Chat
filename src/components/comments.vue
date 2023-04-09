<template>
  <div class="comment">
    <template v-if="loading">
      <Loading :loading="loading" />
    </template>
    <template v-else>
      <Review :id="id" @sendSuccess="getComment()" />
      <div class="block" v-if="shouldCommentShow">
        <p class="title" ref="commentTitle">
          最新评论
          <span class="count">({{ total }})</span>
        </p>
        <Comment
          :border="$utils.isLast(index, comments)"
          :comment="comment"
          :key="comment.id"
          v-for="(comment, index) in comments"
        />
      </div>
      <Pagination
        :current-page.sync="currentPage"
        :page-size="PAGE_SIZE"
        :total="total"
        @current-change="onPageChange"
        class="pagination"
      />
    </template>
    <el-empty
      description="还没有评论哦~"
      v-if="!loading && !shouldCommentShow"
    ></el-empty>
  </div>
</template>

<script type="text/ecmascript-6">
import { getBlogComment } from '@/api/comment.js'
import { scrollInto } from '@/utils'
import Comment from './comment'
import Review from './review'

const PAGE_SIZE = 20
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  async created() {
    this.PAGE_SIZE = PAGE_SIZE
    this.getComment()
  },
  data() {
    return {
      loading: false,
      comments: [],
      total: 0,
      currentPage: 1,
    }
  },
  methods: {
    async getComment() {
      const res = await getBlogComment(this.id)
      this.comments = res.data.comments
      this.total = this.comments.length
    },
    async onPageChange() {
      await this.getComment()
      this.$nextTick(() => {
        scrollInto(this.$refs.commentTitle)
      })
    },
  },
  computed: {
    shouldCommentShow() {
      return this.comments.length > 0
    },
  },
  components: {
    Comment,
    Review,
  },
}
</script>

<style lang="scss" scoped>
.block {
  margin-bottom: 48px;

  .title {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 4px;

    .count {
      font-size: 14px;
    }
  }
}

.pagination {
  text-align: right;
}
</style>
