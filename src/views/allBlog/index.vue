<template>
  <div class="allBlog-container">
    <div class="blog-list">
      <header class="entry-header">
        <span class="entry-title">所有博客</span>
      </header>
      <div class="entry-content">
        <div class="desc">
          <span>不确定博客是否收录？ 可以输入关键字尝试进行查找！</span>
          <div class="keywords">
            <el-input v-model="keywords" placeholder="请输入关键字" class="input" autofocus ref="ipt"></el-input>
            <el-button type="primary" @click="select()">确认</el-button>
          </div>
          <div class="blog-cards">
            <Blogcard v-for="(blog, index) in blogList" :key="blog.id" :colorId="index" :title="blog.title"
              :time="blog.created_at" :blogId="blog.id" :userId="blog.user_id" />
          </div>
          <div class="page">
            <el-pagination @current-change="pageChange" background layout="prev, pager, next" :total="total"
              :page-size="20">
            </el-pagination>
          </div>
        </div>
        <FileRanking :files="files" title="文件热度排行" />
      </div>
    </div>
  </div>
</template>

<script>
import Blogcard from './blogcard.vue'
import { getFrontFileList, getOneZipMsg, getFrontFilePic } from '@/api/blog.js'
import { getHotBlogs, getBolgVisitCount } from '@/api/hot.js'
import FileRanking from '../../components/FileRanking.vue'
export default {
  components: {
    Blogcard,
    FileRanking
  },
  async mounted() {
    this.GetFrontFileList()
    this.$refs.ipt.focus()
    const res = await getHotBlogs(this.blogParams)
    // console.log(res)
    res.data.zipfiles.forEach(async item => {
      const res1 = await getOneZipMsg(item.Member)
      const res2 = await getFrontFilePic(item.Member)
      const res3 = await getBolgVisitCount(item.Member)
      console.log(res2)
      this.files.push({
        name: res1.data.file.title,
        imgUrl: this.baseurl + res2.data.fileImgs[0].id + res2.data.fileImgs[0].ext,
        created_at: res2.data.fileImgs[0].created_at,
        views: res3.data.views,
        id: item.Member,
        scores: item.Score
      })
    })
  },
  data() {
    return {
      baseurl: 'http://fileimg.mgaronya.com/',
      keywords: '',
      blogList: [],
      total: 0,
      pageParams: {
        pageNum: 1,
        pageSize: 20,
      },
      blogParams: {
        pageNum: 1,
        pageSize: 20,
      },
      scrollTop: 0,
      files: []
    }
  },
  methods: {
    async select() {
      if (!this.keywords) {
        return this.$message.error('关键词不能为空 !')
      }
      this.$router.push({
        path: '/searchBlogs',
        query: {
          keywords: this.keywords,
        },
      })
    },
    async GetFrontFileList(params = this.pageParams) {
      const res = await getFrontFileList(params)
      this.total = res.data.total
      this.blogList = res.data.files
      // console.log(res)
    },
    pageChange(e) {
      this.pageParams.pageNum = e
      this.GetFrontFileList(this.pageParams)
      let timer = setInterval(() => {
        let ispeed = Math.floor(-this.scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop =
          this.scrollTop + ispeed
        if (this.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 160)
    },
  },
}
</script>

<style scoped lang="scss">
.allBlog-container {
  background-color: #f5f9f8;
  font-family: Georgia, 'Times New Roman', Times, serif;
  padding-top: 60px;

  .blog-list {
    width: 80%;
    height: 1000px;
    box-sizing: border-box;
    padding: 60px 0 0 60px;
    margin: 0 auto;
    background-color: #fff;

    .entry-header {
      .entry-title {
        color: #272727;
        font: 36px fontcn, sans-serif;
        margin: 0 0 20px;
        font-weight: 300;
      }
    }

    .entry-content {
      margin-top: 15px;
      display: flex;


      .desc {
        flex: 1;
        .keywords {
          display: flex;
          margin: 20px 0;

          .input {
            width: 40%;
            margin-right: 20px;
          }
        }

        .blog-cards {
          display: flex;
          flex-wrap: wrap;
        }

        .page {
          display: flex;
          margin: 20px 0;
          justify-content: center;
        }
      }
    }
  }
}
</style>
