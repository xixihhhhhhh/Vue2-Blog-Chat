import requests from './require1'
// 获取当前用户信息
export const getUserMsg = () => requests({ url: '/personal', method: 'GET' })
// 获取一组用户列表
export const getUserList = data => requests({ url: '/personal/users', method: 'POST', data })
// 获取某个用户信息
export const getOneMsg = id => requests({ url: `/personal/${id}`, method: 'GET' })
// 获取某个用户信息
export const getOneUserMsg = (id) => requests({ url: `/personal/${id}`, method: 'GET' })
// 更新用户信息
export const upbateUser = (params) => requests({
  url: '/personal', method: 'put', data: params, headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
})
// 更新用户头像
export const upbateAvatar = (params) =>
  requests({
    url: '/personal/icon',
    method: 'PUT',
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })


