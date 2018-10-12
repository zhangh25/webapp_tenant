<template>
  <div class=" finish">
    <img src="./icon/icon_yuekandingdan@2x.png" width="143" alt="">
    <div style="padding-top: 40px;padding-bottom: 12px">你的约看已成功提交</div>
    <div>你的管家会尽快联系您确认看房时间和地点</div>
    <Button @click="$router.push('/record')">查看约看</Button>
    <Button class="btn" type="primary" @click="$router.push('/list')">继续找房</Button>
  </div>
</template>

<script>
import {Button} from 'mint-ui'
export default {
  components: {
    Button
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.finish {
  padding-top: 49px;
  text-align: center;
  font-size: 14px;
  color: @gray;
}
.btn {
  margin-left: 30px;
  margin-top: 30px;
  background-color: @pink
}
</style>
