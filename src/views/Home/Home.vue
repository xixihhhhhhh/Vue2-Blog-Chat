<template>
  <div class="home-container">
    <div class="bgc">
      <img v-lazy="'http://img.mgaronya.com/d5777b1f-75e4-4265-9e72-e5698b59fd8d.jpg'" />
      <Login v-if="loginFlag" @close="closeLogin"></Login>
      <div v-else @click="uploadFile">上传文件</div>
    </div>
    <floor title="1F 友情特约博客" />
    <div class="blog-list">
      <ul>
        <li v-for="file in fileList" :key="file.name">
          <blogcard :file="file" />
        </li>
      </ul>
    </div>
    <floor title="2F 友情特约用户" />
    <div class="blog-list">
      <ul>
        <li v-for="user in userList" :key="user.name">
          <userCard :user="user" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getFrontFilePic, getOneZipMsg } from '@/api/blog.js'
import { getBlogsRecommend, getUsers } from '@/api/hot.js'
import { getUserList } from '@/api/user.js'
import Login from './Login'
import blogcard from '../../components/blogCard.vue'
import floor from './floor.vue'
import userCard from './userCard.vue'
export default {
  name: 'Home',
  data() {
    return {
      loginFlag: false,
      fileList: [],
      userList: [],
      isTouchTop: true,
      scrollTop: 0,
      bgcurl: 'https://chuanasirenzu207804-1317470869.cos.ap-guangzhou.myqcloud.com/wegame/bgc1.jpg',
    }
  },
  methods: {
    closeLogin() {
      this.loginFlag = false
    },
    // 获取页面滚动距离
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      if (scrollTop > 0) {
        this.$store.commit('changeTouchTop', false)
      }
      if (scrollTop === 0) {
        this.$store.commit('changeTouchTop', true)
      }
    },
    uploadFile() {
      if (!this.$store.state.isLogin) {
        return this.$message.error('请先登录')
      }
      this.$router.push('/submitFrontFile')
    },
    login() {
      this.loginFlag = true
    },
    async GetFrontFileList() {
      const res = await getBlogsRecommend({ pageNum: 1, pageSize: 59 })
      for (let i = 0; i < res.data.zipfiles.length; i++) {
        const data = await getFrontFilePic(res.data.zipfiles[i])
        const res1 = await getOneZipMsg(res.data.zipfiles[i])
        let fillForm = {
          title: res1.data.file.title,
          img: data.data.fileImgs || '',
          id: res.data.zipfiles[i]
        }
        this.fileList.push(fillForm)
      }
    },
    async GetUsers() {
      const res = await getUsers({ pageNum: 1, pageSize: 59 })
      const { data } = await getUserList({ userId: res.data.users })
      let baseurl = this.$store.state.baseurl
      console.log(data);
      for (let i = 0; i < data.users.length; i++) {
        this.userList.push({
          name: data.users[i].Name,
          img: baseurl + data.users[i].Icon,
          id: res.data.users[i]
        })
      }
    }
  },
  mounted() {
    this.$bus.$on('startLogin', () => {
      this.login()
    })
    if (localStorage.getItem('token')) {
      this.GetFrontFileList()
      this.GetUsers()
    }
    window.addEventListener('scroll', this.handleScroll) // 监听页面滚动
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollToTop)
  },
  components: {
    Login,
    blogcard,
    floor,
    userCard
  },
}
</script>

<style lang="scss" scoped>
.home-container {
  background-color: #202529;
  position: relative;
  overflow: hidden;
}

.bgc {
  position: relative;
  width: 100%;
  height: 40rem;
  margin-top: 4rem;
  font-family: Georgia, 'Times New Roman', Times, serif;

  img {
    width: 100%;
    height: 100%;
    opacity: 0.9;
  }

  >div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @include wh(10rem, 5rem);
    text-align: center;
    line-height: 5rem;
    font-size: 1.5rem;
    border: 0.3rem solid #fff;
    cursor: pointer;
    color: #fff;

    &:hover {
      background-color: #4d4d4d;
    }
  }
}

.blog-list {
  position: relative;
  left: 100px;

  /* 样式可以根据自己的需求进行修改 */
  ul {
    list-style: none;
    padding: 0;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
  }

  li {
    margin: 10px 0;
  }

  a {
    color: #333;
    text-decoration: none;
  }
}
</style>