<template>
  <div class="history-CardCon" @click="$router.push({ name: 'blogShow', params: { id: bolg_id } })">
    <div class="fir-col">
      <div class="name">{{ user_name }}</div>
      <div class="time">{{ time }}</div>
      <div class="tag"><span v-for="item in labels">{{ item }} ·</span></div>
    </div>
    <div class="sec-col">
      {{ title }}
    </div>
    <div class="third-col">
      {{ content }}
    </div>
    <div class="fourth-col">
      <div class="view"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
          t="1678711647764" class="icon" viewBox="0 0 1024 1024" version="1.1" p-id="2826" width="30" height="30">
          <path
            d="M977.895 492.472c-2.087-2.797-52.041-69.269-133.083-136.448-47.916-39.72-96.843-71.441-145.42-94.281-61.809-29.062-123.277-43.797-182.7-43.797-59.422 0-120.892 14.735-182.7 43.797-48.577 22.84-97.504 54.562-145.421 94.281-81.042 67.179-130.996 133.651-133.083 136.448l-12.494 16.745 12.494 16.745c2.087 2.796 52.041 69.269 133.083 136.447 47.917 39.72 96.844 71.44 145.421 94.281 61.809 29.062 123.278 43.797 182.7 43.797 59.423 0 120.892-14.735 182.7-43.797 48.577-22.841 97.504-54.562 145.42-94.281 81.042-67.179 130.996-133.651 133.083-136.447l12.494-16.745-12.494-16.745zM808.096 620.104c-68.675 56.743-174.978 124.383-291.404 124.383s-222.729-67.64-291.405-124.383c-52.717-43.558-92.061-87.642-111.455-110.878 47.075-56.319 211.736-235.28 402.86-235.28 116.427 0 222.729 67.64 291.404 124.383 52.722 43.561 92.066 87.647 111.463 110.888-19.397 23.24-58.742 67.326-111.463 110.887z"
            p-id="2827" fill="#2c2c2c" />
          <path
            d="M512.941 317.474c-106.416 0-192.992 86.576-192.992 192.992s86.576 192.992 192.992 192.992 192.991-86.576 192.991-192.992-86.575-192.992-192.991-192.992z m0 329.984c-75.538 0-136.992-61.454-136.992-136.992 0-75.538 61.454-136.992 136.992-136.992 75.537 0 136.991 61.454 136.991 136.992 0.001 75.538-61.453 136.992-136.991 136.992z"
            p-id="2828" fill="#2c2c2c" />
        </svg>{{ viewCount }}</div>
      <div class="like">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" t="1678711977879" class="icon"
          viewBox="0 0 1024 1024" version="1.1" p-id="4079" width="30" height="30" @click="Filelike()" v-if="!likeFlag" >
          <path
            d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 0 0-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4-20.5-21.5-48.1-33.4-77.9-33.4-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-0.2-12.6-2-25.1-5.6-37.1zM184 852V568h81v284h-81z m636.4-353l-21.9 19 13.9 25.4c4.6 8.4 6.9 17.6 6.9 27.3 0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4c4.6 8.4 6.9 17.6 6.9 27.3 0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4c4.6 8.4 6.9 17.6 6.9 27.3 0 22.4-13.2 42.6-33.6 51.8H329V564.8l99.5-360.5c5.2-18.9 22.5-32.2 42.2-32.3 7.6 0 15.1 2.2 21.1 6.7 9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.2 32.1-19.6 43z"
            p-id="4080" fill="#2c2c2c" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" t="1678711982929" class="icon"
          viewBox="0 0 1024 1024" version="1.1" p-id="4282" width="30" height="30" @click="DeleteFileLike()" v-else>
          <path
            d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 0 0-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4-20.5-21.5-48.1-33.4-77.9-33.4-52 0-98 35-111.8 85.1l-85.9 311h-0.3v428h472.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-0.2-12.6-2-25.1-5.6-37.1zM112 528v364c0 17.7 14.3 32 32 32h65V496h-65c-17.7 0-32 14.3-32 32z"
            p-id="4283" fill="#1296db" />
        </svg>
        {{ likeCount }}
      </div>
      <div class="comment">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" t="1678715847907" class="icon"
          viewBox="0 0 1024 1024" version="1.1" p-id="5415" width="30" height="30">
          <path
            d="M512 64c259.2 0 469.333333 200.576 469.333333 448s-210.133333 448-469.333333 448a484.48 484.48 0 0 1-232.725333-58.88l-116.394667 50.645333a42.666667 42.666667 0 0 1-58.517333-49.002666l29.76-125.013334C76.629333 703.402667 42.666667 611.477333 42.666667 512 42.666667 264.576 252.8 64 512 64z m0 64C287.488 128 106.666667 300.586667 106.666667 512c0 79.573333 25.557333 155.434667 72.554666 219.285333l5.525334 7.317334 18.709333 24.192-26.965333 113.237333 105.984-46.08 27.477333 15.018667C370.858667 878.229333 439.978667 896 512 896c224.512 0 405.333333-172.586667 405.333333-384S736.512 128 512 128z m-157.696 341.333333a42.666667 42.666667 0 1 1 0 85.333334 42.666667 42.666667 0 0 1 0-85.333334z m159.018667 0a42.666667 42.666667 0 1 1 0 85.333334 42.666667 42.666667 0 0 1 0-85.333334z m158.997333 0a42.666667 42.666667 0 1 1 0 85.333334 42.666667 42.666667 0 0 1 0-85.333334z"
            fill="#333333" p-id="5416" />
        </svg>
        {{ commentCount }}
      </div>
    </div>
  </div>
</template>

<script>
import { getOneMsg } from '@/api/user.js'
import { getFileLabel } from '@/api/label'
import { getOneZipMsg } from '@/api/blog'
import { intervalTime, formatDate } from '@/utils'
import { getBolgVisitCount } from '@/api/hot'
import {
  showFileLike,
  fileLikeList,
  fileLike,
  deleteFileLike,
} from '@/api/like'
import { getBlogComment } from '@/api/comment'
export default {
  props: ['user_id', 'created_time', 'bolg_id'],
  async created() {
    const res = await getOneMsg(this.user_id)
    this.user_name = res.data.user.Name
    this.time = intervalTime(this.created_time, formatDate(new Date()))
    const { data } = await getFileLabel(this.bolg_id)
    this.labels = data.labels
    const res1 = await getOneZipMsg(this.bolg_id)
    this.title = res1.data.file.title
    this.content = res1.data.file.content
    const res2 = await getBolgVisitCount(this.bolg_id)
    this.viewCount = res2.data.views
    const res3 = await fileLikeList(this.bolg_id)
    this.likeCount = res3.data.total
    const res4 = await getBlogComment(this.bolg_id)
    this.commentCount = res4.data.total
    const res5 = await showFileLike(this.bolg_id)
    this.likeFlag = res5.data.flag
  },
  data() {
    return {
      likeFlag: false,
      likeCount: 0,
      commentCount: 0,
      viewCount: 0,
      user_name: '',
      time: '',
      labels: [],
      title: '',
      content: '',
    }
  },
  methods: {
    async Filelike() {
      await fileLike(this.bolg_id)
      this.upbateFileLike()
      this.getLikeCount()
    },
    async upbateFileLike() {
      const res = await showFileLike(this.bolg_id)
      this.likeFlag = res.data.flag
    },
    async getLikeCount() {
      const res = await fileLikeList(this.bolg_id)
      this.likeCount = res.data.total
    },
    async DeleteFileLike() {
      await deleteFileLike(this.bolg_id)
      this.upbateFileLike()
      this.getLikeCount()
    },
  },
}
</script>

<style lang="scss" scoped>
.history-CardCon {
  padding: 12px 20px 0;
  cursor: pointer;
  border-top: #ccc 1px solid;
  border-bottom: #ccc 1px solid;
  &:hover {
    background-color: #eee;
  }
  .fir-col {
    display: flex;
    font-size: 20px;
    color: #515767;

    .name {
      padding: 0 20px 0 0;
      border-right: .5px solid #000;
      cursor: pointer;
    }

    .name:hover {
      color: rgb(30, 128, 255);
    }

    .time {
      padding: 0 20px;
      text-align: center;
      border-right: .5px solid #000;
    }

    .tag {
      padding: 0 20px;

      span {
        cursor: pointer;
      }

      span:hover {
        color: #007cb0;
      }
    }
  }

  .sec-col {
    font-weight: 600;
    font-size: 26px;
    line-height: 44px;
  }

  .third-col {
    width: 80%;
    height: 20px;
    color: gray;
    line-height: 22px;
    @include text-ellipsis();
  }

  .fourth-col {
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 25px;
    line-height: 40px;
    margin-top: 5px;

    .view {
      position: relative;
      padding: 0 40px;

      svg {
        position: absolute;
        left: 5px;
        top: 5px;
      }
    }

    .like {
      position: relative;
      padding: 0 40px;

      svg {
        position: absolute;
        left: 5px;
        top: 5px;
        cursor: pointer;
      }

      svg:hover path {
        fill: #007cb0;
      }
    }

    .comment {
      position: relative;
      padding: 0 40px;

      &:hover {
        color: #007cb0;
      }

      svg {
        position: absolute;
        left: 5px;
        top: 5px;
        cursor: pointer;
      }

      svg:hover path {
        fill: #007cb0;
      }
    }
  }
}
</style>