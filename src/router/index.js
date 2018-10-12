import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      redirect: '/map',
      component: HelloWorld
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home/index')
    },
    {
      path: '/houseDetails',
      name: 'houseDetails',
      component: () => import('@/views/houses/details')
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('@/views/houses/list')
    },
    {
      path: '/roomDetails/:id',
      name: 'details',
      component: () => import('@/views/houses/details')
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('@/views/map/index')
    },
    {
      path: '/me', // 我的
      name: 'me',
      component: () => import('@/views/me/index')
    },
    {
      path: '/message', // 消息
      name: 'msg',
      component: () => import('@/views/msg/index')
    },
    {
      path: '/msglist/:type', // 消息列表
      name: 'deatailList',
      component: () => import('@/views/msg/deatailList')
    },
    {
      path: '/msgdetails', // 消息详情
      name: 'msgdetails',
      component: () => import('@/views/msg/details')
    },
    {
      path: '/wish', // 心愿单
      name: 'wish',
      component: () => import('@/views/wish/index')
    },
    {
      path: '/lease', // 租约管理
      name: 'lease',
      component: () => import('@/views/lease/index')
    },
    {
      path: '/leaseRecord', // 租约记录
      name: 'leaserecord',
      component: () => import('@/views/lease/record')
    },
    {
      path: '/checkout', // 退房
      name: 'checkout',
      component: () => import('@/views/lease/checkout')
    },
    {
      path: '/leaseCancel', // 租约取消
      name: 'leaserCancel',
      component: () => import('@/views/lease/cancelCase')
    },
    {
      path: '/leaseDetailStep/:id', // 租约详情 进度
      name: 'leaserDetailstep',
      component: () => import('@/views/lease/detailStep')
    },
    {
      path: '/leaseDetail/:id', // 租约详情
      name: 'leaserDetail',
      component: () => import('@/views/lease/detail')
    },
    {
      path: '/record', // 预约记录
      name: 'record',
      component: () => import('@/views/wish/record')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/test11/loadmore')
    }
  ]
})
