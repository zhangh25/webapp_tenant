<template>
  <div id="app">
    <!-- <keep-alive> -->
    <router-view/>
    <!-- </keep-alive> -->
    <!-- <tabbar></tabbar> -->
  </div>
</template>

<script>
// import tabbar from '@/components/tabbar/index'
import { mapGetters } from 'vuex'
import {Toast} from 'mint-ui'
export default {
  name: 'App',
  computed: {
    ...mapGetters(['allowBack'])
  },
  created () {
    // this.back()
    let _this = this
    let exitAppTicker = 0 // cordova build android
    document.addEventListener('deviceready', function () { // v1.1.xx-日期
      document.addEventListener('backbutton', () => {
        // window.eventBus.$emit('back')
        // alert(!_this.$route.meta.quit)
        _this.$nextTick(_ => {
          // Toast({}'back')
          if (!_this.$route.meta.quit) {
            _this.$router.go(-1)
            return
          }
          if (exitAppTicker === 0) {
            exitAppTicker++
            Toast({position: 'bottom', message: '再点一次退出'})
            setTimeout(function () {
              exitAppTicker = 0
            }, 2000)
          } else if (exitAppTicker === 1) {
            navigator.app.exitApp() // 退出app
          }
        })
      })
    // cordova.getAppVersion.getVersionNumber().then(function (version) {
    //   // 获取当前app的版本号；
    //   // $scope.now_version=version;
    // })
    })
  },
  mounted () {
    this.$nextTick(_ => {
      // this.back()
    })
    // window.onpopstate = () => {
    //   console.log('back')
    //   console.log(this.$route.path, '  sss ', this.allowBack)
    //   // plus.key.addEventListener('backbutton', function () {
    //   //   // TODO
    //   // })
    //   if (!this.allowBack) {
    //     this.$router.go(1)
    //   }
    // }
  },
  methods: {
    back () {
      let _this = this
      let exitAppTicker = 0 // cordova build android
      document.addEventListener('deviceready', function () { // v1.1.xx-日期
        document.addEventListener('backbutton', () => {
          _this.$nextTick(_ => {
            if (!_this.$route.meta.quit) {
              _this.$router.go(-1)
              return
            }
            if (exitAppTicker === 0) {
              exitAppTicker++
              Toast({position: 'bottom', message: '再点一次退出'})
              setTimeout(function () {
                exitAppTicker = 0
              }, 2000)
            } else if (exitAppTicker === 1) {
              navigator.app.exitApp() // 退出app
            }
          })
        })
      }, false)
      // cordova.getAppVersion.getVersionNumber().then(function (version) {
      //   // 获取当前app的版本号；
      //   // $scope.now_version=version;
      // })
    }
  },
  components: {
    // tabbar
  }
}
</script>

<style>

/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
