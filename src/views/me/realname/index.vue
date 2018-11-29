<template>
  <div class="auth">
    <csheader>实名认证</csheader>
    <template v-if="userData.auditing === 0">
      <div class="titile">身份认证</div>
      <div class="dec">您还没有进行身份认证， 认证通过后才能签约</div>
      <field label="姓名" disabled>
        <input type="text" class="input" slot="extra" placeholder="请填写真实姓名" v-model="fdata.realName">
      </field>
      <field label="身份证号" disabled>
        <input type="text" class="input" slot="extra" placeholder="请填写并确认证件号" v-model="fdata.idCard">
      </field>
      <field label="身份证照片">
      </field>
      <div class="idcard">
        <div class="item" @click="uploadCard(1)">
          <i v-if="fdata.urlz" class="icon-close"  @click.stop="imgClose('urlz')"></i>
          <img v-if="fdata.urlz" :src="fdata.urlz">
          <div v-else>
            <icon-svg icon-class="add" class="icon"></icon-svg>
            <div class="str1">身份证正面照</div>
            <div class="str2">（文字清晰，四角齐全）</div>
            <!-- <img src="./img/icon_shenfenzhengzhengmian@2x.png" alt=""> -->
            <csupload ref='idcard1' @changeFile="fileChange_1"></csupload>
          </div>
        </div>
        <div class="center"></div>
        <div class="item" @click="uploadCard(2)">
          <i v-if="fdata.urlf" class="icon-close" @click.stop="imgClose('urlf')"></i>
          <img v-if="fdata.urlf" :src="fdata.urlf">
          <div v-else>
            <icon-svg icon-class="add" class="icon"></icon-svg>
            <div class="str1">身份证反面照</div>
            <div class="str2">（文字清晰，四角齐全）</div>
            <!-- <img src="./img/icon_shenfenzhengfanmian@2x.png" alt=""> -->
            <csupload ref='idcard2' @changeFile="fileChange_2"></csupload>
          </div>
        </div>
      </div>
      <div class="bottom">
        <Button type="primary" class="btn" style="margin-top: 20px" @click.native="submit">提交</Button>
      </div>
      <Popup v-model="visiblePop" position="bottom" class="pop" pop-transition="popup-fade">
        <div class="bar">
          <div class="left" @click="visiblePop=false">取消</div>
          <div class="right" @click="visiblePop=false">确定</div>
        </div>
        <Picker :slots="credentials" @change="onChange" :visible-item-count="3"></Picker>
      </Popup>
    </template>
    <div v-else-if="userData.auditing === 1" class="wrapper border-1px">
      <div class="top">
        <img class="img" src="../img/icon_renzhengchenggong@2x.png" width="57" height="57"><div style="padding-bottom: 35px">认证成功</div></div>
      <mcell title="姓名">{{userData.realname|name}}</mcell>
      <!-- <mcell title="性别">{{sexName}}</mcell> -->
      <mcell title="证件号">{{userData.idNumber|idCard}}</mcell>
    </div>
    <!-- <Actionsheet :actions="photoActions" v-model="photoVisible" :font-size="14"></Actionsheet> -->
    <!-- <template v-else>认证失败</template> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {realName} from '@/api/user'
import csupload from 'components/csupload'
import {Button, Cell, Picker, Toast, Popup} from 'mint-ui'
import field from 'components/field'
import csheader from '@/components/header'
import mcell from 'components/cell'
export default {
  computed: {
    ...mapGetters(['userData']),
    sexName (val) {
      let str = ''
      if (this.userData.sex === 1) {
        str = '男'
      } else if (this.userData.sex === 2) {
        str = '女'
      } else {
        str = '保密'
      }
      return str
    }
  },
  data () {
    return {
      credentials: [{
        flex: 1,
        values: ['身份证', '护照', '台湾居民来往大陆通行证'],
        className: 'slot1'
      }],
      visiblePop: false,
      cardType: '',
      credentialType: '',
      fdata: {
        idCard: '',
        realName: '',
        role: 1,
        urlf: '', // 身份证反面
        urlz: '' // 正面
      }
    }
  },
  methods: {
    selectCredentials () {
      // console.log('dddd')
      this.visiblePop = true
    },
    _realName () {
      realName()
    },
    onChange (val, cc) {
      console.log(cc)
    },
    uploadCard (type) {
      if (type === 1) {
        if (this.fdata.urlz) return
        this.$refs.idcard1.upload()
      } else if (type) {
        if (this.fdata.urlf) return
        this.$refs.idcard2.upload()
      }
    },
    fileChange_1 (data) {
      console.log('filechange')
      if (data.code === 1) {
        this.fdata.urlz = data.url
      }
    },
    fileChange_2 (data) {
      console.log('filechange')
      if (data.code === 1) {
        this.fdata.urlf = data.url
      }
    },
    validate () {
      let pass = true
      if (this.fdata.realName.trim() === '') {
        pass = false
        Toast('请输入真实名字')
      } else if (this.fdata.idCard.trim() === '') {
        pass = false
        Toast('请输入证件号')
      } else if (this.fdata.urlz.trim() === '') {
        pass = false
        Toast('请上传身份证正面')
      } else if (this.fdata.urlf.trim() === '') {
        pass = false
        Toast('请上传身份证反面')
      }
      return pass
    },
    submit () {
      if (this.validate()) {
        realName(this.fdata).then(res => {
          // console.log(res)
          if (res.code === 1) {
            Toast('提交成功')
            this.changeUserinfo()
            // this.$parent.back()
          } else {
            Toast(res.msg)
          }
        })
      }
    },
    changeUserinfo () {
      let data = JSON.parse(JSON.stringify(this.userData))
      Object.assign(data, {realname: this.fdata.realName, auditing: 1, idNumber: this.fdata.idCard})
      this.$store.dispatch('setUser', data)
    },
    imgClose (type) {
      // console.log(type)
      this.fdata[type] = ''
    }
  },
  components: {
    field, Button, Cell, Picker, Popup, csupload, csheader, mcell
  }
}
</script>

<style lang="less" scoped>
@import '../../../styles/mixin.less';
.auth{
  .wrapper {
    .border-1px;
  .border-top-1px;
    font-size: 14px;
  }
  .titile{
    font-size: 23px;
    padding: 15px;
    // background-color: #fff;
  }
  .dec{
    color: @gray;
    padding: 0 15px;
    // padding-bottom: 15px;
    // background-color: #fff;
    padding-bottom: 18px;

  }
  .bottom {
    margin: 15px;
    .btn{
      width: 100%;
      background-color: @themeColor;
    }
  }
  .top{
    text-align: center;
    font-size: 16px;
    .img{
      margin-top: 24px;
      margin-bottom: 16px;
    }

  }.mint-cell-value{
      font-size: 14px;
    }
  .pop{
    width: 100%;
  }
  .bar{
    display: flex;
    padding: 10px 15px;
    border-bottom: 1px solid #f2f2f2;
    font-size: 16px;
    .left {
      flex: 1;
    }
    .right{
      flex: 1;
      text-align: right;
      color: @themeColor;
    }
  }
  .input {
    width: 100%;
    padding-bottom: 15px;
    border: none;
    &::placeholder {
      color: #848484;
    }
  }
  .idcard {
    display: flex;
    text-align: center;
    color: @gray;
    background-color: #fff;
    padding: 0 15px 15px 15px;

    .item{
      display: flex;
      position: relative;
      flex: 1;
      border: 1px solid #ccc;
      // padding: 15px 0;
      height: 90px;
      overflow: hidden;
      align-items: center;
      justify-content: center;
      .str1{
        font-size: 10px;
        padding-top: 4px;
      }
      .str2{
        font-size: 8px;
      }
      .icon{
        // font-size: 26px;
        font-size: 12px;
        color: @themeColor;
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
        background-image: url(../img/icon_quxiao@3x.png);
        background-size: contain;
      }
    }
    .center{
      flex: 0 0 20px;
    }
  }
}
</style>
