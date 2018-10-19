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
// import {Toast} from 'mint-ui'
export default {
  name: 'App',
  computed: {
    ...mapGetters(['allowBack'])
  },
  created () {
    // let exitAppTicker = 0
    // document.addEventListener('deviceready', function () {
    //   document.addEventListener('backbutton', () => {
    //     // Toast({}'back')
    //     if (this.allowBack) {
    //       return
    //     }
    //     if (exitAppTicker === 0) {
    //       exitAppTicker++
    //       Toast({position: 'bottom', message: '再点一次退出'})
    //       setTimeout(function () {
    //         exitAppTicker = 0
    //       }, 2000)
    //     } else if (exitAppTicker === 1) {
    //       navigator.app.exitApp() // 退出app
    //     }
    //   }, false)
    // })
  },
  mounted () {
    window.onpopstate = () => {
      console.log('back')
      console.log(this.$route.path, '  sss ', this.allowBack)
      // plus.key.addEventListener('backbutton', function () {
      //   // TODO
      // })
      if (!this.allowBack) {
        this.$router.go(1)
      }
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
