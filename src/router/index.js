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
      path: '/me',
      name: 'me',
      component: () => import('@/views/me/index')
    },
    {
      path: '/message',
      name: 'msg',
      component: () => import('@/views/msg/index')
    },
    {
      path: '/msglist',
      name: 'deatailList',
      component: () => import('@/views/msg/deatailList')
    },
    {
      path: '/msgdetails',
      name: 'msgdetails',
      component: () => import('@/views/msg/details')
    },
    {
      path: '/wish',
      name: 'wish',
      component: () => import('@/views/wish/index')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/test11/loadmore')
    }
  ]
})
