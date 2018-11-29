<template>
  <div>
    <csheader>选择支付方式</csheader>
    <div class="box">
      <div class="item">支付{{pay.num == 1? '单':'多'}}笔账单</div>
      <div class="price">￥{{pay.price}}</div>
      <div class="item">请尽快完成支付</div>
    </div>
    <div class="title">选择付款方式</div>
    <template v-if="isApp">
      <radio v-if="card.id" border v-model="way" label="0" :name="card.bankName" :type="`${card.cardtype}(${card.bankCard?card.bankCard.slice(-4):card.bankCard})`" :iconSrc="card.smallImg"></radio>
      <cell is-link @click.native="cellClick(!card.id)">
        <span slot="label" class="othertxt">{{card.id?'其他银行卡':'添加银行卡'}} </span>
      </cell>
      <div class="title">其他付款方式</div>
      <radio v-model="way" label="2" name="支付宝支付" type="推荐支付宝用户使用" :iconSrc="iconZhifubao"></radio>
    </template>
    <template v-else>
      <radio v-model="way" label="1" name="微信支付" type="推荐微信用户使用" :iconSrc="iconWeixin"></radio>
    </template>
    {{wxInfo}}
    <div class="bottom">
      <Button type="primary" size="large" @click="confirm">确定</Button>
    </div>
    <Popup style="width:100%"
      v-model="popupVisible"
      position="bottom">
      <div class="bar border-1px">
        <div class="left"></div>
        <div class="center">选择银行卡</div>
        <div class="right"></div>
      </div>
      <div class="list">
        <radio v-for="(item, i) in cardList" :key="item.id" :border="i==cardList.length"
        v-model="selectId" :label="item.id" :name="item.bankName"
        :type="`${item.cardtype}(${item.bankCard?item.bankCard.slice(-4):item.bankCard})`"
        :iconSrc="item.smallImg"></radio>
        <cell class="cell" is-link to="/addCard" topborder>
          <template slot="label"><img slot="icon" src="./icon/bank-icon.png" width="22" height="22" style="margin-right: 28px" class="list-icon">使用新银行卡</template>
        </cell>
      </div>
    </Popup>
    <Popup position="bottom" class="paypopup"
    v-model="payVisible">
    <div class="top">请输入验证码</div>
    <pw v-model="pws"></pw>
    <div @click="_newGetAuthorizeCode" class="agin"> 重新获取验证码</div>
    <keyword v-model="pws"></keyword>
    </Popup>
    <!-- {{pay}} -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import csheader from '@/components/header'
import cell from 'components/cell'
import {getUserBankList} from '@/api/wallet'
import { Popup, Button, Toast, Indicator, MessageBox } from 'mint-ui'
import radio from './radio'
import pw from 'components/password'
import keyword from 'components/keywordInput'
import {createBankPreOrder, fastPayAuthorize, newGetAuthorizeCode, createSdkPreOrder, createOpenApi} from '@/api/bill' // inPayStatus
// import {isWeiXin} from '@/utils/tool'
export default {
  computed: {
    ...mapGetters(['pay', 'alipayed', 'isApp']),
    bankbnum () {
      if (this.card.bankCard) {
        return this.card.bankCard.slice(-4)
      } else {
        return ''
      }
    }
  },
  // computed: {},
  filters: {
    lastFourNum (str) {
      console.log(str)
      if (str) {
        return str.slice(-4)
      } else {
        return str
      }
    }
  },
  watch: {
    selectId (val) {
      if (val) {
        this.popupVisible = false
        for (let item of this.cardList) {
          if (val === item.id) {
            this.card = item
            break
          }
        }
      }
    },
    pws (val) {
      if (val) {
        console.log(val.join(''))
        if (val.length === 6) {
          console.log('长度为6了')
          this.paybefore.verify_code = val.join('')
          this._fastPayAuthorize(this.paybefore)
        }
      }
    }
  },
  data () {
    return {
      cardList: [
        // {
        //   abbreviation: 'PSBC',
        //   bankCard: '6217992210006877186',
        //   bankMobile: '18640041712',
        //   bankName: '中国邮政储蓄银行',
        //   banklogo: 'http://pic.dataox.com.cn/youzheng.png',
        //   cardBin: '621799',
        //   cardtype: '借记卡',
        //   city: '沈阳市',
        //   cvv: '',
        //   exprDt: '',
        //   id: 22,
        //   isDefault: 0,
        //   largeImg: 'http://pba3kbxrz.bkt.clouddn.com/bank/icon/youzhengchuxu.l10.png',
        //   nature: 'IC绿卡通',
        //   province: '辽宁省',
        //   role: 1,
        //   smallImg: 'http://pba3kbxrz.bkt.clouddn.com/bank/icon/youzhengchuxu.s9.png',
        //   urlf: 'http://pba3kbxrz.bkt.clouddn.com/user/2018-10-25/AjL10noJ.png',
        //   urlz: 'http://pba3kbxrz.bkt.clouddn.com/user/2018-10-25/AjL10noJ.png',
        //   userId: 38,
        //   userName: '文乙棚'
        // },
        // {
        //   id: 1,
        //   smallImg: 'http://pba3kbxrz.bkt.clouddn.com/bank/icon/youzhengchuxu.s9.png',
        //   bankName: '农业银行',
        //   cardtype: 'ssss',
        //   bankCard: '32534566768'
        // }
      ],
      iconWeixin: require('./icon/icon_weixin@2x.png'),
      iconZhifubao: require('./icon/icon_zhifubao@2x.png'),
      card: {},
      selectId: null,
      way: null,
      popupVisible: false,
      payVisible: false,
      masknum: '',
      pws: [],
      payData: {},
      paybefore: {
        out_trade_no: null, // string 银盛支付合作商户网站唯一订单号 ----快捷授权必传
        total_amount: null, // 本次发生的快捷支付金额
        trade_no: null, // 银盛支付平台的交易流水
        verify_code: null // 验证码
      },
      isWeiXin: false,
      appid: 'wx388ad7a1a03663df',
      wxInfo: ''
    }
  },
  created () {
    if (!this.pay.id || this.pay.isPay) {
      if (this.isApp) {
        this.$router.go(-1)
      }
    }
  },
  mounted () {
    // this._getCode()
    if (!this.isApp) {
      this._getCode()
    }
    console.log(this.pay)
    getUserBankList().then(res => {
      if (res.code === 1 && res.data.length > 0) {
        this.cardList = res.data
        this.card = this.cardList[0]
        this.selectId = this.card.id
      }
    })
    if (this.alipayed) {
      MessageBox({
        title: '',
        message: '支付宝支付',
        showCancelButton: true,
        confirmButtonText: '支付完成',
        cancelButtonText: '未完成支付'
      }).then(s => {
        if (s === 'confirm') {
          this.paySuccess()
        }
      })
      this.$store.dispatch('setAlipayState', false)
    }
    // this.card = this.cardList[0]
    // this.selectId = this.card.id
  },
  methods: {
    cellClick (isAdd) {
      if (isAdd) {
        this.$router.push('/addCard')
      } else {
        this.popupVisible = true
      }
    },
    confirm () {
      console.log('ddd')
      // console.log()
      console.log(this.way)
      this.payData.role = 1
      this.payData.leaseId = this.pay.id
      this.payData.money = this.pay.price
      this.payData.rbsIds = this.pay.rbsId.join(',')
      if (this.way === null) {
        console.log('空的')
      } else if (+this.way === 0) {
        // console.log(this.way)
        this.payData.bankId = this.card.id
        if (this.card.cardtype !== '借记卡') {
          this.payData.payType = 3
        } else {
          this.payData.payType = 4
        }
        console.log(this.payData)
        // Indicator.open()
        // this.payVisible = true
        this._createBankPreOrder(this.payData)
      } else if (+this.way === 2) {
        this.payData.payType = 1
        this._createSdkPreOrder(this.payData)
      } else if (+this.way === 1) {
        this._createOpenApi(this.payData)
      }
    },
    // 微信公众号支付
    _createOpenApi (data) {
      console.log('微信支付')
      Indicator.open()
      let mydata = JSON.parse(JSON.stringify(data))
      mydata.code = this.code
      createOpenApi(mydata).then(res => {
        Indicator.close()
        console.log(res)
        // alert(res)
        this.wxInfo = res
        if (res.code === 1) {
          this.weixinPay(JSON.parse(res.data))
        }
      })
    },
    weixinPay (data) {
      // alert(data)
      Toast(data)
      /* eslint-disable no-undef */
      WeixinJSBridge.invoke('getBrandWCPayRequest', data,
      // {
      //   appId: 'wxd678efh567hg6787', // 公众号名称，由商户传入
      //   timeStamp: '1393848473', // 时间戳 这里随意使用了一个值
      //   nonceStr: '5K8264ILTKCH16CQ2502SI8ZNMTM67VS', // 随机串
      //   package: 'prepay_id=u802345jgfjsdfgsdg88',
      //   signType: 'MD5', // 微信签名方式:MD5
      //   paySign: 'C380BEC2BFD727A4B6845133519F3AD6' // 微信签名
      // },
        function (res) {
          if (res.err_msg === 'get_brand_wcpay_request:fail') {
            Toast('支付失败')
          // 支付失败
          } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
            Toast('支付已取消')
          // 支付过程中用户取消
          } else if (res.err_msg === 'get_brand_wcpay_request:ok') {
            alert('支付成功')
            this.paySuccess()
          // 支付成功
          }
        })
      alert('sss')
    },
    // 支付宝支付
    _createSdkPreOrder (data) {
      Indicator.open()
      createSdkPreOrder(data).then(res => {
        console.log(res, '支付宝')
        Indicator.close()
        if (res.code === 1) {
          this.$store.dispatch('setAlipayState', true)
          window.location.href = JSON.parse(res.data.pay_info).alipay_token_id
          // window.location.href =
          let url = JSON.parse(res.data.pay_info).alipay_token_id
          this.paybefore = res.data
          this.$store.dispatch('setAlipayUrl', url)

          /* eslint-disable no-undef */
          // if (cordova) {
          //   let ref = cordova.InAppBrowser.open(url, '_blank', 'location=no')
          //   // this.$store.dispatch('setAlipayState', true)
          //   ref.addEventListener('loadstart', function (ev) {
          //     alert(ev.url)
          //     // if (ev.url.indexOf('/link/sign/redirect') > 0) {
          //     //   this.getOrderDetail()
          //     //   ref.close()
          //     // }
          //   // ref.executeScript({file: "myscript.js"});
          //   })
          // } else {
          //   this.$router.push('/alipay')
          // }
          // this.$router.push('/alipay')
        }
      }, erro => {
        Indicator.close()
      })
    },
    // 银行卡支付
    _createBankPreOrder (data) {
      Indicator.open()
      createBankPreOrder(data).then(res => {
        Indicator.close()
        console.log(res)
        if (res.code === 1) {
          this.payVisible = true
          this.paybefore = res.data
        } else {
          Toast(res.msg)
        }
      }, erro => {
        Indicator.close()
      })
    },
    isWeiXinfun () {
      // window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
      var ua = navigator.userAgent.toLowerCase()
      // 通过正则表达式匹配ua中是否含有MicroMessenger字符串
      if (ua.match(/MicroMessenger/i) === 'micromessenger') {
        return true
      } else {
        return false
      }
    },
    _fastPayAuthorize (data) {
      Indicator.open()
      fastPayAuthorize(data).then(res => {
        console.log(res)
        Indicator.close()
        if (res.code === 1) {
          // console.log('')
          this.paySuccess()
        }
      }, erro => {
        Indicator.close()
      })
    },
    getUrlParam (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') // 构造一个含有目标参数的正则表达式对象
      var r = window.location.search.substr(1).match(reg) // 匹配目标参数
      if (r != null) {
        return unescape(r[2]) // 返回参数值
      } else {
        return null
      }
    },
    _getCode () {
      // const appid = 'wx388ad7a1a03663df'
      const url = window.location.href
      // alert(url)
      let code = this.getUrlParam('code')
      // alert('code' + code)
      if (!code) {
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appid}&redirect_uri=${url}&response_type=code&scope=snsapi_base&state=12234&connect_redirect=1#wechat_redirect`
      } else {
        // this.$store.dispatch('', code)
        this.code = code
        // alert(code)
      }
    },
    _newGetAuthorizeCode () {
      newGetAuthorizeCode(this.paybefore.out_trade_no).then(res => {
        console.log(res)
        if (res.code === 1) {
          console.log('重新获取验证码')
        }
      })
    },
    paySuccess () {
      // inPayStatus(this.paybefore.out_trade_no).then(res => {
      //   console.log(res)
      //   if (res.code === 1) {
      console.log('支付完成')
      let pay = JSON.parse(JSON.stringify(this.pay))
      pay.isPay = true
      this.$store.dispatch('setPay', pay)
      this.$router.push('/paySuccess')
      //   }
      // })
    }
  },
  components: {
    csheader, cell, Popup, radio, Button, pw, keyword
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.box {
  height: 165px;
  color: #fff;
  background-image: linear-gradient(0deg, #0297ff 0%, #1ca8ea 50%, #0fa0f5 74%, #0297ff 100%);
  padding: 27px 0 0 30px;
  // font
  .price {
    font-size: 36px;
    padding: 10px 0;
    margin-left: -6px;
  }
  .item {
    // padding-top: 10px;
  }
  // font-size:
}
.title {
  height: 34px;
  padding-left: 15px;
  line-height: 34px;
  color: #848484;
}
.bar {
  display: flex;
  height: 47px;
  line-height: 47px;
  .border-1px;
  .left {}
  .center {
    flex: 1;
    text-align: center;
    font-size: 17px;
  }
  .right {}
}
.list {
  max-height: 240px;
  overflow: scroll;
}
.othertxt {
  font-size: 14px;
  color: @gray;
}
.bottom {
  position: fixed;
  width: 100%;
  padding: 15px;
  bottom: 0;
  background-color: #fff;
}
.paypopup {
  width: 100%;
  .top {
    height: 44px;
    line-height: 44px;
    text-align: center;
  }
  .agin {
    width: 240px;
    margin: 0 auto;
    text-align: right;
    padding-top:4px;
    padding-bottom: 40px;
    color: @themeColor;
    font-size: 12px;
  }
}
</style>
