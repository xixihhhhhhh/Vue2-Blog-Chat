<template>
    <div class="allBlog-container">
        <div class="blog-list">
            <header class="entry-header">
                <span class="entry-title">{{ name }}</span>
            </header>
            <div class="user-card">
                <div class="left">
                    <img :src="imgurl" alt="图片不存在">
                </div>
                <div class="right">
                    <div>{{ email }}</div>
                    <div>{{ hobby }}</div>
                </div>
            </div>
            <div class="blog-card-list">
                <header class="entry-header">
                    <span class="entry-title">前端文件列表</span>
                </header>
                <div class="blogs-list">
                    <ul>
                        <li v-for="file in fileList" :key="file.id">
                            <blogCard :file="file" />
                        </li>
                    </ul>
                </div>
            </div>
            <header class="entry-header">
                <span class="entry-title">博客主页</span>
            </header>
            <div class="blog-main">
                <el-button type="primary" @click="gotoBlog">进入{{ name }}的博客主页</el-button>
            </div>
        </div>
    </div>
</template>
  
<script>
import { getOneMsg } from '@/api/user.js'
import { getOthersBlogs, getFrontFilePic, getOneZipMsg } from '@/api/blog.js'
import blogCard from '@/components/blogCard'
export default {
    props: ['id'],
    async created() {
        const res = await getOneMsg(this.$route.params.id)
        this.name = res.data.user.Name
        this.imgurl = this.$store.state.baseurl + res.data.user.Icon
        this.email = res.data.user.Email
        this.hobby = res.data.user.Hobby
        this.blog = res.data.user.Blog
        this.GetFrontFileList()
    },
    data() {
        return {
            blogUrl: 'http://blog_usr.mgaronya.com/',
            name: '',
            imgurl: '',
            email: '',
            hobby: '',
            fileList: [],
            blog: ''
        }
    },
    methods: {
        async GetFrontFileList() {
            const res = await getOthersBlogs(this.$route.params.id, {
                pageNum: 1,
                pageSize: 20,
            })
            for (let i = 0; i < res.data.zipfiles.length; i++) {
                const data = await getFrontFilePic(res.data.zipfiles[i].id)
                const res1 = await getOneZipMsg(res.data.zipfiles[i].id)
                let fillForm = {
                    title: res1.data.file.title,
                    img: data.data.fileImgs || '',
                    id: res.data.zipfiles[i].id
                }
                this.fileList.push(fillForm)
            }
        },
        gotoBlog() {
            window.location.replace(
                this.blogUrl + this.name + this.blog
            )
        },
    },
    components: {
        blogCard
    }
}
</script>
  
<style scoped lang="scss">
.allBlog-container {
    background-color: #f5f9f8;
    font-family: Georgia, 'Times New Roman', Times, serif;
    padding-top: 60px;

    .blog-list {
        width: 80%;
        height: 1000px;
        box-sizing: border-box;
        padding: 60px 0 0 60px;
        margin: 0 auto;
        background-color: #fff;

        .entry-header {
            .entry-title {
                color: #272727;
                font: 36px fontcn, sans-serif;
                margin: 0 0 20px;
                font-weight: 300;
                font-weight: bold;
            }
        }

        .user-card {
            display: flex;

            .left {
                width: 200px;
                height: 200px;
                margin-right: 20px;

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }

            .right {
                display: flex;
                flex-direction: column;
                justify-content: center;
                font-weight: bold;
                font-size: 30px;
            }
        }

        .blogs-list {
            position: relative;

            /* 样式可以根据自己的需求进行修改 */
            ul {
                list-style: none;
                padding: 0;
                margin: 0 auto;
                display: flex;
                flex-wrap: wrap;
            }

            li {
                margin: 10px 0;
            }

            a {
                color: #333;
                text-decoration: none;
            }
        }

        .blog-main {
            height: 200px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>