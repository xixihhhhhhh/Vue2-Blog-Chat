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
        :key="item.id" ref="msgCard" />
    </div>
  </div>
</template>

<script>
import { getOneMsg, getUserMsg } from '@/api/user'
import { getMyGuest } from '@/api/guestbook'
import emojiList from '@/assets/icomNames';
import msgCard from './msgCard.vue';
export default {
  async created() {
    this.name = this.$store.state.user.Name
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
      const res = await getMyGuest(this.pageParams)
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
    height: 580px;
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