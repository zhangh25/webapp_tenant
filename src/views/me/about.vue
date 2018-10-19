<template>
  <div class="about">
    <csheader>关于城宿</csheader>
    <div class="content">
      <img src="./img/icon_logo2@2x.png" width="87" height="109" style="margin-top:48px">
      <div class="str">城宿租房V1.0.0</div>
    </div>
    <Cell title="全国热线" value="0755-82462229"></Cell>
    <Cell title="客服邮箱" value="info#chengsu.vip"></Cell>
    <Cell title="微信公众号" value="chengsuzufang"></Cell>
    <div class="copyright">Copyright &copy; 2016-2018 深圳市城宿管家信息技术有限公司版权所有</div>
  </div>
</template>

<script>
import csheader from '@/components/header'
import {Cell} from 'mint-ui'
export default {
  data () {
    return {

    }
  },
  components: {
    Cell, csheader
  }
}
</script>

<style lang="less" scoped>
.content{
  height: 248px;
  background-color: #fff;
  text-align: center;
  padding-top: 44px;
  .str{
    font-size: 13px;
    margin-top: 20px;
  }

}
.copyright{
  padding: 15px;
  padding-top: 50px;
    font-size: 10px;
    text-align: center;
  }
</style>
