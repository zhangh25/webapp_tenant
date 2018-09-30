<template>
  <div class="deatils">
    <csheader class="head">消息详情</csheader>
    <div class="con">
      <div class="title">温馨提示：城宿免押金活动即将结束！</div>
      <div class="label">活动于2018年9月14日18：00截止，活动结束后权益将自动失效......</div>
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
@import '../../styles/mixin.less';
.head {
  text-align: center;
  font-size: 17px;
}
.con{
  padding-top: 15px;
  background-color: #fff;
}
.title{
    font-size: 14px;
    padding: 0 15px;
  }
  .label{
    line-height: 18px;
    padding: 15px;
    color: @gray;
  }
</style>
