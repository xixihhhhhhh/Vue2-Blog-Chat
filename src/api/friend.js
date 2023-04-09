import requests from './require'

// 发送好友申请
export const sendFriendReq = id => requests({ url: `/friend/applying/${id}`, method: 'PUT' })

// 查看用户正在被申请，暂未通过的用户列表
export const getFriendReqList = () => requests({ url: `/friend/show/applied`, method: 'GET' })

// 查看用户正在申请，暂未被通过的用户列表
export const getFriendReqListApplied = () => requests({ url: `/friend/show/applying`, method: 'GET' })
// 接受好友申请
export const acceptFriendReq = id => requests({ url: `/friend/applied/${id}`, method: 'PUT' })
// 拒绝好友申请
export const rejectFriendReq = id => requests({ url: `/friend/refused/${id}`, method: 'PUT' })
// 获取好友列表
export const getFriendList = () => requests({ url: `/friend/show`, method: 'GET' })

