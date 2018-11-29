<template>
  <div>
    <csheader>在线签约流程</csheader>
    <div class="content">
      <img src="./icon/liucheng.jpg" alt="">
    </div>
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
.content {
  height: calc(100vh - 44px);
  overflow: scroll;
  img{
    width: 100%;
  }
}
</style>
