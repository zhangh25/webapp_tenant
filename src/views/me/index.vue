<template>
  <div class="me">
    <div class="head">
      <!-- <img src="../../assets/434x290.png" alt="" class="head-img"> -->
      <div class="bg"></div>
      <div class="box">
        <div class="himg" @click="personalShow"><img :src="headImg" alt="" width="34" height="50" style="margin-top:10px"></div>
        <div class="text" >
          <div v-if="!token" @click="visibleLogin = true"> <span class="login">登录</span> / <span class="register">注册</span></div>
          <span v-else-if="userData">{{userData.phone}}</span>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="bar">
        <div class="bar-item" @click="leaseClick"><i class="icon icon-lease"></i><br>租约管理</div>
        <div class="bar-item"><i class="icon icon-bill"></i><br>账单</div>
        <div class="bar-item"><i class="icon icon-wallet"></i><br>钱包</div>
        <div class="bar-item"><i class="icon icon-pact"></i><br>合同</div>
      </div>
      <cell title="实名认证" is-link @click.native="real">
        <img slot="icon" src="./img/icon_shiming@2x.png" width="22" height="22" class="list-icon">
      </cell>
      <cell title="客服电话" is-link @click.native="callPhone">
        <img slot="icon" src="./img/icon_kefu@2x.png" width="22" height="22" class="list-icon">
      </cell>
      <cell title="意见提交" is-link @click.native="visibleIdea=true">
        <img slot="icon" src="./img/icon_yijianfankui@2x.png" width="22" height="22" class="list-icon">
      </cell>
      <cell title="关于城宿" is-link @click.native="visibleAbout=true">
        <img slot="icon" src="./img/icon_guanyuwumen@2x.png" width="22" height="22" class="list-icon">
      </cell>
      <cell title="设置" is-link @click.native="visibleSetting=true">
        <img slot="icon" src="./img/icon_shezhi@2x.png" width="22" height="22" class="list-icon">
      </cell>
      <!-- <icon-svg icon-class="user"></icon-svg> -->
    </div>
    <login v-model="visibleLogin"></login>
    <mypop v-model="visibleIdea" class="idea">
      <span slot="title">意见提交</span>
      <suggest></suggest>
    </mypop>
    <mypop v-model="visibleAbout">
      <span slot="title">关于城宿</span>
      <about></about>
    </mypop>
    <mypop v-model="visibleSetting">
      <span slot="title">设置</span>
      <setting></setting>
    </mypop>
    <mypop v-model="visiblePersonal">
      <template slot="title">个人资料</template>
      <personal></personal>
    </mypop>
    <mypop v-model="visibleReal">
      <template slot="title">实名认证</template>
      <realname></realname>
    </mypop>
    <tabbar></tabbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {Cell, MessageBox, Toast} from 'mint-ui'
import login from './user/login'
import mypop from '@/components/myPopup'
import suggest from './suggest'
import about from './about'
import setting from './setting/index'
import personal from './user/personal'
import realname from './realname/index'
import real from './realname/real'
import tabbar from '@/components/tabbar/index'
export default {
  computed: {
    ...mapGetters(['token', 'userData']),
    headImg () {
      let str = ''
      if (this.token) {
        // console.log(this.userData)
        if (this.userData.imageurl) {
          str = this.userData.imageurl
        } else {
          str = this.login_logo
        }
      } else {
        str = this.logout_logo
      }
      // console.log(str)
      return str
    }
  },
  data () {
    return {
      login_logo: require('./img/icon_logo@2x.png'),
      logout_logo: require('./img/icon_logo1.@2x.png'),
      visibleLogin: false,
      visibleIdea: false,
      visibleAbout: false,
      visibleSetting: false,
      visiblePersonal: false,
      visibleReal: false
    }
  },
  // computed: {},
  created () {
    console.log(this.userData)
    // this.$store.dispatch('setToken', '')
    // console.log(this.token)
  },
  methods: {
    // showLogin () {}
    callPhone () {
      MessageBox({
        title: '',
        message: '130000084',
        showCancelButton: true,
        confirmButtonText: '拨打'
      }).then(s => {
        // console.log('ddd', s)
        if (s === 'confirm') {
          console.log('ssd1')
        }
      })
    },
    /* 跳转实名认证 */
    real () {
      if (this.token) {
        this.visibleReal = true
      } else {
        Toast('你还未登录')
      }
    },
    personalShow () {
      if (this.token) {
        this.visiblePersonal = true
      }
    },
    leaseClick () {
      if (this.token) {
        this.$router.push('/lease')
      } else {
        Toast('你还未登录')
      }
    }
    // personalShow () {}
    // ideaShow ()
  },
  components: {
    Cell,
    login,
    mypop,
    suggest,
    about,
    setting,
    personal,
    realname,
    real,
    tabbar
  }
}
</script>

<style lang="less" scoped>
.me{
  background-color: rgb(247, 247, 247);
  padding-bottom: 60px;
}
.head {
  position: relative;
  .bg{
    height: 200px;
    background-color: #000;
    opacity: .5;
  }
  .box{
    position: absolute;
    top: 53px;
    width: 100%;
    text-align: center;
    .himg {
      margin: 0 auto;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background-color: #ffffff;
    }
    .text{
      margin-top: 25px;
      color: #ffffff;
      .login {
        display: inline-block;
      }
      .register{
        display: inline-block;
      }
    }
  }
}
.head-img{
  width: 100%;
}
.bar{
  display: flex;
  width: 320px;
  height: 105px;
  background-color: #ffffff;
  box-shadow: 0px 8px 24px 0px#eae8e8;
  border-radius: 10px;
  margin: 0 auto;
  position: relative;
  top: -20px;
  .bar-item{
    flex: 1;
    text-align: center;
    font-size: 15px;
    color: #353535;
    margin-top: 25px;
  }
  .icon {
    display: inline-block;
    width: 22px;
    height: 22px;
    background-size: cover;
    margin-bottom: 12px;
  }
  .icon-lease{
    background-image: url(./img/icon_zuyueguanli@2x.png);
  }
  .icon-bill{
    background-image: url(./img/icon_zhangdan@2x.png);
  }
  .icon-wallet{
    background-image: url(./img/icon_qianbao@2x.png);
  }
  .icon-pact{
    background-image: url(./img/icon_hetou@2x.png);
  }
}
.list-icon{
  margin-right: 12px;
}
.idea{

}
</style>
