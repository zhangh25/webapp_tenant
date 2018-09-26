import request from '@/utils/request'

// POST
// /csusers/sendSmsCode
// 发送短信验证码
export function sendSmsCode (phone, type) {
  return request({
    url: '/csusers/sendSmsCode',
    method: 'post',
    params: {phone, type}
  })
}

// POST
// /csusers/userRegister
// 用户登录/注册
export function userRegister (data) {
  return request({
    url: '/csusers/userRegister',
    method: 'post',
    params: data
  })
}

// POST
// /sys/logout
// 退出登录
export function Logout (token) {
  return request({
    url: '/sys/logout',
    method: 'post'
    // params: {token}
  })
}

// POST
// /csusers/setPassword
// 设置密码
export function setPassword (password) {
  return request({
    url: '/csusers/setPassword',
    method: 'post',
    params: {password}
  })
}

// POST
// /csusers/udpatePassword
// 忘记密码
export function udpatePassword (phone, code, password) {
  return request({
    url: '/csusers/udpatePassword',
    method: 'post',
    params: {phone, code, password}
  })
}
// POST
// /csusers/getUserInfo
// 获取用户信息
export function getUserInfo () {
  return request({
    url: '/csusers/getUserInfo',
    method: 'post'
  })
}
// POST
// /csusers/updateCsUsers
// 修改用户信息
export function updateCsUsers (data) {
  return request({
    url: '/csusers/updateCsUsers',
    method: 'post',
    params: data
  })
}
// GET
// /common/qiniu/token
// 七牛云获取token
export function getQiniuToken () {
  return request({
    url: '/common/qiniu/token',
    method: 'get'
  })
}
