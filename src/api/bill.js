import request from '@/utils/request'
// POST
// /queryUserBill
// 查询用户账单
export function queryUserBill (type) {
  return request({
    url: '/queryUserBill',
    method: 'post',
    params: {type}
  })
}
