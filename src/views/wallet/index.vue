<template>
  <div>
    <csheader>钱包<div slot="right" class="right" @click="$router.push('/walletDetail')">余额明细</div></csheader>
    <div class="price">￥{{price}}</div>
    <div class="name">余额</div>
    <div class="btns">
      <Button type="primary" size="large">充值</Button>
      <Button size="large" class="btn">提现</Button>
    </div>
    <pw v-model="pws" style="margin-bottom: 10px"></pw>
    <keyword v-model="pws"></keyword>
  </div>

</template>

<script>

import csheader from '@/components/header'
import {Button} from 'mint-ui'
import pw from 'components/password'
import keyword from 'components/keywordInput'
export default {
  data () {
    return {
      price: '0.00',
      pws: []
    }
  },
  components: {
    Button, csheader, keyword, pw
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.right{
  color: @themeColor;
}
.price {
  text-align: center;
  font-size: 30px;
  padding-top: 65px;
}
.name {
  text-align: center;
  padding-top: 20px;
  font-size: 16px;
}
.btns{
  padding: 40px 15px 15px 15px;
  .btn{
    margin-top: 15px;

  }
}
</style>
