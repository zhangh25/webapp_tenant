import request from '@/utils/request'
// POST
// /queryUserOrderAppoint
// 查看用户预约记录
export function queryUserOrderAppoint (type) {
  return request({
    url: '/queryUserOrderAppoint',
    method: 'get',
    params: {role: 1, type}
  })
}
// POST
// /cancelOrderAppoint
// 用户取消预约记录
export function cancelOrderAppoint (id) {
  return request({
    url: '/cancelOrderAppoint',
    method: 'post',
    params: {id}
  })
}
// POST
// /delOrderAppoint
// 用户删除预约记录
export function delOrderAppoint (id) {
  return request({
    url: '/delOrderAppoint',
    method: 'post',
    params: {id}
  })
}

// POST
// /saveOrderAppoint
// 生成预约单
export function saveOrderAppoint (data) {
  return request({
    url: '/saveOrderAppoint',
    method: 'post',
    data
  })
}

// POST
// /contractApply
// 用户签约申请
export function contractApply (data) {
  return request({
    url: '/contractApply',
    method: 'post',
    data
  })
}

// GET
// /queryLeaseOrder
// 查询租约记录
export function queryLeaseOrder (queryType, startRow, rows) {
  startRow = startRow | 1
  rows = rows | 10
  return request({
    url: '/queryLeaseOrder',
    method: 'get',
    params: {queryType, startRow, rows}
  })
}
// POST
// /applyRetireRoom
// 用户申请退房
export function applyRetireRoom (data) {
  return request({
    url: '/applyRetireRoom',
    method: 'post',
    data
  })
}

// GET
// /queryLeaseOrderDetail
// 查询租约记录明细
export function queryLeaseOrderDetail (id) {
  return request({
    url: '/queryLeaseOrderDetail',
    method: 'get',
    params: {id}
  })
}
// GET
// /cancelApply
// 取消签约申请
export function cancelApply (id, cancelCause) {
  return request({
    url: '/cancelApply',
    method: 'get',
    params: {id, cancelCause, role: 1}
  })
}
// GET
// /queryCauseConfigure
// 取消签约订单原因
export function queryCauseConfigure () {
  return request({
    url: '/queryCauseConfigure',
    method: 'get',
    params: {role: 1}
  })
}
// POST
// /cancelApplyRetireRoom
// 用户取消申请退房
export function cancelApplyRetireRoom (id) {
  return request({
    url: '/cancelApplyRetireRoom',
    method: 'post',
    params: {id}
  })
}
