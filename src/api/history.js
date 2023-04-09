import requests from './require'

// 前端文件访问量加一
export const visitPlusOne = id => requests({ url: `/history/zipfile/${id}`, method: 'post' })
// 获取用户前端文件访问历史记录
export const getVisitHistory = params => requests({ url: `/history/zipfile`, method: 'get', params })
