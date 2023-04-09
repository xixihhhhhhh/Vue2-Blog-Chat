<template>
  <div id="app">
    <headtop></headtop>
    <router-view />
    <HeadToTop />
  </div>
</template>

<script>
import headtop from './components/headtop'
import HeadToTop from './components/HeadToTop'
export default {
  components: {
    headtop,
    HeadToTop,
    // img: require('./assets/images/bgc1.jpg')
  },
  mounted() {
    // 获取存储token的开始时间
    const tokenStartTime = window.localStorage.getItem('tokenStartTime')
    // 后台给出的token有效时间，一个星期 单位 是秒
    // 我们自己定义6天过期，让用户重新登录一下， 用户总不可能在一个页面挂机一天吧
    const timeOver = 7 * 24 * 3600 * 1000
    // 当前时间
    let date = new Date().getTime()
    // 如果大于说明是token过期了
    if (date - tokenStartTime > timeOver) {
      window.localStorage.removeItem('token')
    }
    let token = window.localStorage.getItem('token')
    // console.log(token)
    if (token) {
      this.$store.commit('changeLogin', true)
    } else {
      this.$store.commit('changeLogin', false)
    }
  },
}
</script>

<style lang="scss" scoped>
#id {
  position: relative;
}
</style>