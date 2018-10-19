<template>
  <div class="auth">
    <csheader>实名认证</csheader>
    <template v-if="userData.auditing === 0">
      <div class="titile">身份认证</div>
      <div class="dec">您还没有进行身份认证， 认证通过后才能签约</div>
      <Field label="姓名" placeholder="请填写真实姓名" v-model="fdata.realName"></Field>
      <Field label="身份证号" placeholder="请填写并确认证件号" v-model="fdata.idCard"></Field>
      <Field label="身份证照片">
      </Field>
      <div class="idcard">
        <div class="item" @click="uploadCard(1)">
          <i v-if="fdata.urlz" class="icon-close"  @click.stop="imgClose('urlz')"></i>
          <img v-if="fdata.urlz" :src="fdata.urlz">
          <template v-else>
            <icon-svg icon-class="add" class="icon"></icon-svg>
            <div class="str1">手持身份证正面照</div>
            <div class="str2">（文字清晰，四角齐全）</div>
            <csupload ref='idcard1' @changeFile="fileChange_1"></csupload>
          </template>
        </div>
        <div class="center"></div>
        <div class="item" @click="uploadCard(2)">
          <i v-if="fdata.urlf" class="icon-close" @click.stop="imgClose('urlf')"></i>
          <img v-if="fdata.urlf" :src="fdata.urlf">
          <template v-else>
            <icon-svg icon-class="add" class="icon"></icon-svg>
            <div class="str1">手持身份证反面照</div>
            <div class="str2">（文字清晰，四角齐全）</div>
            <csupload ref='idcard2' @changeFile="fileChange_2"></csupload>
          </template>
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
    <template v-else-if="userData.auditing === 1">
      <div class="top"><img class="img" src="../img/icon_renzhengchenggong@2x.png" width="57" height="57"><div style="padding-bottom: 35px">认证成功</div></div>
      <Cell title="姓名">{{userData.realname}}</Cell>
      <Cell title="性别">{{sexName}}</Cell>
      <Cell title="证件号">123456465454</Cell>
    </template>
    <template v-else>认证失败</template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {realName} from '@/api/user'
import csupload from 'components/csupload'
import {Field, Button, Cell, Picker, Toast, Popup} from 'mint-ui'
import csheader from '@/components/header'
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
        urlf: 'http://pba3kbxrz.bkt.clouddn.com/FqbwtYjic8CucIA7jkFob8sxP-_q', // 身份证反面
        urlz: 'http://pba3kbxrz.bkt.clouddn.com/FsDUUhnJDdjJG7u-3wJRmzS31GZ9' // 正面
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
        Toast('请输入身份证正面')
      } else if (this.fdata.urlf.trim() === '') {
        pass = false
        Toast('请输入身份证反面')
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
            this.$parent.back()
          } else {
            Toast(res.msg)
          }
        })
      }
    },
    changeUserinfo () {
      let data = JSON.parse(JSON.stringify(this.userData))
      Object.assign(data, {username: this.fdata.realName, auditing: 1})
      this.$store.dispatch('setUser', data)
    },
    imgClose (type) {
      // console.log(type)
      this.fdata[type] = ''
    }
  },
  components: {
    Field, Button, Cell, Picker, Popup, csupload, csheader
  }
}
</script>

<style lang="less" scoped>
@import '../../../styles/mixin.less';
.auth{
  .titile{
    font-size: 23px;
    padding: 15px;
    background-color: #fff;
  }
  .dec{
    color: @gray;
    padding: 0 15px;
    background-color: #fff;
    padding-bottom: 40px;

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
  .idcard {
    display: flex;
    text-align: center;
    color: @gray;
    background-color: #fff;
    padding: 0 15px 15px 15px;
    .item{
      position: relative;
      flex: 1;
      border: 1px dashed @gray;
      padding: 15px 0;
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
