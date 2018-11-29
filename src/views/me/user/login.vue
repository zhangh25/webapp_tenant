<template>
  <div class="login" ref="login" @keyup.enter="login">
    <div class="top">
      <div class="header"><div class="left" @click="$router.go(-1)"><icon-svg icon-class="back" class="icon"></icon-svg></div></div>
        <img src="../img/icon_tu@2x.png" width="100%" alt="">
    </div>
    <div class="content">

      <!-- <div class="title">
        城宿租房
      </div> -->
      <div class="box">
        <div class="nav">
          <div class="item" :class="{'active': active==='code'}" @click="toggle('code')"><span>验证码登录</span></div>
          <div class="center"></div>
          <div class="item" :class="{'active': active==='password'}" @click="toggle('password')"><span>密码登录</span></div>
        </div>
        <TabContainer v-model="active" swipeable>
        <TabContainerItem id="code">
          <!-- <field></field> -->
          <div class="form-item"><div class="icon"><img src="../img/phone@2x.png" width="11" height="18"></div><input class="input" maxlength='11' type="text" v-model="formData.phone" placeholder="请输入手机号"></div>
          <div class="form-item"><div class="icon"><img src="../img/verification@2x.png" width="12" height="14"></div><input class="input" type="number" maxlength='6' ref="code" v-model="formData.code" placeholder="请输入验证码"><div class="code" @click="getCode">{{btnTxt}}</div></div>
        </TabContainerItem>
        <TabContainerItem id="password">
          <div class="form-item"><div class="icon"><img src="../img/phone@2x.png" width="11" height="18"></div><input class="input" maxlength='11' type="text" v-model="formData.phone" placeholder="请输入手机号"></div>
          <div class="form-item"><div class="icon"><img src="../img/password@2x.png" width="11" height="14"></div><input class="input" type="password" v-model="formData.password" placeholder="请输入密码"></div>
        </TabContainerItem>
      </TabContainer>
      <Button type="primary" class="btn" style="margin-top: 25px" @click.native="login">登录</Button>
      <router-link v-if="active=='password'" to="/password" class="link">忘记密码？</router-link>
    </div>

  </div>
<div class="bottom">
      <span class="txt"><div class="checkbox" :class="{select: agree}" @click="toggleAgree"><i class="icon-checkbox"></i></div>新用户初次登录将自动注册,注册成功  &nbsp;<br>
      即视为已阅读并同意<router-link class="prolink" to="/protocol">《城宿租房条款》</router-link>
      </span>
    </div>
    <!-- <div class="close">
      <i class="icon-close" @click="$router.go(-1)"></i>
    </div>
    <div class="title">您好，</div>
    <div class="describe">欢迎来到城宿，让租房更便宜</div>
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
        <template v-if="loginType !== 3"> <checklist v-model="agree" class="login-check"></checklist> <span class="clause" @click="$router.push('/protocol')">《城宿租房条款》</span>
        <div class="forget" @click="forgetPwd" v-if="loginType === 2">忘记密码?</div></template>
        <Button type="primary" class="btn" style="margin-top: 40px" @click.native="login">{{loginType !== 3 ? '登录' : '确认'}}</Button>
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
    </mypop> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { TabContainer, TabContainerItem, Button, Checklist, Toast, Popup, Header, Indicator } from 'mint-ui'
// Indicator
import { isMobile } from '@/utils/validate'
import { sendSmsCode, userRegister, setPassword, udpatePassword } from '@/api/user'
import mypop from '@/components/myPopup'
import csheader from '@/components/header'
import field from 'components/field'
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
      agree: false,
      active: 'code',
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
  mounted () {
    this.$refs.login.style.height = document.documentElement.clientHeight + 'px'
  },
  methods: {
    hiden () {
      // this.visible = false
      // this.$emit('input', false)
      this.$router.go(-1)
      // if (this.loginedPath) {
      //   this.$router.push(this.loginedPath)
      //   this.$store.dispatch('setPath', '')
      // } else {
      //   this.$router.go(-1)
      // }
    },
    toggle (str) {
      this.active = str
      if (str === 'code') {
        this.loginType = 1
      } else if (str === 'password') {
        this.loginType = 2
      }
    },
    toggleAgree () {
      this.agree = !this.agree
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
          // this.$router.go(-1)
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
            // this.popupVisible = true
            this.$router.push('/setpwd')
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
      if (this.loginType < 3 && !this.agree) {
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
    Button, Checklist, Popup, Header, mypop, csheader, TabContainer, TabContainerItem, field
  }
}
</script>

<style lang="less" scoped>
@import '../../../styles/mixin.less';
.login {
  position: relative;
  overflow: hidden;
  height: 100vh;
  background-color: #fff;
}
.top {
  position: relative;
  .header {
    position: absolute;
    top: 0;
    width: 100%;
    height: 44px;
    line-height: 44px;
    // padding: 0 15px;
    color: #fff;
    font-size: 15px;
    .left {
      padding-left: 15px;
      float: left;
    }
  }
}
.content {
  position: relative;
  width: 100vw;
  // height: calc(100vh - 44px);
  background-color: #fff;
  padding: 0 25px;
  color: #21262f;
  .box {
    position: relative;
    height: 286px;
    top: -25px;
    background-color: #fff;
    padding: 16px;
    padding-top: 18px;
    box-shadow: 0px 8px 24px 0px #eae8e8;
    border-radius: 10px;
  }
  .title {
    font-size: 27px;
    text-align: center;
    padding: 22px 0;
  }
  .nav {
    display: flex;
    .item {
      flex: 1;
      text-align: center;
      height: 44px;
      line-height: 30px;
      // padding: 17px 0;
      &.active {
        color: @themeColor;
        >span {
          border-bottom: 1.5px solid @themeColor;
        }
        //
      }
      >span {
        display: inline-block;
      }
    }
    .center {
      flex: 0 0 30px;
    }
  }
  .form-item {
    display: flex;
    border-bottom: 1px solid #f0f0f0;
    align-items: center;
    .icon {
      // width: 11px;
      width: 12px;
    }
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
  .link {
    float: right;
    display: inline-block;
    margin-top: 17px;
    margin-right: 15px;
    text-decoration: none;
    color: @themeColor;
  }

}
.bottom {
    position: absolute;
    width: 100%;
    text-align: center;
    color: #bababa;
    bottom: 32px;
    left: 0;
    right: 0;
    font-size: 11px;
    .prolink{
      text-decoration: none;
      color: @themeColor;
    }
    .txt {
      position: relative;
      .checkbox {
        position: absolute;
        left: -22px;
        top: -4px;
        padding: 4px;
        .icon-checkbox {
          display: inline-block;
          width: 11px;
          height: 11px;
          background-size: cover;
          background-image: url(../img/icon_weigouxuan@2x.png);
        }
        &.select {
          .icon-checkbox {
            background-image: url(../img/icon_gouxuan@2x.png);
          }
        }
      }
    }
  }
</style>
