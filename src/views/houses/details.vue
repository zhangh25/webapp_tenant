<template>
  <div class="details">
    <template v-if="deatil.roomId&&!loading">
    <div class="top">
      <div class="banner-imgs">
        <Swipe class="swipe" @change="handleChange">
          <SwipeItem v-for="item in deatil.imageList" :key="item.index"><img :src="`${item.url}?imageMogr2/auto-orient`" alt="" class="img"></SwipeItem>
        </Swipe>
        <div class="tip" v-if="deatil.imageList&&deatil.imageList.length > 0">{{curImgidx}}/{{deatil.imageList.length}}</div>
      </div>
      <!-- <csheader >{{deatil.areaName}}{{deatil.roomTitle}}</csheader> -->
      <div class="header border-1px" :class="{scroll: !istop}">
        <!-- <i class="icon-back"></i> -->
        <div class="left" @click="hiden"><icon-svg icon-class="back" class="icon"></icon-svg></div>
        <div class="center">{{deatil.areaName}}{{hourseTitle}}</div>
        <div class="right"></div>
      </div>
    </div>
    <div class="content">
    <div class="general border-1px">
      <div class="addr"><span class="address">{{deatil.areaName}}-{{hourseTitle}}</span>
      <!-- <span class="date">6月19号可入住</span> -->
      </div>
      <div style="font-size: 12px">
        <span class="price"><span class="num">{{deatil.rent}}</span>元/月</span>
        <span class="pay-way">{{deatil.depositWay}}</span>
      </div>
      <div class="btns">
        <span class="btn" v-for="item in deatil.roomHotTagRespList" :key="item.id">{{item.name}}</span>
        <!-- <span class="btn">首次出租</span>
        <span class="btn active">近地铁</span>
        <span class="btn">精装修</span>
        <span class="btn">WIFI覆盖</span>
        <span class="btn">月度保洁</span> -->
      </div>

    </div>
    <div class="desc border-1px">
        <div class="item" v-if="deatil.roomArea">{{deatil.roomArea?deatil.roomArea:0}}㎡</div>
        <div class="item" v-if="deatil.typeName">{{deatil.typeName}}</div>
        <div class="item" v-if="deatil.floorNumber">{{deatil.floorNumber}}/{{deatil.floorTotal}}层</div>
        <div class="item" v-if="deatil.orientation">{{deatil.orientation}}</div>
    </div>
    <div class="addr-detail border-1px" v-if="deatil.metroIfo">
      <i class="icon-addr"></i>{{deatil.metroIfo}}
    </div>
    <div class="box border-1px device" v-if="deatil.roomConfigRespList&&deatil.roomConfigRespList.length>0">
      <div class="title">配置设备</div>
      <div class="clearfix" style="margin-top: 15px;">
        <div class="item" v-for="item in deatil.roomConfigRespList" :key="item.id"><img :src="item.url" alt="" height="18" style="margin-bottom: 10px"><br><span>{{item.name}}</span></div>
      </div>
    </div>
    <div class="box around border-1px">
      <div class="title">周边及交通</div>
      <div class="amap">
        <el-amap vid="amapDemo" :zoom="zoom" :center="center" class="" :zoomEnable="false" :dragEnable="false" :doubleClickZoom="false">
          <el-amap-marker :position="center" class="csmarker" :offset=[-7,-12]>
          <i class="local-icon"></i>
        </el-amap-marker>
        </el-amap>
      </div>
      <div class="title" style="padding: 20px 0">房源介绍</div>
      <div class="introduce">
        {{deatil.content}}
      </div>
        <!-- <el-amap-marker vid="component-marker" :position="componentMarker.position" :content-render="componentMarker.contentRender" ></el-amap-marker> -->

    </div>
    <div class="box butler border-1px">
      <div class="title">您的管家</div>
      <div class="butler-info clearfix">
        <div class="head">
          <img v-if="deatil.managerImageUrl" :src="deatil.managerImageUrl">
          <img v-else src="./icon/icon_guanjia@2x.png">
        </div>
        <span class="name">{{deatil.managerName|name}}</span>
        <div class="btn">联系电话</div>
        <!-- <div class="btn" @click="phone">联系电话</div> -->
      </div>
      <div class="text">
        {{deatil.managerInfo}}
        <!-- 您好，我是城宿管家，期待为您服务。有任何问题可致电咨询，城宿公寓欢迎您的入住。 -->
      </div>
    </div>
    </div>
    <div class="bottom border-1px">
      <div class="store" @click="toggleStore">
        <i class="icon" :class="{'icon-store': isStore}"></i><br>
        <span :class="{word: isStore}">收藏</span>
      </div>
      <div class="bespoke" @click="appointment">预约看房</div>
      <div class="sign" @click="contract">立即签约</div>
    </div>
    </template>
    <div v-else-if="!loading">
      <!-- <div class="header scroll">
        <i class="icon-back" @click="hiden"></i>
      </div> -->
      <div class="header scroll border-1px" :class="{scroll: !istop}">
        <!-- <i class="icon-back"></i> -->
        <div class="left" @click="hiden"><icon-svg icon-class="back" class="icon"></icon-svg></div>
        <div class="center">无数据</div>
        <div class="right"></div>
      </div>
    </div>
    <iframe style="display: none" ref="iframe" src="" frameborder="0"></iframe>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {querRoomDetailList, saveUsersFavorite, delUsersFavorite} from '@/api/house'
import {Swipe, SwipeItem, MessageBox} from 'mint-ui'
import login from '@/views/me/user/login'
import contract from './contract'
import csheader from '@/components/header'
export default {
  computed: {
    ...mapGetters(['token', 'collect', 'userData']),
    hourseTitle () {
      if (this.deatil.roomTitle) {
        return this.deatil.roomTitle
      }
      return this.deatil.name
    }
  },
  props: {
    visible: {
      default: false,
      type: Boolean
    }
  },
  watch: {
    visible (val) {
      console.log(val, 'detai;')
      this.show = val
    }
  },
  data () {
    return {
      zoom: 14,
      center: [121.5273285, 31.21515044],
      curImgidx: 1,
      show: false,
      isStore: false,
      roomId: null,
      deatil: {},
      loginVisible: false,
      appointmentVisible: false,
      contractVisible: false,
      istop: true,
      loading: true
    }
  },
  created () {
    this.show = this.visible
    this.roomId = this.$route.params.id
  },
  mounted () {
    this.querRoomDetail()
    window.onscroll = (ev) => {
      // console.log('2123----------', window.pageYOffset)
      if (window.pageYOffset < 10) {
        this.istop = true
      } else {
        this.istop = false
      }
    }
  },
  methods: {
    handleChange (index) {
      // console.log(index, 'bannar')
      this.curImgidx = index + 1
    },
    hiden () {
      this.show = false
      // this.$emit('update:visible', false)
      // console.log('ssfg')
      this.$router.go(-1)
    },
    querRoomDetail () {
      querRoomDetailList(this.roomId).then(res => {
        this.loading = false
        console.log(res)
        if (res.code === 1 && res.data) {
          this.deatil = res.data
          this.center = [res.data.longitude, res.data.latitude]
          this.initCollect()
          console.log()
        }
      })
    },
    tips (str) {
      MessageBox({
        title: '',
        message: `登录之后才能${str}，请前往登录`,
        showCancelButton: true,
        confirmButtonText: '确认'
      }).then(s => {
        // console.log('ddd', s)
        if (s === 'confirm') {
          // this.appointmentVisible = true
          // this.loginVisible = true
          this.$router.push('/login')
          // console.log('ssd1')
        }
      })
    },
    /* 预约 */
    appointment () {
      console.log('预约')
      if (!this.deatil.roomId) return
      if (this.token) {
        // this.appointmentVisible = true
        this.$store.dispatch('updateDetails', this.deatil)
        this.$router.push('/appointment')
      } else {
        this.tips('预约房源')
      }
    },
    /* 签约 */
    contract () {
      console.log('签约')
      if (!this.deatil.roomId) return
      if (this.token) {
        if (this.userData.auditing === 0) {
          MessageBox({
            title: '',
            message: `实名后才能签约，请前往实名认证`,
            showCancelButton: true,
            confirmButtonText: '确认'
          }).then(res => {
            if (res === 'confirm') {
              this.$router.push('/realname')
            }
          })
        } else {
          this.$store.dispatch('updateDetails', this.deatil)
          // this.contractVisible = true
          this.$router.push('/contract')
        }
      } else {
        this.tips('签约房源')
      }
    },
    initCollect () {
      console.log(this.collect)
      if (this.token) {
        // if (this.deatil.is)
        this.isStore = !!this.deatil.isfavorite
      } else {
        for (let item of this.collect) {
          console.log(item, 'cooo')
          if (item === this.deatil.roomId) {
            this.isStore = true
          }
        }
      }
    },
    /* 切换收藏 */
    toggleStore () {
      this.isStore = !this.isStore
      if (this.isStore) {
        if (this.token) {
          saveUsersFavorite(this.deatil.roomId).then(res => {
            console.log(res)
            if (res.code === 1) {
              this.$store.dispatch('addCollect', this.deatil.roomId)
            }
          })
        } else {
          this.$store.dispatch('addCollect', this.deatil.roomId)
        }
      } else {
        // console.log('no')
        if (this.token) {
          delUsersFavorite(this.deatil.roomId).then(res => {
            if (res.code === 1) {
              this.$store.dispatch('delCollect', this.deatil.roomId)
            }
          })
        } else {
          this.$store.dispatch('delCollect', this.deatil.roomId)
        }
      }
      // console.log(this.collect)
    },
    phone () {
      if (this.deatil.managerPhone) {
        MessageBox({
          title: '提示',
          message: this.deatil.managerPhone,
          showCancelButton: true,
          confirmButtonText: '呼叫'
        }).then(s => {
        // console.log('ddd', s)
          if (s === 'confirm') {
          // console.log('ssd1')
            this.$refs.iframe.src = `tel:${this.deatil.managerPhone}`
          }
        })
      }
    }
  },
  components: {
    Swipe, SwipeItem, login, contract, csheader
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.top{
  position: relative;

}.header{
    position: fixed;
    display: flex;
    width: 100%;
    height: 44px;
    line-height: 44px;
    top: 0;
    border-bottom: 1px solid transparent;
    // .border-1px(transparent);
    z-index: 1;
    text-align: center;
    .icon{
      font-size: 20px;
      color: #fff;
    }
    .left {
      flex: 0 0 30px;
    }
    .center{
      flex: 1;
      font-size: 15px;
      color: transparent;
    }
    .right {
      flex: 0 0 30px;
    }
    transition: all .3s;
    &.scroll {
      background-color: #fff;
      border-bottom: 1px solid #f1f1f1;
      // .border-1px;
      .icon{
        color: #8b8b8b;
      }
      .center{
        color: #353535
      }
    }
  }
.details {
  // padding-bottom: 56px;
  // background-color: #fff;
  .swipe {
    // height: 200px;
    .img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    }
  }
  .content {
    padding: 0 15px;
    background-color: #fff;
  }
  .general {
    padding: 15px 0;
    // background-color: #fff;
    // border-bottom: 1px solid #f1f1f1;
    .border-1px;
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
  .btns {
    font-size: 0;
  }
  .btn {
    display: inline-block;
    width: 73px;
    height: 28px;
    line-height: 28px;
    font-size: 13px;
    text-align: center;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    color: @gray;
    margin-right: 10px;
    margin-top: 15px;
    &.active{
      color: @themeColor;
      border-color: @themeColor;
    }
    &:nth-child(4n+0) {
      margin-right: 0;
    }
  }
  .desc {
    display: flex;
    padding: 10px 0;
    // margin-top: 10px;
    // background-color: #fff;
    // border-bottom: 1px solid #e5e5e5;
    .border-1px;
    .item{
      flex: 1;
      text-align: center;
      &+.item{
        border-left: 1px solid #e5e5e5;
      }
    }
  }
  .addr-detail{
    padding: 10px 0;
    // margin-top: 10px;
    // background-color: #fff;
    // border-bottom: 1px solid #e5e5e5;
    color: @gray;
    .border-1px;
  }
}
.icon-addr{
  display: inline-block;
  width: 9px;
  height: 12px;
  background-image: url(../home/icon/icon_weizhi@2x.png);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin-right: 4px;
  position: relative;
  top: 1px;
}
.box{
  padding: 20px 0;
  // background: #fff;
  .border-1px;
  .title{
    font-size: 16px;
    font-weight: 600;
    // padding: 0 15px;
  }
}
.device {
  // margin: 10px 0;
  .item{
    float: left;
    width: 25%;
    text-align: center;
    margin: 0.5rem 0;
    .icon{
      display: inline-block;
      width: 100%;
      height: 1.7rem;
      background-size: auto 1.5rem;
      background-position: top center;
      background-repeat: no-repeat;
      &.icon-kt{
        background-image: url(./icon/icon_airconditioner.png)
      }
    }
  }
}
// .around{

// }
.amap{
  height: 150px;
  margin-top: 20px;
  margin-left: -15px;
  margin-right: -15px;
}
.local-icon{
  display: inline-block;
  width: 15px;
  height: 24px;
  background-image: url(./icon/icon_weizhi@3x.png);
  background-size: contain;
}
.introduce{
  color: @gray;
  padding: 0 15px;
}
.butler{
  // margin-top: 10px;
  padding-bottom: 100px;
  .butler-info{
    // padding: 0 15px;
    margin-top: 20px;
  }
  .head {
    display: inline-block;
    width: 40px;
    height: 40px;
    overflow: hidden;
    border-radius: 50%;
    // background: @themeColor;
    margin-right: 8px;
    img{
      width: 100%;
      height: 100%;
    }

  }
  .name{
      display: inline-block;
      line-height: 40px;
      vertical-align: top;
  }
  .btn{
    float: right;
    margin: 0;
    color: @themeColor;
    border-color: @themeColor;
    margin-top: 8px;
    border-radius: 4px;
  }
  .text{
    padding: 15px 0;
    padding-bottom: 0;
    color: @gray;
    text-indent:2em;
    line-height: 20px;
  }
}
.bottom{
  // height: 46px;
  .border-top-1px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 46px;
  display: flex;
  // .border-top-1px;
  // border-top: 1px solid #f1f1f1;
  z-index: 3;
  >div{
    height: 46px;
    text-align: center;
  }
  .store{
    flex: 0 0 105px;
    background-color: #fff;
    color: #848484;
    .icon{
      display: inline-block;
      width: 19px;
      height: 17px;
      background-image: url(././icon/icon_aixin@2x.png);
      background-size: contain;
      margin-top: 8px;
      margin-bottom: -4px;
      &.icon-store{
        background-image: url(././icon/icon_aixin.@2x.png);
      }
    }
    .word {
      color: @pink;
    }
  }
  .bespoke{
    flex: 1;
    line-height: 46px;
    background-color: @pink;
    color: #fff;
    font-size: 15px;
    position: relative;
    z-index: 2;
  }
  .sign{
    flex: 1;
    line-height: 46px;
    background-color: @themeColor;
    color: #fff;
    font-size: 15px;
    position: relative;
    z-index: 2;
  }
}
</style>
