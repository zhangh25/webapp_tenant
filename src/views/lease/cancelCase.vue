<template>
  <div class="case">
    <csheader>
      <div class="t">取消原因</div>
    </csheader>
    <div class="top">
      <div class="title">您将要取消签约</div>
      <div class="lable">请告知我们原因帮助我们改善服务</div>
    </div>
      <!-- <Radio
      align="right"
      class="page-part"
      v-model="caseVal"
      :options="options">
    </Radio> -->
    <div class="cell">
      <label class="radio-cell" v-for="item in options" :key="item.id">
        <div class="label">{{item.cfgValue}}</div> <span class="mint-checkbox"><input type="radio" v-model="caseVal" class="mint-checkbox-input" :value="item.id"> <span class="mint-checkbox-core"></span></span>
      </label>
    </div>
    <div class="buttom">
    <Button type="primary" size="large" @click="submit">提交</Button>
    </div>
  </div>
</template>

<script>
import csheader from '@/components/header'
import {Radio, Button, Toast} from 'mint-ui'
import {cancelApply, queryCauseConfigure} from '@/api/appoint'
export default {
  data () {
    return {
      caseVal: null,
      options: ['不是很满意，想要再看看', '与房东协商不一致', '已找到合适的房源', '房子与想象的不符', '个人因素，暂无租房需要'],
      id: null
    }
  },
  created () {
    this.id = this.$route.params.id
  },
  mounted () {
    queryCauseConfigure().then(res => {
      if (res.code === 1) {
        this.options = []
        console.log(res)
        this.options = res.data
        // for (let item of res.data) {
        //   this.options.push(item.cfgValue)
        // }
      }
    })
  },
  methods: {
    submit () {
      // console.log(this.caseVal)
      // let pp = false
      if (this.caseVal) {
        cancelApply(this.id, this.caseVal).then(res => {
          if (res.code === 1) {
            Toast('提交成功')
            this.$router.go(-1)
          } else {
            Toast(res.msg)
          }
        })
      } else {
        Toast('请选择原因')
      }
    }
  },
  components: {
    csheader, Radio, Button
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
.cell{
  margin-top: 10px;
  padding-top: 10px;
  background-color: #fff;
}
.radio-cell{
  position: relative;
  display: inline-block;
  width: 100%;
  padding: 15px;

  .lable{

  }
  .mint-checkbox{
    position: absolute;
    right: 15px;
    top: 12px;
  }
}
</style>
