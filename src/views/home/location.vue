<template>
  <div>
    <div class="header border-1px">
      <div class="left" @click="back"><i class="icon"></i></div>
    </div>
    <div class="content">
      <div class="txt">当前定位城市</div>
      {{city}}
      <!-- <Button class="btn" @click="back"><i class="icon-add"></i>{{city}}</Button> -->
    </div>
  </div>
</template>

<script>
import {Button} from 'mint-ui'
export default {
  data () {
    return {
      city: '深圳'
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  },
  components: {
    Button
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.header {
  height: 44px;
  background-color: #fff;
  .border-1px;
  .left {
    width: 40px;
    height: 100%;
    padding-left: 15px;
    display: flex;
    align-items: center;
  }
  .icon {
    display: inline-block;
    width: 12px;
    height: 12px;
    background-image: url(./icon/icon_quxiao@2x.png);
    background-size: contain;
  }
}
.content {
  padding: 15px;
  height: calc(100vh - 44px);
  background-color: #fff;
  .txt {
    color: #9a9a9a;
    padding-bottom: 15px;
  }
  .btn{
    height: 33px;
    width: 99px;
    .icon-add {
      display: inline-block;
      width: 19px;
      height: 19px;
      background-image: url(./icon/icon_dingwei@2x.png);
      background-size: contain;
      margin-right: 9px;
      vertical-align: middle;
    }
  }
}
</style>
