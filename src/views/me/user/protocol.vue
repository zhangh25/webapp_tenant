<template>
  <div>
    <csheader>服务协议</csheader>
    <iframe
        class="main-content"
        src="https://mobile.chengsu.vip/protocol/tenantProtocol.html"
      ></iframe>
  </div>
</template>

<script>
import csheader from '@/components/header'
export default {
  components: {
    csheader
  }
}
</script>

<style lang="less" scoped>
.main-content{
    border: none;
    // flex: 1
    width: 100%;
    height: calc(100vh - 43px);
  }
</style>
