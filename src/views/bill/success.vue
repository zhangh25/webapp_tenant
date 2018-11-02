<template>
  <div>
    <csheader>支付订单</csheader>
    <div class="content">
      <icon-svg icon-class="gou" class="icon"></icon-svg>
      <div class="txt">支付成功</div>
      <div style="padding-top: 65px">
        <Button @click="see">查看订单</Button>
        <Button @click="back" style="margin-left: 65px; width: 84px">返回</Button>
      </div>
    </div>
  </div>
</template>

<script>
import csheader from '@/components/header'
import {Button} from 'mint-ui'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['pay'])
  },
  methods: {
    see () {
      this.$router.push(`/leaseDetail/${this.pay.id}`)
    },
    back () {
      this.$router.go(-2)
      // this
    }
  },
  components: {
    csheader, Button
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.content {
  text-align: center;
  padding-top: 55px;
  .icon {
    font-size: 83px;
    color: @themeColor;
  }
  .txt {
    padding-top: 40px;
    font-size: 16px;
  }
}
</style>
