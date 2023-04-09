import requests from './require1'
// 登录接口
export const login = (params) => requests({ url: '/login', method: 'post', data: params })
// 获取验证码
export const getcode = (id) => requests({ url: `/verify/${id}`, method: 'get' })
// 注册
export const regist = (params) => requests({ url: '/regist', method: 'post', data: params })
// 找回密码
export const findPass = (params) => requests({ url: '/security', method: 'PUT', data: params })

