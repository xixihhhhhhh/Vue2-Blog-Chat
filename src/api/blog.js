import requests from './require'

// 获取前端文件列表
export const getFrontFileList = (params) => requests({ url: '/zipfile/showlist', method: 'GET', params })
// 获取前端文件照片
export const getFrontFilePic = (id) => requests({ url: `/zipfile/img/show/${id}`, method: 'GET' })
// 上传前端文件
export const uploadFrontFile = (params) => requests({
  url: '/zipfile/upload', method: 'POST', data: params, headers: {
    'Content-Type': 'multipart/form-data',
  },
})
// 上传前端文件照片
export const uploadFrontImg = (id, params) => requests({
  url: `/zipfile/img/create/${id}`, method: 'POST', data: params, headers: {
    'Content-Type': 'multipart/form-data',
  },
})
// 修改前端文件信息
export const uploadFrontMsg = (id, params) => requests({ url: `/zipfile/update/${id}`, method: 'put', data: params })

// 用户获取自己上传的前端页面列表
export const getUserZipfiles = (params) => requests({ url: '/zipfile/show/mine', method: 'get', params })

// 查询某一前端文件消息
export const getOneZipMsg = (id) => requests({ url: `/zipfile/show/${id}`, method: 'get' })
// 删除某一前端文件
export const deleteOneZip = (id) => requests({ url: `/zipfile/delete/${id}`, method: 'DELETE' })
// 删除某一前端文件
export const choseHomePage = (id) => requests({ url: `/zipfile/choose/${id}`, method: 'GET' })
// 获取某一用户上传的前端页面列表
export const getOthersBlogs = (id, params) => requests({ url: `/zipfile/show/others/${id}`, method: 'GET', params })