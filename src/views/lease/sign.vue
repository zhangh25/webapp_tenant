<template>
  <div>
    <csheader>签字 <div slot="right" @click="success">签字完成</div></csheader>
    <iframe :src="pacturl" frameborder="0" name="hetong" class="iframe" ref="iframe" @change="ichange"></iframe>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {Indicator, MessageBox} from 'mint-ui'
// import {userPaySuccess} from '@/api/appoint'
import csheader from '@/components/header'
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
        // userPaySuccess(this.leaseId).then(res => {
        //   if (res.code === 1) {
        this.$router.replace(`/leaseDetailStep/${this.leaseId}`)
        // }
        // })
      }
    }
  },
  methods: {
    ichange () {
      console.log('change')
    },
    success () {
      MessageBox({
        message: '你已完成签字了吗？',
        showCancelButton: true,
        confirmButtonText: '已完成',
        cancelButtonText: '未完成'
      }).then(s => {
        if (s === 'confirm') {
          this.$router.replace(`/leaseDetailStep/${this.leaseId}`)
        }
      })
    }
  },
  beforeDestroy () {
    Indicator.close()
  },
  components: {
    csheader
  }
}
</script>

<style lang="less" scoped>
.iframe {
  // position: fixed;
  width: 100%;
  // height: 100%;
  height: calc(100vh - 44px);
}
</style>
