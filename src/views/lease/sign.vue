<template>
  <div>
    <iframe :src="pacturl" frameborder="0" name="hetong" class="iframe" ref="iframe" @change="ichange"></iframe>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {Indicator} from 'mint-ui'
import {userPaySuccess} from '@/api/appoint'
export default {
  data () {
    return {
      loading: false
      // ind: null
    }
  },
  computed: {
    ...mapGetters(['pacturl', 'leaseId'])
  },
  created () {
  },
  mounted () {
    Indicator.open()
    // let _this = this
    this.$refs.iframe.onload = function () {
      console.log('load')
      Indicator.close()
      // document.getElementsByClassName('index-header')
      // window.location
      try {
        console.log(this.contentWindow.location.hash)
      } catch (err) {
        console.log(err)
        console.log('ssss')
      }
      // this.contentWindow.onhashchange = function () {
      //   console.log('change')
      // }
      // document.f
      console.log(this.src)
      if (this.src.indexOf('/link/sign/redirect') > 0) {
        // console.log('/e3i7tW28zdSkOom')
        // this.$router.go(-1)
        userPaySuccess(this.leaseId).then(res => {
          if (res.code === 1) {
            this.$router.replace(`/leaseDetailStep/${this.leaseId}`)
          }
        })
      }
    }
  },
  methods: {
    ichange () {
      console.log('change')
    }
  },
  beforeDestroy () {
    Indicator.close()
  }
}
</script>

<style lang="less" scoped>
.iframe {
  position: fixed;
  width: 100%;
  height: 100%;
}
</style>
