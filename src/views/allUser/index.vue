<template>
  <div class="allBlog-container">
    <div class="blog-list">
      <header class="entry-header">
        <span class="entry-title">所有用户</span>
      </header>
      <div class="entry-content">
        <div class="desc">
          <span>不确定用户是否存在? 可以输入用户名或者邮箱尝试进行查找！</span>
          <div class="keywords">
            <el-input v-model.trim="keywords" placeholder="请输入用户名或者邮箱" class="input" ref="ipt"
              @keyup.enter.native="select()"></el-input>
            <el-button type="primary" @click="select()">确认</el-button>
          </div>
          <div class="blog-cards">
            <userCard :colorId="index" :userName="name" :Email="Email" :background="background" :userId="userId"
              v-if="name" />
          </div>
        </div>
        <div class="fileRecommend">
          <FileRanking :files="files" title="前端文件推荐" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userCard from './userCard.vue'
import { getOneZipMsg, getFrontFilePic } from '@/api/blog.js'
import { searchFriendByName, searchFriendByEmail } from '@/api/search'
import { debounce } from "@/utils"
import { getBlogsRecommend, getBolgVisitCount } from '@/api/hot'
import FileRanking from '@/components/FileRanking'
const reg = /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/
export default {
  components: {
    userCard,
    FileRanking
  },
  mounted() {
    this.$refs.ipt.focus()
  },
  async created() {
    const res = await getBlogsRecommend()
    res.data.zipfiles.forEach(async item => {
      const res1 = await getOneZipMsg(item)
      const res2 = await getFrontFilePic(item)
      const res3 = await getBolgVisitCount(item)
      this.files.push({
        name: res1.data.file.title,
        imgUrl: this.baseurl + res2.data.fileImgs[0].id + res2.data.fileImgs[0].ext,
        created_at: res2.data.fileImgs[0].created_at,
        views: res3.data.views,
        id: item.Member
      })
    })
  },
  data() {
    return {
      baseurl: 'http://fileimg.mgaronya.com/',
      keywords: 'mgAronya',
      name: '',
      Email: '',
      background: '',
      userId: 0,
      files: []
    }
  },
  methods: {
    select: debounce(async function () {
      let res = {}
      if (!this.keywords) {
        return this.$message.error('搜素内容不能为空')
      }
      if (reg.test(this.keywords)) {
        res = await searchFriendByEmail(this.keywords)
      } else {
        res = await searchFriendByName(this.keywords)
      }
      if (res.code === 200) {
        console.log(res);
        this.name = res.data.user.Name
        this.Email = res.data.user.Email
        this.background = res.data.user.Icon
        this.userId = res.data.user.ID
        return this.$message.success(res.msg)
      }
      if (res.code === 400) {
        return this.$message.error(res.msg)
      }
    }, 500),
  },
  computed: {
    index() {
      return Math.round(Math.random() * 6);
    }
  }
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
        flex: 3;
        .keywords {
          display: flex;
          margin: 20px 0;
          .input {
            width: 60%;
            margin-right: 20px;
          }
        }
      }
      .fileRecommend {
        flex: 1;
      }
    }
  }
}
</style>