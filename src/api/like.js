import requests from './require'
// 点赞前端文件
export const fileLike = (id) => requests({ url: `/file/like/create/${id}`, method: 'put' })
// 点赞前端文件
export const commentLike = (id) => requests({ url: `/comment/like/create/${id}`, method: 'put' })
// 获取评论点赞列表
export const showCommentLike = (id) => requests({ url: `/comment/like/show/${id}`, method: 'get' })
// 获取前端文件点赞列表
export const showFileLike = (id) => requests({ url: `/file/like/show/${id}`, method: 'get' })
// 取消评论点赞
export const deleteCommentLike = (id) => requests({ url: `/comment/like/delete/${id}`, method: 'DELETE' })
// 取消前端文件点赞
export const deleteFileLike = (id) => requests({ url: `/file/like/delete/${id}`, method: 'DELETE' })
// 获取前端文件点赞列表
export const fileLikeList = (id) => requests({ url: `/file/like/list/${id}`, method: 'GET' })