<template>
  <div>
    <csheader>支付宝支付
      <div slot="right" @click="finsh">支付完成</div>
    </csheader>
    <iframe :src="alipayurl" frameborder="0" class="iframe"></iframe>
    <!-- <iframe src="https://www.baidu.com" frameborder="0" class="iframe" ref="iframe"></iframe> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import csheader from '@/components/header'
export default {
  computed: {
    ...mapGetters(['alipayurl'])
  },
  components: {
    csheader
  },
  mounted () {
    // let _this = this
    // this.$refs.iframe.onload = function () {
    //   console.log('load')
    //   _this.$store.dispatch('setAlipayState', true)
    // }
  },
  methods: {
    finsh () {
      // console.log('sss')
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.iframe {
  /* position: fixed; */
  width: 100%;
  height: calc(100vh - 44px);
}
</style>
