<template>
  <div class="phone">
    <img src="../img/icon_shouji@2x.png" width="63" height="100" style="margin-top:82px">
    <div class="str">当前手机号：{{userData.phone}}</div>
    <div class="tip">绑定新手机后，下次登录可以使用新手机号登录。</div>
    <div class="form-item">
      <input type="text" class="input" maxlength='11' v-model="formData.newPhone" placeholder="请输入新手机号">
    </div>
    <div class="form-item cd">
      <div class="code"><input type="text" class="input" v-model="formData.code" placeholder="请输入6位短信验证吗"></div>
      <Button type="primary" class="btn" @click="getCode">{{btnText}}</Button>
    </div>
    <div class="confirm" @click="change">确定</div>
  </div>
</template>

<script>
import {Button, Toast} from 'mint-ui'
import { mapGetters } from 'vuex'
import { isMobile } from '@/utils/validate'
import {sendSmsCode, replacePhone} from '@/api/user'
export default {
  computed: {
    ...mapGetters(['userData'])
  },
  data () {
    return {
      btnText: '获取验证码',
      formData: {
        newPhone: '',
        phone: '',
        code: ''
      }
    }
  },
  created () {
    this.formData.phone = this.userData.phone
  },
  methods: {
    validateMobile () {
      if (this.formData.newPhone.trim().length < 1) {
        Toast('请输入手机号')
        return false
      } else if (isMobile(this.formData.newPhone)) {
        console.log('success')
        return true
      }
      Toast('手机号码错误')
      return false
    },
    /* 验证验证码 */
    validateCode () {
      if (this.formData.code.trim().length < 1) {
        Toast('请输入验证码')
        return false
      }
      return true
    },
    getCode () {
      // console.log('getcode')
      if (this.validateMobile()) {
        sendSmsCode(this.formData.newPhone, 3).then(res => {
          if (res.code === 1) {}
        })
      }
    },
    change () {
      if (!this.validateMobile()) {
        return false
      }
      if (!this.validateCode()) {
        return false
      }
      console.log(this.formData)
      // if (false) return
      replacePhone(this.formData).then(res => {
        if (res.code === 1) {
          Toast('更改成功')
          this.$parent.back()
        } else {
          Toast(res.msg)
        }
      })
    }
  },
  components: {
    Button
  }
}
</script>

<style lang="less" scoped>
@import '../../../styles/mixin.less';
input::placeholder{
  color: #c6c6c6;
}
.phone{
  padding: 15px;
  text-align: center;
  .str{
    font-size: 15px;
    margin-top: 32px;
  }
  .tip{
    font-size: 12px;
    color: @gray;
    padding: 15px 0;
    margin-bottom: 10px;
  }
  .form-item {
    .input{
      width: 100%;
      padding: 15px;
      border: none;
      box-shadow: 0 1px 0 0 #e5e4e4;
    }
    &.cd {
      display: flex;
      margin-top: 15px;
      .code {
        flex: 1;
        margin-right: 15px;
      }
      .btn {
        flex: 0 0 120px;
        // padding: 15px 0;
        height: 45px;
      }
    }
  }
  .confirm{
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-radius: 5px;
    background-color: #fff;
    text-align: center;
    font-size: 15px;
    margin-top: 40px;
  }
}
</style>
