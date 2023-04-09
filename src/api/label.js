import requests from './require'
// 获取前端文件标签
export const getFileLabel = (id) => requests({ url: `/file/label/show/${id}`, method: 'get' })
// 获取前端文件标签
export const setFileLabel = (id, params) => requests({ url: `/file/label/create/${id}`, method: 'post', data: params })