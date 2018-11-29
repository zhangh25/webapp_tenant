<template>
  <div class="confirm">
    <csheader>信息确认</csheader>
    <div class="content">
    <div class="banner" @click="$router.push('/imgbox')">
      <img src="./icon/confirmImg.png" style="width: 100%" alt="">
    <!-- <Swipe @change="handleChange">
        <SwipeItem style="background: #ff0000" v-for="item in house.imageList" :key="item.index"><img :src="item.url" alt="" class="img"></SwipeItem>
      </Swipe>
      <div class="tip" v-if="house.imageList&&house.imageList.length > 0">{{curImgidx}}/{{house.imageList.length}}</div> -->
    </div>
    <!-- <div class="ad"><img src="" alt=""></div> -->
    <div class="landlord">
      <img class="img" v-if="house.ownerUrl" :src="house.ownerUrl" width="27" height="27">
      <img class="img" v-else src="../me/img/icon_logo11@2x.png" width="27" height="27" style="object-fit: contain;">
      <span class="txt"> 房东 {{house.ownerName|name}}</span>
    </div>
    <div class="house">
      <div class="pic">
        <img v-if="house.imageList" :src="house.imageList[0].url" alt="">
      </div>
      <div class="right">
        <div class="title">{{house.areaName}}-<template v-if="house.roomTitle">{{house.roomTitle}}</template><template v-else>{{house.name}}</template></div>
        <div class="name">{{house.typeName}}-{{house.roomArea}}㎡</div>
        <div v-if="house.rent" class="rent"><span class="num">{{house.rent}}</span>元/月</div>
      </div>
    </div>
    <div class="info auth">
      <div class="title">签约信息</div>
      <mfield label="姓名" v-model="name" @click.native="auth" :font-size="14" disabled></mfield>
      <template v-if="userData.auditing === 1">
        <mfield label="身份证号" disabled v-model="idcard" :font-size="14"></mfield>
        <mfield label="性别" disabled v-model="sex" :font-size="14"></mfield>
      </template>
      <mfield label="手机号" disabled v-model="userData.phone" :font-size="14"></mfield>
      <!-- <mmfield label="手机号" v-model="userData.phone" :font-size="14"></mmfield> -->
      <template v-if="userData.auditing === 1">
        <mfield label="入住人数" v-model="formData.occupantNum" :font-size="14" placeholder="请输入人数"></mfield>
        <mfield label="租约起始日" v-model="formData.startTime" @click.native="showStartDate" :font-size="14" disabled placeholder="请选择日期" allow></mfield>
        <!-- <mfield label="租约起始日" v-model="formData.startTime" @click.native="openDate('pickerstart')" :font-size="14" disabled placeholder="请选择日期" allow></mfield> -->
        <mfield label="租约结束日" v-model="formData.endTime" @click.native="showEndDate" :font-size="14" disabled placeholder="请选择日期" allow></mfield>
        <!-- <mfield label="租约结束日" v-model="formData.endTime" @click.native="openDate('pickerend')" :font-size="14" disabled placeholder="请选择日期" allow></mfield> -->
        <mfield label="留言" type="textarea" placeholder="请输入留言" v-model="formData.content" :font-size="14"></mfield>
      </template>
      </div>
      <div class="dec">房屋租金、付款周期等信息，将由房东填写后发送给您，在您确认无误后即可签约。</div>
      <div class="btn"><Button class="" type="primary" size="large" :disabled="userData.auditing !== 1" @click="submit">确认信息，去签合同</Button></div>

    </div>
    <datetime-picker
      ref="pickerstart"
      v-model="startTime"
      type="date"
      :startDate="startdate"
      :endDate="enddate"
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
      :startDate="startdate2"
      :endDate="enddate2"
      type="date"
      yearFormat="{value}年"
      month-format="{value}月"
      date-format="{value}日"
      :closeOnClickModal="true"
      @visible-change="endChange"
      @confirm="endConfirm">
    </datetime-picker>
    <!-- <mypop v-model="authVisible">
      <template slot="title">实名认证</template>
      <realname></realname>
    </mypop> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { isNumber } from '@/utils/validate'
// import mypop from '@/components/myPopup'
// import realname from '@/views/me/realname/index'
import csheader from '@/components/header'
import mfield from 'components/field'
import {Swipe, SwipeItem, Cell, Button, DatetimePicker, Toast} from 'mint-ui'
import {formatDate, getIdCard, getFullname} from '@/utils/tool'
import {contractApply} from '@/api/appoint'
export default {
  computed: {
    ...mapGetters(['userData', 'details'])
  },
  props: {
    value: Object
  },
  data () {
    return {
      startdate: null,
      startdate2: null,
      startTime: null,
      // startTime2: null,
      enddate: null,
      enddate2: null,
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
      },
      date: '',
      name: null,
      idcard: null
    }
  },
  created () {
    this.startTime = this.startdate = new Date()
    this.enddate = new Date()
    this.startdate2 = new Date()
    this.endTime = this.enddate2 = new Date()
    this.enddate.setMonth(this.enddate.getMonth() + 1)
    // this.enddate.setDate(this.enddate.getDate() - 1)
    this.house = this.details
    this.sex = this.sexName()
    this.formData.ownerId = this.house.ownerId
    this.formData.roomId = this.house.roomId
    this.formData.userId = this.userData.id
    this.formData.userName = this.userData.username
    this.name = getFullname(this.userData.realname)
    this.idcard = getIdCard(this.userData.idNumber)
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
    showStartDate () {
      this.$picker.show({
        type: 'datePicker',
        // date: '2018-11-8',
        startTime: formatDate(this.startdate, 'yyyy-MM-dd'),
        endTime: formatDate(this.enddate, 'yyyy-MM-dd'),
        onOk: (date) => {
          // this.date = date
          this.formData.startTime = formatDate(new Date(date), 'yyyy-MM-dd')
        }
      })
    },
    showEndDate () {
      if (!this.formData.startTime) {
        Toast('请先选择起始页')
        return
      }
      let date = new Date(this.formData.startTime)
      date.setMonth(date.getMonth() + 3)
      // date.setDate(date.getDate() - 1)
      let time = formatDate(date, 'yyyy-MM-dd')
      this.$picker.show({
        type: 'datePicker',
        // date: '2019-2-3',
        date: time,
        startTime: time,
        endTime: '2050-12-31',
        onOk: (date) => {
          // this.date = date
          this.formData.endTime = formatDate(new Date(date), 'yyyy-MM-dd')
        }
      })
    },
    startChange (val) {
      // formatDate(, 'yyyy')
      // console.log(val)
      this.startdate2 = new Date(this.startTime)
      // this.startTime2
    },
    startConfirm () {
      console.log('sssss')
      // this.
      // this.formData.startTime = formatDate(new Date(this.startTime), 'yyyy-MM-dd')
      // this.enddate = new Date(this.startTime)
      // this.startdate2 = this.startdate2.setDate(this.startTime.getDate())
      // this.startdate2.setDate(this.startdate2.getDate() + 30 * 3)
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
        // this.authVisible = true
        this.$router.push('/realname')
      }
    },
    validateNumber () {
      if (this.formData.occupantNum.trim() === '') {
        Toast('请输入入住人数')
        return false
      }
      if (!isNumber(this.formData.occupantNum)) {
        Toast('人数必须为大于零数字')
        return false
      }
      if (this.formData.occupantNum < 1) {
        Toast('人数必须大于零')
        return false
      }
      if (this.formData.occupantNum > 99) {
        Toast('入住人数太多')
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
          // this.$router.push('/')
          this.$router.push(`/leaseDetailStep/${res.data}`)
        } else {
          Toast(res.msg)
        }
      })
    }
  },
  components: {
    Swipe, SwipeItem, Cell, Button, DatetimePicker, csheader, mfield // mypop, realname,
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.confirm{
  .content {
    height: calc(100vh - 44px);
    overflow: scroll;
    .banner {
      .img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .ad{
    height: 150px;
    background-color: aqua;
  }
  .landlord{
    padding: 15px;
    background-color: #fff;
    .img{
      border-radius: 50%;
      margin-right: 10px;
      object-fit: cover;
    }
    .txt{
      font-size: 15px;
    line-height: 27px;
    vertical-align: top;
    }
  }
  .house{
    display: flex;
    padding: 0 0 15px 15px;
    background-color: #fff;
    .pic{
      flex: 0 0 98px;
      overflow: hidden;
      height: 88px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .right{
      flex: 1;
      padding-left: 15px;
      padding-top: 12px;
      padding-bottom: 12px;
      background-color: #f1f1f1;
      height: 88px;
      .title{
        font-size: 14px;
        font-weight: bold;
      }
      .name{
        color: @gray;
        padding-top: 4px
      }
      .rent{
        color: @pink;
        padding-top: 4px;
        .num{
          font-weight: bold;
        }
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

  }
}.dec{
      font-size: 12px;
      color: @gray;
      padding: 15px;
    }
    .btn{
      padding: 15px;
    }
</style>
