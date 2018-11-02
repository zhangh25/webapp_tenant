<template>
  <div class="login" @keyup.enter="login">
    <div class="close">
      <i class="icon-close" @click="$router.go(-1)"></i>
    </div>
    <div class="title">您好，</div>
    <div class="describe">欢迎来到城宿，让租房更简单</div>
    <div style="margin-top: 30px">
      <div class="form-item">
        <i class="icon icon-phone"></i>
        <input class="input" type="text" maxlength='11' v-model="formData.phone" placeholder="请输入手机号码" style="">
        <div class="border-1px"></div>
      </div>
      <div class="form-item" v-if="loginType === 1 || loginType === 3">
        <i class="icon icon-code"></i>
        <input class="input" type="text" maxlength='6' ref="code" v-model="formData.code" placeholder="输入验证码">
        <div class="code" @click="getCode">{{btnTxt}}</div>
        <div class="border-1px"></div>
      </div>
      <div class="form-item" v-if="loginType === 2">
        <i class="icon icon-pwd"></i>
        <input class="input" type="password" v-model="formData.password" placeholder="输入密码">
        <div class="border-1px"></div>
      </div>
      <div class="form-item" v-if="loginType === 3">
        <i class="icon icon-pwd"></i>
        <input class="input" type="password" v-model="formData.password" placeholder="输入密码">
        <div class="border-1px"></div>
      </div>
      <div class="btns">
        <template v-if="loginType !== 3"> <checklist v-model="agree" :options='["同意"]' class="login-check"></checklist> <span class="clause" @click="$router.push('/protocol')">《城宿租房条款》</span>
        <div class="forget" @click="forgetPwd" v-if="loginType === 2">忘记密码?</div></template>
        <Button type="primary" class="btn" style="margin-top: 20px" @click.native="login">{{loginType !== 3 ? '登录' : '确认'}}</Button>
        <div class="btn-pwd" @click="switchType" v-if="loginType !== 3">使用{{ loginType === 1 ? '密码' : '验证码'}}登录</div>
      </div>
    </div>
    <Popup v-model="popupVisible" position="right" class="pop">
      <div class="header">设置密码</div>
      <div class="content">
        <div class="form-item pwd">
          <input class="input" type="password" maxlength='15' v-model="password" placeholder="6-15位字母与数字结合密码">
        </div>
        <div class="text">设置登录密码可更好地保障账号的安全</div>
        <Button type="primary" class="btn" style="margin-top: 20px" @click.native="setPwd">确定</Button>
      </div>
    </Popup>
    <mypop v-model="visibleProtocol" class="lpop">
      <template slot="title">服务协议</template>
      <iframe
        class="main-content"
        src="https://mobile.chengsu.vip/protocol/tenantProtocol.html"
      ></iframe>
    </mypop>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Button, Checklist, Toast, Popup, Header, Indicator } from 'mint-ui'
// Indicator
import { isMobile } from '@/utils/validate'
import { sendSmsCode, userRegister, setPassword, udpatePassword } from '@/api/user'
import mypop from '@/components/myPopup'
export default {
  computed: {
    ...mapGetters(['loginedPath', 'token'])
  },
  props: {
    value: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      visible: true,
      agree: [],
      formData: {
        phone: '',
        code: '',
        password: ''
      },
      password: '',
      interval: null,
      timeNum: 60,
      btnTxt: '获取验证码',
      timeLoad: false,
      loginType: 1,
      popupVisible: false,
      visibleProtocol: false
    }
  },
  watch: {
    value (val) {
      this.visible = val
      // console.log('23e33')
    }
  },
  created () {
    this.visible = this.value
    if (this.token) { // 如果已经登陆就不能进入此页面
      this.$router.go(-1)
    }
    // this.popupVisible = true
  },
  methods: {
    hiden () {
      // this.visible = false
      // this.$emit('input', false)
      // this.$router.go(-1)
      if (this.loginedPath) {
        this.$router.push(this.loginedPath)
        this.$store.dispatch('setPath', '')
      } else {
        this.$router.go(-1)
      }
    },
    login () {
      if (!this.validateMobile()) {
        return
      }
      if (this.loginType !== 2 && !this.validateCode()) {
        return
      }
      if (this.loginType !== 1 && !this.validatePassword()) {
        return
      }
      if (!this.validateClause()) {
        return
      }

      switch (this.loginType) {
        case 1:
          console.log('验证码登录通过')
          this._loginByCode()
          break
        case 2:
          console.log('密码登录通过')
          this._loginByPassword()
          break
        case 3:
          console.log('忘记密码后设置密码通过')
          this._udpatePassword()
          break
        default:
          break
      }
    },
    _udpatePassword () {
      udpatePassword(this.formData.phone, this.formData.code, this.formData.password).then(response => {
        if (response.code === 1) {
          Toast('密码设置成功')
          this.$router.go(-1)
        } else {
          Toast(response.msg)
        }
      })
    },
    /* 通过验证码登录 */
    _loginByCode () {
      if (this.interval) clearInterval(this.interval)
      this.btnTxt = '重新获取验证码'
      this.timeLoad = false
      Indicator.open()
      userRegister({phone: this.formData.phone, code: this.formData.code}).then(response => {
        Indicator.close()
        console.log('ssss', response)
        if (response.code === 1) {
          // response.loginstate integer ($int32) 是否为第一次登陆,-1:刚注册 0 默认是第一次 1 不是第一次
          if (response.data.token) {
            this.$store.dispatch('setToken', response.data.token)
            this.$store.dispatch('setUser', response.data)
          }
          if (response.data.loginstate === -1) {
            this.popupVisible = true
          } else {
            Toast('登录成功')
            this.hiden()
          }
        } else {
          Toast(response.msg)
        }
      }, erro => {
        Indicator.close()
      }).catch(erro => {
        console.log(erro, '33')
        Indicator.close()
      })
    },
    _loginByPassword () {
      Indicator.open()
      userRegister({phone: this.formData.phone, password: this.formData.password}).then(response => {
        Indicator.close()
        if (response.code === 1) {
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data)
          Toast('登录成功')
          this.hiden()
        } else {
          Toast(response.msg)
        }
      }, erro => {
        Indicator.close()
      })
    },
    /*
    验证手机号
    */
    validateMobile () {
      if (this.formData.phone.trim().length < 1) {
        Toast('请输入手机号')
        return false
      } else if (isMobile(this.formData.phone)) {
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
    /* 验证密码 */
    validatePassword () {
      return true
    },
    /* 验证是否勾选条款 */
    validateClause () {
      if (this.loginType < 3 && this.agree.length < 1) {
        Toast('你没同意租房条款')
        return false
      }
      return true
    },
    /* 点击获取验证码回调 */
    getCode () {
      if (!this.timeLoad && !this.validateMobile()) {
        return
      }
      if (this.timeLoad) return
      this.timeLoad = true
      if (this.interval) clearInterval(this.interval)
      this.setTimeText()
      this.interval = setInterval(_ => {
        this.setTimeText()
      }, 1000)
      let type = this.loginType === 1 ? 1 : 2
      sendSmsCode(this.formData.phone, type).then(response => {
        console.log(response)
        if (response.code !== 1) {
          Toast(response.msg)
          // if (this.interval) clearInterval(this.interval)
        } else {
          this.$refs.code.focus()
        }
      })
    },
    setTimeText () {
      if (this.timeNum < 1) {
        if (this.interval) clearInterval(this.interval)
        this.btnTxt = '重新获取验证码'
        this.timeLoad = false
      } else {
        this.timeNum--
        this.btnTxt = `${this.timeNum}s`
      }
    },
    /* 第一次设置密码 */
    setPwd () {
      // this.popupVisible = false
      setPassword(this.password).then(response => {
        if (response.code === 1) {
          Toast('密码设置成功')
          this.popupVisible = false
          this.hiden()
        } else {
          Toast(response.msg)
        }
      })
    },
    forgetPwd () {
      this.loginType = 3
    },
    switchType () {
      // console.log('sss')
      if (this.loginType === 1) {
        this.loginType = 2
      } else {
        this.loginType = 1
      }
    }
  },
  components: {
    Button, Checklist, Popup, Header, mypop
  }
}
</script>

<style lang="less" scoped>
@import '../../../styles/mixin.less';
.login {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #fff;
  // z-index: 10;
}
.close {
  padding: 15px;
}
.icon-close {
  display: inline-block;
  width: 17px;
  height: 17px;
  background-image: url(../img/icon_quxiao@3x.png);
  background-size: cover;
}
.title{
  font-size: 23px;
  padding: 15px;
}
.describe{
  line-height: 35px;
  color: @gray;
  padding-left: 15px;
}
input::placeholder {
  font-size: 13px;
  color: @gray;
}
.form-item{
  position: relative;
  padding: 0 45px;
  .input{
    width: 100%;
    border: none;
    padding: 20px 30px;
    outline:none;
    // border-bottom: 1px solid #eee;
    // .border-1px;
  }
  .border-1px {
    .border-1px;
  }
  &.pwd{
    padding: 0;
    .input{
padding-left: 0;
      padding-right: 0;
    }
  }
  .icon-phone{
    background-image: url(../img/icon_cellphone@2x.png);
  }
  .icon-code {
    background-image: url(../img/icon_verificationcode@2x.png)
  }
  .icon-pwd {
    background-image: url(../img/icon_password@2x.png);
  }
  .icon {
    position: absolute;
    left: 50px;
    top: 18px;
    display: inline-block;
    width: 11px;
    height: 18px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  .code{
    position: absolute;
    width: 100px;
    height: 20px;
    line-height: 20px;
    border-left: 1px solid #ccc;
    top: 18px;
    right: 45px;
    text-align: center;
    color: @themeColor;
    font-size: 13px;
  }
}
.btns {
  padding: 15px;

  .btn-pwd{
    height: 41px;
    font-size: 14px;
    line-height: 41px;
    color: @gray;
    text-align: center;
  }
}
.btn{
    width: 100%;
    border-radius: 48px;
    background-color: @themeColor;
    font-size: 16px;
  }
.login-check{
  float: left;

}
.clause{
  display: inline-block;
  color: @themeColor;
  font-size: 12px;
  // position: relative;
  // top: 22px;
  height: 48px;
  line-height: 48px;
  margin-top: 8px;
  margin-left: 8px;
  // background: #ad3452;
}
.pop{
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.header{
  height: 44px;
  font-size: 17px;
  color: #353535;
  text-align: center;
  line-height: 44px;
  border-bottom: 1px solid #e8e8e8;
  position: relative;
}
.content {
  padding: 15px;
  .text{
    color: @gray;
    padding: 10px 0;
    font-size: 12px;
  }
}
.forget {
  float: right;
  font-size: 12px;
  color: @themeColor;
  margin-top: 8px;
  height: 48px;
  line-height: 48px;
  padding-right: 10px;
}

.lpop{
  // display: flex;
  .main-content{
    border: none;
    // flex: 1
    width: 100%;
    height: calc(100% - 44px);
  }
}
</style>
