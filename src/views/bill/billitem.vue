<template>
  <div class="pay-info" @click="$router.push('/billDetail')">
    <div class="title">￥{{info.price}}  {{info.name}}</div>
    <div class="date">{{info.timeRang}}</div>
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
      }
      .date {
        font-size: 12px;
        color: @gray;
        padding-top: 14px;
      }
    }
</style>
