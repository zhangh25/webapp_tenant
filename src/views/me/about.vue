<template>
  <div class="about">
    <csheader>关于城宿</csheader>
    <div class="content">
      <img src="./img/icon_logo2@2x.png" width="90" style="margin-top:48px">
      <div class="str">城宿租房V1.0.5</div>
    </div>
    <div class="cell-wrapper border-1px">
      <cell title="全国热线" value="0755-82462229"></cell>
      <cell title="客服邮箱" value="info#chengsu.vip"></cell>
      <cell title="微信公众号" value="chengsuzufang"></cell>
    </div>
    <div class="copyright">Copyright &copy; 2016-2018 深圳市城宿管家信息技术有限公司版权所有</div>
  </div>
</template>

<script>
import csheader from '@/components/header'
// import {Cell} from 'mint-ui'
import cell from 'components/cell'
export default {
  data () {
    return {

    }
  },
  components: {
    cell, csheader
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.content{
  height: 248px;
  background-color: #fff;
  text-align: center;
  .str{
    font-size: 13px;
    margin-top: 20px;
  }

}
.cell-wrapper {
  .border-1px;
  .border-top-1px;
}
.copyright{
  // padding: 15px;
  // padding-top: 36%;
  position: fixed;
  width: 100%;
  bottom: 76px;
  font-size: 10px;
  text-align: center;
}
</style>
