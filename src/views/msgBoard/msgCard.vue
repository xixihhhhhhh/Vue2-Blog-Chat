<template>
  <div class="msg-container" :class="{ self: isCurUser }">
    <div class="avatar-wrap">
      <img :src="$store.state.baseurl + imgurl" alt="">
    </div>
    <div class="content-wrap" v-html="formatMsg(content)">
    </div>
  </div>
</template>

<script>
import emojiList from '@/assets/icomNames';
export default {
  props: {
    imgurl: {
      default: '9.jpg'
    },
    content: {
      default: ''
    },
    isCurUser: {
      default: false
    }
  },
  methods: {
    formatMsg(text) {
      text = text+''
      text = text.replace(/\[[\u4e00-\u9fa5]+\]/g, replaceEmoji);
      // debugger;
      return text;
      function replaceEmoji(param) {
        let target = emojiList.find(emoji => param.includes(emoji.CN + ""));
        if (target) {
          return `<img 
                                style="display: inline-block; width: 2rem; height: 2rem; margin:0 4px;" 
                                src=${target.url}
                            />`;
        }
        return param;
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.msg-container {
  padding: 10px;
  display: flex;
  flex: 1;
  overflow: hidden;
  height: 40px;

  &.self {
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
    flex-direction: row-reverse;
  }

  .avatar-wrap {
    width: 40px;
    height: 40px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .content-wrap {
    margin: 0 10px;
    display: flex;
    align-items: center;
  }
}
</style>