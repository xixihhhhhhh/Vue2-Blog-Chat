import requests from './require'
// 获取推荐用户列表
export const getUsers = params => requests({ url: `/hot/user/recomment`, method: 'get', params })
// 获取前端文件访问量
export const getBolgVisitCount = id => requests({ url: `/hot/zipfile/visit/${id}`, method: 'get' })

// 查看前端文件的热度排行
export const getHotBlogs = params => requests({ url: `/hot/zipfile`, method: 'get', params })

// 用户查看前端文件推荐
export const getBlogsRecommend = params => requests({ url: `/hot/zipfile/recomment`, method: 'get', params })
