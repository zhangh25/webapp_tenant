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
    method: 'get',
    params: {role: 1}
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
    data
  })
}
// POST
// /csowner/getOwnerInfo
// 获取房东信息
export function getOwnerInfo () {
  return request({
    url: '/csowner/getOwnerInfo',
    method: 'post'
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

// POST
// /common/saveSysFeedback
// 添加意见反馈
export function saveSysFeedback (content) {
  return request({
    url: '/common/saveSysFeedback',
    method: 'post',
    data: {roleType: 0, content}
  })
}
// POST
// /common/RealName
// 实名认证
export function realName (data) {
  return request({
    url: '/common/RealName',
    method: 'get',
    params: data
  })
}
// POST
// /csusers/replacePhone
// 更换手机号
export function replacePhone (data) {
  return request({
    url: '/csusers/replacePhone',
    method: 'post',
    params: data
  })
}
// GET
// /common/app/version
// 版本号判断更新
export function getAppVersion (version) {
  return request({
    url: '/common/app/version',
    method: 'get',
    params: {appType: 2, device: 'android', version}
    // params: {appType: 2, device: 'android', version: '1.1.01'}
  })
}
