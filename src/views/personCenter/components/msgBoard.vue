<template>
  <div class="con">
    <el-button type="primary"  @click="$router.push('/msgBoard')">我的留言板</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.con {
  height: 400px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>