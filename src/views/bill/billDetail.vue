<template>
  <div>
    <csheader>账单详情</csheader>
    <div class="detail">
      <div class="title"><div class="name">{{billdetail.name}}</div></div>
      <div class="price">￥{{billdetail.price}}</div>
      <div class="tip">请在{{billdetail.payLimit}}前完成支付</div>
      <div class="cell">
        <label class="name">创建时间</label><div class="value"></div>
      </div>
      <div class="cell">
        <label class="name">账单号</label><div class="value">{{billdetail.orderNum}}</div>
      </div>
      <div class="cell" style="padding-bottom: 30px">
        <label class="name">账单备注</label><div class="value"></div>
      </div>
      <div class="qus" @click="problem">对此账单有疑问？</div>
    </div>
    <iframe style="display: none" ref="iframe" src="" frameborder="0"></iframe>
    <div class="bottom">
      <Button type="primary" size="large">立即支付</Button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import csheader from '@/components/header'
import {Button, MessageBox} from 'mint-ui'
export default {
  computed: {
    ...mapGetters(['billdetail'])
  },
  methods: {
    problem () {
      MessageBox({
        title: '特别提示',
        message: '若对当前账单有疑问，你可以选择联系房东进行沟通',
        showCancelButton: true,
        confirmButtonText: '确认'
      }).then(s => {
        // console.log('ddd', s)
        if (s === 'confirm') {
          // console.log('ssd1')
          this.$refs.iframe.src = `tel:${this.billdetail.ownerPhone}`
        }
      })
    }
  },
  components: {
    csheader, Button
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.detail {
  padding: 15px;
  .title{
    padding: 15px;
    background-color: #fff;
    font-size: 15px;
  }
  .price{
    padding: 15px;
    background-color: #fff;
    font-size: 27px;
  }
  .tip{
    padding: 15px;
    background-color: #fff;
    color: @gray;
    border-bottom: 1px solid #f1f1f1;
  }
  .cell{
    padding: 15px;
    background-color: #fff;
    display: flex;
    color: @gray;
    .name {
      flex: 0 0 100px;
    }
    .value{
      flex: 1;
      text-align: right;
    }
  }
  .qus{
    background-color: #fff;
    // margin-top: 30px;
    text-align: center;
    padding: 15px;
    color: @themeColor;
    font-size: 12px;
  }
}
.bottom{
  position: fixed;
  width: 100%;
  padding: 15px;
  background-color: #fff;
  bottom: 0;
}
</style>
