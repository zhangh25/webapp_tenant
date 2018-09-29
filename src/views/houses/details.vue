<template>
  <div class="details" >
    <div class="top">
      <Swipe class="swipe" @change="handleChange">
        <SwipeItem style="background: #ff0000">1</SwipeItem>
        <SwipeItem style="background: #120050">2</SwipeItem>
        <SwipeItem style="background: #af0000">3</SwipeItem>
      </Swipe>
      <div class="header">
        <i class="icon-back" @click="hiden"></i>
      </div>
    </div>
    <div class="general">
      <div class="addr"><span class="address">{{deatil.roomTitle}}</span> <span class="date">6月19号可入住</span></div>
      <div>
        <span class="price">{{deatil.rent}}/月</span> <span class="pay-way">押一付一</span>
      </div>
      <div class="btns">
        <span class="btn">首次出租</span>
        <span class="btn active">近地铁</span>
        <span class="btn">精装修</span>
        <span class="btn">WIFI覆盖</span>
        <span class="btn">月度保洁</span>
      </div>

    </div>
    <div class="desc">
        <div class="item">{{deatil.roomArea?deatil.roomArea:0}}㎡</div>
        <div class="item" v-if="deatil.typeName">{{deatil.typeName}}</div>
        <div class="item" v-if="deatil.floorNumber">{{deatil.floorNumber}}/{{deatil.floorTotal}}层</div>
        <div class="item" v-if="deatil.orientation">{{deatil.orientation}}</div>
    </div>
    <div class="addr-detail">
      <i class="icon-addr"></i>距离9号线梅景（地铁站）994米
    </div>
    <div class="box  device">
      <div class="title">配置设备</div>
      <div class="clearfix" style="margin-top: 15px;">
        <div class="item"><i class="icon icon-kt"></i><span>空调</span></div>
        <div class="item"><i class="icon icon-kt"></i><span>空调</span></div>
        <div class="item"><i class="icon icon-kt"></i><span>空调</span></div>
        <div class="item"><i class="icon icon-kt"></i><span>空调</span></div>
        <div class="item"><i class="icon icon-kt"></i><span>空调</span></div>
      </div>
    </div>
    <div class="box around">
      <div class="title">周边及交通</div>
      <div class="amap">
        <el-amap vid="amapDemo" :zoom="zoom" :center="center" class=""></el-amap>
      </div>
      <div class="title" style="padding: 20px 15px">房源介绍</div>
      <div class="introduce">
        {{deatil.content}}
      </div>
        <!-- <el-amap-marker vid="component-marker" :position="componentMarker.position" :content-render="componentMarker.contentRender" ></el-amap-marker> -->

    </div>
    <div class="box butler">
      <div class="title">您的管家</div>
      <div class="butler-info clearfix">
        <div class="head">
          <img :src="deatil.ownerUrl">
        </div>
        <span class="name">{{deatil.ownerName}}</span>
        <div class="btn" @click="phone">联系电话</div>
      </div>
      <div class="text">
        您好，我是城宿管家，期待为您服务。有任何问题可致电咨询，城宿公寓欢迎您的入住。
      </div>
    </div>
    <div class="bottom">
      <div class="store" @click="toggleStore">
        <i class="icon" :class="{'icon-store': isStore}"></i><br>
        <span :class="{word: isStore}">收藏</span>
      </div>
      <div class="bespoke">预约看房</div>
      <div class="sign">立即签约</div>
    </div>
  </div>
</template>

<script>
import {querRoomDetailList} from '@/api/house'
import {Swipe, SwipeItem, MessageBox} from 'mint-ui'
export default {
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
      show: false,
      isStore: false,
      roomId: null,
      deatil: {}
    }
  },
  created () {
    this.show = this.visible
    this.roomId = this.$route.params.id
  },
  mounted () {
    this.querRoomDetail()
  },
  methods: {
    handleChange (index) {
      // console.log(index)
    },
    hiden () {
      this.show = false
      // this.$emit('update:visible', false)
      // console.log('ssfg')
      this.$router.go(-1)
    },
    querRoomDetail () {
      querRoomDetailList(this.roomId).then(res => {
        console.log(res)
        if (res.code === 1) {
          this.deatil = res.data
          this.center = [res.data.longitude, res.data.latitude]
          console.log()
        }
      })
    },
    toggleStore () {
      this.isStore = !this.isStore
    },
    phone () {
      MessageBox({
        title: '提示',
        message: '130000084',
        showCancelButton: true,
        confirmButtonText: '拨打'
      }).then(s => {
        // console.log('ddd', s)
        if (s === 'confirm') {
          console.log('ssd1')
        }
      })
    }
  },
  components: {
    Swipe, SwipeItem
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.top{
  position: relative;
  .header{
    position: absolute;
    width: 100%;
    height: 44px;
    top: 0;
    padding-left: 15px;
    .icon-back{
      display: inline-block;
      width: 8px;
      height: 15px;
      background-image: url(./icon/icon_fanhui@2x.png);
      background-size: contain;
      margin-top: 10px;
    }
  }
}
.details {
  padding-bottom: 56px;
  .swipe {
    height: 150px;
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
    margin-top: 10px;
    background-color: #fff;
    border-bottom: 1px solid #e5e5e5;
    .item{
      flex: 1;
      text-align: center;
      &+.item{
        border-left: 1px solid #e5e5e5;
      }
    }
  }
  .addr-detail{
    padding: 10px 15px;
    margin-top: 10px;
    background-color: #fff;
    border-bottom: 1px solid #e5e5e5;
    color: @gray;
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
  background: #fff;
  border-bottom: 1px solid #e5e5e5;
  .title{
    font-size: 16px;
    padding: 0 15px;
  }
}
.device {
  margin: 10px 0;
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
.around{

}
.amap{
  height: 150px;
  margin-top: 20px;
}
.introduce{
  color: @gray;
  padding: 0 15px;
}
.butler{
  margin-top: 10px;
  .butler-info{
    padding: 0 15px;
    margin-top: 20px;
  }
  .head {
    display: inline-block;
    width: 40px;
    height: 40px;
    overflow: hidden;
    border-radius: 50%;
    background: @themeColor;
    margin-right: 8px;
    img{
      width: 100%;
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
  }
  .text{
    padding: 15px;
    padding-bottom: 0;
    color: @gray;
    text-indent:2em;
    line-height: 20px;
  }
}
.bottom{
  // height: 46px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 46px;
  display: flex;
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
  }
  .sign{
    flex: 1;
    line-height: 46px;
    background-color: @themeColor;
    color: #fff;
    font-size: 15px;
  }
}
</style>
