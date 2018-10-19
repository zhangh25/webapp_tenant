// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/utils/routerback'
import 'mint-ui/lib/style.css'
import '@/styles/index.less'
import '@/icons' // icon
import store from './store'
import * as filters from '@/utils/filters' // global filter
import AMap from 'vue-amap'
Vue.use(AMap)
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.config.productionTip = false

AMap.initAMapApiLoader({
  // 高德的key
  key: '2e154a1399e1df576d301e854f67b46a',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.MarkerClusterer', 'AMap.Geolocation', 'AMap.Geocoder', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
  // AMap.Autocomplete,AMap.PlaceSearch,AMap.MarkerClusterer,AMap.Geocoder,AMap.addToolbar,AMap.Geolocation
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
