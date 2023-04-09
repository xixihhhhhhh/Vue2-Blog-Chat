import requests from './require'
// 获取文件收藏状态
export const showFileCollect = (id) => requests({ url: `/zipfile/favorite/show/${id}`, method: 'get' })
// 收藏文件
export const fileCollect = (id) => requests({ url: `/zipfile/favorite/create/${id}`, method: 'PUT' })
// 收藏文件
export const fileCollectDelete = (id) => requests({ url: `/zipfile/favorite/delete/${id}`, method: 'DELETE' })
// 收藏文件
export const fileCollectList = id => requests({ url: `/zipfile/favorite/list/${id}`, method: 'get' })