import requests from './require'
// 更新可见性状态
export const setZipfile = (id, params) => requests({ url: `/visible/zipfile/${id}`, method: 'PUT', data: params })
// 获取可见性状态
export const getZipfileSee = (id) => requests({ url: `/visible/zipfile/${id}`, method: 'get' })
// 获取可下载状态
export const getZipfileDownload = (id) => requests({ url: `/visible/zipfile/can/${id}`, method: 'get' })
// 更新下载状态
export const setZipDownload = (id, params) => requests({ url: `/visible/zipfile/download/${id}`, method: 'put', data: params })