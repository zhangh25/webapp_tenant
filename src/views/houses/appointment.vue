<template>
  <div class="app">
    <div class="banner-imgs">
        <Swipe class="swipe" @change="imgsChange">
          <SwipeItem style="background: #ff0000" v-for="item in house.imageList" :key="item.index"><img :src="item.url" alt="" width="100%"></SwipeItem>
        </Swipe>
        <div class="tip" v-if="house.imageList&&house.imageList.length > 0">{{curImgidx}}/{{house.imageList.length}}</div>
      </div>
    <!-- <div class="img" v-if="house.imageList&&house.imageList.length>0">
      <img :src="house.imageList[0].url" alt="">
    </div> -->
    <div class="general">
      <div class="addr"><span class="address">{{house.roomTitle}}</span> <span class="date">6月19号可入住</span></div>
      <div>
        <span class="price">{{house.rent}}/月</span> <span class="pay-way">押一付一</span>
      </div>
    </div>
    <Cell title="手机"><input type="text" v-model="phone" placeholder="请输入手机号" class="input"></Cell>
    <Cell title="姓名"><input type="text" v-model="name" placeholder="请输入姓名" class="input"></Cell>
    <Cell title="看房时间" is-link @click.native="open">
      {{timeShow}}
    </Cell>
    <Cell class="textarea">
      <textarea class="area" v-model="formData.content" placeholder="添加留言"></textarea>
    </Cell>
    <div class="dec">信息确认后，我们将通知您看房，如有疑问，请及时联系管家</div>
    <div style="padding: 0 15px"><Button type="primary" class="btn" style="margin-top: 20px" size="large" @click.native="submit">提交</Button></div>
    <datetime-picker
      ref="picker"
      v-model="time"
      :startDate="startdata"
      month-format="{value}月"
      date-format="{value}日"
      :closeOnClickModal="true"
      @visible-change="handleVisibleChange"
      @confirm="handleChange">
    </datetime-picker>
    <mypop v-model="visible">
      <template slot="title">约看订单</template>
      <finish></finish>
    </mypop>
  </div>
</template>

<script>
import {Cell, DatetimePicker, Button, Toast, Swipe, SwipeItem} from 'mint-ui'
import mypop from '@/components/myPopup'
import finish from './finsh'
import {formatDate} from '@/utils/tool'
// import {getOwnerInfo} from '@/api/user'
import {saveOrderAppoint} from '@/api/appoint'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['userData'])
  },
  props: {
    value: Object
  },
  data () {
    return {
      house: {},
      time: null,
      visible: false,
      startdata: null,
      curImgidx: 1,
      timeShow: null,
      owner: {},
      name: null,
      phone: null,
      formData: {
        addTime: '',
        content: '',
        ownerId: 1,
        roomId: 1
      }
    }
  },
  created () {
    console.log(this.value)
    this.house = this.value
    this.startdata = new Date()
  },
  mounted () {
    this.formData.roomId = this.house.roomId
    this.formData.ownerId = this.house.ownerId
    this.name = this.userData.username
    this.phone = this.userData.phone
    // getOwnerInfo().then(res => {
    //   if (res.code === 1) {
    //     this.owner = res.data
    //     this.formData.ownerId = res.data.id
    //   }
    // })
  },
  methods: {
    imgsChange (idx) {
      this.curImgidx = idx + 1
    },
    handleChange (val) {
      this.formData.addTime = this.timeShow = formatDate(new Date(val), 'yyyy-MM-dd hh:mm')
      // console.log(val)
    },
    handleVisibleChange () {},
    open () {
      this.$refs.picker.open()
    },
    submit () {
      if (!this.formData.addTime) {
        Toast('请选择看房时间')
        return
      }
      saveOrderAppoint(this.formData).then(res => {
        console.log(res)
        if (res.code === 1) {
          Toast('提交成功')
          this.visible = true
        } else {
          Toast(res.msg)
        }
      })
    }
  },
  components: {
    Cell, DatetimePicker, Button, mypop, finish, Swipe, SwipeItem
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.app{
  .img {
    max-height: 150px;
    overflow: hidden;
    img{
      width: 100%;
    }
  }
  .general {
    padding: 15px;
    background-color: #fff;
    box-shadow: 0px 1px 0px 0px #ebeaea;
    .addr {
      margin-bottom: 15px;
      .address {
        font-size: 16px;
      }
      .date{
        float: right;
        font-size: 11px;
        color: @pink;
        line-height: 20px;
      }
    }
    .price{
      font-size: 14px;
      line-height: 20px;
    }
    .pay-way{
      font-size: 12px;
      line-height: 20px;
      color: @gray;
    }
  }
  .input{
    text-align: right;
    border: none;
  }
  .btn{
    background-color: @pink;
  }
  .area {
    margin-top: 15px;

    width: 100%;
    height: 100px;
    border: none;
    outline: none;
  }
  .dec{
    padding: 15px 0;
    font-size: 12px;
    color: @gray;
    text-align: center;
  }
}
</style>
