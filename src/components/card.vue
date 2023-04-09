<template>
  <div class="horizontal-card">
    <div class="chosebtn">
      <el-checkbox-button v-model="choseChecked" @change="onClick">选中</el-checkbox-button>
    </div>
    <div class="img-wrap">
      <img :src="imgsrc" alt="" />
    </div>
    <div class="content">
      <div class="title">{{ title }}</div>
      <div class="time">{{ time }}</div>
    </div>
    <div class="deletebtn">
      <el-button v-model="dleteChecked" @click="deleteCilck">删除</el-button>
    </div>
    <div class="deletebtn">
      <el-button v-model="dleteChecked" type="primary"
        @click="$router.push({ name: 'upbateBlog', params: { id } })">修改</el-button>
    </div>
    <div class="like">{{ likeCount }}人点赞</div>
    <div class="comment">{{ commentCount }}人评论</div>
    <div class="collect">{{ collectCount }}人收藏</div>
  </div>
</template>

<script>
import { getOneZipMsg, getFrontFilePic } from '@/api/blog.js'
import { fileLikeList } from '@/api/like'
import { getBlogComment } from '@/api/comment'
import { fileCollectList } from '@/api/collect'
export default {
  name: 'Card',
  async created() {
    const { data } = await fileLikeList(this.id)
    const res = await getBlogComment(this.id)
    const res1 = await fileCollectList(this.id)
    this.likeCount = data.total
    this.commentCount = res.data.total
    this.collectCount = res1.data.total
  },
  data: () => ({
    title: '',
    time: '',
    imgsrc: '',
    baseurl: 'http://fileimg.mgaronya.com/',
    choseChecked: false,
    dleteChecked: false,
    likeCount: 0,
    commentCount: 0,
    collectCount: 0
  }),
  methods: {
    onClick() {
      this.$emit('choseClick', {
        id: this.id,
        flag: this.choseChecked,
      })
    },
    deleteCilck() {
      this.$emit('deleteClick', this.id)
    },
    async GetBlogMsg() {
      const res = await getOneZipMsg(this.id)
      this.title = res.data.file.title
      this.time = res.data.file.created_at
      const data = await getFrontFilePic(this.id)
      this.imgsrc =
        this.baseurl + data.data.fileImgs[0].id + data.data.fileImgs[0].ext
    },
  },
  mounted() {
    this.GetBlogMsg()
  },
  props: ['id'],
}
</script>

<style lang="scss" scoped>
.horizontal-card {
  width: 100%;
  height: 80px;
  display: flex;
  padding: 0 4px;
  cursor: pointer;
  margin-right: 60px;
  margin-top: 20px;
  margin-left: 20px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px,
    rgb(209, 213, 219) 0px 0px 0px 1px inset;

  &:hover {
    background: #f5f5f5;
  }

  .chosebtn {
    display: flex;
    align-items: center;
    margin: 0 10px;
  }

  .deletebtn {
    display: flex;
    align-items: center;
    margin: 0 20px;
  }

  .img-wrap {
    margin: auto 0;
    position: relative;
    @include img-wrap(70px);

    img {
      border-radius: 4px;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 20px;
    overflow: hidden;

    .title {
      margin-bottom: 4px;
      font-size: 18px;
      @include text-ellipsis();
    }

    .time {
      font-size: 13px;
      color: gray;
      margin-top: 10px;
      @include text-ellipsis();
    }
  }

  .like {
    text-align: center;
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
  }

  .comment {
    text-align: center;
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
  }

  .collect {
    text-align: center;
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
  }
}
</style>
