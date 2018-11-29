<template>
  <div class="me">
    <div class="head">
      <!-- <img src="../../assets/434x290.png" alt="" class="head-img"> -->
      <div class="bg">
        <img src="./img/me.png" >
      </div>
      <div class="box" @click="headClick">
        <div class="himg"><img :src="headImg" :class="{def: !token || !userData.imageurl}"></div>
        <div class="text" >
          <div v-if="!token"> <span class="login">登录</span> / <span class="register">注册</span></div>
          <span v-else-if="userData">{{userData.phone|phone}}</span>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="swapper">
      <div class="bar">
        <div class="bar-item" @click="leaseClick"><i class="icon icon-lease"></i><br>租约管理</div>
        <div class="bar-item" @click="goBill"><i class="icon icon-bill"></i><br>账单</div>
        <div class="bar-item" @click="goWallet"><i class="icon icon-wallet"></i><br>账户</div>
        <div class="bar-item" @click="goCont"><i class="icon icon-pact"></i><br>合同</div>
      </div>
      </div>
      <div class="cell-wrapper border-1px">
        <mcell is-link @click.native="real" class="cell">
          <template slot="label"><img src="./img/icon_shiming@2x.png" width="22" height="22" class="list-icon">实名认证</template>
        </mcell>
        <mcell class="cell" is-link @click.native="callPhone">
          <template slot="label"><img slot="icon" src="./img/icon_kefu@2x.png" width="22" height="22" class="list-icon">客服电话</template>
        </mcell>
        <mcell class="cell" is-link to="/suggest">
          <template slot="label"><img slot="icon" src="./img/icon_yijianfankui@2x.png" width="22" height="22" class="list-icon">意见提交</template>
        </mcell>
        <mcell class="cell" is-link to="/about">
          <template slot="label"><img slot="icon" src="./img/icon_guanyuwumen@2x.png" width="22" height="22" class="list-icon">关于城宿</template>
        </mcell>
        <mcell class="cell" is-link to="/setting">
          <template slot="label"><img slot="icon" src="./img/icon_shezhi@2x.png" width="22" height="22" class="list-icon">设置</template>
        </mcell>
        <!-- {{su}} -->
      </div>
      <!-- <button @click="open">open</button> -->
      <iframe style="display: none" ref="iframe" src="" frameborder="0"></iframe>
      <!-- <icon-svg icon-class="user"></icon-svg> -->
    </div>
    <tabbar></tabbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {Cell, MessageBox} from 'mint-ui'
// import login from './user/login'
// import mypop from '@/components/myPopup'
// import suggest from './suggest'
// import about from './about'
// import setting from './setting/index'
// import personal from './user/personal'
// import realname from './realname/index'
// import real from './realname/real'
import mcell from 'components/cell'
import tabbar from '@/components/tabbar/index'
export default {
  computed: {
    ...mapGetters(['token', 'userData']),
    headImg () {
      let str = ''
      if (this.token) {
        // console.log(this.userData)
        if (this.userData.imageurl) {
          str = this.userData.imageurl + '?imageMogr2/auto-orient'
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
      login_logo: require('./img/icon_logo11@2x.png'),
      logout_logo: require('./img/icon_logo1.@2x.png'),
      phone: '0755-82462123',
      su: false,
      txt: '好'
    }
  },
  // computed: {},
  created () {
    console.log(this.userData)
    // this.$store.dispatch('setToken', '')
    // console.log(this.token)
    this.su = this.txt === '好'
  },
  methods: {
    // showLogin () {}
    open () {
      this.$router.push('/test')
      /* eslint-disable */ 
      // let ref = cordova.InAppBrowser.open('http://192.168.10.119:8090/#/test', '_blank', 'location=no,clearcache=yes,clearsessioncache=yes')
      // ref.addEventListener('loadstart', function (ev) {
      //   // alert(ev.url)
      //   if (ev.url.indexOf('/link/sign/redirect') > 0) {
      //     ref.close()
      //   }
      //   // ref.executeScript({file: "myscript.js"});
      // })
    },
    callPhone () {
      MessageBox({
        title: '',
        message: this.phone,
        showCancelButton: true,
        confirmButtonText: '呼叫'
      }).then(s => {
        // console.log('ddd', s)
        if (s === 'confirm') {
          // console.log('ssd1')
          this.$refs.iframe.src = 'tel:' + this.phone
        }
      })
    },
    headClick () {
      // console.log('sss')
      if (this.token) {
        this.personalShow()
      } else {
        this.login()
      }
    },
    login () {
      this.$store.dispatch('setPath', '')
      this.$router.push('/login')
    },
    /* 跳转实名认证 */
    real () {
      if (this.token) {
        // this.visibleReal = true
        this.$router.push('/realname')
      } else {
        // Toast('你还未登录')
        this.$store.dispatch('setPath', '/realname')
        this.$router.push('/login')
      }
    },
    goBill () {
      if (this.token) {
        this.$router.push('/bill')
      } else {
        // Toast('你还未登录')
        this.$store.dispatch('setPath', '/bill')
        this.$router.push('/login')
      }
    },
    goWallet () {
      if (this.token) {
        this.$router.push('/wallet')
      } else {
        // Toast('你还未登录')
        this.$store.dispatch('setPath', '/wallet')
        this.$router.push('/login')
      }
    },
    goCont () {
      if (this.token) {
        this.$router.push('/cont')
      } else {
        this.$store.dispatch('setPath', '/cont')
        this.$router.push('/login')
      }
    },
    personalShow () {
      if (this.token) {
        // this.visiblePersonal = true
        this.$router.push('/personal')
      }
    },
    leaseClick () {
      if (this.token) {
        this.$router.push('/lease')
      } else {
        // Toast('你还未登录')
        this.$store.dispatch('setPath', '/lease')
        this.$router.push('/login')
      }
    }
    // personalShow () {}
    // ideaShow ()
  },
  components: {
    Cell,
    mcell,
    tabbar
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.cell-wrapper {
  .border-1px;
  .border-top-1px;
  .cell {
    height: 55px;
    font-size: 16px;
  }
}
.me{
  background-color: rgb(247, 247, 247);
  padding-bottom: 60px;
}
.head {
  position: relative;
  .bg{
    height: 200px;
    overflow: hidden;
    text-align: center;
    // background-color: #000;
    // opacity: .5;
    img {
      // width: 100%;
      height: 100%;

    }
  }
  .box{
    position: absolute;
    top: 53px;
    width: 100%;
    text-align: center;
    .himg {
      margin: 0 auto;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background-color: #ffffff;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 100%;
        vertical-align: middle;
        height: 100%;
        // object-fit: cover;
        &.def{
        width: 34px;
        height: auto;
      }
      }
    }
    .text{
      margin-top: 18px;
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
.swapper{
  padding: 0 27px;
}
.bar{
  display: flex;
  width: 100%;
  // min-width: 320px;
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
