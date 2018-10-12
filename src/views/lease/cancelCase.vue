<template>
  <div class="case">
    <csheader>
      <div class="t">取消原因</div>
    </csheader>
    <div class="top">
      <div class="title">已为您取消签约</div>
      <div class="lable">请告知我们原因帮助我们改善服务</div>
    </div>
      <Checklist
      :max="5"
      align="right"
      class="page-part"
      v-model="caseVal"
      :options="options">
    </Checklist>
    <div class="buttom">
    <Button type="primary" size="large">提交</Button>
    </div>
  </div>
</template>

<script>
import csheader from '@/components/header'
import {Checklist, Button} from 'mint-ui'
export default {
  data () {
    return {
      caseVal: [],
      options: [
        {label: '不是很满意，想要再看看', value: '1'},
        {label: '与房东协商不一致', value: '2'},
        {label: '已找到合适的房源', value: '3'},
        {label: '房子与想象的不符', value: '4'},
        {label: '个人因素，暂无租房需要', value: '5'}
      ]
    }
  },
  components: {
    csheader, Checklist, Button
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.t{
  text-align: center;
  font-size: 17px;
}
.top{
  background-color: #fff;
  padding: 15px;
  text-align: center;
  .title{
    font-size: 14px;
    padding-top: 10px;
  }
  .lable{
    color: @pink;
    padding: 10px 0;
  }
}
.buttom{
  position: fixed;
  padding: 15px;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  border-top: 1px solid #f1f1f1;
}
</style>
