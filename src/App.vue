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
import {Toast, MessageBox} from 'mint-ui'
import {getAppVersion} from '@/api/user'
// import {isWeiXin} from '@/utils/tool'
export default {
  name: 'App',
  computed: {
    ...mapGetters(['allowBack', 'version'])
  },
  created () {
    // this.back()
    let _this = this
    let exitAppTicker = 0 // cordova build android --release
    // _this.getVersion()
    document.addEventListener('deviceready', function () { // v1.1.xx-日期
      navigator.splashscreen.hide()
      _this.$store.dispatch('setIsapp', true)
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
      /* eslint-disable */
      cordova.getAppVersion.getVersionNumber().then(version => {
        _this.$store.dispatch('setVersion', version)
        _this.getVersion()
      })
    })
  },
  mounted () {
    this.getWXcode()
  },
  methods: {
    getVersion () {
      // alert('ver')
      this.$nextTick(_ => {
      // this.back()
        // getAppVersion('1.1.2').then(res => {
        getAppVersion(this.version).then(res => {
          // alert('res')
          console.log(res)
          if (res.code === 1) {
            this.comporeVersion(res.data)
          }
        })
      })
    },
    getWXcode () {
      // if (isWeiXin) {
      //   const appid = 'wx388ad7a1a03663df'
      //   const url = window.location.href
      //   let code = this.getUrlParam('code')
      //   if (!code) {
      //     window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${url}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
      //   } else {
      //     this.$store.dispatch('', code)
      //   }
      // }
    },
    comporeVersion (data) {
      // if ()
      // let curV = this.version.split('.')
      if (data.forced) {
        MessageBox({
          title: '',
          message: '发现新版本，请到应用市场去更新',
          confirmButtonText: '确定',
          closeOnClickModal: false
        }).then(res => {
          if (res === 'confirm') {
            // window.location.href = data.url
            // window.open(data.url,'_blank')
          }
        })
        console.log('强制更新')
      } else if (data.canUpdate) {
        MessageBox({
          title: '',
          message: '发现新版本，请到应用市场去更新',
          showCancelButton: true,
          confirmButtonText: '确定',
          closeOnClickModal: false
        }).then(res => {
          if (res === 'confirm') {
            // window.location.href = data.url
            // window.open(data.url,'_blank')
          }
        })
        console.log('更新')
      } else {
        console.log('最新版本')
      }
      // data.version.split('.')
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
