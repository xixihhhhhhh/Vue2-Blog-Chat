<template>
  <div class="blog-card" :style="color" @click="$router.push({ name: 'blogShow', params: { id: blogId } })">
    <div class="blog-content">
      <div>
        <span class="blog-name">{{title}}</span>
      </div>
      <div>
        <span class="blog-time">{{time}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      color: '',
    }
  },
  props: ['colorId', 'title' , 'time', 'blogId', 'userId'],
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
  },
  created() {
    this.randomColor()
  },
}
</script>

<style scoped lang="scss">
.blog-card {
  width: 262px;
  height: 113px;
  padding: 20px 0 0 40px;
  margin: 0 10px 20px;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  cursor: pointer;
  transition: all 0.5s linear;
  .blog-content {
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
}
.blog-card:hover {
  box-shadow: 0px 15px 5px rgba(0, 0, 0, 0.1);
  position: relative;
  top: -4px;
  .blog-name {
    border-bottom: 1px solid #000;
  }
  .time {
    border-bottom: 1px solid #000;
  }
}
</style>