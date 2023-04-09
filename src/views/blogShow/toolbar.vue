<template>
  <div class="Toolbar">
    <div class="icon-wrap">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        t="1673322558231"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        p-id="1874"
        width="25"
        height="25"
        v-if="!blogFileFlag"
        @click="Filelike()"
      >
        <path
          d="M970.56 434.56c-66.88-94.4-162.88-2.56-230.4-86.4a111.68 111.68 0 0 1-22.72-89.28c23.68-134.08 34.88-157.12 6.08-192a64 64 0 0 0-106.56 0 1141.12 1141.12 0 0 1-317.44 340.16 1718.4 1718.4 0 0 1 5.44 493.12c192 22.72 303.68 134.72 469.44 47.04 139.2-73.92 259.84-422.4 196.16-512.64zM199.68 960a1716.8 1716.8 0 0 0 0-576H32v576z"
          fill="#dbdbdb"
          p-id="1875"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        t="1673321535699"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        p-id="1383"
        width="25"
        height="25"
        @click="DeleteFileLike()"
        v-else
      >
        <path
          d="M970.56 434.56c-66.88-94.4-162.88-2.56-230.4-86.4a111.68 111.68 0 0 1-22.72-89.28c23.68-134.08 34.88-157.12 6.08-192a64 64 0 0 0-106.56 0 1141.12 1141.12 0 0 1-317.44 340.16 1718.4 1718.4 0 0 1 5.44 493.12c192 22.72 303.68 134.72 469.44 47.04 139.2-73.92 259.84-422.4 196.16-512.64zM199.68 960a1716.8 1716.8 0 0 0 0-576H32v576z"
          fill="#1296db"
          p-id="1384"
        />
      </svg>
      <div class="likeCount" :class="{ blue: blogFileFlag }">
        {{ likeCount }}
      </div>
    </div>
    <div class="comment-wrap">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        t="1673328939718"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        p-id="3008"
        width="20"
        height="20"
        @click="gotoComment()"
      >
        <path
          d="M64 64h896v709.312H363.648L64 960V64z m278.336 634.688h542.976v-560H138.688v686.848l203.648-126.848zM288 362.688h112v112H288v-112z m186.688 0h112v112h-112v-112z m186.624 0h112v112h-112v-112z"
          fill="#2c2c2c"
          p-id="3009"
        />
      </svg>
      <div class="commentCount">
        {{ commentCount }}
      </div>
    </div>
    <div class="collect-wrap">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        t="1673336873864"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        p-id="4095"
        width="28"
        height="28"
        v-if="!collectFlag"
        @click="FileCollect()"
      >
        <path
          d="M877.632 456.8c14.976-14.72 20.384-32.96 14.816-49.984-5.536-17.024-20.608-28.544-41.344-31.584l-190.24-27.84c-6.976-1.024-18.464-9.472-21.6-15.904l-85.12-173.696c-9.28-18.944-24.896-29.76-42.88-29.76-17.952 0-33.6 10.816-42.816 29.76l-85.12 173.696c-3.104 6.432-14.592 14.848-21.6 15.904l-190.24 27.84c-20.704 3.04-35.776 14.56-41.344 31.584-5.568 17.024-0.16 35.232 14.816 49.984l137.696 135.232c5.088 4.992 9.536 18.816 8.32 25.92l-32.48 190.912c-3.552 20.832 2.752 38.816 17.344 49.344 7.52 5.44 16.224 8.16 25.472 8.16 8.576 0 17.6-2.336 26.56-7.04l170.176-90.176c6.048-3.2 20.448-3.2 26.528 0l170.144 90.112c18.528 9.856 37.504 9.44 52.064-1.056 14.56-10.528 20.864-28.48 17.344-49.28l-32.48-190.976c-1.28-7.104 3.2-20.928 8.32-25.92l137.664-135.232z"
          fill="#969697"
          p-id="4096"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        t="1673336873864"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        p-id="4095"
        width="28"
        height="28"
        @click="FileCollectDelete"
        v-else
      >
        <path
          d="M877.632 456.8c14.976-14.72 20.384-32.96 14.816-49.984-5.536-17.024-20.608-28.544-41.344-31.584l-190.24-27.84c-6.976-1.024-18.464-9.472-21.6-15.904l-85.12-173.696c-9.28-18.944-24.896-29.76-42.88-29.76-17.952 0-33.6 10.816-42.816 29.76l-85.12 173.696c-3.104 6.432-14.592 14.848-21.6 15.904l-190.24 27.84c-20.704 3.04-35.776 14.56-41.344 31.584-5.568 17.024-0.16 35.232 14.816 49.984l137.696 135.232c5.088 4.992 9.536 18.816 8.32 25.92l-32.48 190.912c-3.552 20.832 2.752 38.816 17.344 49.344 7.52 5.44 16.224 8.16 25.472 8.16 8.576 0 17.6-2.336 26.56-7.04l170.176-90.176c6.048-3.2 20.448-3.2 26.528 0l170.144 90.112c18.528 9.856 37.504 9.44 52.064-1.056 14.56-10.528 20.864-28.48 17.344-49.28l-32.48-190.976c-1.28-7.104 3.2-20.928 8.32-25.92l137.664-135.232z"
          fill="#f4ea2a"
          p-id="4096"
        />
      </svg>
    </div>
  </div>
</template>

<script>
import {
  showFileLike,
  fileLike,
  deleteFileLike,
  fileLikeList,
} from '@/api/like'
import { showFileCollect, fileCollect, fileCollectDelete } from '@/api/collect'
import { getBlogComment } from '@/api/comment'
export default {
  async created() {
    this.upbateFileLike()
    this.getLikeCount()
    this.ShowFileCollect()
    const { data } = await getBlogComment(this.id)
    this.commentCount = data.total
    this.$bus.$on('sendComment', async () => {
      const { data } = await getBlogComment(this.id)
      this.commentCount = data.total
    })
  },
  beforeDestroy() {
    this.$bus.$off('sendComment')
  },
  props: ['id'],
  data() {
    return {
      blogFileFlag: false,
      likeCount: 0,
      commentCount: 0,
      collectFlag: false,
    }
  },
  methods: {
    async FileCollect() {
      const res = await fileCollect(this.id)
      this.ShowFileCollect()
      if (res.code === 200) {
        this.$message.success(' 收藏成功 !')
      }
    },
    async FileCollectDelete() {
      const res = await fileCollectDelete(this.id)
      this.ShowFileCollect()
      if (res.code === 200) {
        this.$message.success(' 取消收藏')
      }
    },
    async ShowFileCollect() {
      const res = await showFileCollect(this.id)
      this.collectFlag = res.data.flag
    },
    async getLikeCount() {
      const res = await fileLikeList(this.id)
      this.likeCount = res.data.total
    },
    async upbateFileLike() {
      const res = await showFileLike(this.$route.params.id)
      this.blogFileFlag = res.data.flag
    },
    async Filelike() {
      await fileLike(this.$route.params.id)
      this.upbateFileLike()
      this.getLikeCount()
    },
    async DeleteFileLike() {
      await deleteFileLike(this.$route.params.id)
      this.upbateFileLike()
      this.getLikeCount()
    },
    gotoComment() {
      this.$emit('scroll')
    },
  },
}
</script>

<style lang="scss" scoped>
.Toolbar {
  position: fixed;
  width: 40px;
  height: 200px;
  left: 6%;
  top: 35%;

  .icon-wrap {
    position: relative;
    @include round(50px);
    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 25px 50px -12px;
    cursor: pointer;
    .icon {
      @include abs-center;
    }
    .likeCount {
      position: absolute;
      top: 0;
      left: 75%;
      height: 17px;
      line-height: 17px;
      border-radius: 9px;
      font-size: 11px;
      text-align: center;
      padding: 0 10px;
      white-space: nowrap;
      color: #fff;
      background-color: #c2c8d1;
      user-select: none;
    }
    .blue {
      background-color: #1e80ff;
    }
  }

  .comment-wrap {
    position: relative;
    top: 20px;
    @include round(50px);
    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 25px 50px -12px;
    cursor: pointer;
    .icon {
      @include abs-center;
    }
    .commentCount {
      position: absolute;
      top: 0;
      left: 75%;
      height: 17px;
      line-height: 17px;
      border-radius: 9px;
      font-size: 11px;
      text-align: center;
      padding: 0 10px;
      white-space: nowrap;
      color: #fff;
      background-color: #c2c8d1;
      user-select: none;
    }
  }

  .collect-wrap {
    position: relative;
    top: 40px;
    @include round(50px);
    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 25px 50px -12px;
    cursor: pointer;
    .icon {
      @include abs-center;
    }
  }
}
</style>