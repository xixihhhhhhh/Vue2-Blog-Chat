<template>
  <div class="comment">
    <div class="avatar">
      <img v-lazy="imgurl" />
    </div>
    <div :class="{ border }" class="content">
      <p class="comment-text">
        <span class="username">{{ nickname }}:</span>
        <span class="text">{{ comment.content }}</span>
      </p>
      <div class="replied" v-if="comment.beReplied?.length">
        <p class="comment-text">
          <span class="username"
            >{{ comment?.beReplied[0].user.nickname || 'hhh' }}:</span
          >
          <span class="text">{{ comment?.beReplied[0].content || 'hhh' }}</span>
        </p>
      </div>
      <div class="bottom">
        <span class="date">{{ comment.created_at }}</span>
        <div class="actions">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            t="1673271623208"
            class="icon"
            viewBox="-20 -100 1024 1024"
            version="1.1"
            p-id="2687"
            width="15"
            height="15"
            @click="CommentLike()"
            v-if="!likeFlag"
          >
            <path
              d="M147.2 352H108.8C85.333333 352 64 375.466667 64 401.066667v381.866666c0 25.6 19.2 49.066667 44.8 49.066667H149.333333c23.466667 0 42.666667-23.466667 42.666667-49.066667V396.8c0-25.6-19.2-44.8-44.8-44.8zM870.4 356.266667h-192V172.8c0-40.533333-36.266667-76.8-78.933333-76.8H576c-27.733333 0-46.933333 14.933333-57.6 25.6L294.4 337.066667l-2.133333 2.133333c-25.6 27.733333-36.266667 61.866667-36.266667 102.4v334.933333c0 66.133333 53.333333 117.333333 121.6 117.333334h334.933333c64 0 123.733333-36.266667 149.333334-89.6l113.066666-224c12.8-19.2 19.2-44.8 19.2-74.666667v-34.133333c-2.133333-64-55.466667-115.2-123.733333-115.2z m57.6 151.466666c0 17.066667-2.133333 32-8.533333 40.533334 0 0 0 2.133333-2.133334 2.133333l-113.066666 226.133333c-17.066667 34.133333-53.333333 55.466667-93.866667 55.466667H377.6c-32 0-57.6-23.466667-57.6-53.333333V443.733333c0-25.6 6.4-44.8 19.2-59.733333L563.2 168.533333c8.533333-8.533333 10.666667-8.533333 12.8-8.533333h25.6c8.533333 0 14.933333 6.4 14.933333 12.8v215.466667c0 17.066667 14.933333 32 32 32h224c32 0 57.6 23.466667 57.6 53.333333v34.133333z"
              fill="#212121"
              p-id="2688"
            />
          </svg>
          
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            t="1673321535699"
            class="icon"
            version="1.1"
            viewBox="-20 -100 1024 1024"
            p-id="1383"
            width="15"
            height="15"
            @click="DeleteBlogCommentLike()"
            v-else
          >
            <path
              d="M970.56 434.56c-66.88-94.4-162.88-2.56-230.4-86.4a111.68 111.68 0 0 1-22.72-89.28c23.68-134.08 34.88-157.12 6.08-192a64 64 0 0 0-106.56 0 1141.12 1141.12 0 0 1-317.44 340.16 1718.4 1718.4 0 0 1 5.44 493.12c192 22.72 303.68 134.72 469.44 47.04 139.2-73.92 259.84-422.4 196.16-512.64zM199.68 960a1716.8 1716.8 0 0 0 0-576H32v576z"
              fill="#1296db"
              p-id="1384"
            />
          </svg>
          {{ likeCount }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOneUserMsg } from '@/api/user'
import { getBlogCommentLike } from '@/api/comment'
import { commentLike, deleteCommentLike, showCommentLike } from '@/api/like'

export default {
  async created() {
    const res = await getOneUserMsg(this.comment.user_id)
    this.nickname = res.data.user.Name
    this.imgurl = this.baseurl + res.data.user.Icon
    this.commom()
  },
  props: ['comment', 'border'],
  data() {
    return {
      baseurl: 'http://icon.mgaronya.com/',
      imgurl: '',
      nickname: '',
      likeCount: 0,
      likeFlag: false,
    }
  },
  methods: {
    async CommentLike() {
      await commentLike(this.comment.id)
      this.commom()
    },
    async commom() {
      const res1 = await getBlogCommentLike(this.comment.id)
      this.likeCount = res1.data.total
      const res2 = await showCommentLike(this.comment.id)
      this.likeFlag = res2.data.flag
    },
    async DeleteBlogCommentLike() {
      await deleteCommentLike(this.comment.id)
      this.commom()
    },
  },
}
</script>

<style lang="scss" scoped>
.comment {
  display: flex;
  padding-top: 20px;
  padding-right: 20px;

  .avatar {
    @include img-wrap(40px);
    margin-right: 12px;

    img {
      border-radius: 50%;
    }
  }

  .content {
    padding-bottom: 20px;
    width: 100%;
    font-size: 12px;

    &.border {
      border-bottom: 1px solid #3f3f3f;
    }

    .replied {
      padding: 8px;
      margin-top: 8px;
      background: #2a2a2a;
      border-radius: 4px;
    }

    .comment-text {
      .username {
        display: inline-block;
        margin-right: 4px;
        color: #517eaf;
      }

      .text {
        line-height: 1.5;
      }
    }

    .bottom {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;

      .date {
        color: #727272;
      }

      .actions {
        color: #727272;
        svg:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
