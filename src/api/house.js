// POST
// /queryRoomList
// 查看房源列表
import request from '@/utils/request'
export function queryRoomList (data) {
  let temp = JSON.parse(JSON.stringify(data))
  Object.assign(temp, {role: 1})
  return request({
    url: '',
    method: 'post',
    params: temp
  })
}
