<template>
  <div class="confirm">
    <div class="banner-imgs">
    <Swipe @change="handleChange">
        <SwipeItem style="background: #ff0000" v-for="item in house.imageList" :key="item.index"><img :src="item.url" alt="" width="100%"></SwipeItem>
        <!-- <SwipeItem style="background: #120050">2</SwipeItem>
        <SwipeItem style="background: #af0000">3</SwipeItem> -->
      </Swipe>
      <div class="tip" v-if="house.imageList&&house.imageList.length > 0">{{curImgidx}}/{{house.imageList.length}}</div>
    </div>
    <!-- <div class="ad"><img src="" alt=""></div> -->
    <div class="landlord">
      <img class="img" :src="house.ownerUrl" width="27" height="27"> <span class="txt"> 房东 {{house.ownerName}}</span>
    </div>
    <div class="house">
      <div class="pic">
        <img v-if="house.imageList" :src="house.imageList[0].url" alt="">
      </div>
      <div class="right">
        <div class="title">{{house.roomTitle}}</div>
        <div class="name">{{house.typeName}}</div>
        <div v-if="house.rent" class="rent">{{house.rent}}元/月</div>
      </div>
    </div>
    <div class="info auth">
      <div class="title">签约信息</div>
      <Field label="姓名" v-model="userData.username" @click.native="auth" disabled placeholder="请完成身份认证"></Field>
      <template v-if="userData.auditing === 1">
        <Field label="身份证号" disabled></Field>
        <Field label="性别" disabled v-model="sex"></Field>
      </template>
      <Field label="手机号" disabled v-model="userData.phone"></Field>
      <template v-if="userData.auditing === 1">
        <Field label="入住人数" v-model="formData.occupantNum" placeholder="请输入人数"></Field>
        <Field label="租约起始日" v-model="formData.startTime" @click.native="openDate('pickerstart')" disabled placeholder="请选择日期"></Field>
        <Field label="租约结束日" v-model="formData.endTime" @click.native="openDate('pickerend')" disabled placeholder="请选择日期"></Field>
        <Field label="留言" type="textarea" placeholder="请输入留言" v-model="formData.content"></Field>
      </template>
      <div class="dec">房屋租金、付款周期等信息，将由房东填写后发送给您，在您确认无误后即可签约。</div>
      <div class="btn"><Button class="" type="primary" size="large" :disabled="userData.auditing !== 1" @click="submit">确认信息，去签合同</Button></div>
    </div>
    <datetime-picker
      ref="pickerstart"
      v-model="startTime"
      type="date"
      :startDate="startdate"
      yearFormat="{value}年"
      month-format="{value}月"
      date-format="{value}日"
      :closeOnClickModal="true"
      @visible-change="startChange"
      @confirm="startConfirm">
    </datetime-picker>
    <datetime-picker
      ref="pickerend"
      v-model="endTime"
      :startDate="enddate"
      type="date"
      yearFormat="{value}年"
      month-format="{value}月"
      date-format="{value}日"
      :closeOnClickModal="true"
      @visible-change="endChange"
      @confirm="endConfirm">
    </datetime-picker>
    <mypop v-model="authVisible">
      <template slot="title">实名认证</template>
      <realname></realname>
    </mypop>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { isNumber } from '@/utils/validate'
import mypop from '@/components/myPopup'
import realname from '@/views/me/realname/index'
import {Swipe, SwipeItem, Cell, Field, Button, DatetimePicker, Toast} from 'mint-ui'
import {formatDate} from '@/utils/tool'
import {contractApply} from '@/api/appoint'
export default {
  computed: {
    ...mapGetters(['userData'])
  },
  props: {
    value: Object
  },
  data () {
    return {
      startdate: null,
      startTime: null,
      enddate: null,
      endTime: null,
      authVisible: false,
      curImgidx: 1,
      sex: '',
      house: {}, // 房源详情
      formData: {
        content: '', // 留言
        occupantNum: '', // 入住人数
        ownerId: null, // 房东id
        roomId: null, // 房间id
        userId: null, // 用户id
        userName: null, // 用户
        startTime: null, // 开始时间
        endTime: null // 结束时间
      }
    }
  },
  created () {
    this.startdate = this.enddate = new Date()
    this.endTime = this.startTime = this.startdate
    this.house = this.value
    console.log(this.house)
    console.log(this.userData)
    this.sex = this.sexName()
    this.formData.ownerId = this.house.ownerId
    this.formData.roomId = this.house.roomId
    this.formData.userId = this.userData.id
    this.formData.userName = this.userData.username
  },
  methods: {
    sexName () {
      let str = ''
      if (this.userData.sex === 1) {
        str = '男'
      } else if (this.userData.sex === 2) {
        str = '女'
      } else {
        // str = '保密'
      }
      return str
    },
    handleChange (index) {
      this.curImgidx = index + 1
    },
    startChange (val) {
      // formatDate(, 'yyyy')
      // console.log(val)
      this.enddate = new Date(this.startTime)
    },
    startConfirm () {
      this.formData.startTime = formatDate(new Date(this.startTime), 'yyyy-MM-dd')
    },
    endChange (val) {
      // console.log(val)
    },
    endConfirm () {
      this.formData.endTime = formatDate(new Date(this.endTime), 'yyyy-MM-dd')
    },
    openDate (el) {
      // console.log('open')
      this.$refs[el].open()
    },
    auth () {
      if (this.userData.auditing !== 1) {
        this.authVisible = true
      }
    },
    validateNumber () {
      if (this.formData.occupantNum.trim() === '') {
        Toast('请输入入住人数')
        return false
      }
      if (!isNumber(this.formData.occupantNum)) {
        Toast('人数必须为数字')
        return false
      }
      if (this.formData.occupantNum < 1) {
        Toast('人数必须大于零')
        return false
      }
      return true
    },
    submit () {
      if (!this.validateNumber()) { return }
      if (!this.formData.startTime) {
        Toast('请选择起始日')
        return
      }
      if (!this.formData.endTime) {
        Toast('请选择结束日')
        return
      }
      // console.log(this.formData)
      contractApply(this.formData).then(res => {
        if (res.code === 1) {
          Toast('提交成功')
        } else {
          Toast(res.msg)
        }
      })
    }
  },
  components: {
    Swipe, SwipeItem, Cell, Field, Button, DatetimePicker, mypop, realname
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.confirm{
  .ad{
    height: 150px;
    background-color: aqua;
  }
  .landlord{
    padding: 15px;
    background-color: #fff;
    .img{
      border-radius: 50%;
    }
    .txt{
      font-size: 15px;
    line-height: 27px;
    vertical-align: top;
    }
  }
  .house{
    display: flex;
    padding: 15px 0 15px 15px;
    background-color: #fff;
    .pic{
      flex: 0 0 98px;
      overflow: hidden;

      img {
        width: 100%;
        height: 85px;
      }
    }
    .right{
      flex: 1;
      padding-left: 15px;
      padding-top: 12px;
      padding-bottom: 12px;
      background-color: #f1f1f1;
      .title{
        font-size: 14px;
      }
      .name{
        color: @gray;
        padding-top: 4px
      }
      .rent{
        color: @gray;
        padding-top: 4px
      }
    }
  }
  .info{
    margin-top: 10px;
    background-color: #fff;
    .title {
      font-size: 15px;
      padding: 15px;
    }
    .dec{
      font-size: 12px;
      color: @gray;
      padding: 15px;
    }
    .btn{
      padding: 15px;
    }
  }
}
</style>
