import requests from './require'
// 搜索可下载的文件
export const selecttZipDownload = (text, params) => requests({
  url: `/search/zipfile/${text}`, method: 'GET', data: params
})
// 根据用户名搜索好友
export const searchFriendByName = name => requests({ url: `/user/name/${name}`, method: 'get' })
// 根据邮箱搜索好友
export const searchFriendByEmail = email => requests({ url: `/user/email/${email}`,method:'get'})