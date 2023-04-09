import requests from './require'
// 获取博客评论列表
export const getBlogComment = (id, params = {}) => requests({ url: `/comment/pagelist/${id}`, method: 'GET', params: params })
// 创建博客评论
export const createBlogComment = (id, params = {}) => requests({ url: `/comment/${id}`, method: 'POST', data: params })
// 获取博客评论点赞列表
export const getBlogCommentLike = id => requests({ url: `/comment/like/list/${id}`, method: 'GET' })



