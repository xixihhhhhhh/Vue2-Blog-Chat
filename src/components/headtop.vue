<template>
  <div class="con">
    <div :class="[[isTouchTop ? 'five' : 'four'], 'head-top']" v-if="islogin">
      <span @click="gotoHome" class="hidden-xs">[ Blog We ]</span>
      <div @click="gotoHome">首页</div>
      <div @click="logout()">注销</div>
      <div @click="$router.push('/allblogs')">所有博客</div>
      <div @click="$router.push('/allUsers')">所有用户</div>
      <div @click="$router.push('/submitFrontFile')">提交收录</div>
      <div @click="$router.push('/personCenter')">个人中心</div>
      <div @click="gotoBlog()">我的博客</div>
      <div class="append" @click="appendFlag = !appendFlag">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <line x1="120" y1="90" x2="160" y2="90" style="stroke: #fff; stroke-width: 5" />
          <line x1="120" y1="100" x2="160" y2="100" style="stroke: #fff; stroke-width: 5" />
          <line x1="120" y1="110" x2="160" y2="110" style="stroke: #fff; stroke-width: 5" />
        </svg>
      </div>
    </div>
    <div class="login_top" v-else>
      <span @click="gotoHome()">[ Blog We ]</span>
      <span @click="login()">登录</span>
    </div>
    <div v-if="appendFlag" class="appendMune">
      <div><span @click="gotoHome()">首页</span></div>
      <div><span>关于本站</span></div>
      <div><span>大事记</span></div>
      <div><span @click="$router.push('/allblogs')">所有博客</span></div>
      <div><span @click="$router.push('/submitFrontFile')">提交收录</span></div>
      <div><span @click="$router.push('/personCenter')">个人中心</span></div>
    </div>
  </div>
</template>

<script>
import { getUserMsg } from '@/api/user.js'
export default {
  data: () => ({
    appendFlag: false,
    blogUrl: 'http://blog_usr.mgaronya.com/',
  }),
  methods: {
    logout() {
      this.$confirm('此操作将注销账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('token')
        this.$store.commit('changeLogin', false)
        if (this.$route.path !== '/home') {
          this.$router.push('/home')
        }
        this.$message({
          type: 'success',
          message: '注销成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消注销'
        });
      });
    },
    login() {
      if (this.$route.path !== '/home') {
        this.$router.push('/home')
      }
      this.$bus.$emit('startLogin')
    },
    gotoHome() {
      if (this.$route.path !== '/home') {
        this.$router.push('/home')
      }
    },

    async gotoBlog() {
      const res = await getUserMsg()
      if (res.data.user.Blog) {
        location.href =
          this.blogUrl + res.data.user.Name + res.data.user.Blog
      }
    },
  },
  mounted() { },
  props: {},
  computed: {
    islogin() {
      return this.$store.state.isLogin
    },
    isTouchTop() {
      return this.$store.state.isTouchTop
    },
  },
}
</script>

<style lang='scss' scoped>
.con {
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently not supported by any browser */
}
.four {
  width: 100%;
  height: 4rem;
}

.five {
  width: 100%;
  height: 5rem;
}

.append {
  margin: 0 auto;
  cursor: pointer;
}

@media screen and (min-width: 74rem) {
  .append svg {
    display: none;
  }
}

.head-top {
  background-color: $black;
  position: fixed;
  z-index: 2000;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  color: white;
  transition: all 0.5s linear;
  font-family: Georgia, 'Times New Roman', Times, serif;

  @media screen and (max-width: 74rem) {
    height: 7rem;
  }

  >span {
    position: absolute;
    left: 10vw;
    font-size: 2rem;
    font-weight: 300;
    cursor: pointer;

    @media screen and (max-width: 74rem) {
      top: 1rem;
      left: 40vw;
    }
  }

  >div:not(:last-child) {
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    margin-left: 4vw;
    box-sizing: border-box;
    position: relative;
    cursor: pointer;
    transition: all 1s linear;
    display: flex;
    flex-wrap: nowrap;

    @media screen and (max-width: 74rem) {
      display: none;
    }
  }

  >div:first-of-type {
    margin-left: 45vw;
  }

  >div:not(:last-child):hover {
    color: orange;
  }

  /* 上边和右边 */
  >div:not(:last-child)::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-top: 1px solid orange;
    left: 0;
    top: 0;
    /* 添加移开鼠标的过渡效果 高度延时1s触发*/
    transition: width 0s linear 0s, height 0s linear 0s, opacity 0s linear 0s;
    opacity: 0;
  }

  /* 下边和左边 */
  >div:not(:last-child)::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    /* 注意边框位置 */
    border-bottom: 1px solid orange;
    right: 0;
    /* 小坑 此处用top的话 会向下伸长 不会向上 */
    bottom: -5px;
    /* 添加移开鼠标的过渡效果 高度延时1s触发*/
    transition: width 0s linear 0s, height 0s linear, opacity 0s linear 0s;
    opacity: 0;
  }

  /* before变化 */
  >div:not(:last-child):hover::before {
    width: 100%;
    height: 100%;
    /* 添加过渡效果 */
    opacity: 1;
    transition: width 0.5s linear, height 0.5s linear 0.5s;
  }

  /* after变化 */
  >div:not(:last-child):hover::after {
    width: 100%;
    height: 100%;
    /* 添加过渡效果 */
    opacity: 1;
    transition: width 0.5s linear 0.5s, height 0.5s linear 0.5s,
      opacity 0s linear 0.5s;
  }
}

.login_top {
  background-color: $black;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  display: flex;
  @include wh(100%, 5rem);
  display: flex;
  align-items: center;
  color: white;
  font-family: Georgia, 'Times New Roman', Times, serif;

  >span:not(:first-of-type) {
    position: absolute;
    right: 10rem;
    font-size: 1.5rem;
    cursor: pointer;
  }

  >span:first-child {
    position: absolute;
    left: 12rem;
    font-size: 2rem;
    font-weight: 300;
    cursor: pointer;
  }
}

.appendMune {
  position: absolute;
  width: 100%;
  top: 7rem;
  padding-top: 0.5rem;
  z-index: 10;
  background-color: #202529;
  color: #fff;
  font-family: 'Courier New', Courier, monospace;
  transition: all 1s linear;

  @media screen and (min-width: 74rem) {
    display: none;
  }

  >div {
    height: 3rem;
    line-height: 3rem;
    text-align: center;
    border-top: 0.1px solid #444;

    >span {
      cursor: pointer;
    }
  }
}
</style>