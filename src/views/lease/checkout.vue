<template>
  <div class="checkout auth">
    <csheader>
      <template v-if="isSubmit">退房订单</template>
      <template v-else>申请退房</template>
      </csheader>
    <template v-if="!isSubmit">
      <div class="title">租约记录</div>
      <div class="cell"><div class="lab">姓名</div><div class="value">{{houselease.ownerName}}</div></div>
      <div class="cell"><div class="lab">房源</div><div class="value">{{houselease.roomTitle}}</div></div>
      <div class="title" style="margin-top: 10px;">退房信息</div>
      <Cell title="退房时间" is-link @click.native="openDate"><input class="input" type="text" v-model="fData.retireTime" placeholder="必填（用于费用结算）"></Cell>
      <Cell title="退款卡号" is-link @click.native="bankVisible=true"><input class="input" type="text" v-model="bankName" placeholder="请选择"></Cell>
      <Cell title="退房原因" is-link @click.native="caseVisible=true"><input class="input" type="text" v-model="caseName" placeholder="选填"></Cell>
      <div class="remark"><textarea class="area" v-model="fData.retireRoomRemark" placeholder="备注信息（选填）"></textarea></div>
      <div class="tip">
        <div class="label">温馨提示：</div>
        <div class="content">退房至少提前7天提交申请；为保障您的权益，提交申请后，请尽快与房东联系，沟通结算租金、押金等费用。</div>
      </div>
      <div class="buttom">
        <Button type="primary" size="large" @click="submit">提交</Button>
      </div>
    </template>
    <template v-else>
      <div class="no">
        <img src="./icon/tuifang.png" alt="" width="144">
        <div class="txt">您的退房申请已成功提交！</div>
        <div class="txt">您的房东会尽快联系您确认各项费用。</div>

      </div>
      <div class="btns">
<Button @click="seeCheckout">查看退房</Button>
        <Button type="primary" class="call">联系房东</Button>
      </div>
    </template>
    <datetime-picker
      ref="picker"
      v-model="startTime"
      type="date"
      :startDate="startdate"
      yearFormat="{value}年"
      month-format="{value}月"
      date-format="{value}日"
      :closeOnClickModal="true"
      @visible-change="visibleChange"
      @confirm="confirm">
    </datetime-picker>
    <Popup v-model="caseVisible" position="bottom" class="pop" pop-transition="popup-fade">
        <div class="bar">
          <div class="left" @click="caseVisible=false">取消</div>
          <div class="right" @click="caseConfirm">确定</div>
        </div>
        <Picker :slots="options" valueKey="cfgValue" @change="onChange" ></Picker>
      </Popup>
      <Popup v-model="bankVisible" position="bottom" class="pop" pop-transition="popup-fade">
        <div class="bar">
          <div class="left" @click="bankVisible=false">取消</div>
          <div class="right" @click="bankConfirm">确定</div>
        </div>
        <Picker :slots="bankOptions" valueKey="value" @change="onBankChange" ></Picker>
      </Popup>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import csheader from '@/components/header'
import {Cell, Button, DatetimePicker, Picker, Toast, Popup} from 'mint-ui'
import {formatDate} from '@/utils/tool'
import {applyRetireRoom, retireRoomCause} from '@/api/appoint'
import {getUserBankList} from '@/api/wallet'
export default {
  computed: {
    ...mapGetters(['userData', 'houselease'])
  },
  data () {
    return {
      startTime: '',
      startdate: '',
      caseArr: [],
      bankArr: [],
      isSubmit: false,
      bankName: '',
      caseName: '',
      fData: {
        bankId: null,
        id: null, // *
        retireApplyTime: null, //
        retireRoomCause: null, // 原因
        retireRoomRemark: null, // 备注
        retireTime: null // * 退房时间
        // userId: null
      },
      caseVisible: false,
      bankVisible: false,
      options: [{
        flex: 1,
        values: []
      }],
      bankOptions: [{
        flex: 1,
        values: []
      }]
    }
  },
  created () {
    if (!this.houselease) {
      // this.$router.go(-1)
      // return
    }
    console.log(this.userData)
    console.log(this.houselease)
    this.startdate = this.startTime = new Date()
    // this.fData.userId = this.userData.id
    this.fData.id = this.houselease.id
  },
  mounted () {
    this.getCaseList()
    this.getBankList()
  },
  methods: {
    openDate () {
      this.$refs.picker.open()
    },
    visibleChange (val) {},
    confirm () {
      this.fData.retireTime = formatDate(new Date(this.startTime), 'yyyy-MM-dd')
    },
    onChange (picker, val) {
      console.log(val)
      this.caseArr = val
    },
    onBankChange (picker, val) {
      console.log(val)
      this.bankArr = val
    },
    caseConfirm () {
      if (this.caseArr[0]) {
        this.fData.retireRoomCause = this.caseArr[0].id
        this.caseName = this.caseArr[0].cfgValue
        this.caseVisible = false
      }
    },
    bankConfirm () {
      if (this.bankArr[0]) {
        this.fData.bankId = this.bankArr[0].id
        this.bankName = this.bankArr[0].value
        this.bankVisible = false
      }
    },
    submit () {
      // Toast('ddd')
      if (!this.fData.retireTime) {
        Toast('请选择退房时间')
        return
      }
      if (!this.fData.bankId) {
        Toast('请选择银行卡')
        return
      }
      let data = JSON.parse(JSON.stringify(this.fData))
      data.retireTime = data.retireTime + ' 00:00:00'
      console.log(data)
      // let a = true
      // if (a) {
      //   return
      // }
      applyRetireRoom(data).then(res => {
        if (res.code === 1) {
          Toast('提交成功')
          let house = JSON.parse(JSON.stringify(this.houselease))
          house.orderStatus = 7
          this.$store.dispatch('leaseHouse', house)
          this.$router.go(-1)
          this.isSubmit = true
        } else {
          Toast(res.msg)
        }
      })
    },
    seeCheckout () {
      this.$router.push(`/leaseDetail/${1}`)
    },
    getCaseList () {
      retireRoomCause().then(res => {
        console.log(res)
        if (res.code === 1) {
          this.options[0].values = res.data
        }
      })
    },
    getBankList () {
      getUserBankList().then(res => {
        console.log(res)
        if (res.code === 1) {
          this.bankOptions[0].values = []
          for (let item of res.data) {
            this.bankOptions[0].values.push({id: item.id, value: `${item.bankName}（${item.bankCard.slice(-4)}）`})
          }
        }
      })
    }
  },
  components: {
    csheader, Cell, Button, DatetimePicker, Popup, Picker
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.title{
  padding: 15px;
  font-size: 17px;
  background-color: #fff;
}
.cell{
  display: flex;
  padding: 15px;
  background-color: #fff;
  font-size: 14px;
  .lab{
    flex: 0 0 100px;
  }
  .value{
    flex: 1;
    text-align: right;
  }
}
.input{
    border: none;
    text-align: right;
  }
.remark{
  margin-top: 10px;
  background-color: #fff;

  .area{
    width: 100%;
    height: 100px;
    padding: 15px;
    border: none;
    outline: none;
  }
}
.tip{
  display: flex;
  padding: 15px;
  font-size: 11px;
  color: @gray;
  .label{
    flex: 0 0 64px;
  }
}
.buttom{
  position: fixed;
  padding: 15px;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  border-top: 1px solid #f1f1f1;
}
.pop{
  width: 100%;
  .bar {
    display: flex;
    font-size: 18px;
    padding: 8px 20px;
    border-bottom: 1px solid #f1f1f1;
    .left{
      flex: 1;
      text-align: left;
      color: #666;
    }
    .right{
      flex: 1;
      text-align: right;
      color: @themeColor;
    }
  }
}
.no{
  color: @gray;
  text-align: center;
  padding: 70px 0 30px 0;
  .txt{
    font-size: 14px;
    padding-top: 12px;
  }
}
.btns{
  text-align: center;
  .call{
    background-color: @pink;
    margin-left: 60px;
  }
}
</style>
