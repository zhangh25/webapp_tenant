<template>
  <div class="add">
    <csheader>验证银行卡信息</csheader>
    <Field label="银行卡" v-model="fData.name"></Field>
    <Field label="卡号" v-model="fData.card" placeholder="此交易仅支持储蓄卡"></Field>
    <Field label="手机号" v-model="fData.phone" placeholder=" 银行预留手机号"></Field>
    <div class="link">查看<router-link to="#" class="a-link">《用户协议》</router-link></div>
    <div class="btn">
      <Button type="primary" size="large" @click="yanzheng">同意协议并验证</Button>
    </div>
    <mypop v-model="phoneVisible">
      <template slot="title">手机短信验证</template>
      <div class="tip">请输入手机{{fData.phone}}收到的短信验证码</div>
      <Field label="验证码" v-model="fData.phone" placeholder=" 短信验证码"></Field>
      <div class="btn">
        <Button type="primary" size="large">验证信息</Button>
      </div>
    </mypop>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import csheader from '@/components/header'
import mypop from '@/components/myPopup'
import {Field, Button} from 'mint-ui'
export default {
  computed: {
    ...mapGetters(['card'])
  },
  data () {
    return {
      fData: {
        name: '',
        card: '',
        phone: ''
      },
      phoneVisible: false
    }
  },
  created () {
    this.fData.name = this.userData.username
  },
  methods: {
    yanzheng () {
      this.phoneVisible = true
    }
  },
  components: {
    csheader, Field, Button, mypop
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.link{
  padding: 15px 15px 0 0;
  text-align: right;
  // color: @gray;
  .a-link{
    color: @themeColor;
    text-decoration: none;
  }
}
.btn {
  padding: 15px;
  padding-top: 40px;
}
.tip {
  padding: 10px;
  background-color: #fff;
  line-height: 26px;
}
</style>
