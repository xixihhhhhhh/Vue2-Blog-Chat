<template>
  <div class="blog-card" :style="color">
    <div class="img-wrap">
      <img v-lazy="imgUrl + '#xxx'" />
    </div>
    <div class="blog-content">
      <div>
        <span class="blog-name">{{ userName }}</span>
      </div>
      <div>
        <span class="blog-time">{{ Email }}</span>
      </div>
    </div>
    <span type="primary" class="btn" @click="sendFriendRequest()"><svg xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink" t="1678847285347" class="icon" viewBox="0 0 1024 1024" version="1.1"
        p-id="2959" width="20" height="20">
        <path
          d="M802.752 583.936H178.56A49.728 49.728 0 0 1 128 533.376c0-28.736 21.952-50.624 50.56-50.624h624.192c28.672 0 50.56 21.888 50.56 50.56s-21.888 50.624-50.56 50.624z"
          fill="#e6e6e6" p-id="2960" />
        <path
          d="M490.688 896a49.728 49.728 0 0 1-50.624-50.56V221.184c0-28.672 21.952-50.56 50.56-50.56 28.736 0 50.624 21.888 50.624 50.56v624.128c0 28.672-21.888 50.624-50.56 50.624z"
          fill="#e6e6e6" p-id="2961" />
      </svg> 添加好友</span>
    <span type="primary" class="btn1" @click="goToMsg">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" t="1678847793742" class="icon"
        viewBox="0 0 1025 1024" version="1.1" p-id="5230" width="16.015625" height="16">
        <path
          d="M896.517333 938.666667H128.517333a128 128 0 0 1-128-128V213.333333a128 128 0 0 1 128-128h768a128 128 0 0 1 128 128v597.333334a128 128 0 0 1-128 128zM128.517333 170.666667a42.666667 42.666667 0 0 0-42.666666 42.666666v597.333334a42.666667 42.666667 0 0 0 42.666666 42.666666h768a42.666667 42.666667 0 0 0 42.666667-42.666666V213.333333a42.666667 42.666667 0 0 0-42.666667-42.666666z"
          fill="#1E80FF" p-id="5231" />
        <path
          d="M512.517333 542.933333a128 128 0 0 1-61.226666-15.786666L21.850667 293.546667a42.666667 42.666667 0 1 1 42.666666-75.093334L491.184 452.266667a42.666667 42.666667 0 0 0 40.96 0L960.517333 218.453333a42.666667 42.666667 0 0 1 42.666667 75.093334l-428.586667 234.666666a128 128 0 0 1-62.08 14.72z"
          fill="#1E80FF" p-id="5232" />
      </svg>
      &nbsp&nbsp留言</span>
    <span type="primary" class="btn1" @click="$router.push({ name: 'oneUser', params: { id: userId } })"
      style="background-color: #E6E6FA;">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" t="1680847122721" class="icon"
        viewBox="0 0 1024 1024" version="1.1" p-id="2646" width="16" height="16">
        <path d="M568 736v168H456V736h112m0-56H456c-30.9 0-56 25.1-56 56v224h224V736c0-30.9-25.1-56-56-56z" fill="#1E80FF"
          p-id="2647" />
        <path
          d="M512 120l1.7 1.8 352 361.9H792V904H232V483.7h-73.7L512 120c-0.1 0 0 0 0 0m0-56c-15.4 0-30.7 6.3-41.9 18.8l-399 410.3c-7.1 8-9.3 19.7-4.6 30.1s14.8 16.5 25.5 16.5h84V904c0 30.9 25.1 56 56 56h560c30.9 0 56-25.1 56-56V539.7h84c10.7 0 20.9-6.2 25.5-16.5 4.7-10.4 2.5-22.1-4.6-30.1l-399-410.3C542.7 70.3 527.4 64 512 64z"
          fill="#1E80FF" p-id="2648" />
      </svg>
      &nbsp&nbsp个人主页</span>
  </div>
</template>

<script>
import { getOneMsg } from '@/api/user.js'
import { sendFriendReq } from '@/api/friend'
export default {
  data() {
    return {
      color: '',
      blogUrl: 'http://blog_usr.mgaronya.com/',
      imgUrl: '',
      blog: '',
    }
  },
  props: ['colorId', 'userName', 'Email', 'blogId', 'userId', 'background'],
  methods: {
    gotoBlogShow() {

    },
    randomColor() {
      let colorGroups = [
        'border-left: 3px solid #FF002B;',
        'border-left: 3px solid #FFA900;',
        'border-left: 3px solid #00CC00;',
        'border-left: 3px solid #00CCFF;',
        'border-left: 3px solid #0089FA;',
        'border-left: 3px solid #404040;',
      ]
      this.color = colorGroups[this.colorId % 6]
    },
    async sendFriendRequest() {
      const res = await sendFriendReq(this.userId)
      return this.$message.success(res.msg)
    },
    goToMsg() {
      this.$router.push({ name: 'msgBoard', params: { id: this.userId } })
    },
    gotoBlog() {
      window.location.replace(
        this.blogUrl + this.userName + this.blog
      )
    },
  },
  async created() {
    this.randomColor()
    this.imgUrl = this.$store.state.baseurl + this.background
  },
}
</script>

<style scoped lang="scss">
.blog-card {
  width: 70%;
  height: 113px;
  padding: 20px 10px 0 10px;
  margin: 0 10px 20px;
  border-radius: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;

  .blog-content {
    flex: 1;

    .blog-name {
      font-size: 18px;
      display: inline-block;
      margin-bottom: 30px;
    }

    .blog-time {
      display: inline-block;
      color: #999;
    }
  }

  .img-wrap {
    position: relative;
    width: 80px;
    height: 80px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .btn {
    width: 100px;
    height: 40px;
    background-color: rgb(30, 128, 255);
    margin-right: 10px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    cursor: pointer;
    transition: .5s all linear;

    &:hover {
      background-color: rgb(8, 91, 200);
    }
  }

  .btn1 {
    width: 100px;
    height: 40px;
    background-color: #FFC0CB;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(30, 128, 255);
    cursor: pointer;
    transition: .5s all linear;
    margin-right: 10px;

    &:hover {
      background-color: rgba(255, 192, 203, 0.5);
      border: 1px solid rgb(30, 128, 255);
    }
  }
}
</style>