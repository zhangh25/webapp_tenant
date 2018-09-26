<template>
  <div class="auth">
    <template v-if="true">
      <div class="titile">身份认证</div>
      <div class="dec">您还没有进行身份认证， 认证通过后才能签约</div>
      <Field label="昵称" placeholder="请填写真实姓名"></Field>
      <Field label="证件类型" placeholder="请选择证件类型" @click.native="selectCredentials"></Field>
      <Field label="证件号" placeholder="请填写并确认证件号"></Field>
      <Field label="身份证照片">
      </Field>
      <div class="idcard">
        <div class="item">
          <icon-svg icon-class="add" class="icon"></icon-svg>
          <div class="str1">手持证件正面照</div>
          <div class="str2">（文字清晰，四角齐全）</div>
        </div>
        <div class="center"></div>
        <div class="item">
          <icon-svg icon-class="add" class="icon"></icon-svg>
          <div class="str1">手持证件正面照</div>
          <div class="str2">（文字清晰，四角齐全）</div>
        </div>
      </div>
      <div class="bottom">
        <Button type="primary" class="btn" style="margin-top: 20px" @click.native="submit">提交</Button>
      </div>
      <Popup v-model="visiblePop" position="bottom" class="pop" pop-transition="popup-fade">
        <div class="bar">
          <div class="left" @click="visiblePop=false">取消</div>
          <div class="right">确定</div>
        </div>
        <Picker :slots="credentials" @change="onYearChange" :visible-item-count="3"></Picker>
      </Popup>
    </template>
    <template v-else>
      <div class="top"><img class="img" src="../img/icon_renzhengchenggong@2x.png" width="57" height="57"><div style="padding-bottom: 35px">认证成功</div></div>
      <Cell title="姓名">xxx</Cell>
      <Cell title="性别">xxx</Cell>
      <Cell title="证件号">123456465454</Cell>
    </template>
  </div>
</template>

<script>
import {Field, Button, Cell, Picker, Popup} from 'mint-ui'
export default {
  data () {
    return {
      credentials: [{
        flex: 1,
        values: ['身份证', '护照', '台湾居民来往大陆通行证'],
        className: 'slot1'
      }],
      visiblePop: false,
      credentialType: ''
    }
  },
  methods: {
    selectCredentials () {
      console.log('dddd')
      this.visiblePop = true
    },
    onYearChange (val, cc) {
      console.log(cc)
    }
  },
  components: {
    Field, Button, Cell, Picker, Popup
  }
}
</script>

<style lang="less">
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
  .mint-field-core{
      font-size: 14px;
      &::placeholder {
        color: #d9d9d9;
      }
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
      flex: 1;
      border: 1px dashed @gray;
      padding: 15px 0;
      .str1{
        font-size: 10px;
      }
      .str2{
        font-size: 8px;
      }
      .icon{
        font-size: 26px;
      }
    }
    .center{
      flex: 0 0 20px;
    }
  }
}
</style>
