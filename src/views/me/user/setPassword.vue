<template>
  <div  class="password">
    <csheader>重置密码</csheader>
    <div class="wrapper">
      <div class="form-item"><img src="../img/phone@2x.png" width="11" height="18"><input class="input" maxlength='11' type="text" v-model="fdata.phone" placeholder="请输入手机号"></div>
      <div class="form-item"><img src="../img/verification@2x.png" width="12" height="14"><input class="input" type="number" maxlength='6' ref="code" v-model="fdata.code" placeholder="请输入验证码"><div class="code" @click="getCode">{{btnTxt}}</div></div>
      <div class="form-item"><img src="../img/password@2x.png" width="11" height="14"><input class="input" type="text" v-model="fdata.password" placeholder="请输入新密码（6-15位字母与数字结合密码）"></div>
      <Button type="primary" class="btn" style="margin-top: 25px" @click.native="setPassword">提交</Button>
    </div>
    <!-- <field v-model="fdata.phone" placeholder="请输入手机号"></field>
    <field v-model="fdata.code" placeholder="输入验证码"><div class="btn" @click="getCode">{{btnTxt}}</div></field>
    <field v-model="fdata.password" type="password" :maxlength='15' placeholder="请输入新密码（6-15位字母与数字结合密码）"></field>
    <div style="padding: 20px 10px">
      <Button size="large" type="primary" @click="setPassword">确定</Button>
    </div> -->
  </div>
</template>

<script>
import csheader from '@/components/header'
import {Button, Toast} from 'mint-ui'
import field from 'components/field'
import { sendSmsCode, udpatePassword } from '@/api/user'
import { isMobile } from '@/utils/validate'
export default {
  data () {
    return {
      fdata: {
        code: '',
        password: null,
        phone: ''
      },
      btnTxt: '获取验证码',
      timeLoad: false,
      timeNum: 60
    }
  },
  methods: {
    getCode () {
      if (isMobile(this.fdata.phone)) {
        sendSmsCode(this.fdata.phone, 2).then(res => {
          if (res.code !== 1) {
            Toast(res.msg)
          }
        })
      } else {
        Toast('请输入正确的手机号')
      }
    },
    setPassword () {
      if (!isMobile(this.fdata.phone)) {
        Toast('请输入正确的手机号')
        return
      } else if (this.fdata.code.trim() === '') {
        Toast('请输入验证码')
        return
      }
      // phone, code, password
      udpatePassword(this.fdata.phone, this.fdata.code, this.fdata.password).then(res => {
        if (res.code === 1) {
          Toast('密码修改成功请登录')
          // this.$router.go(-1)
          this.$store.dispatch('setToken', '')
          this.$router.push('/login')
        } else if (res.msg) {
          Toast(res.msg)
        }
      })
    }
  },
  components: {
    csheader, Button, field
  }
}
</script>

<style lang="less" scoped>
@import '../../../styles/mixin.less';
// .btn {
//   width: 100px;
//   height: 20px;
//   line-height: 20px;
//   color: @themeColor;
//   font-size: 13px;
//   text-align: center;
//   border-left: 1px solid #ccc;
//   margin-left: 10px;
// }
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
