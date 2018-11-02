<template>
  <div>
    <csheader>选择支付方式</csheader>
    <div class="box">
      <div class="item">支付{{pay.num == 1? '单':'多'}}笔账单</div>
      <div class="price">￥{{pay.price}}</div>
      <div class="item">请尽快完成支付</div>
    </div>
    <div class="title">选择付款方式</div>
    <radio v-if="card.id" border v-model="way" label="0" :name="card.bankName" :type="`${card.cardtype}(${card.bankCard?card.bankCard.slice(-4):card.bankCard})`" :iconSrc="card.smallImg"></radio>
    <cell is-link @click.native="cellClick(!card.id)">
      <span slot="label" class="othertxt">{{card.id?'其他银行卡':'添加银行卡'}} </span>
    </cell>
    <!-- <div class="title">其他付款方式</div>
    <radio v-model="way" label="1" name="微信支付" type="推荐微信用户使用" :iconSrc="iconWeixin"></radio>
    <radio v-model="way" label="2" name="支付宝支付" type="推荐支付宝用户使用" :iconSrc="iconZhifubao"></radio> -->
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
import { Popup, Button, Toast, Indicator } from 'mint-ui'
import radio from './radio'
import pw from 'components/password'
import keyword from 'components/keywordInput'
import {createBankPreOrder, fastPayAuthorize, newGetAuthorizeCode, inPayStatus} from '@/api/bill'
export default {
  computed: {
    ...mapGetters(['pay']),
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
        {
          abbreviation: 'PSBC',
          bankCard: '6217992210006877186',
          bankMobile: '18640041712',
          bankName: '中国邮政储蓄银行',
          banklogo: 'http://pic.dataox.com.cn/youzheng.png',
          cardBin: '621799',
          cardtype: '借记卡',
          city: '沈阳市',
          cvv: '',
          exprDt: '',
          id: 22,
          isDefault: 0,
          largeImg: 'http://pba3kbxrz.bkt.clouddn.com/bank/icon/youzhengchuxu.l10.png',
          nature: 'IC绿卡通',
          province: '辽宁省',
          role: 1,
          smallImg: 'http://pba3kbxrz.bkt.clouddn.com/bank/icon/youzhengchuxu.s9.png',
          urlf: 'http://pba3kbxrz.bkt.clouddn.com/user/2018-10-25/AjL10noJ.png',
          urlz: 'http://pba3kbxrz.bkt.clouddn.com/user/2018-10-25/AjL10noJ.png',
          userId: 38,
          userName: '文乙棚'
        },
        {
          id: 1,
          smallImg: 'http://pba3kbxrz.bkt.clouddn.com/bank/icon/youzhengchuxu.s9.png',
          bankName: '农业银行',
          cardtype: 'ssss',
          bankCard: '32534566768'
        }
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
      }
    }
  },
  created () {
    if (!this.pay.id || this.pay.isPay) {
      this.$router.go(-1)
    }
  },
  mounted () {
    console.log(this.pay)
    getUserBankList().then(res => {
      if (res.code === 1 && res.data.length > 0) {
        this.cardList = res.data
        this.card = this.cardList[0]
        this.selectId = this.card.id
      }
    })
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
      // console.log('ddd')
      // console.log(this.way)
      if (this.way === null) {
        console.log('空的')
      } else if (+this.way === 0) {
        console.log(this.way)
        this.payData.bankId = this.card.id
        this.payData.leaseId = this.pay.id
        this.payData.money = this.pay.price
        this.payData.payType = 3
        this.payData.role = 1
        this.payData.rbsIds = this.pay.rbsId.join(',')
        console.log(this.payData)
        // Indicator.open()
        // this.payVisible = true
        this._createBankPreOrder(this.payData)
      }
    },
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
    _fastPayAuthorize (data) {
      Indicator.open()
      fastPayAuthorize(data).then(res => {
        console.log(res)
        Indicator.close()
        if (res.code === 1) {
          // console.log('')
          this._inPayStatus()
        }
      }, erro => {
        Indicator.close()
      })
    },
    _newGetAuthorizeCode () {
      newGetAuthorizeCode(this.paybefore.out_trade_no).then(res => {
        console.log(res)
        if (res.code === 1) {
          console.log('重新获取验证码')
        }
      })
    },
    _inPayStatus () {
      inPayStatus(this.paybefore.out_trade_no).then(res => {
        console.log(res)
        if (res.code === 1) {
          console.log('支付完成')
          let pay = JSON.parse(JSON.stringify(this.pay))
          pay.isPay = true
          this.$store.dispatch('setPay', pay)
          this.$router.push('/paySuccess')
        }
      })
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
