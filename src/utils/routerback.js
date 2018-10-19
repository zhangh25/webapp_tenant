import router from '@/router'
import store from '@/store'
router.beforeEach((to, from, next) => {
  console.log('to:', to)
  console.log('from:', from)
  let allowback = true
  if (to.meta.quit) {
    console.log('hhist', history)
    allowback = false
    history.pushState(null, null, location.href)
  }
  next()
  store.dispatch('updateBack', allowback)
})
router.afterEach((to, from) => {
  // ...
  window.scrollTo(0, 0)
})
