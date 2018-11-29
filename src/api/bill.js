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

// GET
// /createBankPreOrder
// 银行卡支付生成待支付訂單
export function createBankPreOrder (data) {
  return request({
    url: '/createBankPreOrder',
    method: 'get',
    params: data
  })
}
// POST
// /fastPayAuthorize
// 快捷支付授权
export function fastPayAuthorize (data) {
  return request({
    url: '/fastPayAuthorize',
    method: 'post',
    data
  })
}
// GET
// /newGetAuthorizeCode
// 快捷重新获取授权码
export function newGetAuthorizeCode (no) {
  return request({
    url: '/newGetAuthorizeCode',
    method: 'get',
    params: {'out_trade_no': no}
  })
}
// POST
// /inPayStatus
// 前端支付成功调用该接口,将子账单状态设置为支付中
export function inPayStatus (no) {
  return request({
    url: '/inPayStatus',
    method: 'get',
    params: {'out_trade_no': no, role: 1}
  })
}
// GET
// /createSdkPreOrder
// sdk生成待支付訂單
export function createSdkPreOrder (data) {
  return request({
    url: '/createSdkPreOrder',
    method: 'get',
    params: data
  })
}

// GET
// /createOpenApi
// 公众号支付
export function createOpenApi (data) {
  return request({
    url: '/createOpenApi',
    method: 'get',
    params: data
  })
}
