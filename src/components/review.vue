<template>
  <div>
    <Title>评论</Title>
    <div class="review-wrap">
      <div class="avatar">
        <img v-lazy="imgurl" />
      </div>
      <div class="input">
        <el-input
          type="textarea"
          :autosize="{ minRows: 3 }"
          placeholder="输入评论, ( Enter换行 ) "
          v-model="comment"
          :class="{ white: whiteFlag || submitFlag }"
          @focus="whiteFlag = true"
          @blur="whiteFlag = false"
        >
        </el-input>
      </div>
    </div>
    <div class="btnwrap" v-if="whiteFlag || submitFlag">
      <el-button type="primary" :disabled="!submitFlag" @click="sendComment"
        >发表评论</el-button
      >
    </div>
  </div>
</template>

<script>
import { getUserMsg } from '@/api/user'
import { createBlogComment } from '@/api/comment'

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  async created() {
    const res = await getUserMsg()
    this.imgurl = this.baseurl + res.data.user.Icon
  },
  data() {
    return {
      baseurl: 'http://icon.mgaronya.com/',
      imgurl: '',
      comment: '',
      whiteFlag: false,
    }
  },
  methods: {
    async sendComment() {
      const res = await createBlogComment(this.id, { content: this.comment })
      if (res.code === 200) {
        this.$emit('sendSuccess')
        this.comment = ''
        this.$bus.$emit('sendComment')
      }
    },
  },
  computed: {
    submitFlag() {
      return this.comment.length > 0
    },
  },
}
</script>

<style lang="scss" scoped>
.review-wrap {
  display: flex;
  padding: 0 10px;
  .avatar {
    @include img-wrap(40px);
    margin-right: 12px;

    img {
      border-radius: 50%;
    }
  }

  .input {
    flex: 1;
    height: 100px;
  }

  /deep/ .el-textarea__inner {
    background-color: #f3f3f5 !important;
  }
}

.btnwrap {
  margin-top: -10px;
  padding-right: 20px;
  display: flex;
  justify-content: flex-end;
}

.white {
  /deep/ .el-textarea__inner {
    background-color: #fff !important;
  }
}
</style>