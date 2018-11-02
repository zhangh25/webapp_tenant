<template>
  <div>
    <csheader>修改登录密码</csheader>
    <field v-model="fdata.phone" placeholder="请输入手机号"></field>
    <field v-model="fdata.code" placeholder="输入验证码"><div class="btn" @click="getCode">{{btnTxt}}</div></field>
    <field v-model="fdata.password" type="password" :maxlength='15' placeholder="请输入新密码（6-15位字母与数字结合密码）"></field>
    <div style="padding: 20px 10px">
      <Button size="large" type="primary" @click="setPassword">确定</Button>
    </div>
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
        phone: null
      },
      btnTxt: '获取验证码',
      timeLoad: false,
      timeNum: 60
    }
  },
  methods: {
    getCode () {
      if (isMobile(this.fdata.phone)) {
        sendSmsCode({phone: this.fdata.phone, type: 2}).then(res => {
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
      udpatePassword(this.fdata).then(res => {
        if (res.code === 1) {
          Toast('密码修改成功')
          this.$router.go(-1)
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
.btn {
  width: 100px;
  height: 20px;
  line-height: 20px;
  color: @themeColor;
  font-size: 13px;
  text-align: center;
  border-left: 1px solid #ccc;
  margin-left: 10px;
}
</style>
