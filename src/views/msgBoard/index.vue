<template>
  <div class="msgContainer">
    <div class="name-wrap">{{ name }}</div>
    <div class="msg-content" ref="scroll">
      <div class="loadingThree" v-if="isLoad">
        <span>没有更多了</span>
      </div>
      <div class="tip" v-else>
        <span class="loadMore" @click="loadMore">点击加载更多</span>
      </div>
      <msgCard v-for="item in MsgList" :imgurl="item.Icon" :content="item.content" :isCurUser="item.isCurUser"
        :key="item.id" ref="msgCard"/>
    </div>
    <div class="chat-wrap">
      <div class="emoij-wrap">
        <svg class="emoji-icon" width="30" height="30" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
          @click.stop="showEmoji = !showEmoji">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M10.0013 0.834717C15.0639 0.834717 19.168 4.93877 19.168 10.0014C19.168 15.064 15.0639 19.1681 10.0013 19.1681C4.93868 19.1681 0.834625 15.064 0.834625 10.0014C0.834625 4.93877 4.93868 0.834717 10.0013 0.834717ZM10.0013 2.08472C5.62904 2.08472 2.08463 5.62913 2.08463 10.0014C2.08463 14.3736 5.62904 17.918 10.0013 17.918C14.3735 17.918 17.918 14.3736 17.918 10.0014C17.918 5.62913 14.3735 2.08472 10.0013 2.08472ZM13.3346 7.08472V9.58472H12.0846V7.08472H13.3346ZM7.91796 7.08472V9.58472H6.66796V7.08472H7.91796ZM10.0011 13.1268C11.1683 13.1268 12.2042 12.5626 12.85 11.6898C12.9814 11.5122 13.2244 11.4452 13.4156 11.5558L13.8051 11.7812C13.9964 11.8918 14.063 12.1376 13.9369 12.319C13.0721 13.5617 11.6321 14.3768 10.0011 14.3768C8.37019 14.3768 6.93023 13.5617 6.06544 12.319C5.93925 12.1376 6.00592 11.8918 6.19714 11.7812L6.58667 11.5558C6.77789 11.4452 7.02087 11.5122 7.15229 11.6898C7.79813 12.5626 8.83403 13.1268 10.0011 13.1268Z"
            fill="#515767"></path>
        </svg>
      </div>
      <div class="iput-wrap">
        <el-input type="textarea" v-model="content" @focus.stop="showEmoji = false" ref="input"
          :autosize="{ minRows: 3, maxRows: 3 }" @keyup.enter.native="send()" autofocus></el-input>
      </div>
      <div class="emoji-container" v-show="showEmoji" @click.stop>
        <img class="emoji" v-for="(emoji, i) in emojiList" :key="i" :src="emoji.url" @click.stop="pushImg(emoji)" />
      </div>
      <div class="send-wrap" v-show="showSend">
        <el-button type="primary" @click="send">发送</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getOneMsg, getUserMsg } from '@/api/user'
import { getGuestOne, sendGuestOne } from '@/api/guestbook'
import emojiList from '@/assets/icomNames';
import msgCard from './msgCard.vue';
export default {
  async created() {
    const { data } = await getOneMsg(this.$route.params.id)
    this.name = data.user.Name
    this.emojiList = emojiList
    this.GetGuestOne()
    const res1 = await getUserMsg()
    this.Icon = res1.data.user.Icon
    this.curName = res1.data.user.Name
  },
  components: { msgCard },
  data() {
    return {
      name: '',
      Icon: '',
      curName: '',
      userId: 0,
      showEmoji: false,
      content: '',
      emojiList: [],
      guestbooks: [],
      MsgList: [],
      pageParams: {
        pageNum: 0,
        pageSize: 20
      },
      isLoad: false,
      length: 0
    }
  },
  methods: {
    async GetGuestOne() {
      const res = await getGuestOne(this.$route.params.id, this.pageParams)
      this.guestbooks = res.data.guestbooks
      for (const item of this.guestbooks) {
        let obj = {}
        obj.content = item.content
        const { data } = await getOneMsg(item.author)
        obj.isCurUser = data.user.Name === this.curName
        obj.Icon = data.user.Icon
        this.MsgList.unshift(obj)
      }
      this.length = this.MsgList.length
    },
    pushImg(emoji) {
      this.content += `[${emoji.CN}]`;
    },
    textChange(e) {
      this.content = e.srcElement.innerHTML;
    },
    async send() {
      await sendGuestOne(this.$route.params.id, { content: this.content })
      this.MsgList.push({ content: this.content, isCurUser: true, Icon: this.Icon })
      this.content = ''
      this.$refs.input.focus()
    },
    loadMore() {
      this.pageParams.pageNum++
      this.GetGuestOne()
      if (this.guestbooks.length === 0) {
        this.isLoad = true
        return
      }
      setTimeout(() => {
        let length = this.length
        this.$refs.scroll.scrollTop = (length - this.pageParams.pageNum * 20) * 60
      }, 2000);
      this.isLoad = false
    }
  },
  computed: {
    showSend() {
      return this.content.trim() !== ''
    },
  },
}
</script>

<style lang="scss" scoped>
.msgContainer {
  padding: 80px 250px 0;
  background-color: rgb(243, 242, 245);

  .name-wrap {
    padding: 10px;
    height: 60px;
    font-size: 26px;
    font-weight: 500;
    background-color: #fff;
    border: 1px solid #e4e6eb;
  }

  .msg-content {
    height: 400px;
    border: 1px solid #e4e6eb;
    background-color: #fff;
    overflow-y: scroll;

    .loadingThree {
      text-align: center;
      color: gray;
    }

    .tip {
      margin: 5px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      color: gray;

      .loadMore {
        cursor: pointer;
      }
    }
  }

  .chat-wrap {
    padding: 0 10px;
    position: relative;
    height: 180px;
    background-color: #fff;
    border: 1px solid #e4e6eb;

    .iput-wrap {}

    .emoij-wrap {
      height: 30px;
      padding: 10px 0 5px 10px;

      svg {
        cursor: pointer;
      }

      svg:hover path {
        fill: #007cb0;
      }
    }

    .emoji-container {
      position: absolute;
      bottom: 180px;
      box-sizing: border-box;
      padding: 1rem 0 0 1rem;
      display: flex;
      justify-content: flex-start;
      align-content: flex-start;
      flex-wrap: wrap;
      width: 100%;
      height: 16.5rem;
      overflow: auto;
    }

    .emoji-container::-webkit-scrollbar {
      display: none;
    }

    .emoji-container .emoji {
      margin-right: .85rem;
      margin-bottom: .85rem;
      flex-grow: 0;
      flex-shrink: 0;
      display: inline-block;
      width: 1.8rem;
      height: 1.8rem;
      cursor: pointer;
    }

    .send-wrap {
      margin-top: 10px;
      text-align: right;
    }
  }

}
</style>