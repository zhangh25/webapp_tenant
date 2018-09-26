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
      path: '/wish',
      name: 'wish',
      component: () => import('@/views/wish/index')
    }
  ]
})
