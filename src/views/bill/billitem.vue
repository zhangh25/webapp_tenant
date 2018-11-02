<template>
  <div class="pay-info">
    <div class="title">￥{{info.price}}  {{info.name}} <div class="state">{{info.statusName}}</div></div>
    <div class="date">{{info.startDate}}至{{info.endDate}} <div class="right">{{info.payLimit}}前</div></div>
  </div>
</template>

<script>
export default {
  props: {
    info: Object
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.pay-info {
  flex: 1;
  .title {
    font-size: 15px;
    .state {
      float: right;
      color: @pink;
    }
  }
  .date {
    font-size: 12px;
    color: @gray;
    padding-top: 14px;
    .right {
      float: right;
    }
  }
}
</style>
