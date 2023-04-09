<template>
  <div class="blog-container">
    <div class="blogList" v-for="item in cardMsg" :key="item.id">
      <card
        :id="item.id"
        @choseClick="getBlogId"
        @deleteClick="deleteBlog"
      ></card>
    </div>
    <div class="page">
      <el-pagination
        @current-change="pageChange"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="5"
      >
      </el-pagination>
    </div>
    <div class="choseBtn">
      <el-button type="primary" @click="choseBlog"
        >选中文件作为博客主页</el-button
      >
      <el-button type="primary" @click="gotoBlogIntro"
        >进入博客描述主页</el-button
      >
      <el-button type="primary" @click="gotoBlog()">进入选中博客主页</el-button>
    </div>
    <el-dialog title="确定删除" :visible.sync="dialogVisible" width="30%">
      <span>确定删除前端文件吗 ?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogDel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserZipfiles,
  choseHomePage,
  deleteOneZip,
  getOneZipMsg,
} from '@/api/blog.js'
import { upbateUser, getUserMsg } from '@/api/user.js'
import card from '@/components/card'
export default {
  data() {
    return {
      cardMsg: [],
      blogUrl: 'http://blog_usr.mgaronya.com/',
      params: {
        pageNum: 1,
        pageSize: 5,
      },
      ids: [],
      id: '',
      total: 0,
      dialogVisible: false,
      userForm: {
        Newname: '',
        Newblog: '',
        Newqq: '',
        Newsex: '',
        Newemail: '',
        Newaddress: '',
        Newtelephone: '',
        Newhobby: '',
      },
    }
  },
  mounted() {
    this.GetUserZipfiles()
  },
  created() {
    this.GetUserMsg()
  },
  components: { card },
  methods: {
    gotoBlog() {
      window.location.replace(
        this.blogUrl + this.userForm.Newname + this.userForm.Newblog
      )
    },
    pageChange(e) {
      this.params.pageNum = e
      this.GetUserZipfiles()
    },
    async GetUserMsg() {
      const res = await getUserMsg()
      this.userForm.Newname = res.data.user.Name
      this.userForm.Newemail = res.data.user.Email
      this.userForm.Newtelephone = res.data.user.Telephone
      this.userForm.Newqq = res.data.user.QQ
      this.userForm.Newsex = res.data.user.Sex
      this.userForm.Newaddress = res.data.user.Address
      this.userForm.Newhobby = res.data.user.Hobby
      this.userForm.Newblog = res.data.user.Blog
    },
    async GetUserZipfiles() {
      const res = await getUserZipfiles(this.params)
      this.cardMsg = res.data.files
      this.total = res.data.total
    },
    async choseBlog() {
      if (this.ids.length > 1)
        return this.$message.error('只能选择一个前端文件作为博客主页 !')
      if (this.ids.length < 1)
        return this.$message.error('请选择一个前端文件作为博客主页 !')
      const res = await choseHomePage(this.ids[0])
      const res1 = await getOneZipMsg(this.ids[0])
      this.userForm.Newblog = res1.data.file.res_short
      await upbateUser(this.userForm)
      if (res.code === 200) {
        this.id = this.ids[0]
        return this.$message.success('选择前端文件成功 !')
      }
    },
    getBlogId(e) {
      if (e.flag) {
        this.ids.push(e.id)
      } else {
        this.ids = this.ids.filter((id) => id !== e.id)
      }
    },
    async deleteBlog(e) {
      this.id = e
      this.dialogVisible = true
    },
    async dialogDel() {
      const res = await deleteOneZip(this.id)
      if (res.code === 200) {
        this.dialogVisible = false
        this.GetUserZipfiles()
        this.$message.success('删除前端文件成功 !')
      }
    },
    gotoBlogIntro() {
      if (this.id) {
        this.$router.push({ name: 'blogShow', params: { id: this.id } })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.blog-container {
  position: relative;

  .blogList {
    width: 90%;
    display: inline-flex;
  }
  .page {
    width: 50%;
    margin-top: 20px;
    text-align: right;
  }
  .choseBtn {
    width: 600px;
    height: 40px;
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
