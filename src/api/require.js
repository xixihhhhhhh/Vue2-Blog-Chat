//对于axios进行二次封装
import axios from 'axios'
//引入进度条
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'

const requests = axios.create({
  baseURL: 'http://api_blog.mgaronya.com',
  timeout: 20000,
})

//请求拦截器
requests.interceptors.request.use((config) => {
  //config：配置对象，对象里面有一个属性很重要，headers请求头
  //进度条开始动
  nprogress.start()
  config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('token')
  return config
})

//响应拦截器
requests.interceptors.response.use(
  (res) => {
    //进度条结束
    nprogress.done()
    return res.data
  },
  (error) => {
    //进度条结束
    nprogress.done()
    return Promise.reject(new Error(error))
  }
)

export default requests
