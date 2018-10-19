import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
Router.prototype.goBack = function (a) {
  console.log('go-------lll')
  window.history.go(-1)
}
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
      meta: {quit: true},
      component: () => import('@/views/home/index')
    },
    {
      path: '/houseDetails',
      name: 'houseDetails',
      component: () => import('@/views/houses/details') // appointment
    },
    {
      path: '/appointment', // 预约看房
      name: 'appointment',
      component: () => import('@/views/houses/appointment') // appointment contract
    },
    {
      path: '/finsh', // 预约成功
      name: 'finsh',
      component: () => import('@/views/houses/finsh') // appointment contract
    },
    {
      path: '/contract', // 签约
      name: 'contract',
      component: () => import('@/views/houses/contract') // appointment contract
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
      meta: {quit: true},
      component: () => import('@/views/map/index')
    },
    {
      path: '/me', // 我的
      name: 'me',
      meta: {quit: true},
      component: () => import('@/views/me/index')
    },
    {
      path: '/login', // 登录
      name: 'login',
      component: () => import('@/views/me/user/login')
    },
    {
      path: '/personal', // 个人资料
      name: 'personal',
      component: () => import('@/views/me/user/personal')
    },
    {
      path: '/setting', // 设置
      name: 'setting',
      component: () => import('@/views/me/setting/index')
    },
    {
      path: '/phone', // 手机绑定
      name: 'phone',
      component: () => import('@/views/me/setting/phoneBind')
    },
    {
      path: '/problem', // 常见问题
      name: 'problem',
      component: () => import('@/views/me/setting/problem')
    },
    {
      path: '/realname', // 关于城宿
      name: 'realname',
      component: () => import('@/views/me/realname/index')
    },
    {
      path: '/about', // 关于城宿
      name: 'about',
      component: () => import('@/views/me/about')
    },
    {
      path: '/suggest', // 意见提交
      name: 'suggest',
      component: () => import('@/views/me/suggest')
    },
    {
      path: '/message', // 消息
      name: 'msg',
      meta: {quit: true},
      component: () => import('@/views/msg/index')
    },
    {
      path: '/msglist/:type', // 消息列表
      name: 'deatailList',
      component: () => import('@/views/msg/deatailList')
    },
    {
      path: '/msgdetails/:id', // 消息详情
      name: 'msgdetails',
      component: () => import('@/views/msg/details')
    },
    {
      path: '/wish', // 心愿单
      name: 'wish',
      meta: {quit: true},
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
      path: '/leaseCancel/:id', // 租约取消
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
      path: '/bill', // 账单
      name: 'bill',
      component: () => import('@/views/bill/index')
    },
    {
      path: '/billDetail', // 账单详情
      name: 'billdetail',
      component: () => import('@/views/bill/billDetail')
    },
    {
      path: '/wallet', // 钱包
      name: 'wallet',
      component: () => import('@/views/wallet/index')
    },
    {
      path: '/walletDetail', // 钱包
      name: 'walletDetail',
      component: () => import('@/views/wallet/detail')
    },
    {
      path: '/addCard', // 添加银行卡
      name: 'addCard',
      component: () => import('@/views/wallet/addBankCard')
    },
    {
      path: '/validate', // 验证银行卡
      name: 'validate',
      component: () => import('@/views/wallet/validate')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/test11/loadmore')
    }
  ]
})
