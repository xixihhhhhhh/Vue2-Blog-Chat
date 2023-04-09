<template>
  <div class="container">
    <div class="content-arer">
      <main class="site-main">
        <header class="entry-header">提交收录</header>
        <div class="entry-content">
          <div class="desc">
            <div class="desc1">收录途径：</div>
            <div class="desc2">1、由本站站长主动添加;</div>
            <div class="desc3">2、博主自助申请,请在本页提交。</div>
            <div class="desc4">基本要求：</div>
            <div class="desc5">
              1、限个人日志类博客,纯技术类、自媒体、采集类、资源类、网赚、资讯类、含违规内容等博客不收录。
            </div>
            <div class="desc6">
              2、拥有自己的域名和空间,暂不收录如lofter/tumblr等由第三方托管的站点。
            </div>
            <div class="desc7">
              本站会不定期进行审核，并综合考虑收录与否，请留意邮件通知。
            </div>
            <div class="desc8">提交你的博客:</div>
            <div class="desc9">
              <span> 前端文件 :</span>
              <el-upload
                class="upload-demo"
                action="lei"
                :http-request="httpRequest"
                :on-change="handleChange"
                :file-list="fileList"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">
                  只能上传zip文件,且不超过500kb
                </div>
              </el-upload>
            </div>
            <div class="desc10">
              <span>前端文件可运行目录(需要带 / ) :</span>
              <el-input
                placeholder="填写前端文件可运行目录"
                v-model="frontMsgForm.res_short"
              ></el-input>
            </div>
            <div class="desc11">
              <span>前端文件标题 :</span>
              <el-input
                placeholder="填写前端文件标题"
                v-model="frontMsgForm.title"
              ></el-input>
            </div>
            <div class="desc12">
              <div>前端文件描述信息 :</div>
              <mavon-editor
                :placeholder="placeholder"
                v-model="frontMsgForm.content"
                @change="changeFrontMsg"
              />
            </div>
            <div class="desc13">
              <span>前端文件描述图片 :</span>
              <div></div>
              <div :style="imgHeight">
                <el-upload
                  action=""
                  list-type="picture-card"
                  :on-change="change"
                  :on-preview="handlePictureCardPreview"
                  :auto-upload="false"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
              </div>
            </div>
            <div class="desc14">
              <el-checkbox v-model="checked">请勾选此处</el-checkbox>
            </div>
            <div class="desc16">
              <span class="desc">设置文件可见等级 :</span>
              <el-tag
                :class="{ choose: choseIndex === 1 }"
                @click="choseIndex = 1"
                >公开</el-tag
              >
              <el-tag
                :class="{ choose: choseIndex === 2 }"
                @click="choseIndex = 2"
                >好友可见</el-tag
              >
              <el-tag
                :class="{ choose: choseIndex === 3 }"
                @click="choseIndex = 3"
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
            <div class="desc18">
              <el-tag
                :key="tag"
                v-for="tag in dynamicTags"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
              >
                {{ tag }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput"
                >+ New Tag</el-button
              >
            </div>
            <div class="desc15">
              <el-button type="primary" @click="submit"
                >填 好 了 , 提 交 !</el-button
              >
            </div>
            <div style="height: 20rem"></div>
          </div>
        </div>
      </main>
    </div>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { uploadFrontFile, uploadFrontMsg, uploadFrontImg } from '@/api/blog.js'
import { setZipfile, setZipDownload } from '@/api/quarantine'
import { setFileLabel } from '@/api/label'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
  data() {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      choseIndex: 0,
      upblodIndex: 0,
      checked: false,
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      imgList: [],
      frontMsgForm: {
        title: '',
        content: '',
        res_long: '',
        res_short: '',
      },
      placeholder: 'F10开启关闭全屏编辑模式',
    }
  },
  components: { mavonEditor },
  mounted() {},
  computed: {
    imgHeight() {
      let number = Math.floor(this.imgList.length / 3) + 1
      return { height: number * 9.2 + 'rem' }
    },
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    handleChange(file, fileList) {
      if (file.status !== 'ready') return
      if (fileList.length > 0) this.fileList = [fileList[fileList.length - 1]]
      if (this.fileList[0].raw.type !== 'application/x-zip-compressed')
        return this.$message.error('请上传zip文件 !')
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    change(file, fileList) {
      //将每次图片数组变化的时候，实时的进行监听，更改数组里面的图片数据
      var arr = []
      fileList.forEach((item) => {
        arr.push(item.raw)
      })
      this.imgList = arr
    },
    httpRequest() {},
    async submit() {
      if (this.fileList.length === 0)
        return this.$message.error('上传前端文件不能为空')
      if (this.fileList[0].raw.type !== 'application/x-zip-compressed')
        return this.$message.error('请上传zip文件 !')
      if (this.frontMsgForm.title.length <= 0)
        return this.$message.error('前端文件标题不能为空 !')
      if (this.frontMsgForm.content.length <= 0)
        return this.$message.error('前端文件描述信息不能为空 !')
      if (this.frontMsgForm.res_short.length <= 0)
        return this.$message.error('前端文件可运行目录不能为空 !')
      if (this.choseIndex === 0) {
        return this.$message.error('请设置可见等级 !')
      }
      if (this.upblodIndex === 0) {
        return this.$message.error('请设置下载等级 !')
      }
      let param = new FormData()
      param.append('file', this.fileList[0].raw)
      const res = await uploadFrontFile(param)
      const data = await uploadFrontMsg(res.data.file.id, this.frontMsgForm)
      await setZipfile(res.data.file.id, this.choseIndex)
      await setZipDownload(res.data.file.id, this.upblodIndex)
      for (let i = 0; i < this.dynamicTags.length; i++){
        await setFileLabel(res.data.file.id, {label:this.dynamicTags[i]})
      }
      if (this.imgList.length <= 0)
        return this.$message.error('前端文件描述图片不能为空 !')
      // imgFile.append('file', this.imgList[0])
      // this.imgList.forEach((item) => imgFile.append('file', item))
      for (let i = 0; i < this.imgList.length; i++) {
        let imgFile = new FormData()
        imgFile.append('file', this.imgList[i])
        await uploadFrontImg(res.data.file.id, imgFile)
      }
      if (data.code === 200) this.$message.success('上传成功')
      setTimeout(() => {
        location.reload()
      }, 1000)
    },
    changeFrontMsg(value, render) {
      this.frontMsgForm.res_long = render
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  background-color: #f5f9f8;
  font-family: Georgia, 'Times New Roman', Times, serif;

  .content-arer {
    width: 70%;
    margin: 0 auto;
    background-color: #fff;
    padding-top: 4rem;

    .site-main {
      width: 42rem;
      font-size: 1rem;

      .entry-header {
        margin: 4rem 0 0 4rem;
        font-size: 2.5rem;
        font-weight: 200;
      }
      .desc {
        .desc1 {
          color: #e56600;
          font-weight: 600;
          font-size: 20px;
          margin: 2rem 0 0 6rem;
        }

        .desc2 {
          color: #656d6d;
          margin: 2rem 0 0 6rem;
        }
        .desc3 {
          color: #656d6d;
          margin: 2rem 0 0 6rem;
        }
        .desc4 {
          margin: 2rem 0 0 6rem;
          color: #e56600;
          font-weight: 600;
          font-size: 1.25rem;
        }
        .desc5 {
          margin: 2rem 0 0 6rem;
          line-height: 2rem;
          color: #e53333;
        }
        .desc6 {
          margin: 0 0 0 6rem;
          line-height: 2rem;
          color: #656d6d;
        }
        .desc7 {
          margin: 1rem 0 0 6rem;
          line-height: 2rem;
          color: #656d6d;
          font-weight: 700;
          font-size: 1.2rem;
        }
        .desc8 {
          margin: 1rem 0 0 6rem;
          line-height: 2rem;
          color: #656d6d;
          font-weight: 300;
          font-size: 1.875rem;
        }
        .desc9 {
          margin: 1rem 0 0 6rem;
          display: flex;
          justify-content: space-between;
          padding-right: 4rem;
        }
        .desc10 {
          margin: 1rem 0 2rem 6rem;
          line-height: 2rem;

          div {
            height: 2rem;
          }
        }
        .desc11 {
          margin: 1rem 0 2rem 6rem;
          line-height: 2rem;

          div {
            height: 2rem;
          }
        }
        .desc12 {
          margin: 1rem 0 2rem 6rem;
          div {
            height: 2rem;
          }
        }
        .desc13 {
          margin: 1rem 0 0 6rem;

          > div {
            height: 1rem;
            margin-bottom: 1rem;
          }
        }
        .desc14 {
          margin: 1rem 0 0 6rem;
        }
        .desc15 {
          margin: 1rem 0 0 6rem;
        }
        .desc16 {
          margin: 1rem 0 0 6rem;
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
          margin: 1rem 0 0 6rem;
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
        .desc18 {
          margin: 1rem 0 0 6rem;
          .el-tag + .el-tag {
            margin-left: 10px;
          }
          .button-new-tag {
            margin-left: 10px;
            height: 32px;
            line-height: 30px;
            padding-top: 0;
            padding-bottom: 0;
          }
          .input-new-tag {
            width: 90px;
            margin-left: 10px;
            vertical-align: bottom;
          }
        }
      }
    }
  }
}

.el-upload {
  display: block;
  height: 100%;
  width: 100%;
}
</style>
