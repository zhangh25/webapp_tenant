import request from '@/utils/request'
// POST
// /queryUsersMessage
// 查询租客站内信
export function queryUsersMessage () {
  return request({
    url: '/queryUsersMessage',
    method: 'post'
  })
}
// POST
// /queryUsersMessageDetails
// 租客站内信明细
export function queryUsersMessageDetails (type) {
  return request({
    url: '/queryUsersMessageDetails',
    method: 'post',
    params: {type}
  })
}
// GET
// /usersDelMessage
// 租客删除站内信
export function usersDelMessage (id) {
  return request({
    url: '/usersDelMessage',
    method: 'get',
    params: {id}
  })
}
// GET
// /usersReadMessage
// 租客读取站内信
export function usersReadMessage (id) {
  return request({
    url: '/usersReadMessage',
    method: 'get',
    params: {id}
  })
}
