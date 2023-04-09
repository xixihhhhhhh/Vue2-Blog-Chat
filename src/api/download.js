import requests from './require'

// 下载文件
export const downloadFile = (id) => requests({
  url: `/zipfile/download/${id}`, method: 'get',
  responseType: 'blob',
  headers: { 'Content-Type': 'application/json; application/octet-stream' },
})