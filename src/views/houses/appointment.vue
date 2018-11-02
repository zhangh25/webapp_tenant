<template>
  <div class="app">
    <csheader>预约看房</csheader>
    <div class="content">
    <div class="banner-imgs">
        <Swipe class="swipe" @change="imgsChange">
          <SwipeItem v-for="item in house.imageList" :key="item.index"><img :src="item.url" class="img"></SwipeItem>
        </Swipe>
        <div class="tip" v-if="house.imageList&&house.imageList.length > 0">{{curImgidx}}/{{house.imageList.length}}</div>
      </div>
    <!-- <div class="img" v-if="house.imageList&&house.imageList.length>0">
      <img :src="house.imageList[0].url" alt="">
    </div> -->
    <div class="general">
      <div class="addr"><span class="address">{{house.areaName}}-<template v-if="house.roomTitle">{{house.roomTitle}}</template><template v-else>{{house.name}}</template></span>
      <!-- <span class="date">6月19号可入住</span> -->
      </div>
      <div>
        <span class="price"><span class="num">{{house.rent}}</span>元/月</span> <span class="pay-way">{{house.depositWay}}</span>
      </div>
    </div>
    <!-- <Cell title="手机"><input type="text" v-model="phone" placeholder="请输入手机号" class="input"></Cell> -->
    <field label="手机" :font-size="14" v-model="phone" placeholder="请输入手机号" right></field>
    <field label="姓名" :font-size="14" v-model="name" placeholder="请输入姓名" right></field>
    <!-- <Cell title="姓名"><input type="text" v-model="name" placeholder="请输入姓名" class="input"></Cell> -->
    <!-- <Cell title="看房时间" is-link @click.native="open">
      {{timeShow}}
    </Cell> -->
    <field label="看房时间" :font-size="14" v-model="timeShow" @click.native="open" disabled allow right ></field>
    <field v-model="formData.content" type="textarea" placeholder="添加留言"></field>
    <!-- <Cell class="textarea">
      <textarea class="area" v-model="formData.content" placeholder="添加留言"></textarea>
    </Cell> -->
    <div class="dec">信息确认后，我们将通知您看房，如有疑问，请及时联系管家</div>
    <div style="padding: 15px; background-color: #fff"><Button type="primary" class="btn" size="large" @click.native="submit">提交约看</Button></div>
    </div>
    <!-- <datetime-picker
      ref="picker"
      v-model="time"
      :startDate="startdata"
      :endDate="enddate"
      month-format="{value}月"
      date-format="{value}日"
      :closeOnClickModal="true"
      @visible-change="handleVisibleChange"
      @confirm="handleChange">
    </datetime-picker> -->
    <!-- <mypop v-model="visible">
      <template slot="title">约看订单</template>
      <finish></finish>
    </mypop> -->
    <Popup v-model="popupVisible" position="bottom" style="width: 100%">
      <!-- <Picker valueKey="" :slots="slots" @change="onValuesChange" class="item"></Picker> -->
      <div class="top border-1px">
        <div class="left" @click="cancel">取消</div>
        <div class="right" @click="confirm">确定</div>
      </div>
      <div class="pickers">
        <Picker valueKey="name" :slots="daySlots" @change="dayChange" class="dayPicker"></Picker>
        <Picker valueKey="name" :slots="hoursSlots" @change="hoursChange" class="hoursPicker"></Picker>
        <Picker valueKey="name" :slots="minuteSlots" @change="minuteChange" class="minPicker"></Picker>
      </div>
    </Popup>
  </div>
</template>

<script>
import {Cell, DatetimePicker, Button, Toast, Swipe, SwipeItem, Popup, Picker} from 'mint-ui'
import field from 'components/field'
import mypop from '@/components/myPopup'
import finish from './finsh'
import csheader from '@/components/header'
import {formatDate} from '@/utils/tool'
// import {getOwnerInfo} from '@/api/user'
import {saveOrderAppoint} from '@/api/appoint'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['userData', 'details'])
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
      enddate: null,
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
      },
      popupVisible: false,
      daySlots: [
        {
          flex: 1,
          values: [{
            name: 'ssss',
            val: 'aa'
          }]
        }
      ],
      dayVal: {},
      hoursSlots: [
        {
          flex: 1,
          values: []
        }
      ],
      hoursVal: {},
      minuteSlots: [
        {
          flex: 1,
          values: []
        }
      ],
      minuteVal: {},
      slots: [
        {
          flex: 2,
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06']
        }, {
          flex: 1,
          values: []
        },
        {
          flex: 1,
          values: ['00分', '30分']
        }
      ],
      week: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      dateVal: [],
      hoursPicker: null
    }
  },
  created () {
    console.log(this.value)
    this.house = this.details
    this.startdata = new Date()
    this.enddate = new Date()
    this.enddate.setDate(this.enddate.getDate() + 7)
    // this.setYears()
    // this.setMonth()
    this.setDay()
    this.setHours(this.startdata.getHours())
    this.setMinute()
  },
  mounted () {
    this.formData.roomId = this.house.roomId
    this.formData.ownerId = this.house.ownerId
    // this.name = this.userData.realname
    this.phone = this.userData.phone
    if (this.userData.realname) {
      this.name = this.userData.realname.substring(0, 1) + '*'
    }
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
    onValuesChange (picker, values) {
      console.log(picker, values)
    },
    open () {
      // this.$refs.picker.open()
      this.popupVisible = true
    },
    dayChange (picker, values) {
      console.log(picker, values, '天')
      this.dayVal = values[0]
      this.setHoursSlot()
      // if ()
    },
    hoursChange (picker, values) {
      this.hoursPicker = picker
      console.log(picker, values, '时')
      this.hoursVal = values[0]
      this.setHoursSlot()
      picker.setSlotValues(0, values)
    },
    minuteChange (picker, values) {
      // console.log(picker, values)
      this.minuteVal = values[0]
    },
    // setHoursVal () {},
    setHoursSlot () {
      let curDate = new Date()
      let num = curDate.getHours()
      // parseInt
      // if ()
      let istoday = false
      // if ()
      if (this.dayVal.val === formatDate(curDate, 'yyyy-MM-dd')) {
        istoday = true
      }
      if (istoday && num >= parseInt(this.hoursVal.val)) {
        this.setHours(num)
      } else {
        this.setHours(8)
      }
    },
    confirm () {
      // console.log(this.dayVal)
      // console.log(this.hoursVal)
      // console.log(this.minuteVal)
      this.popupVisible = false
      this.formData.addTime = this.timeShow = `${this.dayVal.val} ${this.hoursVal.val}:${this.minuteVal.val}`
    },
    cancel () {
      this.popupVisible = false
    },
    setYears () {
      this.slots[0].values = []
      let endY = this.enddate.getFullYear()
      for (let y = this.startdata.getFullYear(); y <= endY; y++) {
        this.slots[0].values.push(y)
      }
    },
    setMonth () {
      let endM = this.enddate.getMonth() + 1
      let startM = this.startdata.getMonth() + 1
      this.slots[0].values = []
      if (endM === startM) {
        this.slots[0].values[0] = endM + '月'
      } else {
        this.slots[0].values[0] = startM + '月'
        this.slots[1].values[1] = endM + '月'
      }
      // for (let i = 0; m <= endM; )
    },
    setDay () {
      console.log(this.getCountDays())
      // if ()
      var curDate = new Date()
      console.log('zhou', curDate.getDay())
      this.daySlots[0].values = []
      for (let i = 0; i < 7; i++) {
        let day = curDate.getDate()
        let str = ''
        if (i === 0) {
          str = '今天'
        } else {
          str = `${curDate.getMonth()}月${day}日 (${this.week[curDate.getDay()]})`
        }
        this.daySlots[0].values.push({name: str, val: formatDate(curDate, 'yyyy-MM-dd')})
        // this.dateVal.push()
        curDate.setDate(day + 1)
      }
    },
    setHours (num) {
      let vals = []
      for (let i = num; i < 22; i++) {
        let str = this.getNumString(i)
        vals.push({name: str + '时', val: str})
      }
      // {
      //   flex: 1,
      //   values: []
      // }
      this.$set(this.hoursSlots, 0, {flex: 1, values: vals})
      // this.$set(this.hoursSlots.values, 0, values)
      console.log(this.hoursSlots)
    },
    setMinute () {
      this.minuteSlots[0].values = []
      this.minuteSlots[0].values[0] = {name: '00分', val: '00'}
      this.minuteSlots[0].values[1] = {name: '30分', val: '30'}
    },
    getNumString (num) {
      if (num < 10) {
        return `0${num}`
      } else {
        return num
      }
    },
    getCountDays () {
      var curDate = new Date()
      var curMonth = curDate.getMonth()
      /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
      curDate.setMonth(curMonth + 1)
      /* 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
      curDate.setDate(0)
      /* 返回当月的天数 */
      return curDate.getDate()
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
          // this.visible = true
          this.$router.push('/finsh')
        } else {
          Toast(res.msg)
        }
      })
    }
  },
  components: {
    Cell, DatetimePicker, Button, mypop, finish, Swipe, SwipeItem, csheader, field, Picker, Popup
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.app{
  .img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    }
  .content {
    height: calc(100vh - 44px);
    overflow: scroll;
  }
  .general {
    padding: 15px;
    background-color: #fff;
    box-shadow: 0px 1px 0px 0px #ebeaea;
    .addr {
      margin-bottom: 15px;
      .address {
        font-size: 16px;
        font-weight: bold;
      }
      .date{
        float: right;
        font-size: 11px;
        color: @pink;
        line-height: 20px;
      }
    }
    .price{
      line-height: 20px;
      color: @pink;
      .num{
        font-size: 18px;
      }
    }
    .pay-way{
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
.pickers {
  display: flex;
  .dayPicker {
    flex: 2;
  }
  .hoursPicker {
    flex: 1
  }
  .minPicker {
    flex: 1;
  }
}
.top {
  // display: flex;
  height: 44px;
  line-height: 44px;
  padding: 0 15px;
  font-size: 18px;
  .border-1px;
  .left {
    // flex: 1;
    float: left;
  }
  .right {
    float: right;
    // text-align: right;
    color: @themeColor;
  }
}
</style>
