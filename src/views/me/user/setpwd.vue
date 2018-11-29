<template>
  <div class="password">
    <csheader>设置密码</csheader>
    <div class="box">
    <div class="form-item pwd">
      <input class="input" type="password" maxlength='15' v-model="password" placeholder="6-15位字母与数字结合密码">
    </div>
    <div class="text">设置登录密码可更好地保障账号的安全</div>
    <Button type="primary" class="btn" style="margin-top: 50px" @click.native="setPwd">确定</Button>
    </div>
  </div>
</template>

<script>
import csheader from '@/components/header'
import {Button, Toast} from 'mint-ui'
import {setPassword} from '@/api/user'
export default {
  data () {
    return {
      password: ''
    }
  },
  methods: {
    setPwd () {
      if (this.password.trim().length < 6) {
        Toast('密码不能少于6位')
        return
      }
      setPassword(this.password).then(response => {
        if (response.code === 1) {
          Toast('密码设置成功')
          this.$router.go(-2)
          // this.popupVisible = false
          // this.hiden()
        } else {
          Toast(response.msg)
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
@import '../../../styles/mixin.less';
.password {
  height: 100vh;
  background-color: #fff;

}
.box {
  padding-left: 15px;
  padding-right: 15px;
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
  .text {
    padding-top: 10px;
    // padding-left: 15px;
    color: #707080;
  }
</style>
