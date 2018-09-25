import request from '@/utils/request'
// GET
// /common/bannerList
// 首页数据
export function homeList () {
  return request({
    url: '/common/bannerList',
    method: 'post'
  })
}
