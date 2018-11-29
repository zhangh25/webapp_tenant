<template>
  <div class="password">
    <csheader>重置密码</csheader>
    <div class="wrapper">
      <div class="form-item"><img src="../img/phone@2x.png" width="11" height="18"><input class="input" maxlength='11' type="text" v-model="formData.phone" placeholder="请输入手机号"></div>
      <div class="form-item"><img src="../img/verification@2x.png" width="12" height="14"><input class="input" type="number" maxlength='6' ref="code" v-model="formData.code" placeholder="请输入验证码"><div class="code" @click="getCode">{{btnTxt}}</div></div>
      <div class="form-item"><img src="../img/password@2x.png" width="11" height="14"><input class="input" type="password" v-model="formData.password" placeholder="请输入新密码"></div>
      <Button type="primary" class="btn" style="margin-top: 25px" @click.native="login">提交</Button>
    </div>
  </div>
</template>

<script>
import csheader from '@/components/header'
import {Button} from 'mint-ui'
export default {
  data () {
    return {
      formData: {
        phone: '',
        code: '',
        password: ''
      },
      btnTxt: '获取验证码'
    }
  },
  methods: {
    login () {},
    getCode () {}
  },
  components: {
    csheader, Button
  }
}
</script>

<style lang="less" scoped>
@import '../../../styles/mixin.less';
.password {
  height: 100vh;
  background-color: #fff;
  .wrapper {
    padding: 0 15px;
  }
}
.form-item {
    display: flex;
    border-bottom: 1px solid #f0f0f0;
    align-items: center;
    .input{
      flex: 1;
      border: none;
      height: 54px;

      padding-left: 10px;
      &::placeholder {
        color: #c8c8cd;
      }
    }
    .code {
      width: 100px;
      text-align: center;
      line-height: 54px;
      color: @themeColor;
      white-space: nowrap;
    }
  }
  .btn{
    width: 100%;
    border-radius: 48px;
    background-color: @themeColor;
    font-size: 16px;
  }
</style>
