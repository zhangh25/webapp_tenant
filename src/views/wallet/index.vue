<template>
  <div>
    <csheader>银行卡 <div slot="right" @click="$router.push('/addCard')"><icon-svg icon-class="add" class="icon"></icon-svg></div></csheader>
    <!-- <div class="price">￥{{price}}</div>
    <div class="name">余额</div>
    <div class="btns">
      <Button type="primary" size="large">充值</Button>
      <Button size="large" class="btn">提现</Button>
    </div> -->
    <!-- <pw v-model="pws" style="margin-bottom: 10px"></pw>
    <keyword v-model="pws"></keyword> -->
    <div class="content">
      <div class="card" v-for="item in cardList" :key="item.id">
        <img :src="item.largeImg" width="100%">
        <div class="wrapper">
          <div class="login">
            <!-- {{item.largeImg}} -->
            <img :src="item.smallImg" width="36">
          </div>
          <div class="right">
            <div class="name">{{item.bankName}}</div>
            <div class="type">{{item.cardtype}}</div>
            <div class="num"> **** **** **** {{item.bankCard|cardnum}}</div>
          </div>
        </div>
      </div>
      <!-- {{aa}} -->
      <nodata v-if="cardList.length<1" imgSrc="zanwuyinhangka" text="暂无银行卡"></nodata>
    </div>
  </div>

</template>

<script>

import csheader from '@/components/header'
import {Button} from 'mint-ui'
import pw from 'components/password'
import keyword from 'components/keywordInput'
import {getUserBankList} from '@/api/wallet'
import nodata from 'components/nodata/index'
export default {
  data () {
    return {
      price: '0.00',
      pws: [],
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
        // }
      ],
      aa: 4
    }
  },
  filters: {
    cardnum (str) {
      return str.slice(-4)
    }
  },
  mounted () {
    getUserBankList().then(res => {
      console.log(res)
      if (res.code === 1) {
        this.cardList = res.data

        if (this.cardList[0].cardtype === '借记卡') {
          this.aa = false
        } else {
          this.aa = true
        }
      }
    })
  },
  components: {
    Button, csheader, keyword, pw, nodata
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.icon {
  color: @themeColor;
  // font-size: 22px;
}
.content {
  height: calc(100vh - 44px);
  overflow: scroll;
  background-color: #fff;
  padding: 15px 20px;
  .card {
    // height: 130px;
    background-size: cover;
    margin-bottom: 15px;
    position: relative;
    // display: flex;
    .wrapper {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      color: #fff;
      align-items: center;
      .login {
        padding-left: 20px;
        padding-right: 10px;
        height: 72px;
      }
      .right {
        .name {
          font-size: 16px;
        }
        .type {
          font-size: 12px;
          padding-top: 4px;
          padding-bottom: 20px;
        }
        .num {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
