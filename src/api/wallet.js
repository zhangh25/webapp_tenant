import request from '@/utils/request'
// POST
// /queryUserBill
// 查询用户账单
// export function queryUserBill (type) {
//   return request({
//     url: '/queryUserBill',
//     method: 'post',
//     params: {type}
//   })
// }
// POST
// /common/bindingBank
// 添加银行卡
export function bindingBank (data) {
  return request({
    url: '/common/bindingBank',
    method: 'post',
    data
  })
}
// GET
// /common/queryBankInfo
// 查询银行卡号
export function queryBankInfo (bankCard) {
  return request({
    url: '/common/queryBankInfo',
    method: 'get',
    params: {bankCard, role: 1}
  })
}

// GET
// /common/getUserBankList
// 获取用户银行卡列表
export function getUserBankList () {
  return request({
    url: '/common/getUserBankList',
    method: 'get',
    params: {role: 1}
  })
}
