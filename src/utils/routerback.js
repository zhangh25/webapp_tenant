import router from '@/router'
import store from '@/store'
import {isWeiXin} from '@/utils/tool'
router.beforeEach((to, from, next) => {
  // alert('36632')
  // console.log('to:', to)
  // console.log('from:', from)
  let allowback = true
  /* eslint-disable */ 
  if (!isWeiXin && !store.getters.isfirst) {
    store.dispatch('setFirst')
    next('/guide')
  }
  if (to.meta.quit) {
    // console.log('hhist', history)
    allowback = false
    history.pushState(null, null, location.href)
  }
  store.dispatch('updateBack', allowback)
  next()
})
router.afterEach((to, from) => {
  // ...
  window.scrollTo(0, 0)
})
