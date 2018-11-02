<template>
  <div class=" finish">
    <csheader>约看订单</csheader>
    <!-- <img src="./icon/icon_yuekandingdan@2x.png" width="143" alt=""> -->
    <icon-svg icon-class="gou" class="icon"></icon-svg>
    <div style="padding-top: 40px;padding-bottom: 12px">你的约看已成功提交</div>
    <div class="ad">你的管家会尽快联系您确认看房时间和地点</div>
    <Button @click="$router.push('/record')">查看约看</Button>
    <Button class="btn" type="primary" @click="$router.push('/list')">继续找房</Button>
  </div>
</template>

<script>
import csheader from '@/components/header'
import {Button} from 'mint-ui'
export default {
  components: {
    Button, csheader
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.finish {
  text-align: center;
  font-size: 14px;
  //
  .ad{
    color: @gray;
  }
}
.icon{
  font-size: 60px;
  color: @pink;
  margin-top: 40px;
}
.btn {
  margin-left: 30px;
  margin-top: 30px;
  background-color: @pink
}
</style>
