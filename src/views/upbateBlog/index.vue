<template>
  <div class="blog-container">
    <div class="main-content">
      <article class="left">
        <header class="entry-header">
          <h1 class="entry-title">博客名称：{{ title }}</h1>
          <div class="entry-meta">
            <span class="posted-on">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                t="1666710231448"
                class="icon"
                viewBox="-10 -10 1024 1024"
                version="1.1"
                p-id="2552"
                width="16"
                height="16"
              >
                <path
                  d="M805.49888 981.49888l-602.3168-0.76288c-86.59456-8.192-154.56768-81.3056-154.56768-170.01472L48.6144 291.73248c0-94.1568 76.60032-170.75712 170.7776-170.75712l586.10176 0c94.1568 0 170.73152 76.60032 170.73152 170.75712L976.22528 810.7008C976.2304 904.87296 899.63008 981.49888 805.49888 981.49888L805.49888 981.49888zM219.3664 190.57152c-55.79776 0-101.20192 45.38368-101.20192 101.18144l0 518.96832c0 55.79776 45.40416 101.20704 101.20192 101.20704l586.13248 0c55.77728 0 101.16096-45.40928 101.16096-101.20704L906.65984 291.73248c0-55.79776-45.38368-101.18656-101.16096-101.18656L219.3664 190.54592 219.3664 190.57152zM698.84416 290.51904c-25.60512 0-46.38208-20.77696-46.38208-46.38208l0-158.6688c0-25.6 20.77696-46.38208 46.38208-46.38208 25.6 0 46.38208 20.78208 46.38208 46.38208L745.22624 244.1216C745.22624 269.7472 724.46976 290.51904 698.84416 290.51904L698.84416 290.51904zM315.65824 290.51904c-25.60512 0-46.38208-20.77696-46.38208-46.38208l0-158.6688c0-25.6 20.77696-46.38208 46.38208-46.38208 25.6 0 46.38208 20.78208 46.38208 46.38208L362.04032 244.1216C362.04032 269.7472 341.28896 290.51904 315.65824 290.51904L315.65824 290.51904zM534.8864 794.78784l-44.27264 0c-25.6 0-46.38208-20.77696-46.38208-46.38208 0-25.6 20.78208-46.38208 46.38208-46.38208l44.27264 0c25.6 0 46.38208 20.78208 46.38208 46.38208C581.26848 774.01088 560.4864 794.78784 534.8864 794.78784L534.8864 794.78784zM930.79552 452.608 121.24672 452.608c-25.60512 0-46.38208-20.78208-46.38208-46.38208 0-25.60512 20.77696-46.38208 46.38208-46.38208l809.5744 0c25.6 0 46.38208 20.77696 46.38208 46.38208C977.2032 431.82592 956.42624 452.608 930.79552 452.608L930.79552 452.608zM327.92576 649.03168l-44.27264 0c-25.6 0-46.38208-20.78208-46.38208-46.38208 0-25.60512 20.78208-46.38208 46.38208-46.38208l44.27264 0c25.6 0 46.38208 20.77696 46.38208 46.38208C374.30784 628.25472 353.52576 649.03168 327.92576 649.03168L327.92576 649.03168zM534.8864 649.03168l-44.27264 0c-25.6 0-46.38208-20.78208-46.38208-46.38208 0-25.60512 20.78208-46.38208 46.38208-46.38208l44.27264 0c25.6 0 46.38208 20.77696 46.38208 46.38208S560.4864 649.03168 534.8864 649.03168L534.8864 649.03168zM741.27872 649.03168l-44.26752 0c-25.60512 0-46.38208-20.78208-46.38208-46.38208 0-25.60512 20.77696-46.38208 46.38208-46.38208l44.26752 0c25.60512 0 46.38208 20.77696 46.38208 46.38208C787.6608 628.25472 766.90944 649.03168 741.27872 649.03168L741.27872 649.03168zM327.92576 794.78784l-44.27264 0c-25.6 0-46.38208-20.77696-46.38208-46.38208 0-25.6 20.78208-46.38208 46.38208-46.38208l44.27264 0c25.6 0 46.38208 20.78208 46.38208 46.38208C374.30784 774.01088 353.52576 794.78784 327.92576 794.78784L327.92576 794.78784zM741.27872 794.78784l-44.26752 0c-25.60512 0-46.38208-20.77696-46.38208-46.38208 0-25.6 20.77696-46.38208 46.38208-46.38208l44.26752 0c25.60512 0 46.38208 20.78208 46.38208 46.38208C787.6608 774.01088 766.90944 794.78784 741.27872 794.78784L741.27872 794.78784z"
                  p-id="2553"
                  fill="#8a8a8a"
                />
              </svg>
              <time class="entry-date"> 收录时间:{{ time }} /</time>
            </span>
            <span class="cat-links">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                t="1666713627994"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                p-id="3995"
                width="16"
                height="16"
              >
                <path
                  d="M512 32a480 480 0 1 0 480 480A480 480 0 0 0 512 32z m-70.72 288l-116.8 165.12a252.48 252.48 0 0 0 39.36 12.8s246.08-112.96 246.08 42.24-168 341.12-186.24 344.64a38.4 38.4 0 0 1-39.68-24.96c-8.96-16 9.92-136.96 0-157.12s-32-17.92-45.12-35.52A109.12 109.12 0 0 1 312 608a160 160 0 0 1 14.72-61.44 418.56 418.56 0 0 1-189.44-160c3.52-12.48 7.36-24.32 11.52-35.84A397.76 397.76 0 0 1 494.08 115.2a115.2 115.2 0 0 1 16.64 6.72C502.08 128 453.76 160 503.36 192a112.96 112.96 0 0 1 45.76 42.24c14.72 34.56-40.96 52.8-64 65.92-144.96 82.88-186.88 83.84-192 128a52.8 52.8 0 0 0 31.36 56z m343.68-19.2a32 32 0 0 0 2.88-12.8c0-18.24-28.8-26.24-38.08-40.96s3.84-28.48 20.8-37.44a394.24 394.24 0 0 1 115.2 436.8c-7.68-96-45.76-84.48-45.76-84.48a122.88 122.88 0 0 1-122.88-193.92c18.88-23.68 55.36-40 67.84-67.2z"
                  fill="#8a8a8a"
                  p-id="3996"
                />
              </svg>
              <span class="hot"> 博客热度: 6411</span>
            </span>
          </div>
          <!-- .entry-meta -->
        </header>

        <div class="single-thumb">
          <div class="image-preview">
            <el-image
              style="width: 700px; height: 466px"
              :src="previewImgUrl"
              :preview-src-list="srcList"
            >
            </el-image>
          </div>
        </div>

        <div class="entry-content">
          <p class="blog-preview">
            ↑
            博客预览（收录时的截图）封面是上传的第一张，点击即可进入所有图片大图预览
          </p>
          <div class="desc">
            <div class="blog-address">
              网址:
              <span class="blog-url" @click="gotoBlog">{{
                blogUrl + name + blog
              }}</span>
              (点击前往)
            </div>
            <h4>博客简介：</h4>
          </div>
        </div>
        <div v-html="res_long" class="blog-brief-introduction"></div>
        <div class="desc12">
          <div>前端文件描述信息修改 :</div>
          <mavon-editor
            :placeholder="placeholder"
            v-model="frontMsgForm.content"
            @change="changeFrontMsg"
          />
        </div>
        <div>
          <el-button type="primary" @click="UploadFrontMsg()">修改</el-button>
        </div>
        <div class="desc16">
          <span class="desc">设置文件可见等级 :</span>
          <el-tag :class="{ choose: choseIndex === 1 }" @click="choseIndex = 1"
            >公开</el-tag
          >
          <el-tag :class="{ choose: choseIndex === 2 }" @click="choseIndex = 2"
            >好友可见</el-tag
          >
          <el-tag :class="{ choose: choseIndex === 3 }" @click="choseIndex = 3"
            >仅自己可见</el-tag
          >
        </div>
        <div class="desc17">
          <span class="title">文件下载等级 :</span>
          <el-tag
            :class="{ choose: upblodIndex === 1 }"
            @click="upblodIndex = 1"
            >所有人可下载</el-tag
          >
          <el-tag
            :class="{ choose: upblodIndex === 2 }"
            @click="upblodIndex = 2"
            >仅好友可下载</el-tag
          >
          <el-tag
            :class="{ choose: upblodIndex === 3 }"
            @click="upblodIndex = 3"
            >仅自己可下载</el-tag
          >
        </div>
        <div style="margin-top: 20px">
          <el-button type="primary" @click="upbateLevel()"
            >修改可见等级</el-button
          >
        </div>
      </article>
      <div style="height: 60rem; margin-bottom: 200rem"></div>
    </div>
  </div>
</template>

<script>
import { getOneZipMsg, uploadFrontMsg, getFrontFilePic } from '@/api/blog.js'
import { getUserMsg } from '@/api/user.js'
import {
  getZipfileSee,
  getZipfileDownload,
  setZipfile,
  setZipDownload,
} from '@/api/quarantine'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  async created() {
    const res = await getZipfileSee(this.$route.params.id)
    const res1 = await getZipfileDownload(this.$route.params.id)
    this.choseIndex = res.data.Level
    this.upblodIndex = res1.data.Level
  },
  components: { mavonEditor },
  data() {
    return {
      title: '',
      time: '',
      placeholder: 'F10开启关闭全屏编辑模式',
      baseurl: 'http://fileimg.mgaronya.com/',
      previewImgUrl: '',
      srcList: [],
      res_long: '',
      blogUrl: 'http://blog_usr.mgaronya.com/',
      name: '',
      blog: '',
      choseIndex: 0,
      upblodIndex: 0,
      frontMsgForm: {
        title: '',
        content: '',
        res_long: '',
        res_short: '',
      },
    }
  },
  mounted() {
    this.GetBlogMsg()
    this.GetUserMsg()
  },
  methods: {
    async upbateLevel() {
      await setZipfile(this.$route.params.id, this.choseIndex)
      await setZipDownload(this.$route.params.id, this.upblodIndex)
    },
    async UploadFrontMsg() {
      await uploadFrontMsg(this.$route.params.id, this.frontMsgForm)
      this.frontMsgForm.content = ''
      const res = await getOneZipMsg(this.$route.params.id)
      this.res_long = res.data.file.res_long
      this.blog = res.data.file.res_short
      this.title = res.data.file.title
      this.time = res.data.file.created_at
    },
    changeFrontMsg(value, render) {
      this.frontMsgForm.res_long = render
    },
    async GetBlogMsg() {
      const res = await getOneZipMsg(this.$route.params.id)
      this.res_long = res.data.file.res_long
      this.blog = res.data.file.res_short
      this.title = res.data.file.title
      this.time = res.data.file.created_at
      const data = await getFrontFilePic(this.$route.params.id)
      this.previewImgUrl =
        this.baseurl + data.data.fileImgs[0].id + data.data.fileImgs[0].ext
      data.data.fileImgs.forEach((item) =>
        this.srcList.push(this.baseurl + item.id + item.ext)
      )
    },
    async GetUserMsg() {
      const res = await getUserMsg()
      this.name = res.data.user.Name
    },
    gotoBlog() {
      window.location.replace(this.blogUrl + this.name + this.blog)
    },
  },
}
</script>

<style lang="scss" scoped>
.blog-container {
  background-color: #f5f9f8;
  font-family: 'fontcn', sans-serif;
  padding-top: 5rem;

  .main-content {
    width: 75%;
    margin: 0 auto;
    padding: 1rem 2rem 0 2rem;
    background-color: #fff;
    display: flex;
    border-right: solid 1px #f2f2f3;
    border-left: solid 1px #f2f2f3;

    .left {
      width: 60%;
      border-right: solid 1px #f2f2f3;
      padding: 3rem 0 0 2rem;

      .entry-header {
        .entry-title {
          color: #272727;
          font-size: 36px;
          font-weight: 300;
        }

        .entry-meta {
          font-size: 13px;
          color: #a0a8ab;
          margin-top: 2rem;
          height: 2rem;

          .posted-on {
            .entry-date {
              position: relative;
              top: -3px;
              letter-spacing: 3px;
            }
          }

          .cat-links {
            .hot {
              position: relative;
              top: -3px;
              letter-spacing: 1px;
            }
          }
        }
      }

      .single-thumb {
        .image-preview {
        }
      }

      .entry-content {
        .blog-preview {
          color: #656d6d;
          margin: 1.2rem 0;
        }

        .desc {
          font-weight: 300;

          .blog-address {
            color: #272727;
            margin: 20px 0;
            letter-spacing: 1.5px;

            .blog-url {
              color: #0c9cee;
              letter-spacing: 1px;
              cursor: pointer;
            }
          }
        }
      }
      .desc12 {
        margin: 4rem 0 2rem 0;
        div {
          height: 2rem;
        }
      }

      .desc16 {
        margin: 1rem 0 0 1rem;
        .desc {
          margin-right: 20px;
        }
        .el-tag {
          margin-right: 20px;
          cursor: pointer;
        }
        .choose {
          background-color: skyblue;
        }
      }
      .desc17 {
        margin: 1rem 0 0 1rem;
        .title {
          margin-right: 20px;
        }
        .el-tag {
          margin-right: 20px;
          cursor: pointer;
        }
        .choose {
          background-color: skyblue;
        }
      }
    }
  }
}
.blog-brief-introduction {
  // margin: 20px 0;
}
</style>
