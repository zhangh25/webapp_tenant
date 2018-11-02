<template>
  <div class="addbank">
    <csheader>添加银行卡</csheader>
    <!-- <div class="tip">请绑定持卡人本人的银行卡</div> 中国邮政储蓄银行-->
    <field disabled placeholder="请绑定持卡人本人的银行卡"></field>
    <field label="持卡人" v-model="name" disabled placeholder="请前往进行实名认证" :allow="userData.auditing===0" @click.native="realname"></field>
    <field label="卡号" type="number" :blur="getCardInfo" v-model="fData.bankCard" placeholder="请输入银行卡卡号"></field>
    <field label="银行类别" disabled v-model="fData.bankName" placeholder="银行类别"></field>
    <field label="手机号" type="number" maxlength="11" v-model="fData.bankMobile" placeholder="请输入手机号"></field>
    <field label="安全码" v-if="isCreditCard" v-model="fData.cvv" placeholder="信用卡安全码（信用卡必填）"></field>
    <field label="有效期" v-if="isCreditCard" v-model="fData.exprDt" @click.native="dateOpen" disabled placeholder="请选择信用卡有效期（信用卡必填）" allow></field>
    <field label="银行卡照片" disabled ></field>
    <div class="idcard">
        <div class="item" @click="uploadCard(1)">
          <i v-if="fData.urlz" class="icon-close"  @click.stop="imgClose('urlz')"></i>
          <img v-if="fData.urlz" :src="fData.urlz">
          <template v-else>
            <!-- <icon-svg icon-class="add" class="icon"></icon-svg>
            <div class="str1">手持身份证正面照</div>
            <div class="str2">（文字清晰，四角齐全）</div> -->
            <img src="./img/icon_yinhangkazhengmian@2x.png" alt="">
            <csupload ref='idcard1' @changeFile="fileChange_1"></csupload>
          </template>
        </div>
        <div class="center"></div>
        <div class="item" @click="uploadCard(2)">
          <i v-if="fData.urlf" class="icon-close" @click.stop="imgClose('urlf')"></i>
          <img v-if="fData.urlf" :src="fData.urlf">
          <template v-else>
            <!-- <div></div> -->
            <!-- <icon-svg icon-class="add" class="icon"></icon-svg>
            <div class="str1">手持身份证反面照</div>
            <div class="str2">（文字清晰，四角齐全）</div> -->
            <img src="./img/icon_yinhangkafanmian@2x.png" alt="">
            <csupload ref='idcard2' @changeFile="fileChange_2"></csupload>
          </template>
        </div>
        <datetime-picker
          ref="picker"
          v-model="time"
          type="date"
          :startDate="startdate"
          year-format="{value}年"
          month-format="{value}月"
          :closeOnClickModal="true"
          @visible-change="handleVisibleChange"
          @confirm="handleChange">
        </datetime-picker>
      </div>
      <!-- <button @click="getCardInfo">hdhhdh</button> -->
    <div class="btn">
      <Button type="primary" size="large" @click="submit">下一步</Button>
    </div>
    <div style="opacity: 0;">{{isCreditCard}}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import csheader from '@/components/header'
import {Button, Toast, DatetimePicker} from 'mint-ui'
import field from 'components/field'
import csupload from 'components/csupload'
import { isMobile } from '@/utils/validate'
import {bindingBank, queryBankInfo} from '@/api/wallet'
import {formatDate, getFullname} from '@/utils/tool'
export default {
  computed: {
    ...mapGetters(['userData'])
  },
  data () {
    return {
      name: '',
      fData: {
        // name: '',
        bankName: '',
        userId: null,
        bankCard: '', // 银行卡号
        bankMobile: '', // 手机号
        urlf: '',
        urlz: '',
        role: 1,
        cvv: '', // 信用卡安全码
        exprDt: '' // 信用卡有效期
      },
      bankinfo: {},
      startdate: null,
      time: null,
      isCreditCard: false,
      test: null
    }
  },
  created () {
    this.name = getFullname(this.userData.realname)
    this.fData.bankMobile = this.userData.phone
    this.fData.userId = this.userData.id
    this.startdate = new Date()
  },
  mounted () {
    let el = document.getElementsByClassName('picker-slot')
    // console.log(el)
    if (el.length > 0) {
      // console.log(el)
    }
    this.$nextTick(_ => {
      // console.log(el)
      if (el) {
        el[2].style.display = 'none'
      }
    })
  },
  methods: {
    onChange (val, cc) {
      console.log(cc)
    },
    uploadCard (type) {
      if (type === 1) {
        if (this.fData.urlz) return
        this.$refs.idcard1.upload()
      } else if (type) {
        if (this.fData.urlf) return
        this.$refs.idcard2.upload()
      }
    },
    handleVisibleChange (b) {
      // console.log(b)
      if (b) {
        // let el = document.getElementsByClassName('picker-slot')

      }
    },
    handleChange (val) {
      this.fData.exprDt = formatDate(new Date(val), 'MM/yy')
    },
    dateOpen () {
      this.$refs.picker.open()
    },
    realname () {
      // console.log('23')
      if (this.userData.auditing === 0) {
        this.$router.push('/realname')
      }
    },
    fileChange_1 (data) {
      console.log('filechange')
      if (data.code === 1) {
        this.fData.urlz = data.url
      }
    },
    fileChange_2 (data) {
      console.log('filechange')
      if (data.code === 1) {
        this.fData.urlf = data.url
      }
    },
    imgClose (type) {
      // console.log(type) 6217992210006877186
      this.fData[type] = ''
    },
    validate () {
      if (!isMobile(this.fData.bankMobile)) {
        Toast('请输入正确的手机号')
        return false
      }
      if (this.fData.bankCard.trim() === '') {
        Toast('请输入卡号')
        return false
      }
      if (this.fData.urlz === '') {
        Toast('请上传银行卡正面')
        return false
      }
      if (this.fData.urlf === '') {
        Toast('请上传银行卡反面')
        return false
      }
      if (this.fData.bankName === '') {
        Toast('请输入正确的银行卡号')
        return false
      }
      if (this.isCreditCard && this.fData.cvv.trim() === '') {
        Toast('请输入信用卡安全码')
        return false
      }
      if (this.isCreditCard && this.fData.exprDt.trim() === '') {
        Toast('请选择信用卡有效期')
        return false
      }
      return true
    },
    getCardInfo (val) {
      // console.log('qqqq')
      if (this.fData.bankCard) {
        queryBankInfo(this.fData.bankCard).then(res => {
          // console.log(res)
          if (res.code === 1) {
            this.bankinfo = res.data
            this.fData.bankName = res.data.bankName
            // console.log(res.data.cardtype)
            this.isCreditCard = res.data.cardtype !== '借记卡'
            if (res.data.cardtype === this.test) {
              // this.isCreditCard = false
              // console.log('信用卡')
            } else {
              // this.isCreditCard = true
              // console.log('借记卡')
            }
          } else {
            Toast('请输入正确的银行卡号')
            this.fData.bankName = ''
          }
        })
      }
    },
    submit () {
      // console.log(this.bankinfo)
      if (this.validate()) {
        // console.log('通过')
        //
        Object.assign(this.bankinfo, this.fData)
        if (!this.isCreditCard) {
          delete this.bankinfo.cvv
          delete this.bankinfo.exprDt
        }
        bindingBank(this.bankinfo).then(res => {
          if (res.code === 1) {
            Toast('银行卡添加成功')
            this.$router.go(-1)
          } else if (res.msg) {
            Toast(res.msg)
          }
        })
      }
    }
  },
  components: {
    csheader, field, Button, csupload, DatetimePicker
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.tip{
  padding: 15px;
  line-height: 22px;
}
.btn {
  padding: 15px;
  padding-top: 40px;
}
.idcard {
    display: flex;
    text-align: center;
    color: @gray;
    background-color: #fff;
    padding: 0 15px 15px 15px;
    .item{
      position: relative;
      flex: 1;
      // border: 1px dashed @gray;
      // padding: 15px 0;
      height: 90px;
      overflow: hidden;
      .str1{
        font-size: 10px;
      }
      .str2{
        font-size: 8px;
      }
      .icon{
        font-size: 26px;
      }
      img {
        max-width: 100%;
        max-height: 100%;
      }
      .icon-close {
        position: absolute;
        right: 4px;
        top: 4px;
        display: inline-block;
        width: 10px;
        height: 10px;
        background-image: url(../me/img/icon_quxiao@3x.png);
        background-size: contain;
      }
    }
    .center{
      flex: 0 0 20px;

    }
  }
</style>
