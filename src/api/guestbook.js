import requests from './require'
// 获取留言板某一条留言
export const getGuestOne = (id, params = {}) => requests({ url: `/guestbook/${id}`, method: 'GET', params: params })
// 获取个人留言列表
export const getMyGuest = ( params = {}) => requests({ url: `/guestbook`, method: 'GET', params })
// 发送留言
export const sendGuestOne = (id, data) => requests({ url: `/guestbook/${id}`, method: 'post', data })
